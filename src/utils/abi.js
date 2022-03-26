import { encodeMultiSend } from '@gnosis.pm/safe-contracts';
import Web3 from 'web3';
import { Contract, BigNumber, ethers } from 'ethers';

import { chainByID } from './chain';
import { createContract } from './contract';
import { IsJsonString } from './general';
import { validate } from './validation';

import ERC_20 from '../contracts/erc20a.json';
import GNOSIS_IPROXY from '../contracts/iProxy.json';
import MOLOCH_V2 from '../contracts/molochV2.json';
import SAFE_MINION from '../contracts/safeMinion.json';
import SAFE_MULTISEND from '../contracts/safeMultisend.json';

export const LOCAL_ABI = Object.freeze({
  MOLOCH_V2,
  ERC_20,
  SAFE_MINION,
  SAFE_MULTISEND,
  GNOSIS_IPROXY,
});

const getBlockExplorerApiKey = chainID => {
  switch (chainID) {
    case '0x89': {
      return process.env.REACT_APP_POLYGONSCAN_KEY;
    }
    case '0x64': {
      return null;
    }
    default: {
      return process.env.REACT_APP_ETHERSCAN_KEY;
    }
  }
};

const getABIurl = (contractAddress, chainID) => {
  const key = getBlockExplorerApiKey(chainID);
  return key
    ? `${chainByID(chainID).abi_api_url}${contractAddress}&apiKey=${key}`
    : `${chainByID(chainID).abi_api_url}${contractAddress}`;
};

const isProxyABI = response => {
  if (response?.length) {
    return response.some(fn => fn.name === 'implementation');
  }
};

const isGnosisProxy = response => {
  return (
    response.length === 2 &&
    response.every(fn => ['constructor', 'fallback'].includes(fn.type))
  );
};

const getImplementationOf = async (address, chainID, abi) => {
  const web3Contract = createContract({ address, abi, chainID });
  const newAddress = await web3Contract.methods.implementation().call();
  return newAddress;
};

const getGnosisMasterCopy = async (address, chainID) => {
  const web3Contract = createContract({ address, abi: GNOSIS_IPROXY, chainID });
  const masterCopy = await web3Contract.methods.masterCopy().call();
  return masterCopy;
};

export const fetchABI = async (contractAddress, chainID, parseJSON = true) => {
  const url = getABIurl(contractAddress, chainID);
  if (!url) {
    throw new Error('Could generate ABI link with the given arguments');
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.message === 'OK' && IsJsonString(data?.result) && parseJSON) {
      const abiData = JSON.parse(data.result);
      const proxyAddress = isProxyABI(abiData)
        ? await getImplementationOf(contractAddress, chainID, abiData)
        : isGnosisProxy(abiData) &&
          (await getGnosisMasterCopy(contractAddress, chainID));
      if (proxyAddress) {
        const newData = await fetchABI(proxyAddress, chainID, parseJSON);
        return newData;
      }
      return abiData;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getABIfunctions = abi => {
  if (!abi || !Array.isArray(abi) || !abi.length) return null;
  return abi.filter(({ type, constant }) => type === 'function' && !constant);
};

export const formatFNsAsSelectOptions = abi => {
  if (!abi || !Array.isArray(abi) || !abi.length) return null;
  return abi.map(fn => ({
    name: fn.name,
    value: JSON.stringify(fn),
    key: fn.name,
  }));
};

export const safeEncodeHexFunction = (selectedFunction, inputVals) => {
  if (!selectedFunction || !Array.isArray(inputVals))
    throw new Error(
      'Incorrect params passed to safeEncodeHexFunction in abi.js',
    );
  try {
    const web3 = new Web3();
    return web3.eth.abi.encodeFunctionCall(selectedFunction, inputVals);
  } catch (error) {
    return {
      encodingError: true,
      message:
        'Could not encode transaction data with the values entered into this form',
    };
  }
};

export const ensureHex = (abiInput, abiArgs) => {
  return validate.hex(abiInput)
    ? abiInput
    : safeEncodeHexFunction(JSON.parse(abiInput), abiArgs || []);
};

export const encodeMultisendTx = (
  multiSendFn,
  tos,
  values,
  actions,
  operations,
) => {
  if (
    tos.length + values.length + actions.length + operations.length ===
    tos.length * 4
  ) {
    const metaTransactions = actions.map((action, idx) => {
      return {
        to: tos[idx],
        value: values[idx],
        data: action,
        operation: operations[idx],
      };
    });
    const encodedMetatransactions = encodeMultiSend(metaTransactions);
    const web3 = new Web3();
    return web3.eth.abi.encodeFunctionCall(multiSendFn, [
      encodedMetatransactions,
    ]);
  }
  return {
    encodingError: true,
    message: 'Multisend params length mismatch',
  };
};

export const decodeMultisendTx = (multisendAddress, encodedTx) => {
  const OPERATION_TYPE = 2;
  const ADDRESS = 40;
  const VALUE = 64;
  const DATA_LENGTH = 64;

  const multisend = new Contract(multisendAddress, SAFE_MULTISEND);
  const actions = multisend.interface.decodeFunctionData(
    'multiSend',
    encodedTx,
  );
  let transactionsEncoded = actions[0].slice(2);

  const transactions = [];

  while (
    transactionsEncoded.length >=
    OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH
  ) {
    const thisTxLengthHex = transactionsEncoded.slice(
      OPERATION_TYPE + ADDRESS + VALUE,
      OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH,
    );
    const thisTxLength = BigNumber.from(`0x${thisTxLengthHex}`).toNumber();
    transactions.push({
      to: `0x${transactionsEncoded.slice(2, OPERATION_TYPE + ADDRESS)}`,
      value: `0x${transactionsEncoded.slice(
        OPERATION_TYPE + ADDRESS,
        OPERATION_TYPE + ADDRESS + VALUE,
      )}`,
      data: `0x${transactionsEncoded.slice(
        OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH,
        OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH + thisTxLength * 2,
      )}`,
      operation: parseInt(transactionsEncoded.slice(0, 2)),
    });
    transactionsEncoded = transactionsEncoded.slice(
      OPERATION_TYPE + ADDRESS + VALUE + DATA_LENGTH + thisTxLength * 2,
    );
  }

  return transactions;
};

export const getLocalABI = contract => LOCAL_ABI[contract.abiName];
const getLocalSnippet = ({ contract, fnName }) => {
  console.log(`contract`, contract);
  const abi = getLocalABI(contract);
  console.log(`abi`, abi);
  const snippet = abi?.find(fn => fn.name === fnName);
  console.log(`snippet`, snippet);
  return snippet;
};

export const getRemoteABI = async (contract, data) => {
  const chainID = data.contextData.daochain;
  const abi = await fetchABI(contract.contractAddress, chainID);
  return abi;
};
const getRemoteSnippet = async ({ contract, fnName }, data) => {
  const remoteSnippet = await getRemoteABI(contract, data)?.find(
    fn => fn.name === fnName,
  );
  return remoteSnippet;
};

export const getABIsnippet = (params, data) => {
  const { contract } = params;

  console.log('params, data', params, data);
  if (contract.location === 'local') return getLocalSnippet(params);
  if (contract.location === 'fetch') return getRemoteSnippet(params, data);
  if (contract.location === 'static') return contract.value;
  throw new Error(
    `abi.js => getABIsnippet():
     Did not recieve a correct ABI snippet location. Check tx data in contractTx.js`,
  );
};
export const getContractABI = async data => {
  const { contract } = data.tx;

  console.log('contract', contract);
  if (contract.location === 'local') return getLocalABI(contract);
  if (contract.location === 'fetch') return getRemoteABI(contract, data);
  if (contract.location === 'static') return contract.value;
  throw new Error(
    `abi.js => getABI():
    Did not recieve a correct ABI location. Check tx data in contractTx.js`,
  );
};

export const encodeFunctionCall = (ifaces, methodName, args) => {
  const iface = new ethers.utils.Interface(ifaces);
  return iface.encodeFunctionData(methodName, [...args]);
};

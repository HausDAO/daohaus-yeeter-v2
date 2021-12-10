import { isSameAddress } from './general';
import { getReadableBalance } from './tokenValue';

export const getVaultERC20s = (daoVaults, vaultAddress, localTokenAddress) => {
  const erc20s = daoVaults?.find(vault =>
    isSameAddress(vault.address, vaultAddress),
  )?.erc20s;
  return localTokenAddress && erc20s.length
    ? erc20s.filter(erc20 => erc20.tokenAddress === localTokenAddress)
    : erc20s;
};

export const getTokenFromList = (erc20s, tokenAddress) =>
  erc20s?.find(token => isSameAddress(token.contractAddress, tokenAddress));

export const getReadableBalanceFromList = (erc20s, tokenAddress) =>
  getReadableBalance(getTokenFromList(erc20s, tokenAddress));

export const getTokenData = (daoVaults, vaultAddress, tokenAddress) => {
  const tokenData = getTokenFromList(
    getVaultERC20s(daoVaults, vaultAddress),
    tokenAddress,
  );
  return tokenData;
};

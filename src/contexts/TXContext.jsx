import React, { useContext, createContext } from 'react';
import { useParams } from 'react-router-dom';

import { useDao } from './DaoContext';
import { useInjectedProvider } from './InjectedProviderContext';
import { useOverlay } from './OverlayContext';
import { useTxPoll } from './TxPollContext';
import {
  createActions,
  exposeValues,
  getArgs,
  handleFieldModifiers,
  createHydratedString,
  Transaction,
} from '../utils/txHelpers';
import { createPoll } from '../utils/pollService';
import { customValidations } from '../utils/validation';
import { supportedChains } from '../utils/chain';
import { TX } from '../data/contractTX';
import { handleChecklist } from '../utils/appChecks';

export const TXContext = createContext();

export const TXProvider = ({ children }) => {
  const { injectedProvider, address, injectedChain } = useInjectedProvider();
  const { resolvePoll, cachePoll } = useTxPoll();
  const {
    hasPerformedBatchQuery,
    refetch,
    daoOverview,
    daoProposals,
  } = useDao();
  const {
    errorToast,
    successToast,
    setTxInfoModal,
    setModal,
    setGenericModal,
  } = useOverlay();

  const { daoid, daochain, minion } = useParams();
  const chainConfig = supportedChains[daochain];

  const contextData = {
    address,
    daoOverview,
    daoid,
    daochain,
    minion,
    daoProposals,
    chainConfig,
  };

  const uiControl = {
    errorToast,
    successToast,
    resolvePoll,
    cachePoll,
    refetch,
    setTxInfoModal,
    setGenericModal,
    setModal,
  };

  const refreshDao = async () => {
    // I use useRef to stop excessive rerenders in most of the contexts
    // I need to reset them in order to prevent them from locking up
    // the rerendering flow

    hasPerformedBatchQuery.current = false;

    // Now, I call rerender on DaoContext, which should re-fetch all the graphQueries
    // This should get up all the up to date data from the Graph and spread across the
    // entire component tree. It should also recache the new data automatically

    refetch();
  };

  const buildTXPoll = data => {
    const { tx, values, now, lifeCycleFns, localValues } = data;

    return createPoll({
      action: tx.poll || tx.specialPoll || tx.name,
      cachePoll,
    })({
      daoID: daoid,
      chainID: daochain,
      tx,
      createdAt: now,
      ...values,
      ...localValues,
      address,
      actions: {
        onError: (error, txHash) => {
          errorToast({
            title: tx.errMsg || 'Transaction Error',
            description: error?.message || '',
          });
          lifeCycleFns?.onPollError?.(txHash, error, data);
          resolvePoll(txHash);
          console.error(`${tx.errMsg}: ${error}`);
        },
        onSuccess: async txHash => {
          await refreshDao();
          successToast({
            title: tx.successMsg || 'Transaction Successful',
          });
          lifeCycleFns?.onPollSuccess?.(txHash, data);
          resolvePoll(txHash);
        },
      },
    });
  };

  const handleCustomValidation = ({ values, formData }) => {
    if (!formData?.customValidations?.length) return false;
    const errors = formData.customValidations.reduce((arr, rule) => {
      const isError = customValidations[rule]?.({
        values,
        formData,
        appState: contextData,
      });
      if (isError) {
        return [...arr, isError];
      }
      return arr;
    }, []);
    return errors?.length ? errors : false;
  };

  const createTX = async data => {
    data.lifeCycleFns?.beforeTx?.(data);

    const now = (new Date().getTime() / 1000).toFixed();
    const consolidatedData = {
      ...data,
      contextData,
      injectedProvider,
      now,
    };
    const onTxHash = createActions({
      tx: data.tx,
      uiControl,
      stage: 'onTxHash',
      lifeCycleFns: data.lifeCycleFns,
    });

    try {
      const args = getArgs({ ...consolidatedData });
      console.log(`args`, args);
      const poll = buildTXPoll({
        ...consolidatedData,
      });
      const tx = await Transaction({
        args,
        ...consolidatedData,
        poll,
        onTxHash,
      });

      data.lifeCycleFns?.afterTx?.();
      return tx;
    } catch (error) {
      console.error(error);
      data.lifeCycleFns?.onCatch?.();
      errorToast({
        title: data?.tx?.errMsg || 'There was an error',
        description: error.message || '',
      });
    }
  };

  const submitTransaction = data => {
    console.log('data', data);
    const {
      tx: { name },
    } = data;

    //  Checks that this TX has a name and that the name is in the
    //  list of existing Transactions
    if (!name) {
      throw new Error('TX CONTEXT: TX data or name not found');
    }
    const txExists = Object.values(TX)
      .map(tx => tx.name)
      .includes(name);
    if (!txExists) {
      throw new Error('TX CONTEXT: TX does not exist');
    }

    //  Searches for items within the data tree and adds them to {values}
    if (data?.tx?.exposeValues) {
      return createTX(exposeValues({ ...data, contextData, injectedProvider }));
    }
    return createTX(data);
  };

  const modifyFields = formState => {
    return handleFieldModifiers({ ...formState, contextData });
  };

  const submitCallback = formState => {
    return formState.onSubmit({ ...formState, contextData, injectedProvider });
  };

  const hydrateString = data =>
    createHydratedString({
      ...data,
      contextData,
      injectedProvider,
    });

  const checkState = (checklist, errorDeliveryType) =>
    handleChecklist(
      { ...contextData, injectedProvider, injectedChain },
      checklist,
      errorDeliveryType,
    );

  return (
    <TXContext.Provider
      value={{
        refreshDao,
        submitTransaction,
        handleCustomValidation,
        modifyFields,
        submitCallback,
        hydrateString,
        checkState,
      }}
    >
      {children}
    </TXContext.Provider>
  );
};

export const useTX = () => {
  const {
    refreshDao,
    submitTransaction,
    handleCustomValidation,
    modifyFields,
    submitCallback,
    hydrateString,
    checkState,
  } = useContext(TXContext) || {};
  return {
    refreshDao,
    submitTransaction,
    handleCustomValidation,
    modifyFields,
    submitCallback,
    hydrateString,
    checkState,
  };
};

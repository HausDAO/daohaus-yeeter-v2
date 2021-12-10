import {
  pollTokenAllowances,
  pollTokenApproval,
  pollTXHash,
} from '../polls/polls';
import {
  tokenAllowanceTest,
  tokenApprovedTest,
  testTXHash,
} from '../polls/tests';

export const createPoll = ({
  interval = 2000,
  tries = 30,
  action = null,
  cachePoll = null,
}) => {
  /// ////////////////////GENERIC POLL//////////////////
  const startPoll = ({
    pollFetch,
    testFn,
    shouldEqual,
    args,
    actions,
    txHash,
  }) => {
    let tryCount = 0;
    const pollId = setInterval(async () => {
      if (tryCount < tries) {
        try {
          const res = await pollFetch(args);
          console.log('Fetch Result', res);
          console.log('ShouldEqual', shouldEqual);
          const testResult = testFn(res, shouldEqual, pollId);
          console.log('Test Result', testResult);
          if (testResult) {
            clearInterval(pollId);
            actions.onSuccess(txHash);
            return res;
          }
          tryCount += 1;
        } catch (error) {
          console.error(error);
          actions.onError(error, txHash);
          clearInterval(pollId);
        }
      } else {
        actions.onError('Ran out of tries', txHash);
        clearInterval(pollId);
      }
    }, interval);
    return pollId;
  };
  /// /////////////////ACTIONS//////////////////////////
  if (!action) {
    throw new Error('User must submit an action argument');
  } else if (action === 'subgraph') {
    return ({ chainID, actions, now, tx }) => txHash => {
      if (!tx) return;
      const args = { txHash, chainID, now, tx };
      startPoll({
        pollFetch: pollTXHash,
        testFn: testTXHash,
        shouldEqual: txHash,
        args,
        actions,
        txHash,
      });
      cachePoll?.({
        txHash,
        action,
        timeSent: now,
        status: 'unresolved',
        resolvedMsg: tx.successMsg,
        unresolvedMsg: 'Processing',
        successMsg: tx.successMsg,
        errorMsg: tx.errMsg,
        pollData: {
          action,
          interval,
          tries,
        },
        pollArgs: args,
      });
    };
  } else if (action === 'unlockToken') {
    return ({
      daoID,
      chainID,
      tokenAddress,
      userAddress,
      unlockAmount,
      address,
      actions,
    }) => txHash => {
      startPoll({
        pollFetch: pollTokenAllowances,
        testFn: tokenAllowanceTest,
        shouldEqual: unlockAmount,
        args: {
          daoID,
          chainID,
          tokenAddress,
          userAddress: userAddress || address,
          unlockAmount,
        },
        actions,
        txHash,
      });
      if (cachePoll) {
        cachePoll({
          txHash,
          action,
          timeSent: Date.now(),
          status: 'unresolved',
          resolvedMsg: 'Unlocked Token',
          unresolvedMsg: 'Unlocking token',
          successMsg: `Unlocking token for ${daoID} on ${chainID}`,
          errorMsg: `Error unlocking token for ${daoID} on ${chainID}`,
          pollData: {
            action,
            interval,
            tries,
          },
          pollArgs: {
            daoID,
            tokenAddress,
            chainID,
            userAddress: userAddress || address,
            unlockAmount,
          },
        });
      }
    };
  } else if (action === 'approveAllTokens') {
    return ({
      daoID,
      chainID,
      userAddress,
      contractAddress,
      controllerAddress,
      address,
      actions,
    }) => txHash => {
      startPoll({
        pollFetch: pollTokenApproval,
        testFn: tokenApprovedTest,
        shouldEqual: true,
        args: {
          daoID,
          chainID,
          contractAddress,
          userAddress: userAddress || address,
          controllerAddress,
        },
        actions,
        txHash,
      });
      if (cachePoll) {
        cachePoll({
          txHash,
          action,
          timeSent: Date.now(),
          status: 'unresolved',
          resolvedMsg: 'Unlocked Token',
          unresolvedMsg: 'Unlocking token',
          successMsg: `Unlocking token for ${daoID} on ${chainID}`,
          errorMsg: `Error unlocking token for ${daoID} on ${chainID}`,
          pollData: {
            action,
            interval,
            tries,
          },
          pollArgs: {
            daoID,
            contractAddress,
            chainID,
            userAddress: userAddress || address,
            controllerAddress,
          },
        });
      }
    };
  }
};

import { HASH } from '../utils/general';

export const CONTRACTS = {
  CURRENT_MOLOCH: {
    location: 'local',
    abiName: 'MOLOCH_V2',
    contractAddress: '.contextData.daoid',
  },
  SELECTED_MINION_SAFE: {
    location: 'local',
    abiName: 'SAFE_MINION',
    contractAddress: '.values.selectedMinion',
  },
  ERC_20: {
    location: 'local',
    abiName: 'ERC_20',
    contractAddress: '.values.tokenAddress',
  },
};

export const ACTIONS = {
  PROPOSAL: ['closeProposalModal', 'openTxModal'],
  BASIC: ['openTxModal'],
  GENERIC_MODAL: ['closeGenericModal', 'openTxModal'],
};

//  HASH.EMPTY_FIELD with '||' allows the search to turn up
//  falsy without crashing searchFields()

//  buildJSONdetails simply filters any values that are HASH.EMPTY_FIELD
//  any other falsy will get stringified as is.

export const DETAILS = {
  STANDARD_PROPOSAL: {
    title: `.values.title`,
    description: `.values.description || ${HASH.EMPTY_FIELD}`,
    link: `.values.link || ${HASH.EMPTY_FIELD}`,
    proposalType: '.formData.type',
  },
};

export const TX = {
  SUBMIT_PROPOSAL: {
    contract: CONTRACTS.CURRENT_MOLOCH,
    name: 'submitProposal',
    onTxHash: ACTIONS.PROPOSAL,
    poll: 'subgraph',
    display: 'Submit Proposal',
    errMsg: 'Error submitting proposal',
    successMsg: 'Proposal submitted!',
    gatherArgs: [
      '.values.applicant || .contextData.address',
      '.values.sharesRequested || 0',
      '.values.lootRequested || 0',
      '.values.tributeOffered || 0',
      '.values.tributeToken || .contextData.daoOverview.depositToken.tokenAddress',
      '.values.paymentRequested || 0',
      '.values.paymentToken || .contextData.daoOverview.depositToken.tokenAddress',
      { type: 'detailsToJSON', gatherFields: DETAILS.STANDARD_PROPOSAL },
    ],
    createDiscourse: true,
  },
  UNLOCK_TOKEN: {
    contract: CONTRACTS.ERC_20,
    name: 'approve',
    specialPoll: 'unlockToken',
    onTxHash: null,
    display: 'Approve Spend Token',
    errMsg: 'Approve Token Failed',
    successMsg: 'Approved Token!',
  },
};

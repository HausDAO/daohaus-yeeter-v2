import {
  determineProposalStatus,
  determineProposalType,
  titleMaker,
  descriptionMaker,
  linkMaker,
  hashMaker,
  determineUnreadActivityFeed,
} from './proposalUtils';

//  TODO. Can be made a lot more effecient. We are parsing JSON for each of these fields.
//  Would be better if there was a way to parse once since JSON.parse is relatively expensive.
export const proposalResolver = (proposal, fields = {}) => {
  if (fields.status) {
    proposal.status = determineProposalStatus(proposal);
  }
  if (fields.title) {
    proposal.title = titleMaker(proposal);
  }
  if (fields.description) {
    proposal.description = descriptionMaker(proposal);
  }
  if (fields.link) {
    proposal.link = linkMaker(proposal);
  }
  if (fields.hash) {
    proposal.hash = hashMaker(proposal);
  }
  if (fields.proposalType) {
    proposal.proposalType = determineProposalType(proposal);
  }
  if (fields.activityFeed) {
    proposal.activityFeed = determineUnreadActivityFeed(proposal);
  }

  return proposal;
};

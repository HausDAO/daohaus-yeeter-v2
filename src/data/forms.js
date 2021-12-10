import { FIELD } from './fields';
import { TX } from './contractTX';

export const FORM = {
  FUNDING: {
    id: 'FUNDING',
    title: 'Funding Proposal',
    description: 'Proposal for transferring funds to/from the DAO treasury.',
    origin: 'classics',
    type: 'Funding Proposal',
    required: ['title', 'applicant'], // Use name key from proposal type object
    tx: TX.SUBMIT_PROPOSAL,
    fields: [
      [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK],
      [FIELD.APPLICANT, FIELD.PAYMENT_REQUEST],
    ],
    additionalOptions: [
      FIELD.SHARES_REQUEST,
      FIELD.LOOT_REQUEST,
      FIELD.TRIBUTE,
    ],
    customValidations: ['nonDaoApplicant'],
  },
};

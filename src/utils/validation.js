import Web3 from 'web3';

// Error Model {
//   message: String (required)
//   name: String (required)
//   status: String
//   details: String
//

export const TYPE_ERR_MSGS = {
  number: 'Must be a valid number',
  integer: 'Must be a valid integer',
  string: 'Must be a valid string',
  address: 'Must be a valid Ethereum Address',
  urlNoHTTP: 'Must be a URL. Http not needed.',
  greaterThanZero: 'Must be greater than zero.',
  boolean: 'Must be a Booolean value',
  disperseList:
    'Must be a proper list with addresses and token values on each line',
};

export const validate = {
  number(val) {
    return !isNaN(parseFloat(val)) && isFinite(val);
  },
  integer(val) {
    return (
      !isNaN(parseFloat(val)) && isFinite(val) && Number.isInteger(Number(val))
    );
  },
  string(val) {
    return typeof val === 'string';
  },
  address(val) {
    return /^0x[a-fA-F0-9]{40}$/.test(val);
  },
  urlNoHTTP(val) {
    return !val.includes('http') && val.includes('.');
  },
  greaterThanZero(val) {
    return !isNaN(parseFloat(val)) && isFinite(val) && parseFloat(val) > 0;
  },
  boolean(val) {
    return val === 'true' || val === 'false' || val === true || val === false;
  },
  bytes32(val) {
    return val;
  },
  hex(val) {
    return Web3.utils.isHexStrict(val);
  },
  disperseList(val) {
    return val
      ?.split(/\r?\n/)
      .reduce(
        (acc, item) =>
          acc &&
          item.match(/0x[a-fA-F0-9]{40}/)?.[0] &&
          Number(
            item
              ?.replace(/0x[a-fA-F0-9]{40}/, '')
              .match(/(?=\.\d|\d)(?:\d+)?(?:\.?\d*)(?:[eE][+-]?\d+)?/)?.[0],
          ),
        true,
      );
  },
  jsonStringObject(val) {
    try {
      const obj = JSON.parse(val);
      return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
    } catch (e) {
      return false;
    }
  },
};

export const customValidations = {
  nonDaoApplicant({ appState, values }) {
    const { apiData } = appState;
    const { applicant } = values;

    // TODO: api data removed - now needs to make an api call
    if (apiData?.[applicant] || apiData?.[applicant?.toLowerCase()]) {
      return { name: 'applicant', message: 'Applicant cannot be another DAO.' };
    }
    return false;
  },
};

export const collectTypeValidations = valString => {
  const valFn = validate[valString];
  const valMsg = TYPE_ERR_MSGS[valString];
  if (!valFn || !valMsg) {
    console.log(`valFn`, valFn);
    console.log(`valMsg`, valMsg);
    throw new Error(
      `validation.js => collectTypeValidations(): type validation is not valid. It may not match the registry of existing val callbacks or errMsgs`,
    );
  }
  return val => (valFn(val) || val === '' ? true : valMsg);
};

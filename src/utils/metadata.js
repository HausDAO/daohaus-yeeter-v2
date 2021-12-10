const metadataApiUrl = 'https://data.daohaus.club';
const apiMetadataUrl = 'https://daohaus-metadata.s3.amazonaws.com/daoMeta.json';

export const fetchMetaData = async endpoint => {
  const url = `${metadataApiUrl}/dao/${endpoint}`;

  try {
    const response = await fetch(url);
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const getApiMetadata = async () => {
  try {
    const response = await fetch(apiMetadataUrl);
    return response.json();
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchApiVaultData = async (network, minions) => {
  try {
    const response = await fetch(`${metadataApiUrl}/dao/vaults`, {
      method: 'POST',
      body: JSON.stringify({ network, minions }),
    });

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const putRefreshApiVault = async args => {
  try {
    const body = { ...args };
    const response = await fetch(`${metadataApiUrl}/dao/refresh-vault`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    console.log('response', response);

    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const themeImagePath = imageValue => {
  if (
    !imageValue ||
    imageValue.slice(0, 1) === '/' ||
    imageValue.slice(0, 4) === 'http'
  ) {
    return imageValue;
  }

  if (imageValue.slice(0, 2) === 'Qm') {
    return `https://daohaus.mypinata.cloud/ipfs/${imageValue}`;
  }
};

export const getCustomProposalTerm = (customTerms, proposalTerm) => {
  if (
    customTerms?.proposal &&
    customTerms?.proposal !== 'Proposal' &&
    proposalTerm
  ) {
    return proposalTerm.replace('Proposal', customTerms.proposal);
  }
  if (proposalTerm) {
    return proposalTerm;
  }
  return 'Proposal';
};

export const boostPost = async (endpoint, data) => {
  const url = `${metadataApiUrl}/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Haus-Key': process.env.REACT_APP_HAUS_KEY,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const ipfsPrePost = async (endpoint, data) => {
  const url = `${metadataApiUrl}/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Haus-Key': process.env.REACT_APP_HAUS_KEY,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const ipfsPost = async (creds, file) => {
  const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        pinata_api_key: creds.pinata_api_key,
        pinata_secret_api_key: creds.pinata_api_secret,
      },
      body: file,
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const ipfsJsonPin = async (creds, obj) => {
  const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        pinata_api_key: creds.pinata_api_key,
        pinata_secret_api_key: creds.pinata_api_secret,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const post = async (endpoint, data) => {
  const url = `${metadataApiUrl}/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Haus-Key': process.env.REACT_APP_HAUS_KEY,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const put = async (endpoint, data) => {
  const url = `${metadataApiUrl}/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Haus-Key': process.env.REACT_APP_HAUS_KEY,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const getDateTime = async () => {
  try {
    const response = await fetch('https://data.daohaus.club/dao/get-utc');
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

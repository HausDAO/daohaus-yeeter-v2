import { utils as Web3Utils } from 'web3';

export const getApiGnosis = async (networkName, endpoint) => {
  const apiGnosisUrl = `https://safe-transaction.${networkName}.gnosis.io/api/v1/${endpoint}`;
  try {
    const response = await fetch(apiGnosisUrl);
    if (response.status >= 400) {
      throw new Error(
        `Failed to fetch Gnosis Safe contract wallet - ${response.statusText}`,
      );
    }
    return response.json();
  } catch (err) {
    console.error(err);
    // throw new Error(err);
  }
};

export const fetchSafeDetails = async (networkName, vault) => {
  try {
    return await getApiGnosis(
      networkName,
      `safes/${Web3Utils.toChecksumAddress(vault.safeAddress)}`,
    );
  } catch (error) {
    console.error(error);
    // throw new Error(error);
  }
};

export const postApiGnosis = async (
  networkName,
  endpoint,
  data,
  getJSONResponse = true,
) => {
  const network = networkName === 'matic' ? 'polygon' : networkName;
  const url = `https://safe-transaction.${network}.gnosis.io/api/v1/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status === 400) {
      throw new Error('Malformed Data (404 error)');
    }
    if (response.status === 422) {
      throw new Error('Account is not a valid delegate');
    }
    return {
      statusCode: response.status,
      data: getJSONResponse && (await response.json()),
    };
  } catch (err) {
    throw new Error(err);
  }
};

export const postGnosisRelayApi = async (networkName, endpoint, data) => {
  const relayApiUrl = `https://safe-relay.${networkName}.gnosis.io/api/v2/${endpoint}`;
  try {
    const response = await fetch(relayApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const payload = await response.json();
    if (payload.exception || payload.detail) {
      throw new Error(
        'Error while trying to estimate gas:',
        payload.exception || payload.detail,
      );
    }
    return {
      statusCode: response.status,
      data: payload,
    };
  } catch (err) {
    throw new Error(err);
  }
};

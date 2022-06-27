import snapshot from '@snapshot-labs/snapshot.js';

import { fetchMetaData } from './metadata';
import { getSnaphotSpace } from './theGraph';

export const fetchSnapshotUserProfile = async (daoid, address) => {
  const [data] = await fetchMetaData(daoid);
  const spaceId = data.boosts?.SNAPSHOT?.metadata?.space;
  if (spaceId) {
    const { space } = await getSnaphotSpace(spaceId);
    const scores = await snapshot.utils.getScores(
      space.id,
      space.strategies,
      space.network,
      [address],
    );

    return {
      score: Object.values(scores[0])[0],
      spaceId,
    };
  }
};

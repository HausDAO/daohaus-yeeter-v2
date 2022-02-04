import React, { useEffect, useMemo, useState } from 'react';

import StaticAvatar from './staticAvatar';
import { handleGetENS } from '../utils/ens';

const AddressAvatar = React.memo(
  ({ addr, hideCopy, hideEtherscanLink, fontSize }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
      const tryENS = async () => {
        const result = await handleGetENS(addr);
        if (result) {
          setProfile({ name: result });
        }
      };

      if (!profile) {
        tryENS();
      }
    }, [profile, addr]);

    const avatarImage = useMemo(() => {
      if (profile?.image?.length) {
        return `https://ipfs.infura.io/ipfs/${profile?.image[0].contentUrl['/']}`;
      }
      return null;
    }, [profile, addr]);

    return (
      <StaticAvatar
        address={addr}
        avatarImg={avatarImage}
        name={profile?.name}
        hideCopy={hideCopy}
        hideEtherscanLink={hideEtherscanLink}
        fontSize={fontSize}
      />
    );
  },
);

export default AddressAvatar;

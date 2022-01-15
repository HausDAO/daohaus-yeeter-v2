import React from 'react';
import { Button } from '@chakra-ui/react';

import { useWallet } from '@raidguild/quiver';
import { useOverlay } from '../contexts/OverlayContext';
import AddressAvatar from './addressAvatar';

export const Web3SignIn = ({ isDao }) => {
  const { connectWallet, address } = useWallet();
  const { setDaoAccountModal, setHubAccountModal } = useOverlay();

  const toggleAccountModal = () => {
    if (!isDao) {
      setHubAccountModal(prevState => !prevState);
    } else {
      setDaoAccountModal(prevState => !prevState);
    }
  };

  return (
    <>
      {address ? (
        <Button variant='outline' onClick={toggleAccountModal}>
          <AddressAvatar hideCopy addr={address} key={address} />
        </Button>
      ) : (
        <Button variant='outline' onClick={connectWallet}>
          Connect Wallet
        </Button>
      )}
    </>
  );
};

export default Web3SignIn;

import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';

import { Spinner } from '@chakra-ui/spinner';
import { useDao } from '../contexts/DaoContext';
import CopyButton from '../components/copyButton';
import { supportedChains } from '../utils/chain';

const Yeet = () => {
  const { currentProject } = useDao();

  return (
    <Box p={10}>
      {!currentProject && <Spinner />}
      {currentProject && (
        <>
          <Flex wrap='wrap' justify='center'>
            <Box
              fontSize='12vh'
              inlineSize='100%'
              overflowWrap='break-word'
              textAlign='center'
            >
              {currentProject.yeeter.shamanAddress}
            </Box>
            <CopyButton
              text={currentProject.yeeter.shamanAddress}
              iconProps={{ height: '100px', width: '100px' }}
            />
          </Flex>
          <Text textAlign='center' mt={10} fontSize='6xl'>
            Send {supportedChains[currentProject.networkID].nativeCurrency}
          </Text>
          <Text textAlign='center'>Need some instructions here</Text>
        </>
      )}
    </Box>
  );
};

export default Yeet;

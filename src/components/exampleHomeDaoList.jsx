import React, { useEffect, useState } from 'react';
import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';
import { MdCheckCircle } from 'react-icons/md';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { exampleCrossChainQuery } from '../utils/theGraph';

import { supportedChains } from '../utils/chain';
import { getApiMetadata } from '../utils/metadata';
import { EXAMPLE_MEMBERSHIPS } from '../graphQL/example-queries';

const numOfSupportedChains = Object.keys(supportedChains).length;

const ExampleHome = () => {
  const { address } = useInjectedProvider();
  const [userDaosExample, setUserDaosExample] = useState([]);

  useEffect(() => {
    const exampleFetch = () => {
      exampleCrossChainQuery({
        query: EXAMPLE_MEMBERSHIPS,
        supportedChains,
        endpointType: 'subgraph_url',
        apiFetcher: getApiMetadata,
        reactSetter: setUserDaosExample,
        variables: {
          memberAddress: address,
        },
      });
    };

    if (address) {
      setUserDaosExample([]);
      exampleFetch();
    }
  }, [address]);

  return (
    <Box p={10}>
      {!address && <Text>Connect your wallet</Text>}
      {address && userDaosExample.length !== numOfSupportedChains ? (
        <Spinner />
      ) : (
        <>
          <Text fontSize='xl' mb={5}>
            DAOs for connected address
          </Text>
          <List spacing={3}>
            {userDaosExample.map(network => {
              return (
                <ListItem key={network.name}>
                  <ListIcon as={MdCheckCircle} color='secondary.500' />
                  {network.name}: {network.data.length}
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default ExampleHome;

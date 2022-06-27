import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { Button, Flex, Link, Stack } from '@chakra-ui/react';

import SnapshotCard from './snapshotCard';
import TextBox from './textBox';

const SnapshotProposals = ({ snapshots }) => {
  return (
    <Flex as={Stack} direction='column' spacing={4} w='100%'>
      {Object.keys(snapshots).length > 0 ? (
        <Flex direction='column'>
          {Object.values(snapshots).map(snapshot => (
            <SnapshotCard
              key={snapshot.id}
              snapshotId={snapshot.od}
              snapshot={snapshot}
            />
          ))}
          <Flex mt={6} justifyContent='center'>
            <Button
              as={Link}
              fontWeight='bold'
              isExternal
              href={`https://app.daohaus.club/dao/${'0x64'}/0x86c8e7332e6f0431971283f21cec296d6fae48b8/boost/snapshot`}
              rightIcon={<AiOutlineDown />}
              variant='outline'
              size='sm'
              width='12rem'
              mt={['4', '4', '0']}
            >
              Show More
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Flex mt='100px' w='100%' justify='center'>
          <TextBox variant='value' size='lg'>
            No Active Proposals
          </TextBox>
        </Flex>
      )}
    </Flex>
  );
};

export default SnapshotProposals;

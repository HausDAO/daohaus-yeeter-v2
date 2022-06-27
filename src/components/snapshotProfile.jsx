import React from 'react';
import { Box, Flex, Tooltip } from '@chakra-ui/react';

const ToolTipLabel = ({ spaceId }) => (
  <Box fontFamily='heading' color='white'>
    {`Space ID: ${spaceId}`}
  </Box>
);

const SnapshotProfile = ({ spaceId, votingPower }) => {
  return (
    <Tooltip
      hasArrow
      label={<ToolTipLabel spaceId={spaceId} />}
      bg='secondary.500'
      placement='left-start'
      mr={6}
    >
      <Flex
        align='center'
        mr={5}
        background='secondary.500'
        p='5px 12px'
        borderRadius='20px'
      >
        <Box fontSize='md' as='i' fontWeight={600}>
          Your Snapshot Voting Power: {votingPower}
        </Box>
      </Flex>
    </Tooltip>
  );
};

export default SnapshotProfile;

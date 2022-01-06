import React from 'react';
import { Box, Flex, List, Text } from '@chakra-ui/layout';
import AddressAvatar from './addressAvatar';
import DaohausLink from './daohausLink';

const proposalCard = (proposal, project) => {
  return (
    <Flex
      key={proposal.id}
      direction='column'
      align='flex-start'
      justify='flex-start'
      my={5}
    >
      <DaohausLink linkText={proposal.title} project={project} />
      <Flex justify='space-between' w='100%' mt={3}>
        <Box>
          <AddressAvatar addr={proposal.createdBy} hideCopy />
          <Box fontSize='xs' color='gray.500'>
            Submitted By
          </Box>
        </Box>
        <Box>
          <Box>{proposal.status}</Box>
          <Box fontSize='xs' color='gray.500'>
            Currently
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

const ProjectProposals = ({ project }) => {
  const remainingCount = project.proposals.length - 3;
  return (
    <Box backgroundColor='primary.500' p={5}>
      <Text fontSize='xl' textTransform='uppercase'>
        DAO Activity
      </Text>
      <List>
        {project.proposals.map(proposal => {
          return proposalCard(proposal, project);
        })}
      </List>
      {remainingCount > 0 && (
        <Flex>
          <Text color='secondary.500' mr={2}>
            {remainingCount} more
          </Text>
          <DaohausLink linkText='Visit the DAO' project={project} />
        </Flex>
      )}
    </Box>
  );
};

export default ProjectProposals;

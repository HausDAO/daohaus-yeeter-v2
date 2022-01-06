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
      mb={5}
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

const PROPOSAL_DISPLAY_COUNT = 3;

const ProjectProposals = ({ project }) => {
  const remainingCount = project.proposals.length - PROPOSAL_DISPLAY_COUNT;

  return (
    <Box>
      <Text fontSize='lg' textTransform='uppercase' mb={1}>
        DAO Activity
      </Text>
      <List>
        {project.proposals.slice(0, PROPOSAL_DISPLAY_COUNT).map(proposal => {
          return proposalCard(proposal, project);
        })}
      </List>
      {remainingCount > 0 && (
        <DaohausLink
          linkText={`View ${remainingCount} more on DAOHaus`}
          project={project}
        />
      )}
    </Box>
  );
};

export default ProjectProposals;

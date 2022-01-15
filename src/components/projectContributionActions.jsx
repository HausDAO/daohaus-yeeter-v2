import React, { useMemo } from 'react';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';

import { useWallet } from '@raidguild/quiver';
import { useAppModal } from '../hooks/useModals';
import ProjectDetailsNotice from './projectDetailsNotice';
import DaohausLink from './daohausLink';
import Contribute from './Contribute';
import { yeetStatus } from '../utils/projects';

const fundedNotice = project => {
  return (
    <Flex
      fontSize='md'
      fontFamily='heading'
      align='flex-start'
      direction='column'
      mb={3}
      justify='center'
    >
      <Text mb={3}>Visit the DAO to keep up with the project details:</Text>
      <Flex direction='row' justify='space-between'>
        <DaohausLink linkText='Visit the DAO' project={project} />
      </Flex>
    </Flex>
  );
};

const failedNotice = (project, address) => {
  return (
    <Flex
      fontSize='md'
      fontFamily='heading'
      align='flex-start'
      direction='column'
      mb={3}
      justify='center'
    >
      <Text mb={3}>
        You can rage quit and withdraw your funds or visit the DAO:
      </Text>
      <Flex direction='row' justify='space-between'>
        <DaohausLink
          linkText='Visit the DAO'
          project={project}
          route={address && `/profile/${address}`}
        />
      </Flex>
    </Flex>
  );
};

const ProjectContributionActions = ({ project, contributions }) => {
  const { address } = useWallet();
  const { genericModal } = useAppModal();
  const projectStatus = useMemo(() => {
    if (project) {
      return yeetStatus(project);
    }
    return null;
  }, [project]);

  const openContribute = () =>
    genericModal({
      title: 'Contribute!',
      body: <Contribute project={project} contributions={contributions} />,
    });

  if (!projectStatus) {
    return null;
  }

  return (
    <Box direction='column'>
      {projectStatus === 'active' && (
        <ProjectDetailsNotice borderOverride>
          <Flex fontSize='lg' align='center' mb={3} justify='center'>
            <Button w='100%' fontWeight='700' onClick={openContribute}>
              Contribute!
            </Button>
          </Flex>
        </ProjectDetailsNotice>
      )}
      {projectStatus === 'failed' && (
        <ProjectDetailsNotice
          title="What's Next"
          toolLabel='What happens to the funds?'
          toolContent='Regardless of reaching a goal, funds for this project are available for the DAO. Visit the DAO to see how they are being used or rage quit and withdraw your funds.'
        >
          {failedNotice(project, address)}
        </ProjectDetailsNotice>
      )}
      {projectStatus === 'funded' && (
        <ProjectDetailsNotice
          title="What's Next"
          toolLabel='What happens to the funds?'
          toolContent='Regardless of reaching a goal, funds for this project are available for the DAO. Visit the DAO to see how they are being used or rage quit and withdraw your funds.'
        >
          {fundedNotice(project)}
        </ProjectDetailsNotice>
      )}
    </Box>
  );
};

export default ProjectContributionActions;

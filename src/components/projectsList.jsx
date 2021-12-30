import React from 'react';
import { Box, List, ListIcon, ListItem, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { useProjects } from '../contexts/ProjectsContext';

import { supportedChains } from '../utils/chain';

import { projectData } from '../data/temp';
import ProjectCard from './projectCard';
import ProjectListFilters from './projectListFilters';

const numOfSupportedChains = Object.keys(supportedChains).length;

const ProjectsList = () => {
  const { address } = useInjectedProvider();
  const { projects } = useProjects();

  console.log('projects', projects);

  return (
    <Box p={7}>
      {!address && !projects.length ? (
        <Spinner />
      ) : (
        <>
          <Text fontSize='2xl' mb={3}>
            All Projects
          </Text>
          <ProjectListFilters projectCount={projectData?.length} />
          <List spacing={3}>
            {projects.map(project => {
              return <ProjectCard key={project.id} project={project} />;
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default ProjectsList;

import React, { useState, useEffect } from 'react';
import { Box, List, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { useProjects } from '../contexts/ProjectsContext';

import ProjectListCard from './projectListCard';
import ProjectListFilters from './projectListFilters';

const ProjectsList = () => {
  const { address } = useInjectedProvider();
  const { projects } = useProjects();
  const [listProjects, setListProjects] = useState([]);

  useEffect(() => {
    if (projects.length) {
      setListProjects(projects);
    }
  }, [projects]);

  return (
    <Box p={7}>
      {!address && !projects.length ? (
        <Spinner />
      ) : (
        <>
          <Text fontSize='2xl' mb={3}>
            All Projects
          </Text>
          <Box mb={5}>
            <ProjectListFilters
              listProjects={listProjects}
              setListProjects={setListProjects}
            />
          </Box>
          <List spacing={3}>
            {listProjects.map(project => {
              return <ProjectListCard key={project.id} project={project} />;
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default ProjectsList;

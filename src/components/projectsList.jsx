import React, { useState } from 'react';
import { Box, List, Text } from '@chakra-ui/layout';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { useProjects } from '../contexts/ProjectsContext';

import ProjectListCard from './projectListCard';
import ProjectListFilters from './projectListFilters';
import useInterval from '../hooks/useInterval';
import Loading from './loading';

const ProjectsList = () => {
  const { address } = useInjectedProvider();
  const { projects, refetchProjects } = useProjects();
  const [listProjects, setListProjects] = useState([]);

  useInterval(() => {
    refetchProjects();
  }, 30000);

  return (
    <Box p={7}>
      {!address && !projects.length ? (
        // <Spinner />
        <Loading />
      ) : (
        <>
          <Text fontSize='2xl' mb={{ base: 8, md: 3 }}>
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

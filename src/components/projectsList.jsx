import React, { useState, useEffect } from 'react';
import { Box, List, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/spinner';

import { useInjectedProvider } from '../contexts/InjectedProviderContext';
import { useProjects } from '../contexts/ProjectsContext';

import { projectData } from '../data/temp';
import ProjectCard from './projectCard';
import ProjectListFilters from './projectListFilters';

const ProjectsList = () => {
  const { address } = useInjectedProvider();
  const { projects } = useProjects();
  const [listProjects, setListProjects] = useState([]);

  console.log('projects', projects);

  useEffect(() => {
    if (projects.length) {
      setListProjects(projects);
    }
  }, [projects]);

  // TODO: tie in all filter/search stuff

  const searchFilter = e => {
    setListProjects(
      projects.filter(p => p.meta?.name.indexOf(e.target.value) > -1),
    );
  };

  return (
    <Box p={7}>
      {!address && !projects.length ? (
        <Spinner />
      ) : (
        <>
          <Text fontSize='2xl' mb={3}>
            All Projects
          </Text>
          <ProjectListFilters
            projectCount={projectData?.length}
            handleSearchFilter={searchFilter}
          />
          <List spacing={3}>
            {listProjects.map(project => {
              return <ProjectCard key={project.id} project={project} />;
            })}
          </List>
        </>
      )}
    </Box>
  );
};

export default ProjectsList;

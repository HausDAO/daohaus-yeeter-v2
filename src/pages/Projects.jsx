import React from 'react';

import { ProjectsContextProvider } from '../contexts/ProjectsContext';
import ProjectsList from '../components/projectsList';

const Projects = () => {
  return (
    <ProjectsContextProvider>
      <ProjectsList />
    </ProjectsContextProvider>
  );
};

export default Projects;

import React from 'react';

import { ProjectsContextProvider } from '../contexts/ProjectsContext';
import ProjectsList from '../components/projectsList';

const Home = () => {
  return (
    <ProjectsContextProvider>
      <ProjectsList />
    </ProjectsContextProvider>
  );
};

export default Home;

import React, { useContext, createContext, useEffect, useState } from 'react';

import { useSessionStorage } from '../hooks/useSessionStorage';
import { projectsCrossChainQuery } from '../utils/theGraph';
import { supportedChains } from '../utils/chain';
import { getApiMetadata } from '../utils/metadata';
import { hydrateProjectsData, hydrateProjectsDataNew } from '../utils/projects';

const numOfSupportedChains = Object.keys(supportedChains).length;

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useSessionStorage('projects', []);
  const [projectData, setProjectData] = useState([]);

  const hasLoadedProjectData = projects?.length === numOfSupportedChains;

  useEffect(() => {
    const bigQuery = () => {
      projectsCrossChainQuery({
        supportedChains,
        apiFetcher: getApiMetadata,
        reactSetter: setProjectData,
      });
    };
    if (!projectData.length) {
      bigQuery();
    }
  }, [projects, projectData, setProjectData]);

  useEffect(() => {
    if (projectData.length === numOfSupportedChains && !projects.length) {
      console.log('projectData', projectData);
      const newProjects = hydrateProjectsDataNew(projectData);

      console.log('newProjects', newProjects);
      // setProjects(hydrateProjectsData(projectData));
      setProjects(hydrateProjectsDataNew(projectData));
    }
  }, [projects, setProjects, projectData]);

  const refetchProjects = () => {
    setProjects([]);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        hasLoadedProjectData,
        refetchProjects,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export const useProjects = () => {
  const { projects, hasLoadedProjectData, refetchProjects } = useContext(
    ProjectsContext,
  );
  return {
    projects,
    hasLoadedProjectData,
    refetchProjects,
  };
};

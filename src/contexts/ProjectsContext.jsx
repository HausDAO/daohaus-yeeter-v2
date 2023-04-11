import React, { useContext, createContext, useEffect, useState } from 'react';

import { useSessionStorage } from '../hooks/useSessionStorage';
import { projectsCrossChainQuery } from '../utils/theGraph';
import { supportedChains } from '../utils/chain';
import { getApiMetadata } from '../utils/metadata';
import { hydrateProjectsData, projectFundingTokens } from '../utils/projects';

const numOfSupportedChains = Object.keys(supportedChains).length;

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  const [projects, setProjects] = useSessionStorage('projects', []);
  const [fundingTokens, setFundingTokens] = useSessionStorage(
    'projectTokens',
    [],
  );
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
    console.log('projectData', projectData);
    if (!projectData.length) {
      bigQuery();
    }
  }, [projects, projectData, setProjectData]);

  useEffect(() => {
    if (projectData.length === numOfSupportedChains && !projects.length) {
      setProjects(hydrateProjectsData(projectData));
      setFundingTokens(projectFundingTokens(projectData));
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
        fundingTokens,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export const useProjects = () => {
  const {
    projects,
    hasLoadedProjectData,
    refetchProjects,
    fundingTokens,
  } = useContext(ProjectsContext);
  return {
    projects,
    hasLoadedProjectData,
    refetchProjects,
    fundingTokens,
  };
};

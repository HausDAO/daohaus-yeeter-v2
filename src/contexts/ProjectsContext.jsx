import React, { useContext, createContext, useEffect, useState } from 'react';

import { useSessionStorage } from '../hooks/useSessionStorage';
import { projectsCrossChainQuery } from '../utils/theGraph';
import { supportedChains } from '../utils/chain';
import { getApiMetadata } from '../utils/metadata';

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
    const hydrateProjectData = () => {
      console.log('hit hydrate', projectData);
      const all = projectData.reduce((allProjects, network) => {
        const yeeterMap = network.yeeters.reduce((yeets, yeeter) => {
          yeets[yeeter.molochAddress] = yeeter;
          return yeets;
        }, {});

        const networkDaos = network.daos.map(dao => {
          return { ...dao, yeeter: yeeterMap[dao.id] };
        });

        return [...allProjects, ...networkDaos];
      }, []);

      console.log('all', all);
      setProjects(all);
    };

    if (projectData.length === numOfSupportedChains && !projects.length) {
      hydrateProjectData();
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

import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useRef,
} from 'react';

import { useInjectedProvider } from './InjectedProviderContext';
import { useSessionStorage } from '../hooks/useSessionStorage';
// import { HUB_MEMBERSHIPS } from '../graphQL/member-queries';
// import { createPoll } from '../services/pollService';
import { projectsCrossChainQuery } from '../utils/theGraph';
import { supportedChains } from '../utils/chain';
import { getApiMetadata } from '../utils/metadata';
import { PROJECTS_DAOS_QUERY } from '../graphQL/projects';

const numOfSupportedChains = Object.keys(supportedChains).length;

export const ProjectsContext = createContext();

export const ProjectsContextProvider = ({ children }) => {
  const { address } = useInjectedProvider();

  const [apiData, setApiData] = useState(null);
  const [projects, setProjects] = useSessionStorage('projects', []);
  const [daos, setDaos] = useState([]);
  //   const [yeets, setYeets] = useState([]);

  const hasLoadedProjectData = projects?.length === numOfSupportedChains;
  const prevAddress = useRef(null);

  // TODO: with and without address
  // add member daos
  // add shaman queries and mash together for single projects element
  // maybe just a list with network as attr
  // will need a separate yeets query

  //   useEffect(() => {
  //     const bigQuery = () => {
  //       //   const bigQueryOptions = {
  //       //     getSetters: [
  //       //       { getter: 'getProjects', setter: setProjects },
  //       //       {
  //       //         getter: 'getProposals',
  //       //         setter: setDaoProposals,
  //       //       },
  //       //     ],
  //       //   };
  //       projectsCrossChainQuery({
  //         // query: [PROJECTS_DAOS_QUERY],
  //         query: PROJECTS_DAOS_QUERY,

  //         supportedChains,
  //         // endpointType: ['subgraph_url', 'shaman_graph_url'],
  //         endpointType: 'subgraph_url',

  //         // apiFetcher: getApiMetadata,
  //         reactSetter: setDaos,
  //         // setApiData,
  //         // variables: {
  //         //   memberAddress: address,
  //         // },
  //       });
  //     };
  //     if (!projects.length && address && prevAddress.current === null) {
  //       bigQuery();
  //       prevAddress.current = address;
  //     } else if (prevAddress.current !== address && address) {
  //       setProjects([]);
  //       prevAddress.current = null;
  //     }
  //   }, [address, projects, setProjects]);

  useEffect(() => {}, [daos, setDaos]);

  const hasLoadedEntity = entity => {
    entity.length === numOfSupportedChains;
  };

  const refetchProjects = () => {
    prevAddress.current = null;
    setProjects([]);
  };

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        hasLoadedProjectData,
        apiData,
        refetchProjects,
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
    apiData,
    refetchProjects,
  } = useContext(ProjectsContext);
  return {
    projects,
    hasLoadedProjectData,
    apiData,
    refetchProjects,
  };
};

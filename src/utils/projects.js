import { supportedChains } from './chain';
import { displayBalance } from './tokenValue';

const addCurrentBalance = (dao, networkID) => {
  const total = dao.tokenBalances.reduce((sum, balance) => {
    if (
      balance.token.tokenAddress ===
      supportedChains[networkID].wrapper_contract.toLowerCase()
    ) {
      sum += balance.tokenBalance;
    }
    return sum;
  }, 0);

  return displayBalance(
    total,
    dao.tokenBalances.find(
      balance =>
        balance.token.tokenAddress ===
        supportedChains[networkID].wrapper_contract.toLowerCase(),
    )?.decimals || '18',
  );
};

export const hydrateProjectsData = projectData => {
  return projectData
    .reduce((allProjects, network) => {
      const yeeterMap = network.yeeters.reduce((yeets, yeeter) => {
        yeets[yeeter.molochAddress] = yeeter;
        return yeets;
      }, {});

      const networkDaos = network.daos.map(dao => {
        return {
          ...dao,
          yeeter: yeeterMap[dao.id],
          networkID: network.networkID,
          balance: addCurrentBalance(dao, network.networkID),
        };
      });

      return [...allProjects, ...networkDaos];
    }, [])
    .filter(project => project.yeeter);
};

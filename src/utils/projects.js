import { formatDistanceToNow } from 'date-fns';

import { supportedChains } from './chain';
import { pipe } from './general';
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

  const decimals =
    dao.tokenBalances.find(
      balance =>
        balance.token.tokenAddress ===
        supportedChains[networkID].wrapper_contract.toLowerCase(),
    )?.decimals || '18';

  return {
    balance: total,
    displayBalance: displayBalance(total, decimals),
    yeeterTokenDecimals: decimals,
  };
};

const filterInactiveYeeters = yeeters => {
  return yeeters.filter(project => {
    return project.yeeter && project.yeeter.enabled;
  });
};

const combineDaosAndYeeters = projectData => {
  return projectData.reduce((allProjects, network) => {
    const yeeterMap = network.yeeters.reduce((yeets, yeeter) => {
      yeets[yeeter.molochAddress] = yeeter;
      return yeets;
    }, {});

    const networkDaos = network.daos.map(dao => {
      return {
        ...dao,
        yeeter: yeeterMap[dao.id] && {
          ...yeeterMap[dao.id],
          enabled: dao.shamans.find(
            shaman => shaman.shamanAddress === yeeterMap[dao.id].id,
          ).enabled,
        },
        networkID: network.networkID,
        ...addCurrentBalance(dao, network.networkID),
      };
    });

    return [...allProjects, ...networkDaos];
  }, []);
};

export const hydrateProjectsData = projectData => {
  return pipe([combineDaosAndYeeters, filterInactiveYeeters])(projectData);
};

export const projectCompletePercentage = project => {
  return (
    (Number(project.balance) / Number(project.yeeter.yeeterConfig.maxTarget)) *
    100
  );
};

export const yeetStatus = project => {
  // if (projectCompletePercentage(project) >= 100) {
  //   return 'funded';
  // }

  const start = project.yeeter.yeeterConfig.raiseStartTime;
  const end = project.yeeter.yeeterConfig.raiseEndTime;

  const now = new Date().getTime() / 1000;
  if (Number(end) < now) {
    return 'expired';
  }
  if (Number(start) > now) {
    return 'upcoming';
  }
  if (Number(start) < now && Number(end) > now) {
    return 'active';
  }
};

export const yeetingTime = project => {
  const status = yeetStatus(project);
  const timeTarget =
    status === 'upcoming'
      ? project.yeeter.yeeterConfig.raiseStartTime
      : project.yeeter.yeeterConfig.raiseEndTime;

  return {
    time: formatDistanceToNow(new Date(timeTarget * 1000)),
    text: status === 'upcoming' ? 'Until Yeeting' : 'Time Left',
  };
};

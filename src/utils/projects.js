import { formatDistanceToNow } from 'date-fns';

import { supportedChains } from './chain';
import { pipe } from './general';
import { displayBalance } from './tokenValue';

export const addCurrentYeetBalance = (yeeter, dao, networkID) => {
  const decimals =
    dao.tokenBalances.find(
      balance =>
        balance.token.tokenAddress ===
        supportedChains[networkID].wrapper_contract.toLowerCase(),
    )?.decimals || '18';

  if (!yeeter) {
    return {
      balance: 0,
      displayBalance: 0,
      yeeterTokenDecimals: decimals,
    };
  }

  const total = yeeter.yeets.reduce((sum, yeet) => {
    sum += Number(yeet.amount);
    return sum;
  }, 0);

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
        ...addCurrentYeetBalance(yeeterMap[dao.id], dao, network.networkID),
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
  const start = project.yeeter.yeeterConfig.raiseStartTime;
  const end = project.yeeter.yeeterConfig.raiseEndTime;
  const now = new Date().getTime() / 1000;

  // if (projectCompletePercentage(project) >= 100) {
  //   return 'funded';
  // }
  // if (Number(end) < now && projectCompletePercentage(project) < 100) {
  //   return 'failed';
  // }
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

const projectListSearch = term => projects => {
  if (term) {
    return projects.filter(p => p.meta?.name.indexOf(term) > -1);
  }
  return projects;
};

const projectListSort = sort => projects => {
  /// time: sortBy raiseEndDate desc / move anything past now to the end
  /// yours: need to get their memberships and put those first, move anything past to the end
  if (sort === 'time') {
    return projects.sort(
      (a, b) => Number(b.summoningTime) - Number(a.summoningTime),
    );
  }
  if (sort === 'amountDesc') {
    return projects.sort((a, b) => Number(b.balance) - Number(a.balance));
  }
  return projects;
};

const projectListFilter = filter => projects => {
  if (filter === 'all') {
    return projects;
  }

  return projects.filter(project => project.networkID === filter);
};

export const filterAndSortProjects = (projects, args) => {
  return pipe([
    projectListSearch(args.searchTerm),
    projectListSort(args.sort),
    projectListFilter(args.filter),
  ])(projects);
};

export const contributionSharePercentage = (loot, project) => {
  return (
    (Number(loot) / (Number(project.totalLoot) + Number(project.totalShares))) *
    100
  ).toFixed(2);
};

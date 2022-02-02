import { formatDistanceToNow } from 'date-fns';

import { supportedChains } from './chain';
import { pipe } from './general';
import { displayBalance } from './tokenValue';

// TODO: pull from subgraph
export const LOOT_PER_UNIT = 100;

export const lootFromContribution = (contributionTotal, project) => {
  return (
    (contributionTotal / project.yeeter.yeeterConfig.pricePerUnit) *
    LOOT_PER_UNIT
  ).toFixed(0);
};

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
    displayBalance: displayBalance(total, decimals, 2),
    yeeterTokenDecimals: decimals,
  };
};

const combineYeetersAndDaos = projectData => {
  const ret = projectData.reduce((allProjects, network) => {
    const yeeterMap = network.yeeters.reduce((yeets, yeeter) => {
      yeets[yeeter.shamanAddress] = yeeter;

      return yeets;
    }, {});

    const daoMap = network.daos.reduce((daosByShaman, dao) => {
      dao.shamans.forEach(shaman => {
        if (dao.meta && shaman.enabled) {
          const yeeter = yeeterMap[shaman.shamanAddress] && {
            ...yeeterMap[shaman.shamanAddress],
            enabled: true,
          };

          if (yeeter) {
            daosByShaman[shaman.shamanAddress] = {
              ...dao,
              yeeter,
              networkID: network.networkID,
              ...addCurrentYeetBalance(yeeter, dao, network.networkID),
            };
          }
        }
      });

      return daosByShaman;
    }, {});

    return [...allProjects, ...Object.values(daoMap)];
  }, []);

  return ret;
};

const addYeetNumber = projectData => {
  const dupes = projectData.reduce((daos, dao) => {
    if (daos[dao.id]) {
      daos[dao.id].push(dao);
    } else {
      daos[dao.id] = [dao];
    }
    return daos;
  }, {});

  Object.keys(dupes).forEach(daoAddress => {
    if (dupes[daoAddress].length > 1) {
      dupes[daoAddress] = dupes[daoAddress].map((dao, i) => {
        return { ...dao, yeeterNumber: i + 1 };
      });
    }
  });

  return Object.values(dupes).flatMap(d => d);
};

const sortBySummoning = projectData => {
  return projectData.sort(
    (a, b) => Number(b.yeeter.createdAt) - Number(a.yeeter.createdAt),
  );
};

export const hydrateProjectsData = projectData => {
  // return combineYeetersAndDaos(projectData);

  return pipe([combineYeetersAndDaos, addYeetNumber])(projectData);
};

export const projectCompletePercentage = project => {
  return (
    (Number(project.balance) / Number(project.yeeter.yeeterConfig.maxTarget)) *
    100
  );
};

export const totalYeeters = project => {
  if (!project?.yeeter?.yeets) {
    return;
  }
  return [...new Set(project.yeeter.yeets.map(yeet => yeet.contributorAddress))]
    .length;
};

export const yeetStatus = project => {
  const start = project.yeeter.yeeterConfig.raiseStartTime;
  const end = project.yeeter.yeeterConfig.raiseEndTime;
  const now = new Date().getTime() / 1000;

  if (projectCompletePercentage(project) >= 100) {
    return 'funded';
  }
  if (Number(end) < now && projectCompletePercentage(project) < 100) {
    return 'failed';
  }
  if (Number(start) < now && Number(end) > now) {
    return 'active';
  }
  if (Number(end) < now) {
    return 'expired';
  }
  if (Number(start) > now) {
    return 'upcoming';
  }
};

export const softCapTag = project => {
  const sctag = project.meta.tags.filter(tag => {
    return tag.indexOf('sc:') !== -1;
  });
  return sctag.length ? sctag[0].split(':')[1] || null : null;
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
    return projects.filter(
      p => p.meta?.name.toLowerCase().indexOf(term.toLowerCase()) > -1,
    );
  }
  return projects;
};

// const projectListSort = sort => projects => {
const projectListSort = () => projects => {
  // console.log('sort', sort);
  /// time: sortBy raiseEndDate desc / move anything past now to the end
  /// yours: need to get their memberships and put those first, move anything past to the end
  // if (sort === 'time') {
  //   return projects.sort(
  //     (a, b) => Number(b.summoningTime) - Number(a.summoningTime),
  //   );
  // }
  // if (sort === 'amountDesc') {
  //   return projects.sort((a, b) => Number(b.balance) - Number(a.balance));
  // }

  return sortBySummoning(projects);
};

const projectListFilter = filter => projects => {
  if (filter === 'all') {
    return projects;
  }

  if (
    filter === 'active' ||
    filter === 'upcoming' ||
    filter === 'failed' ||
    filter === 'funded'
  ) {
    return projects.filter(p => yeetStatus(p) === filter);
  }
  return projects.filter(p => p.networkID === filter);
};

export const filterAndSortProjects = (projects, args) => {
  return pipe([
    projectListSearch(args.searchTerm),
    projectListSort(args.sort),
    projectListFilter(args.filter),
    projectListFilter(args.statusFilter),
  ])(projects);
};

export const contributionSharePercentage = (loot, project) => {
  return (
    (Number(loot) / (Number(project.totalLoot) + Number(project.totalShares))) *
    100
  ).toFixed(2);
};

export const maxContribution = project => {
  return (
    Number(project.yeeter.yeeterConfig.maxUnits) *
    Number(project.yeeter.yeeterConfig.pricePerUnit)
  );
};

export const userContributionData = (project, userMemberships, yeets) => {
  const networkDaos = userMemberships.find(
    network => network.networkID === project.networkID,
  );
  const currentMembership = networkDaos?.daos.find(dao => {
    return dao.molochAddress === project.id;
  });

  const total = yeets.reduce((sum, yeet) => {
    sum += Number(yeet.amount);
    return sum;
  }, 0);

  return { total, yeets, currentMembership };
};

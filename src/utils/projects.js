import { formatDistanceToNow } from 'date-fns';

import { supportedChains } from './chain';
import { pipe } from './general';
import { displayBalance } from './tokenValue';

// TODO: pull from subgraph
export const LOOT_PER_UNIT = 100;

export const lootFromContribution = (contributionTotal, project) => {
  return (
    (contributionTotal / project.yeeterConfig.pricePerUnit) *
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

const sortByCreatedAt = projects => {
  return projects.sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
};

const hasValidDao = dao => {
  return dao && dao.meta && !dao.meta.hide;
};

const hasEnabledShaman = (shamans, shamanAddress) => {
  return shamans.find(shaman => shaman.shamanAddress === shamanAddress)
    ?.enabled;
};

const filterValidProjects = projectData => {
  return projectData.reduce((allProjects, network) => {
    const filteredProjects = network.yeeters
      .filter(project => {
        return (
          hasValidDao(project.dao) &&
          hasEnabledShaman(project.dao.shamans, project.shamanAddress)
        );
      })
      .map(project => {
        return {
          ...project,
          networkID: network.networkID,
          ...addCurrentYeetBalance(project, project.dao, network.networkID),
        };
      });

    return [...allProjects, ...filteredProjects];
  }, []);
};

const addRaiseWindowCount = projectData => {
  const projectMap = projectData.reduce((projects, project) => {
    if (projects[project.molochAddress]) {
      projects[project.molochAddress].push(project);
    } else {
      projects[project.molochAddress] = [project];
    }
    return projects;
  }, {});

  Object.keys(projectMap).forEach(daoAddress => {
    if (projectMap[daoAddress].length > 1) {
      projectMap[daoAddress] = projectMap[daoAddress].map((dao, i) => {
        return { ...dao, yeeterNumber: i + 1 };
      });
    }
  });

  return Object.values(projectMap).flatMap(d => d);
};

export const hydrateProjectsData = projectData => {
  return pipe([filterValidProjects, addRaiseWindowCount])(projectData);
};

export const projectFundingTokens = projectData => {
  return projectData.reduce((allTokens, network) => {
    return [
      ...allTokens,
      ...network.tokens.map(t => {
        return {
          networkID: network.networkID,
          ...t,
        };
      }),
    ];
  }, []);
};

export const projectCompletePercentage = project => {
  return (
    (Number(project.balance) / Number(project.yeeterConfig.maxTarget)) * 100
  );
};

export const totalYeeters = project => {
  if (!project?.yeets) {
    return;
  }
  return [...new Set(project.yeets.map(yeet => yeet.contributorAddress))]
    .length;
};

export const yeetStatus = project => {
  const start = project.yeeterConfig.raiseStartTime;
  const end = project.yeeterConfig.raiseEndTime;
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
  const sctag = project.dao.meta.tags.filter(tag => {
    return tag.indexOf('sc:') !== -1;
  });
  return sctag.length ? sctag[0].split(':')[1] || null : null;
};

export const yeetingTime = project => {
  const status = yeetStatus(project);
  const timeTarget =
    status === 'upcoming'
      ? project.yeeterConfig.raiseStartTime
      : project.yeeterConfig.raiseEndTime;

  return {
    time: formatDistanceToNow(new Date(timeTarget * 1000)),
    text: status === 'upcoming' ? 'Until Yeeting' : 'Time Left',
  };
};

const projectListSearch = term => projects => {
  if (term) {
    return projects.filter(
      p => p.dao.meta?.name.toLowerCase().indexOf(term.toLowerCase()) > -1,
    );
  }
  return projects;
};

const projectListSort = () => projects => {
  return sortByCreatedAt(projects);
};

const projectListFilter = filter => projects => {
  if (filter === 'all') {
    return projects;
  }

  if (filter === 'active' || filter === 'upcoming') {
    return projects.filter(p => yeetStatus(p) === filter);
  }

  if (filter === 'complete') {
    return projects.filter(
      p => yeetStatus(p) === 'failed' || yeetStatus(p) === 'funded',
    );
  }

  return projects.filter(p => p.networkID === filter);
};

const projectTokenFilter = filter => projects => {
  if (filter === 'all') {
    return projects;
  }
  return projects.filter(p => p.yeeterConfig.token?.id === filter);
};

export const filterAndSortProjects = (projects, args) => {
  return pipe([
    projectListSearch(args.searchTerm),
    projectListSort(args.sort),
    projectListFilter(args.filter),
    projectListFilter(args.statusFilter),
    projectTokenFilter(args.tokenFilter),
  ])(projects);
};

export const contributionSharePercentage = (loot, project) => {
  return (
    (Number(loot) /
      (Number(project.dao.totalLoot) + Number(project.dao.totalShares))) *
    100
  ).toFixed(2);
};

export const maxContribution = project => {
  return (
    Number(project.yeeterConfig.maxUnits) *
    Number(project.yeeterConfig.pricePerUnit)
  );
};

export const userContributionData = (project, userMemberships, yeets) => {
  const networkDaos = userMemberships.find(
    network => network.networkID === project.networkID,
  );
  const currentMembership = networkDaos?.daos.find(dao => {
    return dao.molochAddress === project.dao.id;
  });

  const total = yeets.reduce((sum, yeet) => {
    sum += Number(yeet.amount);
    return sum;
  }, 0);

  return { total, yeets, currentMembership };
};

export const projectListFilterContent = () => {
  const validNetworks = Object.keys(supportedChains).map(networkId => {
    return { name: supportedChains[networkId].name, value: networkId };
  });
  validNetworks.push({
    name: 'All',
    value: 'all',
  });
  return validNetworks;
};

export const projectListTokenFilter = (networkID, fundingTokens) => {
  const tokenListBase = {
    name: 'All',
    value: 'all',
  };
  if (networkID === 'all') {
    return [tokenListBase];
  }
  const filteredTokens = fundingTokens
    .filter(token => token.networkID === networkID)
    .map(token => {
      return {
        name: token.symbol,
        value: token.id,
      };
    });
  return [tokenListBase, ...filteredTokens];
};

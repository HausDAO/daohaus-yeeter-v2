import React, { useState, useMemo, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';

import { useProjects } from '../contexts/ProjectsContext';
// import ListSort from './listSort';
import ListFilter from './listFilter';
import { chainByID } from '../utils/chain';
import { debounce } from '../utils/general';
import {
  filterAndSortProjects,
  projectListFilterContent,
  projectListTokenFilter,
} from '../utils/projects';

export const sortOptions = [
  {
    name: 'Time Remaining',
    value: 'time',
  },
  {
    name: 'Your Contributed Projects',
    value: 'yours',
  },
  {
    name: 'Highest Amount',
    value: 'amountDesc',
  },
];

export const statusFilterOptions = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Active',
    value: 'active',
  },
  {
    name: 'Upcoming',
    value: 'upcoming',
  },
  {
    name: 'Complete',
    value: 'complete',
  },
];

const ProjectListFilters = ({ listProjects, setListProjects }) => {
  const { projects, fundingTokens } = useProjects();

  const [sort] = useState(sortOptions[0]);
  const [statusFilter, setStatusFilter] = useState(statusFilterOptions[0]);
  const [filter, setFilter] = useState(projectListFilterContent()[0]);
  const [tokenFilter, setTokenFilter] = useState(
    projectListTokenFilter(filter.value, fundingTokens)[0],
  );
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    if ((sort, filter, statusFilter, tokenFilter, projects.length > 0)) {
      setListProjects(
        filterAndSortProjects(projects, {
          sort: sort.value,
          filter: filter.value,
          statusFilter: statusFilter.value,
          searchTerm,
          tokenFilter: tokenFilter.value,
        }),
      );
    }
  }, [sort, filter, statusFilter, tokenFilter, searchTerm, projects]);

  useEffect(() => {
    setTokenFilter(projectListTokenFilter(filter.value, fundingTokens)[0]);
  }, [filter]);

  const handleSearchFilter = e => {
    setSearchTerm(e.target.value);
  };

  const hydratedFundingTokens = useMemo(() => {
    if (filter?.value !== 'all') {
      const chainConfig = chainByID(filter.value);
      return fundingTokens.map(t => {
        return {
          ...t,
          symbol:
            t.symbol.toUpperCase() ===
            `w${chainConfig.nativeCurrency}`.toUpperCase()
              ? chainConfig.nativeCurrency
              : t.symbol,
        };
      });
    }
  }, [filter, fundingTokens]);

  const debouncedHandleChange = useMemo(
    () => debounce(handleSearchFilter, 400),
    [],
  );

  return (
    <Flex alignContent='space-between' align='center' wrap='wrap'>
      <Text mb={{ base: 5, md: 0 }} mr={5}>
        {listProjects.length} Projects
      </Text>
      <Input
        type='search'
        className='input'
        placeholder='Search by name'
        fontSize='14px'
        lineHeight='21px'
        maxW={300}
        mr={5}
        onChange={debouncedHandleChange}
      />
      <Box mt={{ base: 5, md: 0 }} mr={5}>
        {/* <ListSort sort={sort} setSort={setSort} options={sortOptions} /> */}
        <ListFilter
          filter={statusFilter}
          setFilter={setStatusFilter}
          options={statusFilterOptions}
          labelText='Status'
        />
      </Box>
      <Box mt={{ base: 5, md: 0 }} mr={5}>
        <ListFilter
          filter={filter}
          setFilter={setFilter}
          options={projectListFilterContent()}
          labelText='Network'
        />
      </Box>
      {filter.value !== 'all' && (
        <Box mt={{ base: 5, md: 0 }} mr={5}>
          <ListFilter
            filter={tokenFilter}
            setFilter={setTokenFilter}
            options={projectListTokenFilter(
              filter.value,
              hydratedFundingTokens,
            )}
            labelText='Funding Token'
          />
        </Box>
      )}
    </Flex>
  );
};

export default ProjectListFilters;

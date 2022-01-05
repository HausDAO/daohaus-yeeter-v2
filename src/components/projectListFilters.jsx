import React, { useState, useMemo, useEffect } from 'react';
import { Box, Text, Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';

import { useProjects } from '../contexts/ProjectsContext';
import ListSort from './listSort';
import ListFilter from './listFilter';
import { debounce } from '../utils/general';
import { filterAndSortProjects } from '../utils/projects';

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

export const filterOptions = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Rinkeby',
    value: '0x4',
  },
  {
    name: 'Kovan',
    value: '0x2a',
  },
];

const ProjectListFilters = ({ listProjects, setListProjects }) => {
  const { projects } = useProjects();

  const [sort, setSort] = useState(sortOptions[0].value);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    console.log(sort, filter, searchTerm);

    if ((sort, filter)) {
      setListProjects(
        filterAndSortProjects(projects, {
          sort: sort.value,
          filter: filter.value,
          searchTerm,
        }),
      );
    }
  }, [sort, filter, searchTerm]);

  const handleSearchFilter = e => {
    setSearchTerm(e.target.value);
  };

  const debouncedHandleChange = useMemo(
    () => debounce(handleSearchFilter, 400),
    [],
  );

  return (
    <Flex alignContent='space-between' align='center' wrap='wrap'>
      <Text mr={5}>{listProjects.length} Projects</Text>
      <Input
        type='search'
        className='input'
        placeholder='Search By Name'
        maxW={300}
        mr={5}
        onChange={debouncedHandleChange}
      />
      <Box mr={5}>
        <ListSort sort={sort} setSort={setSort} options={sortOptions} />
      </Box>
      <ListFilter
        filter={filter}
        setFilter={setFilter}
        options={filterOptions}
        labelText='Network'
      />
    </Flex>
  );
};

export default ProjectListFilters;

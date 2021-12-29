import React, { useState } from 'react';
import { Box, Text, Flex } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import ListSort from './listSort';
import ListFilter from './listFilter';

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
    name: 'Rinkeby',
    value: 'rinkeby',
  },
  {
    name: 'Mainnet',
    value: 'mainnet',
  },
];

const ProjectListFilters = ({ projectCount }) => {
  const [sort, setSort] = useState('time');
  const [filter, setFilter] = useState('rinkeby');

  const handleChange = e => {
    console.log('e', e);
  };
  return (
    <Flex alignContent='space-between'>
      <Text>{projectCount} Projects</Text>
      <Input
        type='search'
        className='input'
        placeholder='Search By Name'
        maxW={300}
        onChange={e => handleChange(e)}
      />
      <ListSort sort={sort} setSort={setSort} options={sortOptions} />
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

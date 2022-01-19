import React from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import { displayBalance } from '../utils/tokenValue';
import { supportedChains } from '../utils/chain';
import {
  lootFromContribution,
  LOOT_PER_UNIT,
  maxContribution,
} from '../utils/projects';

const ContributionExample = ({ project, fontSize = 'sm' }) => {
  return (
    <Flex
      wrap='wrap'
      justify='space-between'
      textTransform='uppercase'
      fontSize={fontSize}
      mt={5}
    >
      <Box>
        <Box mb={3}>If you contribute</Box>
        <Box mb={3}>
          {displayBalance(
            project.yeeter.yeeterConfig.pricePerUnit,
            project.yeeterTokenDecimals,
            2,
          )}{' '}
          {supportedChains[project.networkID].nativeCurrency} (min)
        </Box>
        <Box>
          {displayBalance(
            maxContribution(project),
            project.yeeterTokenDecimals,
            2,
          )}{' '}
          {supportedChains[project.networkID].nativeCurrency} (max)
        </Box>
      </Box>
      <Box>
        <Box mb={3}>You receive</Box>
        <Box mb={3}>{LOOT_PER_UNIT} Loot</Box>
        <Box>
          {lootFromContribution(maxContribution(project), project)} Loot
        </Box>
      </Box>
      <Box />
    </Flex>
  );
};

export default ContributionExample;

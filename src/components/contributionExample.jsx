import React, { useMemo, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/slider';
import { displayBalance } from '../utils/tokenValue';
import { supportedChains } from '../utils/chain';
import { lootFromContribution, maxContribution } from '../utils/projects';

const ContributionExample = ({
  project,
  fontSize = 'sm',
  boxWidth = '100%',
  setContributionAmount,
}) => {
  const [sliderValue, setSliderValue] = useState(null);

  const sliderConfig = useMemo(() => {
    if (project) {
      setSliderValue(
        Number(
          displayBalance(
            project.yeeterConfig.pricePerUnit,
            project.yeeterTokenDecimals,
            2,
          ),
        ),
      );

      return {
        min: Number(
          displayBalance(
            project.yeeterConfig.pricePerUnit,
            project.yeeterTokenDecimals,
            2,
          ),
        ),
        max: Number(
          displayBalance(
            maxContribution(project),
            project.yeeterTokenDecimals,
            2,
          ),
        ),
      };
    }
    return null;
  }, []);

  const handleSlide = val => {
    setSliderValue(val);
    setContributionAmount(val);
  };

  return (
    <Flex
      wrap='wrap'
      justify='space-between'
      textTransform='uppercase'
      fontSize={fontSize}
      mt={5}
      width={boxWidth}
    >
      <Box>
        <Box mb={3}>If you contribute</Box>
        <Box mb={3} fontWeight='700'>
          {sliderValue} {supportedChains[project.networkID].nativeCurrency}{' '}
        </Box>
      </Box>
      <Box mb={3}>
        <Box mb={3}>You receive</Box>
        <Box fontWeight='700'>
          {lootFromContribution(sliderValue * 10 ** 18, project)} Loot
        </Box>
      </Box>

      {sliderConfig && sliderValue && (
        <Slider
          defaultValue={sliderConfig.min}
          min={sliderConfig.min}
          max={sliderConfig.max}
          step={sliderConfig.min}
          onChange={val => handleSlide(val)}
          mb={4}
        >
          <SliderMark
            value={sliderConfig.min}
            textAlign='left'
            color='white'
            mt='4'
            w='12'
          >
            Min {sliderConfig.min}
          </SliderMark>
          <SliderMark
            value={sliderConfig.max}
            textAlign='right'
            color='white'
            ml='-12'
            mt='4'
            w='12'
          >
            Max {sliderConfig.max}
          </SliderMark>
          <SliderTrack bg='primary.300'>
            <Box position='relative' right={10} />
            <SliderFilledTrack bg='secondary.400' />
          </SliderTrack>
          <SliderThumb boxSize={4} />
        </Slider>
      )}
    </Flex>
  );
};

export default ContributionExample;

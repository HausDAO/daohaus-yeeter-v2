import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import { useParams } from 'react-router';
import useInterval from '../hooks/useInterval';
import { yeetingTime } from '../utils/projects';
import RefreshButton from './refreshButton';

const YeetCountdown = ({ project }) => {
  const { daoid } = useParams();
  const [countdownTime, setCountdownTime] = useState(null);

  useEffect(() => {
    if (project) {
      setCountdownTime(yeetingTime(project));
    }
  }, [project]);

  useInterval(() => {
    setCountdownTime(yeetingTime(project));
  }, 10000);

  if (!countdownTime) {
    return null;
  }

  return (
    <Flex justify='space-between' align='center'>
      <Flex direction='column' fontFamily='mono'>
        <Box fontSize={{ base: 'lg', md: '2xl' }}>{countdownTime.time}</Box>
        <Box fontSize={{ base: 'sm', md: 'xs' }} color='gray.500'>
          {countdownTime.text}
        </Box>
      </Flex>
      {daoid && <RefreshButton />}
    </Flex>
  );
};

export default YeetCountdown;

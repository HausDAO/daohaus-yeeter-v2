import React, { useEffect, useState } from 'react';
import { Box, Flex } from '@chakra-ui/layout';

import useInterval from '../hooks/useInterval';
import { yeetingTime } from '../utils/projects';

const YeetCountdown = ({ project }) => {
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
    <Flex direction='column' fontFamily='mono'>
      <Box fontSize='2xl'>{countdownTime.time}</Box>
      <Box fontSize='xs' color='gray.500'>
        {countdownTime.text}
      </Box>
    </Flex>
  );
};

export default YeetCountdown;

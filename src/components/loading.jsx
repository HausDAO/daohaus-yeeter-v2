import React from 'react';
import { Flex, Box, Stack, Image } from '@chakra-ui/react';

import TextBox from './textBox';
import yeetSpinner from '../assets/img/y33t_logo_loading.svg';

const Loading = ({ message }) => (
  <Flex w='100%' justify='center' mt='12%'>
    <Stack spacing='20%' align='center'>
      {message && (
        <>
          <Box d={['none', 'none', 'block', 'block']}>
            <TextBox size='lg'>{message}</TextBox>
          </Box>
          <Box
            d={['block', 'block', 'none', 'none']}
            maxW='80%'
            m='auto'
            textAlign='center'
          >
            <TextBox>{message}</TextBox>
          </Box>
        </>
      )}
      <Image src={yeetSpinner} w='500px' h='500px' />
    </Stack>
  </Flex>
);

export default Loading;

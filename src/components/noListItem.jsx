import React from 'react';
import { Flex } from '@chakra-ui/react';

import ContentBox from './contentBox';

const NoListItem = ({ children }) => {
  return (
    <ContentBox h='15rem'>
      <Flex w='100%' h='100%' justifyContent='center' alignItems='center'>
        {children}
      </Flex>
    </ContentBox>
  );
};

export default NoListItem;

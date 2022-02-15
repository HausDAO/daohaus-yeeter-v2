import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { Box } from '@chakra-ui/layout';

import QrImage from '../assets/img/qr_svg.svg';

const QrCode = () => {
  return (
    <>
      <Flex
        align='center'
        justify='center'
        direction='column'
        w='100%'
        h='100%'
        mt={10}
      >
        <Image src={QrImage} width='90%' />
        <Box fontSize='4xl' mt={10}>
          Y33T!
        </Box>

        <Box mt={10}>Daohaus Mainnet CCO</Box>
      </Flex>
    </>
  );
};

export default QrCode;

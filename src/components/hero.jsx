import React from 'react';
import { Flex, VStack, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Hero = ({ heroTitle, heroCopy }) => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      p={{ base: 6, md: 12 }}
      backgroundColor='primary.500'
      borderRadius='17px'
    >
      <VStack spacing={10} width='100%'>
        {heroTitle}
        <Text fontSize='xl'>{heroCopy}</Text>
        <RouterLink as={RouterLink} to='/projects'>
          <Button
            paddingX={2}
            paddingY={1}
            width='240px'
            height='50px'
            borderRadius='lg'
            color='black'
            fontSize='2xl'
            lineHeight='20px'
            fontWeight='bold'
            align='center'
            transition='all 0.15s linear'
            textTransform='uppercase'
            _hover={{ color: 'gray.900', backgroundColor: 'secondary.300' }}
          >
            Y33TS
          </Button>
        </RouterLink>
      </VStack>
    </Flex>
  );
};

export default Hero;

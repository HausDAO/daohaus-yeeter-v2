import React from 'react';
import { Flex, Grid, VStack, Text, Button, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import YeetPirate from '../assets/img/yeet-pirate.gif';

const Hero = ({ heroTitle, heroCopy }) => {
  return (
    <Flex
      direction='column'
      alignItems='center'
      justifyContent='center'
      minWidth='100vw'
      paddingBottom={{ base: 6, md: 12 }}
      marginTop={{ base: '-56px', lg: '-56px' }}
      bgGradient='linear(to-r, #38A169 0%,rgba(56, 161, 105, 0.5833) 63.32%, rgba(56, 161, 105, 0) 100%)'
    >
      <Grid
        templateColumns={{ base: 'repeat(1fr)', lg: 'repeat(2, 1fr)' }}
        maxW='6xl'
        alignItems='center'
        paddingX={{ base: 8 }}
      >
        <Flex
          maxW={{ base: '300px', lg: '455px' }}
          h={{ base: '300px', lg: '464px' }}
        >
          <Image
            alt=''
            w='full'
            h='full'
            objectFit='cover'
            objectPosition='center'
            src={YeetPirate}
            ml={{ base: '10%', lg: '25%' }}
          />
        </Flex>
        <VStack
          spacing={8}
          width='100%'
          align={{ base: 'center', lg: 'flex-start' }}
        >
          {heroTitle}
          <Text fontSize='xl' lineHeight='28.88px' color='black'>
            {heroCopy}
          </Text>
          <RouterLink as={RouterLink} to='/projects'>
            <Button
              paddingX={2}
              paddingY={1}
              width='240px'
              height='50px'
              borderRadius='lg'
              color='white'
              bgColor='#0E1235'
              fontSize='xl'
              lineHeight='20px'
              align='center'
              transition='all 0.15s linear'
            >
              View Projects
            </Button>
          </RouterLink>
        </VStack>
      </Grid>
    </Flex>
  );
};

export default Hero;

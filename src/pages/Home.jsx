import React from 'react';

import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Link,
  Icon,
} from '@chakra-ui/react';
import { RiDiscordFill } from 'react-icons/ri';

import Hero from '../components/hero';
import FeatureCard from '../components/featureCard';
import BrandImg from '../assets/img/y33t_logo.svg';
import YeetBoatImg from '../assets/img/yeet-boat.png';

const Home = () => {
  return (
    <Box px={7} marginY={14}>
      <VStack spacing={14}>
        <Hero
          heroTitle={
            <VStack>
              <Heading
                as='h2'
                fontSize={{ base: '32px', lg: '44px' }}
                lineHeight={{ base: '40px', lg: '56px' }}
                fontWeight={700}
                color='interfaceOrange.500'
              >
                Raise Funds and Rally Your Community
              </Heading>
              <Heading
                as='h2'
                fontSize={{ base: '32px', lg: '44px' }}
                lineHeight={{ base: '40px', lg: '56px' }}
                fontWeight={700}
                color='interfaceOrange.500'
              >
                at the Push of a Button
              </Heading>
            </VStack>
          }
          heroCopy={`For those who recognize the power of community, Yeeter is a funding
        mechanism capturing enthusiasm and facilitating cooperation. Unlike
        crowdfunding apps or venture capitalists, we provide tools supporting
        value aligned individuals to pool resources towards a common goal.`}
        />
        <FeatureCard
          contentPosition='left'
          imgSrc={BrandImg}
          content={
            <Flex direction='column' alignItems='flex-start' fontSize='lg'>
              <Text mb={4}>
                When you step beyond the forest and onto the coastline,
                countless frens emerge into view. They have come prepared for
                the journey ahead, yet their packs do not feel burdensome. How
                can you embark together?
              </Text>
              <Text>
                As you look towards the sea, the sun illuminates a vessel, with
                broad planks resting along the edge of the deck, angled gently
                onto the shore. The flag of the green tongue waves in the wind,
                reflecting off the water, as a gathering of giants gesture for
                you to board.
              </Text>
              <Button
                mt={8}
                paddingX={2}
                paddingY={1}
                width='240px'
                height='50px'
                borderRadius='lg'
                color='black'
                bgColor='interfaceOrange.500'
                _hover={{ bgColor: 'interfaceOrange.300' }}
                fontSize='xl'
                lineHeight='20px'
                fontWeight='bold'
                align='center'
                transition='all 0.15s linear'
                textTransform='uppercase'
              >
                Join the Y33T List
              </Button>
            </Flex>
          }
        />
        <FeatureCard
          contentPosition='right'
          title='Easiest Way to Launch a DAO'
          content={
            <VStack spacing={4} align='flex-start' fontSize='lg'>
              <Text>
                Whether a new organization or an initiative within an existing
                DAO, Yeeter is the no-code option for funding your community
                with your contributors.
              </Text>
              <Text>
                With customizable parameters, the Yeeter contract allows you to
                determine the contribution range, start and end times, and
                maximum capitalization.
              </Text>
            </VStack>
          }
        />
        <FeatureCard
          contentPosition='left'
          title='Minority Protections and Exit Options'
          content={
            <VStack spacing={4} align='flex-start' fontSize='lg'>
              <Text>
                By preserving the option to exit, Yeeters&apos; contributions
                are protected and funds are safu.
              </Text>
              <Text>
                As members of the DAO, Yeeters can withdraw their portion of the
                funds at any time by ragequitting. Your organization is
                decentralized from day 1.
              </Text>
            </VStack>
          }
        />
        <FeatureCard
          contentPosition='right'
          title='Community Owned and Operated'
          content={
            <VStack spacing={4} align='flex-start' fontSize='lg'>
              <Text>
                Transparent and open-source, Yeeter is an exciting new
                fundraising primitive funded by the DAOhaus community.
              </Text>
              <Text>
                Intended as a public good and an opportunity to practice
                community driven development, the project was funded by a Yeeter
                campaign and is maintained by DAO contributors.
              </Text>
            </VStack>
          }
        />
        <FeatureCard
          contentPosition='right'
          imgSrc={YeetBoatImg}
          content={
            <VStack spacing={4} align='flex-start' fontSize='lg'>
              <Text>
                With billowing sails and a swift current, excitement outweighs
                any trepidation. May we request that you keep a logbook, as you
                navigate both turbulent and calm waters? Each of our Yeeter
                voyages is shared knowledge of, as yet, undiscovered lands.
              </Text>
              <Link
                href='https://discord.com'
                target='_blank'
                color='secondary.500'
                transition='all 0.15s linear'
                _hover={{
                  textDecoration: 'none',
                  color: 'secondary.400',
                }}
                rel='noreferrer noopener'
                isExternal
              >
                <Icon
                  as={RiDiscordFill}
                  h='30px'
                  w='30px'
                  color='secondary.500'
                  transition='all 0.15s linear'
                  _hover={{
                    textDecoration: 'none',
                    color: 'secondary.400',
                  }}
                />
                <Text as='span' ml={8}>
                  Join the Discord
                </Text>
              </Link>
            </VStack>
          }
        />
      </VStack>
    </Box>
  );
};

export default Home;

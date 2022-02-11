import React, { useContext } from 'react';

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
import { OverlayContext } from '../contexts/OverlayContext';
import Modal from '../modals/modal';
import Hero from '../components/hero';
import FeatureCard from '../components/featureCard';
import ContactForm from '../components/contactForm';

const Home = () => {
  const { setModal, closeModal } = useContext(OverlayContext);

  const openContactForm = () => {
    setModal({
      title: 'Y33T With Us',
      body: <ContactForm closeModal={closeModal} />,
    });
  };

  return (
    <>
      <Box px={7} marginY={14}>
        <VStack spacing={14}>
          <Hero
            heroTitle={
              <VStack>
                <Heading
                  as='h2'
                  fontSize={{ base: '24px', lg: '24px' }}
                  lineHeight={{ base: '38px', lg: '38px' }}
                  fontWeight={700}
                  color='white'
                >
                  Raise Funds and Rally Your Community at the Push of a Button
                </Heading>
              </VStack>
            }
            heroCopy={`For those who recognize the power of community, Yeeter is a funding
        mechanism capturing enthusiasm and facilitating cooperation. Unlike
        crowdfunding apps or venture capitalists, we provide tools supporting
        value aligned individuals to pool resources towards a common goal.`}
          />
          <FeatureCard
            fullWidthCopy
            content={
              <Flex
                direction='column'
                alignItems='center'
                fontSize='lg'
                paddingX={{ base: 0, lg: 16 }}
              >
                <Text mb={4}>
                  When you step beyond the forest and onto the coastline,
                  countless frens emerge into view. They have come prepared for
                  the journey ahead, yet their packs do not feel burdensome. How
                  can you embark together?
                </Text>
                <Text mb={4}>
                  As you look towards the sea, the sun illuminates a vessel,
                  with broad planks resting along the edge of the deck, angled
                  gently onto the shore. The flag of the green tongue waves in
                  the wind, reflecting off the water, as a gathering of giants
                  gesture for you to board.
                </Text>
                <Text>
                  Your crew run to the ship and ready the craft to set sail.
                  When all are aboard, the giants remove the planks and shove
                  the ship into the ocean.
                </Text>
              </Flex>
            }
          />
          <FeatureCard
            contentPosition='left'
            title='Easiest Way to Launch a DAO'
            content={
              <VStack spacing={4} align='flex-start' fontSize='lg'>
                <Text>
                  Whether a new organization or an initiative within an existing
                  DAO, Yeeter is the no-code option for funding your community
                  with your contributors.
                </Text>
                <Text>
                  With customizable parameters, the Yeeter contract allows you
                  to determine the contribution range, start and end times, and
                  maximum capitalization.
                </Text>
              </VStack>
            }
          />
          <FeatureCard
            contentPosition='right'
            title='Minority Protections and Exit Options'
            content={
              <VStack spacing={4} align='flex-start' fontSize='lg'>
                <Text>
                  By preserving the option to exit, Yeeters&apos; contributions
                  are protected and funds are safu.
                </Text>
                <Text>
                  As members of the DAO, Yeeters can withdraw their portion of
                  the funds at any time by ragequitting. Your organization is
                  decentralized from day 1.
                </Text>
              </VStack>
            }
          />
          <FeatureCard
            contentPosition='left'
            title='Community Owned and Operated'
            content={
              <VStack spacing={4} align='flex-start' fontSize='lg'>
                <Text>
                  Transparent and open-source, Yeeter is an exciting new
                  fundraising primitive funded by the DAOhaus community.
                </Text>
                <Text>
                  Intended as a public good and an opportunity to practice
                  community driven development, the project was funded by a
                  Yeeter campaign and is maintained by DAO contributors.
                </Text>
              </VStack>
            }
          />
          <FeatureCard
            fullWidthCopy
            title='Sophisticated Smart Contracts to Serve Your Community'
            justifyContent={{ base: 'flex-start', lg: 'center' }}
            content={
              <VStack spacing={4} align='center' fontSize='lg'>
                <Text mb={4}>
                  With your project on Y33T, contributors send tokens in the
                  form of xDAI or ETH. The Yeeter smart contract forwards those
                  funds into a treasury, creating shares for contributors. The
                  result is a DAO, with a crowdfunded treasury, controlled by
                  the project team and supported by contributors.
                </Text>
                <Button
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
                  onClick={openContactForm}
                >
                  Join the Y33T List
                </Button>
              </VStack>
            }
          />
          <FeatureCard
            fullWidthCopy
            content={
              <VStack
                spacing={4}
                align='center'
                fontSize='lg'
                paddingX={{ base: 0, lg: 16 }}
              >
                <Flex direction='column' justifyContent='flex-start'>
                  <Text mb={4}>
                    Inside the upper cabin, crew mates are collaborating on the
                    beginnings of a logbook and map, both of which are mostly
                    blank.
                  </Text>
                  <Text mb={4}>
                    You gaze beyond the bow and witness numerous ships, raising
                    the flag of the Green Tongue. The roll of the rising tide
                    lifts us into swift currents.
                  </Text>
                  <Text mb={4}>
                    Let’s meet in the Yeeter tavern to share stories of the sea
                    and learnings of uncharted lands.
                  </Text>
                </Flex>
                <Link
                  href='https://discord.gg/yb45YBqBXT'
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
                    h='48px'
                    w='48px'
                    color='secondary.500'
                    transition='all 0.15s linear'
                    _hover={{
                      textDecoration: 'none',
                      color: 'secondary.400',
                    }}
                  />
                  <Text as='span' ml={8} fontSize='xl'>
                    Join the Discord
                  </Text>
                </Link>
              </VStack>
            }
          />
        </VStack>
      </Box>
      <Modal />
    </>
  );
};

export default Home;

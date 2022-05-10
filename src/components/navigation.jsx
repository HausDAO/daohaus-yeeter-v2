import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { AiOutlineClose } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { useWallet } from '@raidguild/quiver';
// import { useOverlay } from '../contexts/OverlayContext';
import AddressAvatar from './addressAvatar';
import Brand from './brand';
import WrongNetworkToolTip from './wrongNetworkToolTip';

const NAV_ITEMS = [
  {
    label: 'Projects',
    href: '/projects',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  // {
  //   label: 'Dao',
  //   href: '/dao/0x4/0x9fc4eff9db153a17e92d9213c52c6af97409ce01',
  // },
  // {
  //   label: 'Nav DD',
  //   children: [
  //     {
  //       label: 'Proposals Example',
  //       subLabel: '',
  //       href: '/dao/0x4/0x9fc4eff9db153a17e92d9213c52c6af97409ce01/proposals',
  //     },
  //     {
  //       label: 'Item 2',
  //       subLabel: 'Yolo',
  //       href: '#',
  //     },
  //   ],
  // },
];

const Navigation = ({ isDao }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { address, connectWallet, disconnect } = useWallet();
  // const { setHubAccountModal } = useOverlay();

  // const toggleAccountModal = () => {
  //   setHubAccountModal(prevState => !prevState);
  // };

  return (
    <Box>
      <Flex bg='primary.500' minH='80px' p={5} align='center' width='100%'>
        <Flex
          // flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <AiOutlineClose w={3} h={3} />
              ) : (
                <GiHamburgerMenu w={5} h={5} />
              )
            }
            variant='ghost'
            aria-label='Toggle Navigation'
            color='secondary.400'
            size='lg'
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'start' }}>
          <Box textAlign={useBreakpointValue({ base: 'center', md: 'left' })}>
            <Brand />
          </Box>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10} align='center'>
            <DesktopNav />
          </Flex>
        </Flex>

        {isDao && <WrongNetworkToolTip />}

        {address ? (
          <Tooltip label='Click to disconnect wallet' fontSize='md'>
            <Button variant='outline' onClick={disconnect}>
              <AddressAvatar addr={address} hideCopy hideEtherscanLink />
            </Button>
          </Tooltip>
        ) : (
          <Button variant='outline' onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  // const linkColor = useColorModeValue('white.600', 'white.200');
  const linkHoverColor = useColorModeValue('white.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'white.800');

  return (
    <Stack direction='row' spacing={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger='hover' placement='bottom-start'>
            <PopoverTrigger>
              <Link
                p={2}
                as={RouterLink}
                to={navItem.href || '#'}
                fontSize='sm'
                fontWeight={500}
                // color={linkColor}
                color='white'
                letterSpacing='widest'
                lineHeight='18px'
                textTransform='uppercase'
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow='xl'
                bg={popoverContentBgColor}
                p={4}
                rounded='xl'
                minW='sm'
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      as={RouterLink}
      to={href}
      role='group'
      display='block'
      p={2}
      rounded='md'
      _hover={{ bg: useColorModeValue('secondary.50', 'gray.900') }}
    >
      <Stack direction='row' align='center'>
        <Box>
          <Text
            transition='all .3s ease'
            _groupHover={{ color: 'secondary.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize='sm'>{subLabel}</Text>
        </Box>
        <Flex
          transition='all .3s ease'
          transform='translateX(-10px)'
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify='flex-end'
          align='center'
          flex={1}
        >
          <Icon color='secondary.400' w={5} h={5} as={FaChevronRight} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack bg='primary.500' p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify='space-between'
        align='center'
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={FaChevronDown}
            transition='all .25s ease-in-out'
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle='solid'
          borderColor={useColorModeValue('white.200', 'white.700')}
          align='start'
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default Navigation;

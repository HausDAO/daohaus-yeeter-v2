import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

import { useCustomTheme } from '../contexts/CustomThemeContext';
import Navigation from '../nav/navigation';
import { themeImagePath } from '../utils/metadata';

import '../global.css';

const Layout = ({ children }) => {
  const { theme } = useCustomTheme();

  return (
    <Flex direction='column' minH='100vh' w='100vw'>
      <Navigation />

      <Box
        position='fixed'
        h='100vh'
        bgImage={`url(${themeImagePath(theme.images.bgImg)})`}
        bgSize='cover'
        bgPosition='center'
        zIndex='-1'
        top={0}
        right='0'
        w='100%'
        _before={{
          display: 'block',
          content: '""',
          position: 'absolute',
          w: '100%',
          h: '100%',
          bgColor: 'background.500',
          opacity: theme.styles.bgOverlayOpacity,
          pointerEvents: 'none',
          top: '0',
          right: '0',
          zIndex: '-1',
        }}
      />
      <Flex
        w='100%'
        ml={[0, null, null, null]}
        mt={['80px', null, null, '0px']}
        flexDirection='column'
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;

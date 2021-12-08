import React, { useEffect, useContext } from 'react';

import { CustomThemeContext } from '../contexts/CustomThemeContext';
import Layout from '../components/layout';
// import Main from './Main';

const Home = () => {
  const { theme, resetTheme } = useContext(CustomThemeContext);

  useEffect(() => {
    if (theme.active) {
      resetTheme();
    }
  }, [theme, resetTheme]);

  return <Layout>{/* <Main /> */}</Layout>;
};

export default Home;

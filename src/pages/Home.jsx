import React, { useEffect, useContext } from 'react';

import { CustomThemeContext } from '../contexts/CustomThemeContext';
import Layout from '../components/layout';
import ExampleHome from '../components/exampleHome';

const Home = () => {
  const { theme, resetTheme } = useContext(CustomThemeContext);

  useEffect(() => {
    if (theme.active) {
      resetTheme();
    }
  }, [theme, resetTheme]);

  return (
    <Layout>
      <ExampleHome />
    </Layout>
  );
};

export default Home;

import React, { useEffect, useContext } from 'react';

import { CustomThemeContext } from '../contexts/CustomThemeContext';
import Layout from '../components/layout';
import ExampleHomeDaoList from '../components/exampleHomeDaoList';

const Home = () => {
  const { theme, resetTheme } = useContext(CustomThemeContext);

  useEffect(() => {
    if (theme.active) {
      resetTheme();
    }
  }, [theme, resetTheme]);

  return (
    <Layout>
      <ExampleHomeDaoList />
    </Layout>
  );
};

export default Home;

import React, { useEffect, useContext } from 'react';

import { CustomThemeContext } from '../contexts/CustomThemeContext';
import Layout from '../components/layout';

const BaseLayout = ({ children }) => {
  const { theme, resetTheme } = useContext(CustomThemeContext);

  useEffect(() => {
    if (theme.active) {
      resetTheme();
    }
  }, [theme, resetTheme]);

  return <Layout>{children}</Layout>;
};

export default BaseLayout;

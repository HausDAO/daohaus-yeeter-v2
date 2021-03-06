import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

// import Layout from '../components/layout';
import DaoHome from '../pages/DaoHome';
import Yeet from '../pages/Yeet';
// import DaoProposals from '../pages/DaoProposals';

const DaoRouter = () => {
  const { path } = useRouteMatch();

  return (
    // <Layout isDao>
    <Switch>
      <Route exact path={`${path}/`}>
        <DaoHome />
      </Route>
      <Route exact path={`${path}/yeet`}>
        <Yeet />
      </Route>
    </Switch>
    // </Layout>
  );
};

export default DaoRouter;

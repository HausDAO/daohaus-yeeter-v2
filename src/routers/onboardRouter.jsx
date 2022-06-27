import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import DaoOnboard from '../pages/DaoOnboard';

const OnboardRouter = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/`}>
        <DaoOnboard />
      </Route>
    </Switch>
  );
};

export default OnboardRouter;

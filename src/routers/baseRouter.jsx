import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Dao from '../pages/Dao';
import FourOhFour from '../pages/404';
import Faq from '../pages/Faq';
import BaseLayout from './baseLayout';

const BaseRouter = () => {
  return (
    <Switch>
      <BaseLayout>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/faq'>
          <Faq />
        </Route>
      </BaseLayout>

      <Route
        path='/dao/:daochain/:daoid'
        render={routeProps => {
          return <Dao key={routeProps.match.params.daoid} {...routeProps} />;
        }}
      />
      <Route path='*' component={FourOhFour} />
    </Switch>
  );
};

export default BaseRouter;

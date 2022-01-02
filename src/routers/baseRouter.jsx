import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Dao from '../pages/Dao';
import FourOhFour from '../pages/404';
import Faq from '../pages/Faq';
import BaseLayout from './baseLayout';

// TODO: move base layout - theme reset not needed?

const BaseRouter = () => {
  return (
    <BaseLayout>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/faq'>
          <Faq />
        </Route>

        <Route
          path='/dao/:daochain/:daoid'
          render={routeProps => {
            return <Dao key={routeProps.match.params.daoid} {...routeProps} />;
          }}
        />
        <Route path='*' component={FourOhFour} />
      </Switch>
    </BaseLayout>
  );
};

export default BaseRouter;

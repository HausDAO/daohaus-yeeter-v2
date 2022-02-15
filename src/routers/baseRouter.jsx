import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Projects from '../pages/Projects';
import Home from '../pages/Home';
import Dao from '../pages/Dao';
import FourOhFour from '../pages/404';
import Faq from '../pages/Faq';
import BaseLayout from './baseLayout';
import QrCode from '../pages/Qr';

const BaseRouter = () => {
  return (
    <BaseLayout>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/projects'>
          <Projects />
        </Route>
        <Route exact path='/faq'>
          <Faq />
        </Route>
        <Route exact path='/qr'>
          <QrCode />
        </Route>
        <Route exact path='/yeet'>
          <Redirect to='/dao/0x1/0x1efe05df1f5e82a4994093b1982c97e3dd404e65/1' />
        </Route>
        <Route
          exact
          path='/dao/:daochain/:daoid(\b0x[0-9a-f]{10,40}\b)'
          render={routeProps => {
            return (
              <Redirect
                to={`/dao/${routeProps.match.params.daochain}/${routeProps.match.params.daoid}/1`}
              />
            );
          }}
        />
        <Route
          path='/dao/:daochain/:daoid/:yeeternumber'
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

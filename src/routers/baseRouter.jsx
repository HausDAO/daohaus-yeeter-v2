import React from 'react';
import { Switch, Route } from 'react-router-dom';

import FourOhFour from '../pages/404';
import Home from '../pages/Home';
// import Hub from '../pages/Hub';

const BaseRouter = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home />
      </Route>
      {/* <Route
        path='/yeet/:daochain/:daoid'
      >
      </Route> */}
      <Route path='*' component={FourOhFour} />
    </Switch>
  );
};

export default BaseRouter;

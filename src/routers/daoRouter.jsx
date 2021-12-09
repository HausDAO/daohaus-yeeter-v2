import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useParams,
} from 'react-router-dom';

import { useDao } from '../contexts/DaoContext';
// import { useDaoMember } from '../contexts/DaoMemberContext';
// import { useMetaData } from '../contexts/MetaDataContext';
// import { useToken } from '../contexts/TokenContext';

import Layout from '../components/layout';

const DaoRouter = () => {
  const { path } = useRouteMatch();
  //   const { daoProposals, daoVaults } = useDao();

  return (
    <Layout>
      <Switch>
        <Route exact path={`${path}/`}>
          {/* <Overview
            activities={daoActivities}
            daoMember={daoMember}
            isMember={isMember}
            isCorrectNetwork={isCorrectNetwork}
            daoOverview={daoOverview}
            members={daoMembers}
            daoMetaData={daoMetaData}
            daoVaults={daoVaults}
          /> */}
        </Route>
      </Switch>
    </Layout>
  );
};

export default DaoRouter;

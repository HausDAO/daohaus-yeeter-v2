import React from 'react';
import { useParams } from 'react-router-dom';

import { DaoProvider } from '../contexts/DaoContext';
import OnboardRouter from '../routers/onboardRouter';
import Modal from '../modals/modal';

const Onboard = () => {
  const { daoid } = useParams();

  return (
    <DaoProvider key={daoid}>
      <OnboardRouter />
      <Modal />
    </DaoProvider>
  );
};

export default Onboard;

import React from 'react';
import { useParams } from 'react-router-dom';

import { DaoProvider } from '../contexts/DaoContext';
import DaoRouter from '../routers/daoRouter';
import Modal from '../modals/modal';

const Dao = () => {
  const { daoid } = useParams();

  return (
    <DaoProvider key={daoid}>
      <DaoRouter />
      <Modal />
    </DaoProvider>
  );
};

export default Dao;

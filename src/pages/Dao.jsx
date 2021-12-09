import React from 'react';
import { useParams } from 'react-router-dom';

import { DaoProvider } from '../contexts/DaoContext';
import DaoRouter from '../routers/daoRouter';
import Modal from '../modals/modal';

const Dao = () => {
  const { daoid } = useParams();

  const DaoScopedModals = () => (
    <>
      <Modal />
    </>
  );

  return (
    <DaoProvider key={daoid}>
      <DaoRouter />
      <DaoScopedModals />
    </DaoProvider>
  );
};

export default Dao;

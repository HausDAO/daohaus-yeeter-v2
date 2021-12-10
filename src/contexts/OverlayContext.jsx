import React, { createContext, useState, useContext } from 'react';
import { useToast } from '@chakra-ui/react';

export const OverlayContext = createContext();

export const OverlayProvider = ({ children }) => {
  const toast = useToast();
  const [modal, setModal] = useState(false);
  const [txInfoModal, setTxInfoModal] = useState(false);
  const [genericModal, setGenericModal] = useState({});

  const errorToast = content => {
    console.log(content);
    toast({
      title: content?.title,
      description: content?.description,
      position: 'top-right',
      status: 'error',
      duration: 7000,
      isClosable: true,
    });
  };
  const successToast = content => {
    toast({
      title: content?.title,
      description: content?.description,
      position: 'top-right',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  const warningToast = content => {
    toast({
      title: content.title,
      description: content.description,
      position: 'top-right',
      status: 'warning',
      duration: 5000,
      isClosable: true,
    });
  };

  // const useAppModal = params => {
  //   setModal(params);
  // };

  const closeModal = () => setModal(false);

  return (
    <OverlayContext.Provider
      value={{
        modal,
        setModal,
        errorToast,
        successToast,
        warningToast,
        txInfoModal,
        setTxInfoModal,
        genericModal,
        setGenericModal,
        closeModal,
      }}
    >
      {children}
    </OverlayContext.Provider>
  );
};

export default OverlayProvider;

export const useOverlay = () => {
  const {
    modal,
    setModal,
    errorToast,
    successToast,
    warningToast,
    txInfoModal,
    setTxInfoModal,
    genericModal,
    setGenericModal,
  } = useContext(OverlayContext);
  return {
    modal,
    setModal,
    errorToast,
    successToast,
    warningToast,
    txInfoModal,
    setTxInfoModal,
    genericModal,
    setGenericModal,
  };
};

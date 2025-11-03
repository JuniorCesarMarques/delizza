"use client"

import React, { useContext, useState } from 'react';
import { createContext } from 'react';

type ModalContextProps = {
  modalProps: {text: string, callback: () => void} | null;
  setModalProps: React.Dispatch<React.SetStateAction<{text: string, callback: () => void} | null>>
}

const ModalContext = createContext<ModalContextProps | null>(null);

const ModalProvider = ({children}: {children: React.ReactNode}) => {

  const [modalProps, setModalProps] = useState<ModalContextProps["modalProps"]>(null);

  return (
    <ModalContext.Provider value={{modalProps, setModalProps}}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {

  const context = useContext(ModalContext)
  if(!context) {
    throw new Error("useModal deve ser usado dentro de um ModalProvider"); 
  }

  return context;
};

export default ModalProvider;
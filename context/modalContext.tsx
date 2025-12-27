import React from 'react'

export type ModalContextType = {
    modalOpen: boolean;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    initialDate: Date | null;
    setInitialDate: React.Dispatch<React.SetStateAction<Date | null>>;
} | undefined;

export const modalContext = React.createContext<ModalContextType>(undefined);
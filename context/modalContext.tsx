import React from 'react'

export type ModalContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
export const modalContext = React.createContext<ModalContextType | undefined>(undefined);
import React from 'react';

export type CreateTaskContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
export const CreateTaskContext = React.createContext<CreateTaskContextType | undefined>(undefined)
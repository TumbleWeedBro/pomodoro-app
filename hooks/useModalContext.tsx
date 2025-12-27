import { modalContext } from "@/context/modalContext";
import React from "react";

const useModal = () => {
    const modalState = React.useContext(modalContext);
    if (!modalState) throw new Error("modalContext missing");

    const { modalOpen, setModalOpen, initialDate, setInitialDate } = modalState;

    return {
        modalOpen,
        initialDate,
        open: () => {
            setInitialDate(new Date());
            setModalOpen(true);
        },
        openWithDate: (date: Date) => {
            setInitialDate(date);
            setModalOpen(true);
        },
        close: () => {
            setModalOpen(false);
            setInitialDate(null);
        }
    };
};

export default useModal;

import { modalContext } from "@/context/modalContext";
import React from "react";

const useModal = () => {
    const modalState = React.useContext(modalContext);
    if(!modalState) throw new Error("modalContext missing");
    const [modalOpen, setModalOpen] = modalState;
    return {
        modalOpen,
        open: () => setModalOpen(true),
        close: () => setModalOpen(false)
    };
};

export default useModal;

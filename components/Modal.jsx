"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  return createPortal(
    <dialog className={styles.modal} ref={dialog} onClose={onClose}>
      {children}
    </dialog>
  );
};

export default Modal;

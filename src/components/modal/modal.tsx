import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {ModalOverlay} from "../modal-overlay/modal-overlay";
import modal from "../modal/modal.module.css";

const modalRoot: HTMLElement | null = document.getElementById("react-modals");

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

interface IKeyboardEvent {
  key: string;
}

export const Modal = ({ children, onClose, title }: IModalProps) => {

  useEffect(() => {
    const closeByEscape = (event: IKeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  return modalRoot && ReactDOM.createPortal(
    <>
      <div className={`${modal.container} pt-5`}>
        <div className={`${modal.item} pt-5`}>
          <div className={modal.title_close_container}>
            <div className={`${modal.title_container}`}>
            { title && 
              <h2 className={`${modal.title} text text_type_main-large`}>{title}</h2>}
            </div>  
            <button onClick={onClose} className={modal.button_close}>
              <CloseIcon type="primary"/>
            </button>
          </div>
        </div>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
};

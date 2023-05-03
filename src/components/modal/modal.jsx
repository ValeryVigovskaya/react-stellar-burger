import { useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import modal from "../modal/modal.module.css";

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, isOpen, onClose, title }) => {
  useEffect(() => {
    const closeByEscape = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <div className={`${modal.container} pt-5`}>
        <div className={`${modal.item} pt-5`}>
          <div className={modal.title_close_container}>
            <div className={`${modal.title_container}`}>
            { title &&
              <h2 className={`${modal.title} text text_type_main-large`}>{title}</h2>}
            </div>  
            <button onClick={onClose} className={modal.button_close}>
              <CloseIcon />
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

export default Modal;

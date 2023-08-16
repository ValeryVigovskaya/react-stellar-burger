import { FC } from "react";
import modalOverlay from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  return (
  <div className={modalOverlay.overlay} onClick={onClose}></div>
  );
};

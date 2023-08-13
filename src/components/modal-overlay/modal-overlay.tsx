import modalOverlay from "./modal-overlay.module.css";

interface IModalOverlayProps {
  onClose: () => void;
}

export const ModalOverlay = ({ onClose }: IModalOverlayProps ) => {
  return (
  <div className={modalOverlay.overlay} onClick={onClose}></div>
  );
};

import modalOverlay from "./modal-overlay.module.css";

const ModalOverlay = ({ onClose }) => {
  return (
  <div className={modalOverlay.overlay} onClick={onClose}></div>
  );
};

export default ModalOverlay;

const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-ghost">
            Cancel
          </button>
          <button 
            onClick={() => { onConfirm(); onClose(); }} 
            className="btn-destructive"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
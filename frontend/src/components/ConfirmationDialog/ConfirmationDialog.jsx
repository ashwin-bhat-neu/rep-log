import PropTypes from "prop-types";
import { useEffect, useId, useRef } from "react";
import "../../styles/controls.css";
import "./ConfirmationDialog.css";

// A native <dialog>, so focus is trapped and Escape cancels without extra code.
export default function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmLabel,
  isConfirming = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  function handleCancel(event) {
    event.preventDefault();
    onCancel();
  }

  return (
    {/* deleting a workout asks you to confirm first. great practice*/}
    <dialog
      ref={dialogRef}
      className="confirmation-dialog"
      aria-labelledby={titleId}
      onCancel={handleCancel}
    >
      <h2 id={titleId} className="confirmation-dialog-title">
        {title}
      </h2>
      <p className="confirmation-dialog-message">{message}</p>
      <div className="confirmation-dialog-actions">
        <button className="button" type="button" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="button button-danger"
          type="button"
          disabled={isConfirming}
          onClick={onConfirm}
        >
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  isConfirming: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

import React from 'react';
import '../styles/deleteConfirmation.css';

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete "{productName}"? This action cannot be undone.</p>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
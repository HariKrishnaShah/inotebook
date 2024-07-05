import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/notecontext';
import './Noteitem.css';

// Simple Modal component
const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this note?</p>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button onClick={onConfirm} className="confirm-btn">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default function Noteitem(props) {
  const { title, description, tag, _id } = props.note;
  const notes = useContext(noteContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = () => {
    notes.deleteNote(_id);
    closeModal();
  };

  return (
    <>    
      <div className="note-card">
        <div className="note-content">
          <h5 className="note-title">{title}</h5>
          <p className="note-description">{description}</p>
          <span className="note-tag">{tag}</span>
        </div>
        <div className="note-actions">
          <i className="fas fa-trash-alt delete-icon" onClick={openModal}></i>
          <i className="fas fa-edit edit-icon" onClick={() => props.updateNote(props.note)}></i>
        </div>
      </div>

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </>
  );
}
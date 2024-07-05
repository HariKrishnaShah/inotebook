import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/notecontext';
import Notes from './Notes';
import './AddNote.css';

export default function AddNote() {
  const context = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    context.funcAddNote(note);
    setNote({ title: "", description: "", tag: "" });
    setIsFormVisible(false);
  }

  return (
    <div className="add-note-container">
      <button className="toggle-form-btn" onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Close' : 'Add New Note'}
      </button>

      <div className={`add-note-form ${isFormVisible ? 'visible' : ''}`}>
        <h1>Add Note</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Enter title"
              required
              minLength="3"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
              placeholder="Add your note here"
              required
              minLength="5"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
              placeholder="Tag"
            />
          </div>
          <button
            type="submit"
            disabled={note.title.length < 3 || note.description.length < 5}
            className="submit-btn"
          >
            Add Note
          </button>
        </form>
        {(note.title.length < 3 || note.description.length < 5) && (
          <p className="validation-message">
            *Title and description length should be at least 3 and 5 respectively.
          </p>
        )}
      </div>

      <div className="notes-section">
        <h2>Your Notes</h2>
        <Notes />
      </div>
    </div>
  );
}
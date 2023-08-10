import React, {useContext, useState} from 'react';
import noteContext from '../context/notes/notecontext';
import Notes from './Notes';
export default function AddNote() {
  const context = useContext(noteContext);
  const [note, setNote] = useState({title:"", description:"", tag:""});
  const handleChange = (e)=>
  {
    setNote({...note, [e.target.name]: e.target.value});
  }
 const handleSubmit = (e)=>
  {
    e.preventDefault();
    context.funcAddNote(note);
  }
  return (
    <div className = "container">
    <form>
  <div className="form-group m-2">
  <h1>Add Note</h1>
    <label htmlFor="exampleInputEmail1">Title</label>
    <input type="text" className="form-control" id="title" value = {note.title} name = "title" placeholder="Enter title" onChange = {handleChange}/>
  </div>
  <div className="form-group m-2">
    <label htmlFor="Description">Description</label>
    <input type="text" className="form-control" id="description" value = {note.description} name = "description" placeholder="Add your note here" onChange = {handleChange}/>
  </div>
  <div className="form-group m-2">
    <label htmlFor="Description">Tag</label>
    <input type="text" className="form-control" id="tag" value = {note.tag} name = "tag" placeholder="Tag" onChange = {handleChange}/>
  </div>
  <button type="submit" disabled = {note.title.length<3 || note.description.length<5?true:false} className="btn btn-primary" onClick = {handleSubmit}>Add Note</button>
  <div style={{height:"30px"}}>{note.title.length<3 || note.description.length<5?<p><strong>*</strong>Title and description length should be atleast 3 and 5 respectively.</p>:""}</div>
</form>
<h2>Your Notes</h2>
<Notes />
    </div>
  )
}

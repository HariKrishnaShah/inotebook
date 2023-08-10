import NoteContext from '../context/notes/notecontext';
import React, {useContext,  useRef, useState} from 'react'
import Noteitem from './Noteitem';

export default function Notes() {
    const allnotes = useContext(NoteContext);
    const {notes} = allnotes;
    
    const [note, setNote] = useState({title:"", description:"", tag:"", _id:""});
    let ref = useRef();
  const handleChange = (e)=>
  {
    setNote({...note, [e.target.name]: e.target.value});
  }
  const updateNote = (note)=>
  {
    ref.current.click();
    setNote(note);
  }

  return (
    <>
    <div>
    <button type="button" ref = {ref}  className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
Edit
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
  <div className="modal-content">
    <div className="modal-header">
      <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>

    <div className="modal-body">
    <form>
  <div className="form-group m-2">
 
    <label htmlFor="exampleInputEmail1">Title</label>
    <input value ={note.title} type="text" className="form-control" id="title" name = "title" placeholder="Enter title" onChange = {handleChange}/>
  </div>
  <div className="form-group m-2">
    <label htmlFor="Description">Description</label>
    <input type="text" value ={note.description} className="form-control" id="description" name = "description" placeholder="Add your note here"onChange = {handleChange}/>
  </div>
  <div className="form-group m-2">
    <label htmlFor="Description">Tag</label>
    <input type="text" value ={note.tag} className="form-control" id="tag" name = "tag" placeholder="Tag" onChange = {handleChange}/>
  </div>
  </form>
    </div>
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      <button type="button" disabled = {note.title.length<3 || note.description.length<5?true:false} className="btn btn-primary" onClick = {()=>{allnotes.updateNote(note); ref.current.click()}}>Update Note</button>
    </div>
    <div style = {{height:"40px", padding:"10px"}}>{note.title.length<3 || note.description.length<5?<p><strong>*</strong>Title and description length should be atleast 3 and 5 respectively.</p>:""}</div>
  </div>
</div>
</div>

<div className = "row">
    {notes.map((element, index)=>{
       return <div className = "col-md-3" key = {element._id} ><Noteitem key = {element._id} note = {element} updateNote = {updateNote} /></div>
      })}
      
    </div>
    </div>
    </>
    
  )
}

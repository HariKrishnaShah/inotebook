import React, {useContext} from 'react'
import noteContext from '../context/notes/notecontext';

export default function Noteitem(props) {
    let {title, description, tag, _id} = props.note;
    const notes = useContext(noteContext);
    

  return (
    <>    
<div className="card m-2">
    <div className="card-body">
    <div className= "d-flex align-items-center">
    <h5 className="card-title"><strong>Title: {title}</strong></h5>
    <i className="fa-solid fa-trash-can mx-2" onClick ={()=>{notes.deleteNote(_id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick ={()=>{props.updateNote(props.note)}}></i>
    </div>
      <p className="card-text">Description: {description}</p>
      <h6>Tag: {tag}</h6>
    </div>
  </div>
    </>
    

  )
}

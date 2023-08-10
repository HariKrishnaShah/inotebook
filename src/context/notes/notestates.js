import {useState} from 'react';
import NoteContext from './notecontext';

const NoteState = (props)=>
{
  const host = "http://localhost:5000";
    // const [state, setState] = useState({name:"Hari", class:"9"});
    // const update = ()=>
    // {
    //     setTimeout(()=>{
    //         setState({"class":10});
    //     }, 2000);
    // }

//fetch all notes 
const [alert, setAlert] = useState(null);
let triggerAlert = (type, msg)=>
{
  setAlert({type:type, msg:msg});
  setTimeout(()=>{setAlert(null)},2000)
}
const [notes, setNotes] = useState([]);
const getNotes = async ()=>
{
  const allnote = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authToken":localStorage.getItem('token')
    }
  });
  let allnotes = await allnote.json();
  triggerAlert("success", "Notes fetched successfully");
  setNotes(allnotes);
}



//Add a note
const funcAddNote = async (newNote)=>
{
  const allnote = await fetch(`${host}/api/notes/addnote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authToken":localStorage.getItem('token')
    },
    body: JSON.stringify({"title":newNote.title, "description":newNote.description, "tag":newNote.tag}),
  });
  console.log(allnote);
  triggerAlert("success", "Note added successfully.");
    setNotes(notes.concat(newNote));
  
}

//Delete a note
const deleteNote = async(id)=>{
  console.log("Deleting node with id " + id);
  const allnote = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "authToken":localStorage.getItem('token')
    },
  });
  console.log(allnote);
  const newNote = notes.filter((note)=>{return note._id !==id});
  triggerAlert("success", "Note deleted successfully.");
  setNotes(newNote);
}

const updateNote = async (newNote)=>
{
  const allnote = await fetch(`${host}/api/notes/updatenote/${newNote._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "authToken":localStorage.getItem('token')
    },
    body: JSON.stringify({"title":newNote.title, "description":newNote.description, "tag":newNote.tag}),
  });
  console.log(allnote);
  const newAllNotes = [];
  Object.assign(newAllNotes, notes);
  
  for(let i = 0; i<newAllNotes.length; i++)
  {
    if(newAllNotes[i]._id === newNote._id)
    {
      newAllNotes[i].title = newNote.title;
      newAllNotes[i].description = newNote.description;
      newAllNotes[i].tag = newNote.tag;
    }
  }
  triggerAlert("success", "Note updated successfully.");
    setNotes(newAllNotes);
}




    return(
        <NoteContext.Provider value = {{notes, setNotes, funcAddNote, deleteNote, getNotes, updateNote , alert, triggerAlert}}>
            {props.children}
        </NoteContext.Provider>
    )



}
export default NoteState;
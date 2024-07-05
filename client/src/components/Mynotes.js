import React, { useContext } from 'react'
import AddNote from './AddNote'
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/notecontext';

export default function Home() {
  const allnotes = useContext(noteContext);
  let navigate = useNavigate();
    // eslint-disable-next-line
    useEffect(()=>{
      if(localStorage.getItem('token')!== null)
      {
        document.getElementById("goforhide").style.display = "block";
        allnotes.getNotes();
      }
      else{
            document.getElementById("goforshow").style.display="block";
        setTimeout(()=>{navigate('/login', {replace:true});},1000)
        
      }    
    // eslint-disable-next-line
    }, []);
  return (
    <>
    <div id = "goforshow" style ={{display:"none"}}><h4><strong><center>Login first to continue. Redirecting to Login Page 1 sec</center></strong></h4></div>
    <div id = "goforhide" style ={{display:"none"}}>
      {localStorage.getItem('token') && <AddNote />}
    </div>
    </>
  )
}

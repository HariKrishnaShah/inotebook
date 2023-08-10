import React, { useContext } from 'react'
import noteContext from '../context/notes/notecontext';

export default function Alert() {
  let all = useContext(noteContext);
  let upperFirstLetter = (word)=>
  {
    return word.replace(word.charAt(0), word.charAt(0).toUpperCase());
  }
  return (
    <div style = {{height:"60px"}}>{all.alert && <div className={`alert alert-${all.alert.type}`} role="alert">{upperFirstLetter(all.alert.type) + " : " + all.alert.msg}</div>}</div>
    
  )
}

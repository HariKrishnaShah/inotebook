import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/notecontext';

export default function Login() {
    const [creds, setCreds] = useState({email:"" , password: ""});
    const  [time, setTime] = useState(2);
    let navigate = useNavigate();
    const all = useContext(noteContext);
    const handleChange = (event)=>
    {
        setCreds({...creds, [event.target.name]: event.target.value});
    }
    const handleSubmit = async(e)=>
    {
        e.preventDefault();
        const Login = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({"email":creds.email, "password":creds.password})
          });
          const LoginStatus = await Login.json();
          if(LoginStatus.success)
          {
            all.triggerAlert("success", "Login Successful");
            localStorage.setItem('token', LoginStatus.authToken);
            document.getElementById("goforhide").innerHTML = "";
            document.getElementById("goforshow").style.display="block";
            setInterval(() => {
              setTime(time-1);
            }, 1000);
            setTimeout(()=>
            {
              navigate('/mynotes', { replace: true });
            }, 2000)
            
          }
          else
          {
            all.triggerAlert("danger", "Invalid Credentials");
          }
    }
  return (
    <>
    <div id = "goforshow" style ={{display:"none"}}><h4><strong><center>Redirecting to homepage in {time}</center></strong></h4></div>
    <div className = "container" id = "goforhide">
    <h1>Login to use inoteBook</h1>
    <form onSubmit = {handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email"  value= {creds.email} onChange = {handleChange} name = "email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value = {creds.password} onChange = {handleChange} name="password" className="form-control" id="exampleInputPassword1" />
  </div>
  <button type="submit" disabled ={creds.password.length<5 || creds.email.length<5?true:false} className="btn btn-primary">Submit</button>
  <p>Note:Password and Emails should be atleast length of 5.</p>
</form>
      
    </div>
    </>
  )
}

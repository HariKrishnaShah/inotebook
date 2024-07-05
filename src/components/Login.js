import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaSignInAlt } from 'react-icons/fa';
import noteContext from '../context/notes/notecontext';
import './Login.css'; // We'll create this CSS file

export default function Login() {
    const [creds, setCreds] = useState({email: "", password: ""});
    const [time, setTime] = useState(2);
    let navigate = useNavigate();
    const all = useContext(noteContext);

    const handleChange = (event) => {
        setCreds({...creds, [event.target.name]: event.target.value});
    }

    const handleSubmit = async(e) => {
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
        <div className="login-container">
            <div className="login-box">
                <h1>Welcome to iNoteBook</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input 
                            type="email"
                            value={creds.email}
                            onChange={handleChange}
                            name="email"
                            placeholder="Email address"
                            required
                        />
                    </div>
                    <div className="input-group"> 
          
                        <input 
                            type="password"
                            value={creds.password}
                            onChange={handleChange}
                            name="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={creds.password.length < 5}
                        className="submit-btn"
                    >
                        <FaSignInAlt /> Login
                    </button>
                </form>
                <p className="note">Note: Password should be at least 5 characters long.</p>
            </div>
            <div id="goforshow" className="redirect-message" style={{display: "none"}}>
                <h4>Redirecting to homepage in {time}</h4>
            </div>
        </div>
    )
}
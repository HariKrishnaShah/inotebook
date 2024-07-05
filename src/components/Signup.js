// SignUp.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/notecontext';
import './Signup.css';

export default function SignUp() {
    const [creds, setCreds] = useState({name: "", email: "", password: ""});
    const [time, setTime] = useState(2);
    let navigate = useNavigate();
    let all = useContext(noteContext);

    const handleChange = (event) => {
        setCreds({...creds, [event.target.name]: event.target.value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const Login = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"name":creds.name, "email":creds.email, "password":creds.password})
        });
        const LoginStatus = await Login.json();
        if(LoginStatus.success) {
            all.triggerAlert("success", "Signup Successful");
            localStorage.setItem('token', LoginStatus.authToken);
            document.getElementById("goforhide").innerHTML = "";
            document.getElementById("goforshow").style.display="block";
            setInterval(() => {
                setTime(time-1);
            }, 1000);
            setTimeout(() => {
                navigate('/mynotes', { replace: true });
            }, 2000)
        } else {
            all.triggerAlert("danger", "Signup Failed. Invalid Credentials.");
        }
    }

    return (
        <div className="signup-container">
            <div id="goforshow" className="redirect-message" style={{display:"none"}}>
                <h4>Redirecting to notes in {time}</h4>
            </div>
            <div className="signup-box" id="goforhide">
                <h1>Sign Up for iNoteBook</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={creds.name} onChange={handleChange} required minLength={3} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" id="email" name="email" value={creds.email} onChange={handleChange} required minLength={5} />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={creds.password} onChange={handleChange} required minLength={5} />
                    </div>
                    <button type="submit" disabled={creds.name.length < 3 || creds.password.length < 5}>
                        Sign Up
                    </button>
                </form>
                <p className="note">Note: Name should be at least 3 characters long. Password should be at least 5 characters long.</p>
            </div>
        </div>
    )
}
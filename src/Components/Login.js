import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password})
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // Save authToken and redirect
            localStorage.setItem("token", json.authToken)
            props.showAlert("Logged in Successfully", "success")
            history("/")
            
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChamge = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div  className='container'>
            <h2 className='my-3'>Login to access iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChamge} value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChamge} value={credentials.password} id="password" name='password' />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login

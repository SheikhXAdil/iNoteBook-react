import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {name, email, password} = credentials;
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password})
        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            // Save authToken and redirect
            localStorage.setItem("token", json.authToken)
            props.showAlert("Account Created Successfully", "success")
            history("/")
        }
        else{
            props.showAlert("Invalid Details", "danger")
        }
    }

    const onChamge = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <div className='container'>
            <h2 className='my-3'>Create an account to access iNoteBook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" required onChange={onChamge} name='name' id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" required onChange={onChamge} name='email' id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" required minLength={5} onChange={onChamge} name='password' id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" required minLength={5} onChange={onChamge} name='cpassword' id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup

import React, { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Login() {

    const navigate = useNavigate();
    
    const host = 'http://localhost:5000/api/auth/';
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: credentials.email,
            password: credentials.password
        }

        const url = `${host}login`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();
        if(json.success) {
            localStorage.setItem('token', json.token);
            setCredentials({
                email: "",
                password: ""
            });
            navigate("/");
        }
        else console.log(json.msg);
    }

    return (
        <div>
            <h2 className='text-center my-4'><span className="badge bg-secondary">App</span> | Login</h2>
            <div className='container'>
                <form className='login' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button disabled={credentials.email.length < 5 || credentials.password.length < 8} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router';

export default function Signup() {

    const navigate = useNavigate();

    const host = 'http://localhost:5000/api/auth/';
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: credentials.name,
            email: credentials.email,
            password: credentials.password
        }

        const url = `${host}signup`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.token);
            setCredentials({
                name: "",
                email: "",
                password: ""
            });
            navigate('/');
        }
        else console.log(json.msg);
    }

    return (
        <div>
            <h2 className='text-center my-4'><span className="badge bg-secondary">App</span> | Signup</h2>
            <div className='container'>
                <form className='signup' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">User name</label>
                        <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password'
                            value={credentials.password} onChange={onChange} />
                    </div>
                    <button disabled={credentials.name.length < 4 || credentials.password.length < 8} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import './style.css'

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
        if (json.success) {
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
        <div className='mainZ'>
            <div className='login-containerZ'>
                <form onSubmit={handleSubmit}>
                    <h2>LOGIN</h2>
                    <div className='input-divZ one focusZ'>
                        <div className='iZ'>
                            <i className="fa-solid fa-envelope"></i>
                        </div>
                        <div>
                            <input className='inputZ' type='text' id='email' name='email' value={credentials.email} onChange={onChange} placeholder='email' />
                        </div>
                    </div>
                    <div className='input-divZ two'>
                        <div className='iZ'>
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <div>
                            <input className='inputZ' type='password' id='password' name='password' value={credentials.password} onChange={onChange} placeholder='password' />
                        </div>
                    </div>
                    <div className='btn-Z'>
                        <button disabled={credentials.email.length < 5 || credentials.password.length < 8} type='submit' className='btnZ' >SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

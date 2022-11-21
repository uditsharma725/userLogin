import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function Navbar() {

    const location = useLocation();
    const navigate = useNavigate();

    const login = () => { navigate('/login'); }
    const signup = () => { navigate('/signup'); }

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    return (
        <div>
            <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand">App</div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? ' active' : ''}`} to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? ' active' : ''}`} to='/about'>About</Link>
                            </li>
                        </ul>
                        <div>

                            {!localStorage.getItem('token') && <div>
                                <button disabled={location.pathname === '/login'} className='btn btn-primary mx-2' onClick={login}>Login</button>
                                <button disabled={location.pathname === '/signup'} className='btn btn-primary mx-2' onClick={signup}>Signup</button>
                            </div>}

                            {localStorage.getItem('token') && <div>
                                <button className='btn btn-danger mx-2' onClick={logout}>Logout</button>
                            </div>}

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

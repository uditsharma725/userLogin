import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function Navbar(props) {

    const { showAlert } = props;
    const location = useLocation();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const openNav = () => { if (!open) setOpen(!open); }
    useEffect(() => {
        openNav();
        //eslint-disable-next-line
    }, []);
    
    const item = localStorage.getItem('token');
    const goto = () => {
        if (item) {
            localStorage.removeItem('token');
            navigate('/login');
            showAlert('success', 'You have successfully logged out.');  
        }
        else navigate('/signup');

        if (!open) openNav();
    }

    const liProps = "hover:text-black ease-in-out duration-300 my-4  mx-5 hover:scale-110 flex justify-center"

    return (
        <>
            <div className={`bg-white text-gray-600 
            font-medium fixed top-0 left-0 right-0 py-3 z-10    
            transition-all duration-300 ${open ? 'shadow-md' : ''}`}>

                <nav className='md:flex justify-between'>

                    {/* logo and name of the app */}
                    <div className='flex items-center cursor-pointer 
                    my-3 md:ml-11 md:hover:scale-110 ease-in-out duration-500'>

                        <img src='logo.svg' alt='.' className='w-10 h-7 mr-1.5' />
                        <div className='text-black ease-in-out duration-200
                        '>
                            APP | MERN
                        </div>

                    </div>

                    <i className={`fa-solid fa-${open ? 'bars' : 'xmark'} fixed 
                    top-6 right-2 text-${open ? 'xl' : '2xl'} hover:text-black 
                    ease-in-out duration-300 cursor-pointer md:hidden hover:scale-110`}
                        onClick={() => setOpen(!open)}></i>

                    {/* list of the pages */}
                    <div className={`list absolute md:top-3 md:right-3
                    ${open ? 'activeN' : 'activeY'}`}>

                        <ul className='md:flex md:items-center md:mr-11'>
                            <li className={`${liProps}
                            ${location.pathname === '/' ? 'text-black scale-110' : ''}`}
                                onClick={openNav}>
                                <Link to='/'>Home</Link>
                            </li>

                            <li className={`${liProps} 
                            ${location.pathname === '/about'? 'text-black scale-110':''}`}
                                onClick={openNav}>
                                <Link to='/about'>About</Link>
                            </li>

                            <li className={`${liProps}
                            ${location.pathname === '/contact'? 'text-black scale-110':''}`} 
                            onClick={openNav}>
                                <Link to='/contact'>Contact</Link>
                            </li>

                            <i className={`fa-solid fa-right-${item ? 'from' : 'to'}-bracket mx-5
                            text-xl cursor-pointer hover:text-black ease-in-out duration-300 
                            flex justify-center my-4 hover:scale-110`} onClick={goto}></i>
                        </ul>

                    </div>

                </nav>

            </div>
        </>
    )
}

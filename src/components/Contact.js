import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';

export default function Contact() {

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token'));
        else navigate('/login');
        // eslint-disable-next-line
    }, []);

    return (
        <div className='my-20'>
            App | Contact
        </div>
    )
}

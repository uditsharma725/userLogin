import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'


export default function Home() {

  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const getUser = async () => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:5000/api/auth/userInfo`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    });
    const json = await response.json();
    setUser(json.user);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) getUser();
    else navigate('/login');
    // eslint-disable-next-line
  }, []);

  return (
    <div className='my-20'>
      <h2>App | Home</h2>
      {user && <div></div>}
    </div>
  )
}

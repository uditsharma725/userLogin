import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Spinner from './Spinner';


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

  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <>
      <Spinner loading={loading} />
      {!loading && <div className='mt-24 text-center'>
        <h2>App | Home</h2>
        <div>
          {user.name}
        </div>
        <div>
          {user.email}
        </div>
        {user && <div></div>}
      </div>}
    </>
  )
}

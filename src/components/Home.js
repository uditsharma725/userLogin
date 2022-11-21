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
    console.log(json.user);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) getUser();
    else navigate('/login');
    // eslint-disable-next-line
  }, []);

  console.log(user);

  return (
    <div>
      <h2 className='text-center my-4'><span className="badge bg-secondary">App</span> | Home</h2>
      {user && <div>
        <h3 className='text-center my-4'>
          Congratulation you have logged in as <span className="badge bg-secondary">{user.name}</span>
        </h3>
        <div className='container'>
          <h4>Email: <span className="badge bg-secondary">{user.email}</span></h4>
        </div>
      </div>}
    </div>
  )
}

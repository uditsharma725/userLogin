import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function About() {

  const navigate = useNavigate();
  useEffect(()=> {
    if(!localStorage.getItem('token')) navigate('/login');
    // eslint-disable-next-line
  },[]);

  return (
    <div>
      <h2 className='text-center my-4'><span className="badge bg-secondary">App</span> | About</h2>
    </div>
  )
}

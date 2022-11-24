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
      <div className='my-20'>App | About</div>
    </div>
  )
}

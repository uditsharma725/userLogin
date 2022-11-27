import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Spinner from './Spinner';

export default function About() {

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    // eslint-disable-next-line
  }, []);

  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && <div>
        <div className='my-20'>App | About</div>
      </div>}
    </>
  )
}

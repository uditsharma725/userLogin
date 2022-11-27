import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

export default function Spinner(props) {

  const { loading } = props;

  return (
    <div>
      {loading && <div className='w-screen h-screen flex justify-center items-center'>
        <ClipLoader
          color={"#222"}
          loading={true}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>}
    </div>
  )
}



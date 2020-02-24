import React from 'react'

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }

  return (
    <>
      {success ? 
        <div className='successfulOperation'>
          {message}
        </div>
        :
        <div className='unsuccessfulOperation'>
          {message}
        </div>
      }
    </>
  )
}

export default Notification
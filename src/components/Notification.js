import React from 'react'
import { connect } from 'react-redux'

const Notification = ( props ) => {
  if (props.notification === null){
    return null
  }

  return (
    <>
      {props.notification.success ?
        <div className='successfulOperation'>
          {props.notification.message}
        </div>
        :
        <div className='unsuccessfulOperation'>
          {props.notification.message}
        </div>
      }
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const connectedNotification = connect(
  mapStateToProps
)(Notification)

export default connectedNotification
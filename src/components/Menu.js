import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../reducers/currentUserReducer'

const Menu = (props) => {
  const padding = {
    paddingRight: 5
  }

  const bg = {
    backgroundColor: 'silver'
  }

  const logout = () => {
    window.localStorage.clear()
    props.logout()
  }

  return (
    <div style={bg}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {props.currentUser.name} logged in <button onClick={logout}>logout</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = {
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
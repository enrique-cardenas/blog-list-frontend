import React from 'react'
import { connect } from 'react-redux'

const User = ( props ) => {
  if(props.user === undefined) return null

  return (
    <>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {props.user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </>
  )
}

const userById = (users, id) => {
  return users.find(user => user.id === id)
}


const mapStateToProps = (state, ownProps) => {
  return {
    users: state.users,
    user: userById(state.users, ownProps.id)
  }
}
export default connect(mapStateToProps)(User)
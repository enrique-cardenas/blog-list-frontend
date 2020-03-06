import React from 'react'
import { connect } from 'react-redux'
import { createBlog, removeBlog, updateBlog, addComment }
  from '../reducers/blogReducer'
import  { useField } from '../hooks'

const Blog = ( props ) => {
  const comment = useField('text')

  if(props.blog === undefined) return null


  const updateLikes = () => {
    const updatedBlog = { ...props.blog, likes: props.blog.likes + 1 }
    props.updateBlog(updatedBlog)
  }

  const addComment = event => {
    event.preventDefault()
    const commentObject = { comment: comment.formInput.value }
    props.addComment(props.blog.id, commentObject)
    comment.reset()
  }

  return (
    <div className='blog'>
      <h2>{props.blog.title}</h2>
      <a href={props.blog.url}>{props.blog.url}</a>
      <div>
        {props.blog.likes} likes
        <button onClick={updateLikes}>like</button>
      </div>
      <div>added by {props.blog.user.name}</div>

      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input { ...comment.formInput } />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {props.blog.comments.map( ({_id : id, comment}) =>
            <li key={id}>{comment}</li>
          )}
        </ul>

      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.currentUser,
    blog: state.blogs.find(blog => blog.id === ownProps.id)
  }
}

const mapDispatchToProps = {
  createBlog, removeBlog, updateBlog, addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)
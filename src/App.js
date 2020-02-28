import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import  { useField } from './hooks'

import { initializeBlogs, createBlog, removeBlog, updateBlog }
  from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { login, logout, getLoggedUser } from './reducers/userReducer'

const App = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const username = useField('text')
  const password = useField('text')

  // sort by likes
  //blogs.sort((a, b) => a.likes - b.likes)

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.getLoggedUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    props.login(username.formInput.value, password.formInput.value)
    username.reset()
    password.reset()
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    props.createBlog(blogObject)
    props.setNotification(`a new blog ${title} by ${author} added`, true, 5)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const updateLikes = blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    props.updateBlog(updatedBlog)
  }

  const deleteBlog = (title, author, id) => {
    if (window.confirm(`remove blog ${title} by ${author}?`)){
      props.removeBlog(id)
    }
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input { ...username.formInput } />
        </div>
        <div>
          password
          <input { ...password.formInput } />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const logoutButton = () => {
    window.localStorage.clear()
    props.logout()
  }

  const blogRows = () => props.blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      updateLikes={() => updateLikes(blog)}
      deleteBlog={() => deleteBlog(blog.title, blog.author, blog.id)}
      currentUser={props.user}
    />
  )

  const blogFormRef = React.createRef()

  const blogDisplay = () => (
    <>
      <h2>blogs</h2>
      <Notification />
      {props.user.name} logged in
      <button onClick={logoutButton}>logout</button>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm
          onSubmit={addBlog}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          title={title}
          author={author}
          url={url}
        />
      </Togglable>
      {blogRows()}
    </>
  )

  return (
    <div className="App">
      {props.user === null ?
        loginForm() :
        blogDisplay()
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    notification: state.notification,
    user: state.user
  }
}

const mapDispatchToProps = {
  initializeBlogs,
  setNotification,
  createBlog,
  removeBlog,
  updateBlog,
  login,
  logout,
  getLoggedUser
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
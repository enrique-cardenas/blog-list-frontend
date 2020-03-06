import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { connect } from 'react-redux'

// import components
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'

// import custom hooks
import  { useField } from './hooks'

// import reducers
import { initializeBlogs, createBlog, removeBlog, updateBlog }
  from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'
import { login, logout, getLoggedUser } from './reducers/currentUserReducer'
import { getUsers } from './reducers/usersReducer'


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
    props.getUsers()
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
    blogFormRef.current.toggleVisibility()
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

  const blogRows = () => {

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 5,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return(
      props.blogs.map(blog =>
        <div key={blog.id} style={blogStyle} className='blog' >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      )
    )
  }

  const blogFormRef = React.createRef()

  const displayMenu = () => (
    <>
      <Menu />
      <h2>blogs</h2>
      <Notification />
    </>
  )

  const displayBlogs = () => (
    <>
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
      <Router>
        {props.currentUser === null ?
          null :
          displayMenu()
        }
        <Route exact path='/' render={() =>
          props.currentUser === null ?
            loginForm() :
            displayBlogs()}
        />
        <Route path='/blogs/:id' render={({ match }) =>
          <Blog id={match.params.id}/>
        }/>
        <Route exact path='/users' render={() => <Users />} />
        <Route exact path='/users/:id' render={({ match }) =>
          <User id={match.params.id}/>
        }/>
      </Router>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users,
    notification: state.notification,
    currentUser: state.currentUser
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
  getLoggedUser,
  getUsers
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
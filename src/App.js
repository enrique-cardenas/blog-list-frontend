import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { connect } from 'react-redux'

// Material UI imports
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// import local components
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import LoginForm from './components/LoginForm'

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
  const password = useField('password')

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

  const blogRows = () => {
    return(
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            {props.blogs.map(blog =>
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const blogFormRef = React.createRef()

  const displayMenu = () => (
    <>
      <Menu />
      <h2>blog app</h2>
      <Notification />
    </>
  )

  const displayBlogs = () => (
    <>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        {toggleVisibility => (
          <BlogForm
            onSubmit={addBlog}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            title={title}
            author={author}
            url={url}
            toggleVisibility={toggleVisibility}
          />
        )}
      </Togglable>
      {blogRows()}
    </>
  )

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Router>
          {props.currentUser === null ?
            null :
            displayMenu()
          }
          <Route exact path='/' render={() =>
            props.currentUser === null ?
              <LoginForm 
                handleLogin={handleLogin} username={username} password={password} /> 
              :
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
      </Container>
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
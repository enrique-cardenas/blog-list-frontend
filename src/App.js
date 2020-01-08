import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  // sorted by likes
  //const sortedBlogs = blogs.sort((a, b) => a.likes - b.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
     setNotificationMessage('wrong username or password')
      setNotificationSuccess(false)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationSuccess(null)
      }, 5000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    try {
      const data = await blogService.create(blogObject)
      setBlogs(blogs.concat(data))
      setNotificationMessage(`a new blog ${title} by ${author} added`)
      setNotificationSuccess(true)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationSuccess(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
    }
  }

  const updateLikes = blog => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    {console.log('updatedLikes blog object', updatedBlog)}
    blogService
      .update(updatedBlog)
      .then(returnedBlog => {
        console.log('returned blog object', returnedBlog)
        setBlogs(blogs.map(curBlog => 
          curBlog.id !== updatedBlog.id ? curBlog : returnedBlog))
      })
  }

  const loginForm = () => (
    <>
    <h2>Log in to application</h2>
    <Notification message={notificationMessage} success={notificationSuccess}/>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
    </>
  )

  const logoutButton = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const blogRows = () => blogs.map(blog =>
    <Blog 
      key={blog.id} 
      blog={blog} 
      updateLikes={() => updateLikes(blog)}
    />
  )

  const blogFormRef = React.createRef()

  const blogDisplay = () => (
    <>
      <h2>blogs</h2>
      <Notification message={notificationMessage} success={notificationSuccess}/>
      {user.name} logged in
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

      {user === null ?
        loginForm() :
        blogDisplay()
      }

    </div>
  )
}

export default App;
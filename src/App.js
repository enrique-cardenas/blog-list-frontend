import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
//import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import  { useField, useResource } from './hooks'

const App = () => {
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationSuccess, setNotificationSuccess] = useState(null)
  const username = useField('text')
  const password = useField('text')
  const [ blogs, blogService ] = useResource('/api/blogs')

  // sort by likes
  blogs.sort((a, b) => a.likes - b.likes)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setTokenState(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.formInput.value, password: password.formInput.value
      })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setTokenState(user.token)
      setUser(user)
      username.reset()
      password.reset()
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setNotificationSuccess(false)
      setTimeout(() => {
        setNotificationMessage(null)
        setNotificationSuccess(null)
      }, 5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService.create(blogObject)
    setNotificationMessage(`a new blog ${title} by ${author} added`)
    setNotificationSuccess(true)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationSuccess(null)
    }, 5000)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const updateLikes = blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService.update(updatedBlog)
  }


  const deleteBlog = (title, author, id) => {
    if (window.confirm(`remove blog ${title} by ${author}?`)){
      blogService.remove(id)
    }
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <Notification message={notificationMessage} success={notificationSuccess}/>
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
    setUser(null)
  }

  const blogRows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
      updateLikes={() => updateLikes(blog)}
      deleteBlog={() => deleteBlog(blog.title, blog.author, blog.id)}
      currentUser={user}
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

export default App
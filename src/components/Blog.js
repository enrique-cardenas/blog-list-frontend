import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog, currentUser }) => {
  const [displayInfo, setInfoDisplay] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => setInfoDisplay(!displayInfo)}>
        {blog.title} {blog.author}
      </div>
      {displayInfo ?
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={updateLikes}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
          {currentUser.username === blog.user.username ? 
            <button onClick={deleteBlog}>remove</button>
            :
            null
          }
        </>
        :
        null
      }
    </div>
  )
}

export default Blog
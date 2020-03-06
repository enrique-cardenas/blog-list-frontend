import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.blogId)
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id === action.data.id ? action.data : blog)
    case 'ADD_COMMENT':
      return state.map(blog => blog.id === action.blog.id ? action.blog : blog)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type:'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = blogId => {
  return async dispatch => {
    blogService.remove(blogId)
    dispatch({
      type: 'REMOVE_BLOG',
      blogId
    })
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const changedBlog = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: changedBlog
    })
  }
}

export const addComment = (id, commentObject) => {
  return async dispatch => {
    const changedBlog = await blogService.addComment(id, commentObject)
    
    dispatch({
      type: 'ADD_COMMENT',
      blog: changedBlog
    })
  }
}

export default reducer
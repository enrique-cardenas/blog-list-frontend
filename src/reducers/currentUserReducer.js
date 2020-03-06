import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const reducer = (state = null, action) => {
  switch(action.type){
    case 'LOGIN':
      return action.user
    case 'GET_LOGGED_USER':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try{
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      dispatch({
        type: 'LOGIN',
        user
      })

    } catch (exception) {
      dispatch(setNotification('wrong username or password', false, 5))
    }
  }
}

export const getLoggedUser = (user) => {
  blogService.setToken(user.token)
  return {
    type: 'GET_LOGGED_USER',
    user
  }
}

export default reducer
import usersService from '../services/users'

const reducer = (state = [], action) => {
  switch(action.type){
    case 'GET_USERS':
      return action.users
    default:
      return state

  }
}

export const getUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'GET_USERS',
      users
    })
  }
}

export default reducer
const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'Test Title',
    author: 'John Doe',
    likes: '3',
    url: 'www.testurl.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e21e0b8b04a45638211',
    title: 'Another Test Title',
    author: 'John Doe',
    likes: '21',
    url: 'www.anothertesturl.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451e30b5ffd44a58fa79ab',
    title: 'The Last Test Title',
    author: 'John Doe',
    likes: '91',
    url: 'www.lasttesturl.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
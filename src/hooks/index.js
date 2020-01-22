import { useState, useEffect } from 'react'
import axios from 'axios'


export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    formInput: {
      type,
      value,
      onChange,
    },
    reset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [token, setToken] = useState('')

  const setTokenState = newToken => {
    setToken(`bearer ${newToken}`)
  }

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl)
      setResources(response.data)
    }
    getAll()
  }, [baseUrl])

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, resource, config)
    setResources(resources.concat(response.data))
    return response.data
  }

  const update = async newBlog => {
    const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog)
    setResources(resources.map(blog =>
      blog.id !== newBlog.id ? blog : newBlog
    ))

    return response.data
  }

  const remove = async id => {
    const config = {
      headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)

    setResources(resources.filter(blog =>
      blog.id !== id
    ))
    return response.data
  }

  const service = {
    create,
    setTokenState,
    update,
    remove
  }

  return [
    resources, service
  ]
}
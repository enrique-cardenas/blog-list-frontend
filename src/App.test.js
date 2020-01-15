import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

    expect(component.container).not.toHaveTextContent(
      'Test Title'
    )

    expect(component.container).not.toHaveTextContent(
      'Another Test Title'
    )
    expect(component.container).not.toHaveTextContent(
      'The Last Test Title'
    )
  })

  test('if user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBlogListUser', JSON.stringify(user))

    const component = render(
      <App />
    )

    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blog')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'Test Title'
    )

    expect(component.container).toHaveTextContent(
      'Another Test Title'
    )
    expect(component.container).toHaveTextContent(
      'The Last Test Title'
    )

  })
})
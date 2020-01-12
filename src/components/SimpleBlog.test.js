import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import SimpleBlog from './SimpleBlog'


describe('<SimpleBlog />', () => {

  test('renders the title, author and amount of likes for the blog post.', () => {
    const blog = {
      title: 'Test Title',
      author: 'John Doe',
      likes: '3'
    }

    const component = render(
      <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Test Title'
    )

    expect(component.container).toHaveTextContent(
      'John Doe'
    )

    expect(component.container).toHaveTextContent(
      '3'
    )
  })

  test('clicking the button twice calls event handler twice', () => {
    const blog = {
      title: 'Test Title',
      author: 'John Doe',
      likes: '3'
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler}/>
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)

  })
})
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {

  const blog = {
    title: 'Test Title',
    author: 'John Doe',
    likes: '3',
    url: 'www.testurl.com',
    user: {
      name: 'Bruce Wayne'
    }
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} currentUser='Bruce Wayne'/>
    )
  })

  test('renders only name and author by default', () => {

    expect(component.container).toHaveTextContent(
      'Test Title'
    )

    expect(component.container).toHaveTextContent(
      'John Doe'
    )

    expect(component.container).not.toHaveTextContent(
      '3'
    )

    expect(component.container).not.toHaveTextContent(
      'www.testurl.com'
    )

  })

  test('renders more information when blog title is clicked', () => {

    expect(component.container).not.toHaveTextContent(
      '3'
    )
    expect(component.container).not.toHaveTextContent(
      'www.testurl.com'
    )

    const button  = component.container.querySelector('.blogName')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      '3'
    )
    expect(component.container).toHaveTextContent(
      'www.testurl.com'
    )

  })
})
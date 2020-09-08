import React from 'react'
import { render, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('test addBlog detials recieved ', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )
    
    const form = component.container.querySelector('form')

    const title = component.container.querySelector('#title')

    const author = component.container.querySelector('#author')

    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'blog test title' }
    })
    fireEvent.change(author, {
      target: { value: 'blog test author' }
    })
    fireEvent.change(url, {
      target: { value: 'blog test url' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('blog test title')
    expect(createBlog.mock.calls[0][0].author).toBe('blog test author')
    expect(createBlog.mock.calls[0][0].url).toBe('blog test url')



  })
})
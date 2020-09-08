import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  test('Blog initially shows only title and author', () => {
    const blog = {
      title:'random one',
      author:'me',
      url:'www.test.com',
      likes:6,
      user:'abc231',
      _id:'555aaa'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const divHide = component.container.querySelector('.blogDetails')

    const divShow = component.container.querySelector('.blog')


    expect(divShow).toBeVisible(
      'random one'
    )
    expect(divShow).toBeVisible(
      'me'
    )
    expect
    expect(divHide).not.toBeVisible(
      'www.test.com'
    )
    expect(divHide).not.toBeVisible(
      '6'
    )
  })

  test('Details are shown after click', () => {
    const blog = {
      title:'random one',
      author:'me',
      url:'www.test.com',
      likes:6,
      user:'abc231',
      _id:'555aaa'
    }

    const component = render(
      <Blog blog={blog} />
    )

    const details = component.container.querySelector('.blogDetails')

    expect(details).not.toBeVisible(
      'www.test.com'
    )

    expect(details).not.toBeVisible(
      '6'
    )

    const button = component.getByText('show')
    fireEvent.click(button)

    expect(details).toBeVisible(
      'www.test.com'
    )
    expect(details).toBeVisible(
      '6'
    )
  })

  test('Clicking twice the button calls event handle twice', () => {
    const blog = {
      title:'random one',
      author:'me',
      url:'www.test.com',
      likes:6,
      user:'abc231',
      _id:'555aaa'
    }

    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} handleLikeButton={mockHandler} />
    )



    const buttonDetails = component.getByText('show')
    fireEvent.click(buttonDetails)

    const buttonLike = component.getByText('like')

    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})


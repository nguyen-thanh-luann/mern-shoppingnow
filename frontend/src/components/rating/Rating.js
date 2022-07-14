import React from 'react'

import './Rating.scss'
export default function Rating(props) {
  const { rating, numReviews } = props

  return (
    <div className='rating'>
      <span>
        <i
          className={
            rating >= 1
              ? 'fa-solid fa-star'
              : rating >= 0.5
              ? 'fa-solid fa-star-half'
              : 'fa-solid fa-star-half-stroke'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? 'fa-solid fa-start'
              : rating >= 1.5
              ? 'fa-solid fa-star-half'
              : 'fa-solid fa-star-half-stroke'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? 'fa-solid fa-start'
              : rating >= 2.5
              ? 'fa-solid fa-star-half'
              : 'fa-solid fa-star-half-stroke'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? 'fa-solid fa-start'
              : rating >= 3.5
              ? 'fa-solid fa-star-half'
              : 'fa-solid fa-star-half-stroke'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 5
              ? 'fa-solid fa-start'
              : rating >= 4.5
              ? 'fa-solid fa-star-half'
              : 'fa-solid fa-star-half-stroke'
          }
        ></i>
      </span>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

import Rating from '../rating/Rating'

export default function Product(props) {
  const { product } = props
  return (
    <div className='card' key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img
          src={require('../../assets/img/n1.jpg')}
          alt='productimage'
          className='card-img-top'
        />
      </Link>
      <div className='card-body'>
        <h5 className='card-title'>{product.name}</h5>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p>${product.price}</p>
        <button className='btn btn-warning border-2 border-dark'>
          Add to cart
        </button>
      </div>
    </div>
  )
}

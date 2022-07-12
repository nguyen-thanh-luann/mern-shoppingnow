import React from 'react'
import { Link } from 'react-router-dom'

import './ProductList.scss'

import data from './data'

export default function ProductList() {
  return (
    <div className='container'>
      <div className='product-list row'>
        {data &&
          data.products.map((pro) => (
            <Link
              to={`/product/${pro.slug}`}
              className='product col col-3'
              key={pro.slug}
            >
              <img
                src={require('../../assets/img/n1.jpg')}
                alt='productimage'
                className='w-100'
              />
              <h5 className='product-name'>{pro.name}</h5>
              <p>{pro.price}</p>
            </Link>
          ))}
      </div>
    </div>
  )
}

import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import logger from 'use-reducer-logger'

import './ProductList.scss'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default function ProductList() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/api/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })
      }
    }

    fetchData()
  }, [])
  return (
    <div className='container'>
      <div className='product-list row'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((pro) => (
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
          ))
        )}
      </div>
    </div>
  )
}

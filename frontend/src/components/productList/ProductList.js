import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import logger from 'use-reducer-logger'

import Product from '../Product/Product'

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
            <div
              key={pro.slug}
              className='product col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-5'
            >
              <Product product={pro} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

import React, { useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

import './ProductDetail.scss'
import Rating from '../rating/Rating'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default function ProductDetail() {
  const params = useParams()
  const { slug } = params

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get(`/api/products/slug/${slug}`)
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })
      }
    }

    fetchData()
  }, [slug])

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className='container product-detail'>
          <div className='row my-2'>
            <div className='col-sm-12 col-lg-4 col-xl-4'>
              <img src={product.image} alt='' className='img-fluid' />
            </div>
            <div className='col-sm-12 col-lg-6 col-xl-6'>
              <h2>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                {product.name}
              </h2>
              <Rating rating={product.rating} numReviews={product.numReviews} />
              <p>Price: ${product.price}</p>
              <p>Description: {product.description}</p>
              <div className='status'>
                <p>Status:</p>
                {product.countInStock > 0 ? (
                  <div className='instock'>In Stock</div>
                ) : (
                  <div className='empty'>Empty</div>
                )}
              </div>
              <div>
                {product.countInStock > 0 ? (
                  <button className='btn btn-success mt-4'>Add to card</button>
                ) : (
                  <button className='btn btn-danger mt-4' disabled>
                    Add to card
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import React, { useEffect, useReducer, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from 'react-helmet-async'

import './ProductDetail.scss'
import Rating from '../rating/Rating'
import Loading from '../loading/Loading'
import MessageBox from '../messageBox/MessageBox'
import { getError } from '../../utilities'
import { Store } from '../../Store'

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
        dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
      }
    }

    fetchData()
  }, [slug])

  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { cart } = state

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await axios.get(`/api/products/${product._id}`)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    })
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox message={error} />
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
                  <button
                    className='btn btn-success mt-4'
                    onClick={addToCartHandler}
                  >
                    Add to card
                  </button>
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

import React, { useContext, useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Col, Row, Button, Modal, Form } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { Store } from '../Store'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true }
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      }
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false }

    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false }
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      }
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false }

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false }
    default:
      return state
  }
}

export default function ProductListScreen() {
  const [showAddProModal, setShowAddProModal] = useState(false)
  const handleCloseAddProModal = () => setShowAddProModal(false)
  const handleShowAddProModal = () => setShowAddProModal(true)

  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productCategory, setProductCategory] = useState('')
  const [productBrand, setProductBrand] = useState('')
  const [productStock, setProductStock] = useState(0)
  const [productDescr, setProductDescr] = useState('')

  const [imageSelected, setImageSelected] = useState()
  const [imageSelectedUrl, setImageSelectedUrl] = useState('')

  const uploadImage = () => {
    const formData = new FormData()
    formData.append('file', imageSelected)
    formData.append('upload_preset', 'clothes')

    axios
      .post('https://api.cloudinary.com/v1_1/imthanhluan/upload', formData)
      .then((res) => {
        setImageSelectedUrl(res.data.url)
      })
  }

  useEffect(() => {
    uploadImage()
  }, [imageSelected])

  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: '',
  })

  const navigate = useNavigate()
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const page = sp.get('page') || 1

  const { state } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page} `, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })

        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      } catch (err) {}
    }

    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' })
    } else {
      fetchData()
    }
  }, [page, userInfo, successDelete])

  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' })
        const newPro = {
          name: productName,
          slug: 'sample-name-' + Date.now(),
          category: productCategory,
          image: imageSelectedUrl,
          price: productPrice,
          countInStock: productStock,
          brand: productBrand,
          description: productDescr,
          rating: 0,
          numReviews: 0,
        }

        await axios.post('/api/products', newPro, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })

        toast.success('product created successfully')
        handleCloseAddProModal()
        dispatch({ type: 'CREATE_SUCCESS' })
      } catch (err) {
        toast.error(getError(error))
        dispatch({
          type: 'CREATE_FAIL',
        })
      }
    }
  }

  const deleteHandler = async (product) => {
    if (window.confirm('Are you sure to delete?')) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        })
        toast.success('product deleted successfully')
        dispatch({ type: 'DELETE_SUCCESS' })
      } catch (err) {
        toast.error(getError(error))
        dispatch({
          type: 'DELETE_FAIL',
        })
      }
    }
  }

  return (
    <div style={{ marginTop: '70px' }}>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='col text-end'>
          <div>
            <Button type='button' onClick={handleShowAddProModal}>
              Create Product
            </Button>
          </div>
        </Col>
      </Row>

      <Modal show={showAddProModal} onHide={handleCloseAddProModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mt-2' controlId='productName'>
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product name...'
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mt-2' controlId='productPrice'>
              <Form.Label>Product price</Form.Label>
              <Form.Control
                type='number'
                placeholder='$'
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mt-2' controlId='productCate'>
              <Form.Label>Product category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product category'
                onChange={(e) => setProductCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mt-2' controlId='productBrand'>
              <Form.Label>Product brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter product brand'
                onChange={(e) => setProductBrand(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mt-2' controlId='productStock'>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter stock'
                onChange={(e) => setProductStock(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mt-2' controlId='productStock'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                onChange={(e) => setProductDescr(e.target.value)}
              />
            </Form.Group>
            <Form.Group className='mt-2' controlId='productImage'>
              <Form.Label>Product photo</Form.Label>
              <Form.Control
                type='file'
                onChange={(e) => setImageSelected(e.target.files[0])}
              />
            </Form.Group>
            {imageSelected && (
              <div className='w-100 text-center'>
                <img
                  src={imageSelectedUrl}
                  alt='productimg'
                  className='mt-2 w-25 img-fluid'
                />
              </div>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseAddProModal}>
            Close
          </Button>
          <Button variant='success' onClick={createHandler}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
          <table className='table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => navigate(`/admin/product/${product._id}`)}
                    >
                      Edit
                    </Button>
                    &nbsp;
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === Number(page) ? 'btn text-bold' : 'btn'}
                key={x + 1}
                to={`/admin/products?page=${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

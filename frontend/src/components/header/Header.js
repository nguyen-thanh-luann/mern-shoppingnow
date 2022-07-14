import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Store } from '../../Store'

import './Header.scss'

export default function Header() {
  const { state } = useContext(Store)
  const { cart } = state
  return (
    <header className='header'>
      <Link to='/' className='header-title'>
        shoppingnow
      </Link>
      <Link to='/cart' className='position-relative'>
        <i className='fa-solid fa-cart-shopping text-dark fs-5'></i>
        <span className='position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1'>
          {cart.cartItems.length > 0 && (
            <span>{cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</span>
          )}
        </span>
      </Link>
    </header>
  )
}

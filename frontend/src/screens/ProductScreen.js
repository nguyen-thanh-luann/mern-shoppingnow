import React from 'react'
import { useParams } from 'react-router-dom'

import Header from '../components/header/Header'

export default function ProductScreen() {
  const params = useParams()
  const { slug } = params
  return (
    <div>
      <Header />
      <div className='container'>
        <h1>{slug}</h1>
      </div>
    </div>
  )
}

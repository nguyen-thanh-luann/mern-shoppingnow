import React from 'react'
import Header from '../components/header/Header'
import { Helmet } from 'react-helmet-async'
import ProductList from '../components/productList/ProductList'
export default function HomeScreen() {
  return (
    <div>
      <Header />
      <Helmet>
        <title>Shopping now</title>
      </Helmet>
      HomeScreen
      <ProductList />
    </div>
  )
}

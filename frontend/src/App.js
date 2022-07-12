import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeScreen />}></Route>
        <Route path='/product/:slug' element={<ProductScreen />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import { Routes, Route } from 'react-router-dom'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'
import './App.css'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </main>
  )
}

export default App
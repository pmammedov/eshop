import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://127.0.0.1:8000/api/products/'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load products')
        return response.json()
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading products...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <main>
      <h1>eShop</h1>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">£{product.price}</p>
            <p>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
          </article>
        ))}
      </div>
    </main>
  )
}

export default App
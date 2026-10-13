import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_URL = 'http://127.0.0.1:8000/api/products/'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}${id}/`)
      .then((response) => {
        if (response.status === 404) throw new Error('Product not found')
        if (!response.ok) throw new Error('Failed to load product')
        return response.json()
      })
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p>Loading product...</p>
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <Link to="/">Back to shop</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/">← Back to shop</Link>
      <article className="product-detail">
        <img src={product.image_url} alt={product.name} />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">£{product.price}</p>
        <p>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
      </article>
    </div>
  )
}

export default ProductDetail
import { useEffect, useState } from 'react'
import type { Product } from '../types/product'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/products.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
        setLoading(false)
      })
      .catch((err: Error) => {
        console.error('Failed to fetch products', err)
        setLoading(false)
      })
  }, [])

  return { products, loading }
}

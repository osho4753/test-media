import { render, screen } from '@testing-library/react'
import { ProductCard } from './ProductCard'
import type { Product } from '../../types/product'

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: '1',
    title: 'Test Product',
    content: 'Description of product',
    price: 1999,
    brand: 'Apple',
    categories: ['Phones', 'New'],
    image: 'https://example.com/image.jpg',
    url: 'https://example.com/product',
  }

  it('renders product data correctly', () => {
    render(<ProductCard product={mockProduct} index={0} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Description of product')).toBeInTheDocument()
    expect(screen.getByText(/1999 Kč/)).toBeInTheDocument()

    const image = screen.getByAltText('Test Product') as HTMLImageElement
    expect(image).toBeInTheDocument()
    expect(image.src).toBe(mockProduct.image)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', mockProduct.url)
  })
})

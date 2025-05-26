import { filterAndSortProducts, paginate, toggleItem } from './productHelpers'
import type { Product } from '../types/product'
import { generatePagination } from './paginationHelpers'

const products: Product[] = [
  {
    id: '1',
    title: 'Apple iPhone',
    content: 'Smartphone from Apple',
    price: 1000,
    brand: 'Apple',
    categories: ['phones', 'electronics'],
    url: '',
    image: '',
  },
  {
    id: '2',
    title: 'Samsung TV',
    content: 'Smart TV',
    price: 500,
    brand: 'Samsung',
    categories: ['tv', 'electronics'],
    url: '',
    image: '',
  },
  {
    id: '3',
    title: 'Apple MacBook',
    content: 'Laptop from Apple',
    price: 1500,
    brand: 'Apple',
    categories: ['laptops', 'electronics'],
    url: '',
    image: '',
  },
]

describe('filterAndSortProducts', () => {
  it('filters by search term (case insensitive)', () => {
    const result = filterAndSortProducts(products, 'apple', 0, 2000, '', [], [])
    expect(result.length).toBe(2)
  })

  it('filters by selected brands', () => {
    const result = filterAndSortProducts(
      products,
      '',
      0,
      2000,
      '',
      ['Samsung'],
      []
    )
    expect(result.length).toBe(1)
    expect(result[0].brand).toBe('Samsung')
  })

  it('filters by category', () => {
    const result = filterAndSortProducts(
      products,
      '',
      0,
      2000,
      '',
      [],
      ['phones']
    )
    expect(result.length).toBe(1)
    expect(result[0].categories).toContain('phones')
  })

  it('filters by price range', () => {
    const result = filterAndSortProducts(products, '', 600, 1600, '', [], [])
    expect(result.length).toBe(2)
  })

  it('sorts by price ascending', () => {
    const result = filterAndSortProducts(
      products,
      '',
      0,
      2000,
      'price-asc',
      [],
      []
    )
    expect(result[0].price).toBeLessThanOrEqual(result[1].price)
  })

  it('sorts by price descending', () => {
    const result = filterAndSortProducts(
      products,
      '',
      0,
      2000,
      'price-desc',
      [],
      []
    )
    expect(result[0].price).toBeGreaterThanOrEqual(result[1].price)
  })
})

describe('paginate', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  it('returns correct page items', () => {
    expect(paginate(items, 1, 3)).toEqual([1, 2, 3])
    expect(paginate(items, 2, 3)).toEqual([4, 5, 6])
    expect(paginate(items, 3, 3)).toEqual([7, 8, 9])
    expect(paginate(items, 4, 3)).toEqual([])
  })
})

describe('toggleItem', () => {
  it('adds item if not present', () => {
    expect(toggleItem([1, 2], 3)).toEqual([1, 2, 3])
  })

  it('removes item if present', () => {
    expect(toggleItem([1, 2, 3], 2)).toEqual([1, 3])
  })
})
describe('generatePagination', () => {
  it('shows all pages if totalPages less than maxVisible', () => {
    expect(generatePagination(1, 5, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('adds ellipsis when pages in middle', () => {
    expect(generatePagination(5, 10, 5)).toEqual([
      1,
      '...',
      3,
      4,
      5,
      6,
      7,
      '...',
      10,
    ])
  })

  it('shows first pages and ellipsis if current page near start', () => {
    expect(generatePagination(2, 10, 5)).toEqual([1, 2, 3, 4, 5, '...', 10])
  })

  it('shows last pages and ellipsis if current page near end', () => {
    expect(generatePagination(9, 10, 5)).toEqual([1, '...', 6, 7, 8, 9, 10])
  })

  it('only first page if totalPages is 1', () => {
    expect(generatePagination(1, 1, 5)).toEqual([1])
  })

  it('handles edge case with small maxVisible', () => {
    expect(generatePagination(5, 10, 3)).toEqual([1, '...', 4, 5, 6, '...', 10])
  })
})

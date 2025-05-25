import type { Product } from '../types/product'

export function filterAndSortProducts(
  products: Product[],
  search: string,
  minPrice: number,
  maxPrice: number,
  sort: string,
  selectedBrands: string[]
): Product[] {
  let result = [...products]
  if (search.trim()) {
    const lower = search.toLowerCase()
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.content.toLowerCase().includes(lower)
    )
  }
  if (selectedBrands.length > 0) {
    result = result.filter((p) => selectedBrands.includes(p.brand))
  }
  result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice)

  if (sort === 'price-asc') {
    result.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
}

export function paginate<T>(items: T[], page: number, perPage: number): T[] {
  const start = (page - 1) * perPage
  return items.slice(start, start + perPage)
}

export function toggleItem<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
}

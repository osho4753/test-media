import { useMemo } from 'react'

export function useCategoryList(products: { categories: string[] }[]) {
  return useMemo(() => {
    const allCategories = Array.from(
      new Set(
        products
          .flatMap((p) => p.categories)
          .flatMap((cat) => cat.split(' | '))
          .map((cat) => cat.trim())
      )
    ).sort()
    return allCategories
  }, [products])
}

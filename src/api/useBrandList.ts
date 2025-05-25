import { useMemo } from 'react'

export function useBrandList(products: { brand: string }[]) {
  return useMemo(() => {
    const allBrands = products.map((p) => p.brand)
    return Array.from(new Set(allBrands)).sort()
  }, [products])
}

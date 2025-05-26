import { useMemo } from 'react'

export function useBrandList(products: string[]) {
  return useMemo(() => {
    return Array.from(new Set(products)).sort()
  }, [products])
}

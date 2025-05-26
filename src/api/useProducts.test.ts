import { renderHook, waitFor } from '@testing-library/react'
import { useProducts } from './useProducts'
import { vi } from 'vitest'

describe('useProducts', () => {
  const mockProducts = [
    { id: 1, title: 'Product 1' },
    { id: 2, title: 'Product 2' },
  ]

  beforeEach(() => {
    const mockFetch: typeof fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      } as Response)
    )

    global.fetch = mockFetch
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('fetches products and updates state', async () => {
    const { result } = renderHook(() => useProducts())

    expect(result.current.loading).toBe(true)
    expect(result.current.products).toEqual([])

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products).toEqual(mockProducts)
  })

  it('handles fetch error', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('fail')))

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})

    const { result } = renderHook(() => useProducts())

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.products).toEqual([])
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Failed to fetch products'),
      expect.any(Error)
    )

    consoleErrorSpy.mockRestore()
  })
})

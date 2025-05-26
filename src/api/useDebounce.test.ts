import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'
import { vi } from 'vitest'

vi.useFakeTimers()

describe('useDebounce', () => {
  it('should update debounced value after delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'hello', delay: 500 },
      }
    )

    expect(result.current).toBe('hello')

    rerender({ value: 'world', delay: 500 })
    expect(result.current).toBe('hello')
    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('world')
  })

  it('should clear previous timeout if value changes fast', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 500 },
      }
    )

    rerender({ value: 'second', delay: 500 })
    rerender({ value: 'third', delay: 500 })

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(result.current).toBe('third')
  })
})

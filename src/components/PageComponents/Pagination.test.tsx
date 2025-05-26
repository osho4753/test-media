import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination' // путь к компоненту
import { vi } from 'vitest'

describe('Pagination component', () => {
  it('renders correct number of page buttons and arrows', () => {
    const mockChange = vi.fn()

    render(
      <Pagination currentPage={3} totalPages={7} onPageChange={mockChange} />
    )

    expect(screen.getByText('3')).toHaveClass('bg-green-500')
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
  })

  it('calls onPageChange with correct value when clicking pages or arrows', async () => {
    const mockChange = vi.fn()
    render(
      <Pagination currentPage={3} totalPages={7} onPageChange={mockChange} />
    )

    await userEvent.click(screen.getByText('2'))
    expect(mockChange).toHaveBeenCalledWith(2)

    await userEvent.click(screen.getByText('→'))
    expect(mockChange).toHaveBeenCalledWith(4)

    await userEvent.click(screen.getByText('←'))
    expect(mockChange).toHaveBeenCalledWith(2)
  })

  it('does not render ← on first page or → on last', () => {
    const mockChange = vi.fn()

    const { rerender } = render(
      <Pagination currentPage={1} totalPages={5} onPageChange={mockChange} />
    )
    expect(screen.queryByText('←')).not.toBeInTheDocument()

    rerender(
      <Pagination currentPage={5} totalPages={5} onPageChange={mockChange} />
    )
    expect(screen.queryByText('→')).not.toBeInTheDocument()
  })
})

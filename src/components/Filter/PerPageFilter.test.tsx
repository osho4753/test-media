import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PerPageFilter from './PerPageFilter'
import { vi } from 'vitest'

describe('PerPageFilter', () => {
  it('renders select with correct initial value', () => {
    render(<PerPageFilter value={24} onChange={() => {}} />)
    const select = screen.getByRole('combobox') as HTMLSelectElement
    expect(select.value).toBe('24')
  })

  it('calls onChange with correct value when user selects option', async () => {
    const onChange = vi.fn()
    render(<PerPageFilter value={12} onChange={onChange} />)
    const select = screen.getByRole('combobox')

    await userEvent.selectOptions(select, '36')
    expect(onChange).toHaveBeenCalledWith(36)
  })
})

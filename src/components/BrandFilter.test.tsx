import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BrandFilter from './BrandFilter'

describe('BrandFilter', () => {
  it('отображает чекбоксы и реагирует на выбор', async () => {
    const onChange = vi.fn()
    render(
      <BrandFilter
        value={['Apple', 'Samsung']}
        selected={[]}
        onChange={onChange}
      />
    )

    const checkbox = screen.getByLabelText('Apple')
    await userEvent.click(checkbox)

    expect(onChange).toHaveBeenCalledWith(['Apple'])
  })
})

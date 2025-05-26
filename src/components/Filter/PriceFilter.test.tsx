import { render, screen } from '@testing-library/react'
import { PriceFilter } from './PriceFilter'

describe('PriceFilter', () => {
  it('renders input fields with correct initial values', () => {
    render(
      <PriceFilter
        min={0}
        max={0}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    )

    const minInput = screen.getByPlaceholderText(
      'Price from'
    ) as HTMLInputElement
    const maxInput = screen.getByPlaceholderText('Price to') as HTMLInputElement
    expect(minInput.value).toBe('')
    expect(maxInput.value).toBe('')
  })

  it('renders min and max values if not zero', () => {
    render(
      <PriceFilter
        min={100}
        max={200}
        onMinChange={() => {}}
        onMaxChange={() => {}}
      />
    )

    const minInput = screen.getByPlaceholderText(
      'Price from'
    ) as HTMLInputElement
    const maxInput = screen.getByPlaceholderText('Price to') as HTMLInputElement

    expect(minInput.value).toBe('100')
    expect(maxInput.value).toBe('200')
  })
})

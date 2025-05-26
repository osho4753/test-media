import { toggleItem } from '../../utils/productHelpers'
import { useBrandList } from '../../api/useBrandList'
import { useState } from 'react'
interface Props {
  value: string[]
  selected: string[]
  onChange: (brands: string[]) => void
}
export default function BrandFilter({ value, selected, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  const brands = useBrandList(value)

  const toggleBrand = (brand: string) => {
    onChange(toggleItem(selected, brand))
  }
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center font-semibold text-lg mb-2"
      >
        Select Brands
        <span>{isOpen ? '🡅' : '🡇'}</span>
      </button>
      {isOpen && (
        <div className="flex-column items-center mb-4">
          {brands.map((brand, index) => (
            <div key={brand} className="flex items-center me-4">
              <input
                id={`checkbox-${index}`}
                type="checkbox"
                value=""
                onChange={() => toggleBrand(brand)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={`checkbox-${index}`}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

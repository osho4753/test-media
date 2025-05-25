import type { Product } from '../types/product'
import { toggleItem } from '../utils/productHelpers'
import { useState } from 'react'
import { useCategoryList } from '../api/useCategoryList'
interface Props {
  value: Product[]
  selected: string[]
  onChange: (categories: string[]) => void
}
export default function CategoryFilter({ value, selected, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(true)

  const categories = useCategoryList(value)

  const toggleCategory = (categories: string) => {
    onChange(toggleItem(selected, categories))
  }
  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center font-semibold text-lg mb-2"
      >
        Select Categories
        <span>{isOpen ? '🡅' : '🡇'}</span>
      </button>
      {isOpen && (
        <div className="flex-column items-center mb-4">
          {categories.map((cat, index) => (
            <div key={cat} className="flex items-center me-4">
              <input
                id={`checkbox-${index}`}
                type="checkbox"
                value=""
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor={`checkbox-${index}`}
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

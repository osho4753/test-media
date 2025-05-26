import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { SortSelect } from '../components/SortSelect'
import { PriceFilter } from '../components/PriceFilter'
import { Pagination } from '../components/Pagination'
import { useDebounce } from '../api/useDebounce'
import { useProducts } from '../api/useProducts'
import PerPageFilter from '../components/PerPageFilter'
import { filterAndSortProducts, paginate } from '../utils/productHelpers'
import BrandFilter from '../components/BrandFilter'
import CategoryFilter from '../components/CategoryFilter'

function MainPage() {
  const { products, loading } = useProducts()
  const [itemPerPage, setItemPerPage] = useState(12)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [sort, setSort] = useState('relevance')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)
  const [page, setPage] = useState(1)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string[]>([])

  const filtered = useMemo(() => {
    return filterAndSortProducts(
      products,
      debouncedSearch,
      minPrice,
      maxPrice,
      sort,
      selectedBrands,
      selectedCategory
    )
  }, [
    products,
    debouncedSearch,
    minPrice,
    maxPrice,
    sort,
    selectedBrands,
    selectedCategory,
  ])

  const paginated = useMemo(() => {
    return paginate(filtered, page, itemPerPage)
  }, [filtered, page, itemPerPage])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, minPrice, maxPrice, sort, selectedBrands])

  const totalPages = Math.ceil(filtered.length / itemPerPage)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex lg:sticky items-center justify-end gap-4 mb-6">
        <h1 className="text-3xl font-bold mb-6">Find Products</h1>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-6">
          <h1 className="text-3xl font-bold ">Filters</h1>
          <div className="bg-white p-4 rounded shadow space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-2">Price Range</h2>
              <PriceFilter
                min={isFinite(minPrice) ? minPrice : 0}
                max={isFinite(maxPrice) ? maxPrice : 0}
                onMinChange={setMinPrice}
                onMaxChange={(val) => setMaxPrice(val || Infinity)}
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Sort</h2>
              <SortSelect value={sort} onChange={setSort} />
            </div>
            <div>
              <BrandFilter
                value={products.map((p) => p.brand)}
                selected={selectedBrands}
                onChange={setSelectedBrands}
              />{' '}
            </div>
            <div>
              <CategoryFilter
                value={products}
                selected={selectedCategory}
                onChange={setSelectedCategory}
              />{' '}
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Items per page</h2>
              <PerPageFilter value={itemPerPage} onChange={setItemPerPage} />
            </div>
          </div>
        </aside>
        <main className="flex-1">
          {loading ? (
            <p className="mt-10 text-center text-gray-500">Loading...</p>
          ) : filtered.length === 0 ? (
            <p className="mt-10 text-center text-gray-500">
              There are no products
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginated.map((p, index) => (
                  <ProductCard key={index} product={p} index={index} />
                ))}
              </div>

              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </main>
      </div>
    </div>
  )
}

export default MainPage

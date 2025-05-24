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

function MainPage() {
  const { products, loading } = useProducts()
  const [itemPerPage, setItemPerPage] = useState(12)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [sort, setSort] = useState('relevance')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(Infinity)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return filterAndSortProducts(
      products,
      debouncedSearch,
      minPrice,
      maxPrice,
      sort
    )
  }, [products, debouncedSearch, minPrice, maxPrice, sort])

  const paginated = useMemo(() => {
    return paginate(filtered, page, itemPerPage)
  }, [filtered, page, itemPerPage])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, minPrice, maxPrice, sort])

  const totalPages = Math.ceil(filtered.length / itemPerPage)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <SearchBar value={search} onChange={setSearch} />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PerPageFilter value={itemPerPage} onChange={setItemPerPage} />
        <PriceFilter
          min={isFinite(minPrice) ? minPrice : 0}
          max={isFinite(maxPrice) ? maxPrice : 0}
          onMinChange={setMinPrice}
          onMaxChange={(val) => setMaxPrice(val || Infinity)}
        />
        <SortSelect value={sort} onChange={setSort} />
      </div>
      {loading ? (
        <p className="mt-10 text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {filtered.length === 0 ? (
            <p className="mt-10 text-center text-gray-500">
              There are no products
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {paginated.map((p, index) => (
                  <ProductCard key={index} product={p} />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </>
      )}
    </div>
  )
}

export default MainPage

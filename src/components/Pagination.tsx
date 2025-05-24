import { generatePagination } from '../utils/paginationHelpers'

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  const pages = generatePagination(currentPage, totalPages, 5)

  return (
    <div className="flex justify-center gap-2 mt-6 items-center">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-1 border rounded"
        >
          ←
        </button>
      )}

      {pages.map((p, index) =>
        p === '...' ? (
          <span key={`ellipsis-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 border rounded ${
              currentPage === p ? 'bg-green-500 text-white' : ''
            }`}
          >
            {p}
          </button>
        )
      )}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-1 border rounded"
        >
          →
        </button>
      )}
    </div>
  )
}

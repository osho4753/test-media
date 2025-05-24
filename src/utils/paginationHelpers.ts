export function generatePagination(
  currentPage: number,
  totalPages: number,
  maxVisible: number
): (number | '...')[] {
  const pages: (number | '...')[] = []
  const half = Math.floor(maxVisible / 2)

  let start = Math.max(2, currentPage - half)
  let end = Math.min(totalPages - 1, currentPage + half)

  if (currentPage <= half + 1) {
    start = 2
    end = Math.min(totalPages - 1, maxVisible)
  }

  if (currentPage >= totalPages - half) {
    start = Math.max(2, totalPages - maxVisible + 1)
    end = totalPages - 1
  }

  pages.push(1)

  if (start > 2) pages.push('...')

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  if (end < totalPages - 1) pages.push('...')

  if (totalPages > 1) pages.push(totalPages)

  return pages
}

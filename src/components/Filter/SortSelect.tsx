interface Props {
  value: string
  onChange: (value: string) => void
}

export const SortSelect = ({ value, onChange }: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded mb-4"
    >
      <option value="relecance">Relevance</option>
      <option value="price-asc">Price ↑</option>
      <option value="price-desc">Price ↓</option>
    </select>
  )
}

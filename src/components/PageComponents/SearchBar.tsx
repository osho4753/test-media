interface Props {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="🔍 Search products..."
      className="w-120 p-2 border border-black/30 rounded mb-4"
    />
  )
}

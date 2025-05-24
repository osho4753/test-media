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
      placeholder="Find products..."
      className="w-full p-2 border rounded mb-4"
    />
  )
}

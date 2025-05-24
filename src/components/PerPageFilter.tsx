interface Props {
  value: number
  onChange: (value: number) => void
}

export default function PerPageFilter({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <select
        id="items-per-page"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="p-2 border rounded"
      >
        <option value={12}>12</option>
        <option value={24}>24</option>
        <option value={36}>36</option>
      </select>
    </div>
  )
}

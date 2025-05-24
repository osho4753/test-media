interface Props {
  min: number
  max: number
  onMinChange: (val: number) => void
  onMaxChange: (val: number) => void
}

export const PriceFilter = ({ min, max, onMinChange, onMaxChange }: Props) => {
  return (
    <div className="flex flex-col gap-2 ">
      <div className="flex gap-2 mb-4 mr-12">
        <input
          type="number"
          placeholder="Price from"
          value={min === 0 ? '' : min}
          onChange={(e) => onMinChange(Number(e.target.value))}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Price to"
          value={max === 0 ? '' : max}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          className="p-2 border rounded w-full"
        />
      </div>
    </div>
  )
}

import type { Product } from '../types/product'

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white-700">
      <a href={product.url} target="_blank" rel="noopener noreferrer">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain mb-4"
        />
        <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
        <p className="text-sm text-gray-600 mb-2">{product.content}</p>
        <p className="text-xl font-bold text-green-600">{product.price} Kč</p>
      </a>
    </div>
  )
}

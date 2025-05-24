import type { Product } from '../types/product'
import { motion } from 'framer-motion'

interface Props {
  product: Product
  index: number
}

export const ProductCard = ({ product, index }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className="border rounded-lg p-4 shadow-sm transition-transform duration-300 transform hover:scale-105"
    >
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
    </motion.div>
  )
}

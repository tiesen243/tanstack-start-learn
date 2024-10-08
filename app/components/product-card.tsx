import { Link } from '@tanstack/react-router'

import { cn } from '@/lib/utils'
import { Badge } from './ui/badge'
import { Card, CardDescription, CardTitle } from './ui/card'

interface ProductCardProps {
  product: { id: string; image: string; name: string; price: number; category: { name: string } }
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => (
  <Card
    className={cn('group/product aspect-square h-auto w-full overflow-hidden', className)}
    asChild
  >
    <Link to="/$id" params={{ id: product.id }}>
      <img
        src={product.image}
        alt={product.name}
        className="aspect-square w-full object-cover transition-all ease-linear hover:border-secondary group-hover/product:scale-110 group-hover/product:brightness-75"
      />

      <div className="absolute bottom-0 left-0 flex w-full flex-col gap-2 rounded-b-lg bg-secondary p-6 transition-colors ease-linear group-hover/product:bg-secondary/90">
        <div className="flex items-center gap-2">
          <Badge>{product.category.name}</Badge>
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        </div>
        <CardDescription>${product.price}</CardDescription>
      </div>
    </Link>
  </Card>
)

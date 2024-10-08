import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { ProductCard } from '@/components/product-card'
import { productsQuery } from '@/lib/api/product'

export const Route = createFileRoute('/')({
  loader: ({ context }) => {
    void context.queryClient.ensureQueryData(productsQuery())
  },
  component: () => {
    const { data, isLoading } = useSuspenseQuery(productsQuery())

    return (
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {isLoading
          ? 'Loading...'
          : data?.products.map((product) => <ProductCard key={product.id} product={product} />)}
      </section>
    )
  },
})

import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { Card, CardDescription, CardFooter, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const Route = createFileRoute('/')({
  component: () => {
    const { data, isLoading } = useQuery({
      queryKey: ['products'],
      queryFn: async () => {
        const products = await fetch(
          `https://yuki.tiesen.id.vn/api/trpc/product.getAll?input={"json":{}}`,
        )
        const json = (await products.json()) as {
          result: { data: { json: { products: Product[]; totalPage: number } } }
        }

        return json.result.data.json
      },
    })

    return (
      <section className="grid grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="h-auto w-full">
                <Skeleton className="aspect-[2/3] w-full" />
                <CardFooter className="flex-col items-start gap-2 pt-4">
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-6 w-1/3" />
                </CardFooter>
              </Card>
            ))
          : data?.products.map((product) => (
              <Card key={product.id} className="h-auto w-full border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-[2/3] h-auto w-full rounded-t-lg object-cover"
                />
                <CardFooter className="flex-col items-start gap-2 pt-4">
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>${product.price}</CardDescription>
                </CardFooter>
              </Card>
            ))}
      </section>
    )
  },
})

interface Product {
  id: string
  name: string
  image: string
  price: number
}

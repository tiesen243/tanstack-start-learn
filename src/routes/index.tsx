import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  loader: async () => {
    const products = await fetch(
      `https://yuki.tiesen.id.vn/api/trpc/product.getAll?input={"json":{}}`,
    )
    const json = (await products.json()) as {
      result: { data: { json: { products: Product[]; totalPage: number } } }
    }

    return json.result.data.json
  },
  staleTime: Infinity,
  component: HomeComponent,
})

function HomeComponent() {
  const { products } = Route.useLoaderData()

  return (
    <section className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="h-auto w-full border">
          <h2>{product.name}</h2>
          <img src={product.image} alt={product.name} />
          <p>${product.price}</p>
        </div>
      ))}
    </section>
  )
}

interface Product {
  id: string
  name: string
  image: string
  price: number
}

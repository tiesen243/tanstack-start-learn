import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Marquee } from '@/components/ui/marquee'
import { Typography } from '@/components/ui/typography'
import { productQuery } from '@/lib/api/product'

export const Route = createFileRoute('/$id')({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(productQuery(params.id))
    return data
  },
  meta: ({ loaderData }) => [
    { title: `${loaderData.product.name} - Yuki` },
    { name: 'description', content: loaderData.product.description },
    { name: 'og:image', content: loaderData.product.image },
  ],

  component: () => {
    const { id } = Route.useParams()
    const { data } = useSuspenseQuery(productQuery(id))

    const { product, relatedProducts } = data

    return (
      <>
        <section className="grid gap-4 md:grid-cols-12 md:gap-8">
          <img
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="h-auto w-full rounded-lg object-cover md:col-span-4"
          />

          <article className="flex h-full flex-col md:col-span-8">
            <Typography level="h2">{product.name}</Typography>

            <Typography className="max-h-[300px] overflow-y-auto pr-2">
              {product.description?.split('\\n').map((p, idx) => (
                <span key={idx}>
                  {p}
                  <br />
                </span>
              ))}
            </Typography>

            <div className="flex-1" />

            <Typography>
              <strong>Category:</strong> {product.category.name}
            </Typography>

            <Typography className="flex justify-between">
              <span>
                <strong>Price:</strong> ${product.price}
              </span>
              <span>
                <strong>Stock:</strong> {product.stock}
              </span>
            </Typography>

            <Button className="mt-4 w-full">Add to Cart</Button>
          </article>
        </section>

        <section className="mt-8 flex items-center gap-8 rounded-lg border p-6 shadow-md">
          <img
            src={product.owner.avatar ?? product.owner.discord?.avatar ?? ''}
            alt={product.owner.name}
            width={100}
            height={100}
            className="aspect-square rounded-full"
          />

          <article className="flex-1">
            <Typography level="h4">
              {product.owner.name}{' '}
              {product.owner.discord && (
                <span className="text-base font-medium text-muted-foreground">
                  #{product.owner.discord.username}
                </span>
              )}
            </Typography>

            <Typography>
              <strong>Joined at:</strong> {new Date(product.owner.createdAt).toDateString()}
            </Typography>
          </article>

          <div className="flex flex-col gap-2">
            <Button>Profile</Button>

            <Button variant="outline" asChild>
              <a
                href={
                  product.owner.discord
                    ? `https://discord.com/users/${product.owner.discord.id}`
                    : `mailto:${product.owner.email}`
                }
                target="_blank"
                rel="noreferrer noopener"
              >
                Message
              </a>
            </Button>
          </div>
        </section>

        <section className="mt-8">
          <Typography level="h3">Related Products</Typography>

          <Marquee>
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} className="" />
            ))}
          </Marquee>
        </section>
      </>
    )
  },
})

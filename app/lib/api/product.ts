import { queryOptions } from '@tanstack/react-query'
import { createServerFn } from '@tanstack/start'

export const getProducts = createServerFn('GET', async () => {
  const products = await fetch(
    `https://yuki.tiesen.id.vn/api/trpc/product.getAll?input={"json":{}}`,
  )
  const json = (await products.json()) as {
    result: { data: { json: { products: Product[]; totalPage: number } } }
  }

  return json.result.data.json
})

export const productsQuery = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  })

export const getProduct = createServerFn('GET', async (id: string) => {
  const product = await fetch(
    `https://yuki.tiesen.id.vn/api/trpc/product.getOne?input={"json":{"id":"${id}"}}`,
  )
  const json = (await product.json()) as {
    result: { data: { json: Product } }
  }

  return json.result.data.json
})

export const productQuery = (id: string) =>
  queryOptions({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  })

interface Product {
  id: string
  name: string
  image: string
  price: number
}

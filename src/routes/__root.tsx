import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRoute, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ThemeProvider } from 'next-themes'

import { Header } from '@/components/header'
import { createQueryClient } from '@/lib/query-client'

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
      <QueryClientProvider client={getQueryClient()}>
        <Header />

        <main className="container py-4">
          <Outlet />
        </main>

        <ScrollRestoration />

        {import.meta.env.DEV && (
          <>
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
            <TanStackRouterDevtools initialIsOpen={false} position="bottom-left" />
          </>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  ),
})

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
  if (typeof window === 'undefined') {
    // Server: always make a new query client
    return createQueryClient()
  } else {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient())
  }
}

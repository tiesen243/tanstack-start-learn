import type { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet, ScrollRestoration } from '@tanstack/react-router'
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start'
import { ThemeProvider } from 'next-themes'

import { Header } from '@/components/header'
import appCss from '@/routes/globals.css?url'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  meta: () => [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { title: 'Yuki' },
  ],
  links: () => [
    { rel: 'stylesheet', href: appCss },
    { rel: 'icon', type: 'image/x-icon', href: 'https://tiesen.id.vn/favicon.ico' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
    },
  ],
  component: () => (
    <Html>
      <Head>
        <Meta />
      </Head>

      <Body className="min-h-dvh font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <Header />

          <main className="container py-4">
            <Outlet />
          </main>
        </ThemeProvider>

        <ScrollRestoration />
        <Scripts />
      </Body>
    </Html>
  ),
})

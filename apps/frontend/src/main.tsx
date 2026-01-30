import './index.css'
import { ErrorBoundary } from '@/components/error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient()

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ErrorBoundary
        fallback={({ error, reset }) => (
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="max-w-md space-y-4 text-center">
              <h1 className="text-2xl font-bold text-red-600">Application Error</h1>
              <pre className="overflow-auto rounded bg-red-50 p-3 text-left text-sm text-red-800">
                {error.message}
              </pre>
              <button
                onClick={reset}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Try again
              </button>
            </div>
          </div>
        )}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>,
  )
}

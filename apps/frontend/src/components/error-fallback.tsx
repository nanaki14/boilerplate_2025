import { useRouter } from '@tanstack/react-router'

export function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <div className="max-w-md space-y-4 text-center">
        <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
        <pre className="overflow-auto rounded bg-red-50 p-3 text-left text-sm text-red-800">
          {error.message}
        </pre>
        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
          >
            Try again
          </button>
          <button
            onClick={() => router.navigate({ to: '/' })}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}

export function NotFound() {
  const router = useRouter()

  return (
    <div className="flex min-h-[50vh] items-center justify-center p-4">
      <div className="space-y-4 text-center">
        <h2 className="text-6xl font-bold text-gray-300">404</h2>
        <p className="text-lg text-gray-600">Page not found</p>
        <button
          onClick={() => router.navigate({ to: '/' })}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go home
        </button>
      </div>
    </div>
  )
}

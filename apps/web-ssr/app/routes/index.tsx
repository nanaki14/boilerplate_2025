import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn().handler(() => {
  return { time: new Date().toISOString() }
})

export const Route = createFileRoute('/')({
  loader: async () => {
    return await getServerTime()
  },
  component: Index,
})

function Index() {
  const { time } = Route.useLoaderData()

  return (
    <div className="p-2">
      <h3 className="text-2xl font-bold">Welcome Home!</h3>
      <p className="mt-2 text-gray-600">
        Server rendered at: <code className="rounded bg-gray-100 px-1">{time}</code>
      </p>
    </div>
  )
}

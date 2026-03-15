import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { CreateUserForm } from './-components/create-user-form'
import { UserList } from './-components/user-list'

const API_BASE_URL = process.env['API_BASE_URL'] ?? 'http://localhost:3001'

export const fetchUsers = createServerFn().handler(async () => {
  const res = await fetch(`${API_BASE_URL}/api/users`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json() as Promise<{ users: Array<{ id: string; name: string; email: string }> }>
})

export const Route = createFileRoute('/users/')({
  loader: async () => {
    return await fetchUsers()
  },
  component: UsersPage,
})

function UsersPage() {
  const { users } = Route.useLoaderData()

  return (
    <div className="mx-auto max-w-2xl space-y-8 p-4">
      <h2 className="text-2xl font-bold">Users</h2>
      <CreateUserForm />
      <UserList users={users} />
    </div>
  )
}

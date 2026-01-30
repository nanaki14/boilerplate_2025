import { createFileRoute } from '@tanstack/react-router'
import { useCreateUser, useUsers } from '@/lib/hooks'
import { useState } from 'react'

export const Route = createFileRoute('/users')({
  component: UsersPage,
})

function UsersPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8 p-4">
      <h2 className="text-2xl font-bold">Users</h2>
      <CreateUserForm />
      <UserList />
    </div>
  )
}

function UserList() {
  const { data, isPending, error } = useUsers()

  if (isPending) return <p className="text-gray-500">Loading...</p>
  if (error) return <p className="text-red-500">Error: {error.message}</p>

  return (
    <ul className="divide-y">
      {data.users.map((user) => (
        <li key={user.id} className="flex items-center gap-4 py-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
            {user.name[0]}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function CreateUserForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const createUser = useCreateUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createUser.mutate(
      { name, email },
      {
        onSuccess: () => {
          setName('')
          setEmail('')
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border p-4">
      <h3 className="font-semibold">Add User</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full rounded border px-3 py-2"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full rounded border px-3 py-2"
      />
      <button
        type="submit"
        disabled={createUser.isPending}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {createUser.isPending ? 'Creating...' : 'Create'}
      </button>
      {createUser.error && <p className="text-sm text-red-500">{createUser.error.message}</p>}
    </form>
  )
}

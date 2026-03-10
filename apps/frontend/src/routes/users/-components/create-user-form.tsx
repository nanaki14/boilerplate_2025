import { useState } from 'react'
import { useCreateUser } from '../-hooks'

export function CreateUserForm() {
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

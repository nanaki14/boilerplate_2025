import { useUsers } from '../-hooks'

export function UserList() {
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

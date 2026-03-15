interface User {
  id: string
  name: string
  email: string
}

interface UserListProps {
  users: User[]
}

export function UserList({ users }: UserListProps) {
  if (users.length === 0) {
    return <p className="text-gray-500">No users found.</p>
  }

  return (
    <ul className="divide-y">
      {users.map((user) => (
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

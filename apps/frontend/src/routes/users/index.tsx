import { createFileRoute } from '@tanstack/react-router'
import { CreateUserForm } from './-components/create-user-form'
import { UserList } from './-components/user-list'

export const Route = createFileRoute('/users/')({
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

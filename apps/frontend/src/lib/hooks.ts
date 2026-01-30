import type { CreateUser } from '@repo/schema'
import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from './api'

const fetchUsers = async () => {
  const res = await client.api.users.$get()
  if (!res.ok) throw new Error('Failed to fetch users')
  return await res.json()
}

const fetchUser = async (id: string) => {
  const res = await client.api.users[':id'].$get({ param: { id } })
  if (!res.ok) throw new Error('Failed to fetch user')
  return await res.json()
}

const createUser = async (data: CreateUser) => {
  const res = await client.api.users.$post({ json: data })
  if (!res.ok) throw new Error('Failed to create user')
  return await res.json()
}

export const usersQueryOptions = queryOptions({
  queryKey: ['users'],
  queryFn: fetchUsers,
})

export const userQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['users', id],
    queryFn: () => fetchUser(id),
  })

export function useUsers() {
  return useQuery(usersQueryOptions)
}

export function useUser(id: string) {
  return useQuery(userQueryOptions(id))
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersQueryOptions.queryKey })
    },
  })
}

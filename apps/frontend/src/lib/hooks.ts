import type { CreateUser } from '@repo/schema'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { client } from './api'

const usersKeys = {
  all: ['users'] as const,
  detail: (id: string) => ['users', id] as const,
}

export function useUsers() {
  return useQuery({
    queryKey: usersKeys.all,
    queryFn: async () => {
      const res = await client.api.users.$get()
      if (!res.ok) throw new Error('Failed to fetch users')
      return await res.json()
    },
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: usersKeys.detail(id),
    queryFn: async () => {
      const res = await client.api.users[':id'].$get({ param: { id } })
      if (!res.ok) throw new Error('Failed to fetch user')
      return await res.json()
    },
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateUser) => {
      const res = await client.api.users.$post({ json: data })
      if (!res.ok) throw new Error('Failed to create user')
      return await res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: usersKeys.all })
    },
  })
}

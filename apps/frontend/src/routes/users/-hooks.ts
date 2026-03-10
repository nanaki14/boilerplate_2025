import { userQueryOptions, usersQueryOptions, createUser } from '@/lib/api/users'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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

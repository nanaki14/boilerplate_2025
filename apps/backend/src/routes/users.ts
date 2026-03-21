import { zValidator } from '@hono/zod-validator'
import { createUserSchema } from '@repo/schema'
import type { User } from '@repo/schema'
import { Hono } from 'hono'

/** インメモリのユーザーストア (サンプル用) */
const users: User[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
]

export const usersRoute = new Hono()
  .get('/', (c) => {
    return c.json({ users })
  })
  .get('/:id', (c) => {
    const id = c.req.param('id')
    const user = users.find((u) => u.id === id)
    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }
    return c.json({ user })
  })
  .post('/', zValidator('json', createUserSchema), (c) => {
    const data = c.req.valid('json')
    const user: User = {
      id: crypto.randomUUID(),
      ...data,
    }
    users.push(user)
    return c.json({ user }, 201)
  })

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createUserSchema } from '@repo/schema'
import type { ApiResponse, User } from '@repo/types'

const app = new Hono()

app.use('/api/*', cors())

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

app.get('/api/health', (c) => {
  const response: ApiResponse<{ status: string }> = {
    success: true,
    data: { status: 'ok' },
  }
  return c.json(response)
})

app.post('/api/users', async (c) => {
  const body = await c.req.json()
  const result = createUserSchema.safeParse(body)

  if (!result.success) {
    const response: ApiResponse<null> = {
      success: false,
      data: null,
      error: result.error.issues.map((i) => i.message).join(', '),
    }
    return c.json(response, 400)
  }

  const user: User = {
    id: crypto.randomUUID(),
    ...result.data,
  }

  const response: ApiResponse<User> = {
    success: true,
    data: user,
  }
  return c.json(response, 201)
})

serve({ fetch: app.fetch, port: 3001 }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})

export default app

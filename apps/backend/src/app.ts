import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { usersRoute } from './routes/users'

const app = new Hono().use('/api/*', cors()).route('/api/users', usersRoute)

export type AppType = typeof app
export default app

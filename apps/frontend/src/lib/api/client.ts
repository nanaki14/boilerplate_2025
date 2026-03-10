import type { AppType } from '@repo/backend'
import { hc } from 'hono/client'

export const client = hc<AppType>('http://localhost:3001')

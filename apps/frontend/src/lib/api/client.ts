import type { AppType } from '@repo/backend'
import { hc } from 'hono/client'
import { env } from '../../env'

export const client = hc<AppType>(env.VITE_API_BASE_URL)

import { z } from 'zod'

/**
 * ユーザースキーマ
 */
export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
})

export type User = z.infer<typeof userSchema>

/**
 * ユーザー作成スキーマ (idを除く)
 */
export const createUserSchema = userSchema.omit({ id: true })

export type CreateUser = z.infer<typeof createUserSchema>

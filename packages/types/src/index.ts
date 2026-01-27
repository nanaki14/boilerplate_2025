/**
 * API レスポンスの共通型
 */
export type ApiResponse<T> = {
  success: boolean
  data: T
  error?: string
}

/**
 * ユーザー型
 */
export type User = {
  id: string
  name: string
  email: string
}

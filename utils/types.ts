export interface Platform {
  label: string
  value: string
  url?: string
  icon: string
  description?: string
}
export type AiPlatformsList = {
  id: number
  name: string
  baseUrl: string
  model: string
  apiKey: string
  status: boolean
  weight: number
  created_at: Date
}

import type { AnyObject } from "ant-design-vue/es/_util/type"
import type { VNode } from "vue"
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
type ContentType = VNode | AnyObject | string | number
export interface ChatMessage {
  avatar: VNode
  classNames: Record<string, string>
  content: ContentType
  loading: boolean
  placement: "start" | " end"
  shape: "round" | "corner"
  typing: boolean
  variant: "filled" | "borderless" | "outlined" | "shadow"
}

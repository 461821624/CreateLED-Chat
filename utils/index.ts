// 时间分组辅助函数
const getTimeGroup = (timestamp: number): string => {
  const now = new Date()
  const date = new Date(timestamp)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const weekStart = new Date(
    today.getTime() - (today.getDay() || 7) * 24 * 60 * 60 * 1000
  )

  if (date >= today) {
    return "today"
  } else if (date >= yesterday) {
    return "yesterday"
  } else if (date >= weekStart) {
    return "thisWeek"
  } else {
    return "earlier"
  }
}

export { getTimeGroup }
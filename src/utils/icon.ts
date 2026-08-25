// 菜单 icon 字段可能是 Element Plus 图标组件名（如 User / Setting），
// 也可能是 CSS 类名（含 - 空格 . / 等字符，如 icon-user）
export function isClassIcon(icon?: string | null): boolean {
  return !!icon && /[\s.\-/]/.test(icon)
}

export interface MenuItem {
  id: string
  name: string
  path: string
  component: string
  icon?: string
  children?: MenuItem[]
}

export interface MenuItem {
  title: any
  id: string
  name: string
  path: string
  component: string
  icon?: string
  children?: MenuItem[]
}

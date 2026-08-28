import {defineComponent, h} from 'vue'
import {RouterView} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'
import type {MenuItem} from '@/types/system/menu.ts'

const module = import.meta.glob('../views/**/*.vue')

// 菜单配置的 component 与 views 下页面路径不匹配时，渲染提示页而非空白，便于定位问题
const MissingComponent = defineComponent({
  props: {componentPath: {type: String, default: ''}},
  setup(props) {
    return () => h('div', {
      style: 'padding: 60px 20px; text-align: center; color: #909399; font-size: 14px; line-height: 2;'
    }, [
      h('div', {style: 'font-size: 16px; color: #f56c6c; margin-bottom: 8px;'}, '页面组件未找到'),
      h('div', `请检查「系统管理-菜单管理」中该菜单的「组件路径」配置：views/${props.componentPath}.vue`),
      h('div', {style: 'color: #c0c4cc; font-size: 12px;'}, '组件路径示例：master/material/index（对应 src/views/master/material/index.vue）')
    ])
  }
})

// 父级菜单（有子路由但自身无组件）仅渲染子路由，避免子树空白
const ParentContainer = defineComponent({
  setup() {
    return () => h(RouterView)
  }
})

// 将驼峰命名转换为下划线命名（如 productionLine -> production_line）
function camelToSnake(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

// 将路径中的每个段都转换为下划线格式（如 master/productionLine/index -> master/production_line/index）
function convertPathToSnake(str: string): string {
  return str.split('/').map(camelToSnake).join('/')
}

export function generateRoutes(menus: MenuItem[]): RouteRecordRaw[] {
  return menus.map(menu => {
    const hasChildren = !!(menu.children && menu.children.length > 0)
    
    // 处理 component 路径：去除 .vue 后缀（如果有的话）
    let componentPath = menu.component
    if (componentPath && componentPath.endsWith('.vue')) {
      componentPath = componentPath.replace(/\.vue$/, '')
    }
    
    // 尝试多种路径格式匹配
    let component = componentPath ? module[`../views/${componentPath}.vue`] : undefined
    
    // 如果直接匹配失败，尝试将驼峰转为下划线或连字符
    if (!component && componentPath) {
      const snakePath = convertPathToSnake(componentPath)
      if (snakePath !== componentPath) {
        component = module[`../views/${snakePath}.vue`]
        if (!component) {
          component = module[`../views/${snakePath}/index.vue`]
        }
        // 尝试连字符格式（如 material-supplier）
        if (!component) {
          const kebabPath = snakePath.replace(/_/g, '-')
          component = module[`../views/${kebabPath}.vue`]
        }
        if (!component) {
          const kebabPath = snakePath.replace(/_/g, '-')
          component = module[`../views/${kebabPath}/index.vue`]
        }
      }
    }
    
    if (!component && componentPath) {
      // 尝试 index.vue 格式（如 master/material -> master/material/index.vue）
      component = module[`../views/${componentPath}/index.vue`]
    }
    
    // 调试日志：输出未匹配到的组件路径
    if (componentPath && !component && !hasChildren) {
      console.warn(`[路由匹配失败] 菜单: ${menu.title}, 路径: ${menu.path}, 组件路径: ${componentPath}`)
      console.warn(`[期望路径] ../views/${componentPath}.vue 或 ../views/${componentPath}/index.vue`)
      console.warn(`[正确格式示例] master/production_line/index → ../views/master/production_line/index.vue`)
    }
    
    const route: RouteRecordRaw = {
      path: menu.path,
      name: menu.name,
      meta: {title: menu.title},
      children: hasChildren ? generateRoutes(menu.children) : []
    }
    if (component) {
      route.component = component
    } else if (hasChildren) {
      // 父级菜单：无组件则渲染子路由
      route.component = ParentContainer
    } else {
      // 叶子菜单组件缺失：渲染提示页，避免空白
      route.component = MissingComponent
      route.props = {componentPath: menu.component ?? ''}
    }
    return route
  })
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/',
    name: 'BasicLayout',
    component: () => import('@/layout/BasicLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {title: '首页'}
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

export default routes
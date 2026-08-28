# 原点 ERP · ORIGIN

基于 Vue 3 + TypeScript + Vite + Element Plus 的企业级 ERP 管理系统前端，采用前后端分离架构，实现了基于 RBAC 的权限控制体系。

项目名称：**原点 ERP · ORIGIN**。原点代表主数据、流程和业务协作的统一起点。

前端仓库：[weigu2700-cell/ORIGIN-ERP--FrontEnd](https://github.com/weigu2700-cell/ORIGIN-ERP--FrontEnd)

配套后端：Spring Boot + Spring Security + JWT + MyBatis-Plus + MySQL，后端仓库见 [weigu2700-cell/smart-erp](https://github.com/weigu2700-cell/smart-erp)。

## 技术栈

| 分类 | 技术 | 版本 |
| --- | --- | --- |
| 核心框架 | Vue | ^3.5 |
|  | TypeScript | ~6.0 |
|  | Vite | ^8.1 |
|  | Vue Router | ^5.2 |
|  | Pinia | ^4.0 |
| UI | Element Plus | ^2.14 |
|  | @element-plus/icons-vue | ^2.3 |
| 请求 | Axios | ^1.19 |
| 工具 | VueUse | ^14.4 |
| 工程化 | ESLint / Prettier / Oxlint / Vitest / vue-tsc | - |

> Node.js 版本要求：`^22.18.0 || >=24.12.0`（见 `package.json` engines）。

## 功能特性

- 登录认证：JWT Token 登录、Token 自动携带、401 自动退出
- 动态路由：菜单由后端下发，按 `component` 字段自动映射 `src/views/**/*.vue` 生成路由，并兼容完整/相对路径、驼峰与下划线目录
- 工作台：工作台菜单固定在一级菜单第一位，侧边栏收起时显示图标与缩小文字
- 主题系统：支持浅色/深色模式及多套低饱和配色，菜单、Header、内容区和组件会同步变色
- 原点品牌：内置 ORIGIN 品牌 Logo、登录页视觉背景和统一的 ERP 内容页布局
- 系统管理（完整 CRUD）：
  - 用户：分页列表、新增/编辑、删除、分配角色、分配部门
  - 角色：分页列表、新增/编辑、删除、分配权限、分配菜单
  - 菜单：左侧树 + 列表、新增/编辑（图标选择器、父级菜单选择器）、删除、显示/隐藏
  - 部门：左侧树 + 列表、新增/编辑、删除
  - 权限：左侧树 + 列表、新增/编辑、删除
- 通用组件：ProTable（表格）、ProSearch（查询区）、ProToolbar（操作栏）、ProPagination（分页）、ProTree（左侧树）

## 项目结构

```
src
├── api/                 # 接口层（按业务模块拆分，禁止页面直接调 axios）
│   ├── system/          #  auth / user / role / menu / dept / permission
│   ├── master/          #  基础资料（预留）
│   └── inventory/       #  库存管理（预留）
├── components/          # 通用组件（ProTable / ProSearch / ProToolbar / ProPagination / ProTree）
├── composables/         # 组合式函数（预留）
├── layout/              # 布局（BasicLayout、Sidebar 侧边栏菜单）
├── router/              # 路由（静态路由 + 动态路由生成）
├── selector/            # 参照选择器（预留）
├── stores/              # Pinia（user：登录态；permission：菜单/动态路由；app：布局状态）
├── styles/              # 全局样式
├── types/               # 全局类型定义（system 下按模块划分）
├── utils/               # request（axios 封装）/ auth（token）/ storage / icon
└── views/               # 页面（system 下为 user / role / menu / dept / permission）
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发环境（默认 http://localhost:5173，接口直连 VITE_API_URL）
npm run dev

# 类型检查
npm run type-check

# 构建
npm run build

# 构建（跳过类型检查，仅打包）
npm run build-only

# 代码检查（oxlint + eslint）
npm run lint

# 单元测试
npm run test:unit

# 预览构建产物
npm run preview
```

## 环境变量

| 变量 | 说明 | 示例 |
| --- | --- | --- |
| `VITE_API_URL` | 后端接口地址 | `.env.development` 默认 `http://localhost:8080` |

开发环境不使用 Vite 代理，浏览器直接请求 `VITE_API_URL` 指向的后端地址，因此后端需要正确配置 CORS。

生产环境在 `.env.production` 中配置 `VITE_API_URL=https://your-api-domain.com/`，并确保后端允许前端域名跨域访问。

## 核心约定

### 1. 接口与请求

- 统一走 `src/utils/request.ts` 封装的 `service`（get / post / put / del），页面禁止直接调用 axios
- 响应自动解包：后端返回 `{ code, message, data }`，`code === 200` 时直接返回 `data`
- Token 存于 `localStorage`（key：`smart_erp_token`），请求自动携带 `Authorization: Bearer <token>`
- 401 自动清除 Token 并提示重新登录

### 2. ID 一律按字符串处理

后端主键为雪花 Long，接口统一序列化为**字符串**返回。前端任何地方都禁止 `Number(id)` 转换（19 位雪花 ID 会精度丢失），组树、比较、请求参数均以 `String(id)` 归一化。

### 3. 菜单图标约定

- `icon` 字段存 **Element Plus 图标组件名**（如 `User`、`Setting`），组件在 `main.ts` 全局注册，侧边栏与表格用 `<component :is="menu.icon">` 动态渲染
- 若图标值包含 `-`、空格、`.`、`/` 等字符，视为 CSS 类名（`<i :class>` 渲染），由 `src/utils/icon.ts` 的 `isClassIcon()` 判断

### 4. 菜单树接口

- `GET /system/menu/tree`：**必须传 `dto.roleId`**，返回该角色**已分配**的菜单树；无参/空 roleId 会报错
- 全量菜单用 `GET /system/menu/list` 分页拉取，前端按 `parentId` 组装树（参考 `role/assignDialog.vue` 的 `fetchAllMenus`）

### 5. 动态路由

后端下发的菜单 `component` 字段对应 `src/views/**/*.vue` 的路径（通常不含 `.vue` 后缀），`router/routes.ts` 通过 `import.meta.glob` 匹配生成路由。

- 支持 `master/material/index`、`master/material`、`master/material.vue` 等写法
- 自动兼容驼峰、下划线和连字符目录名
- 子路由支持完整路径和相对路径，避免父级路径重复拼接
- 工作台统一映射到 `src/views/home/home.vue`

### 6. 前端访问与跨域

- 前端请求统一由 `VITE_API_URL` 决定，不依赖 Vite proxy
- 后端开发地址默认为 `http://localhost:8080`
- 后端需在 CORS 配置中允许前端开发地址（通常为 `http://localhost:5173`）
- 生产环境应配置实际部署域名，不建议使用通配符放开所有来源

## 后续规划

- 基础资料模块（客户 / 供应商 / 工厂 / 仓库 / 物料）
- 库存管理模块（库存查询 / 库存流水）
- ERP 核心业务（销售订单 / 采购订单 / BOM / 生产计划 / 生产工单）

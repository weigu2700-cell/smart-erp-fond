---

```md
# SmartERP Frontend

<p align="center">
  <b>SmartERP 智能制造 ERP 管理系统前端</b>
</p>

<p align="center">
  基于 Vue3 + TypeScript + Vite 构建的企业级 ERP 管理后台前端项目
</p>


## 项目介绍

SmartERP Frontend 是 SmartERP 智能制造 ERP 系统的前端项目。

项目采用当前主流 Vue3 工程化开发模式：

- Vue3 Composition API
- TypeScript
- Vite
- Pinia
- Vue Router
- Element Plus
- Axios


项目目标：

- 构建企业级 ERP 管理后台
- 实践前后端分离架构
- 掌握大型后台项目工程化设计
- 实现 RBAC 权限控制
- 完成制造企业业务流程可视化


对应后端项目：

SmartERP Backend

技术栈：

- Spring Boot
- Spring Security
- JWT
- MyBatis-Plus
- MySQL


> 🚧 项目持续开发中


---

# 技术栈


## 核心框架

| 技术 | 版本 |
|-|-|
| Vue | 3.5 |
| TypeScript | 6 |
| Vite | 8 |
| Vue Router | 5 |
| Pinia | 4 |


## UI组件

- Element Plus


## 网络请求

- Axios


## 工程化

- ESLint
- Prettier
- Vitest
- VueUse



---

# 项目特点


## 1. Vue3 + TypeScript 开发模式


项目统一采用：

```vue
<script setup lang="ts">

</script>
```


使用 Composition API 组织业务。


避免传统 Vue2 Options API：

```js
data()

methods()

computed()

```

提升代码复用能力和类型安全。



---

# 2. 模块化项目结构


当前目录设计：


```
src
├── api
│   ├── system
│   ├── master
│   └── inventory
│
├── components
│
├── composables
│
├── layouts
│
├── router
│
├── stores
│
├── types
│
├── utils
│
└── views

```


按照业务领域拆分：

```
system
    系统权限

master
    基础资料

inventory
    库存管理

```



---

# 3. Axios统一封装


请求入口：

```
src/utils/request.ts
```


实现：

- Axios实例封装
- BaseURL环境配置
- Token自动携带
- 统一响应处理
- HTTP错误处理


请求流程：

```
Vue页面

↓

API Service

↓

Axios

↓

Spring Boot API

```


示例：

```ts
const user =
    await request.get<UserInfo>(
        '/system/user/current'
    )
```



---

# 4. JWT认证


当前认证流程：


```
用户登录

↓

后端验证用户名密码

↓

返回JWT Token

↓

前端保存Token

↓

Axios自动携带Token

↓

访问受保护接口

```


已实现：

- 登录接口接入
- Token存储
- Token自动注入请求头
- 当前用户信息获取



---

# 5. Pinia状态管理


项目采用 Pinia 管理全局状态。


规划：


```
stores

├── user.ts

├── permission.ts

└── app.ts

```


## User Store


负责：

- Token
- 用户信息
- 登录状态



## Permission Store


负责：

- 菜单树
- 权限码
- 动态路由



## App Store


负责：

- Layout状态
- 全局配置



---

# 6. RBAC权限体系


项目配合后端 Spring Security 实现权限控制。


整体流程：

```
User

 ↓

Role

 ↓

Permission

 ↓

Menu

```


后端负责：

- 接口权限校验
- 数据安全


前端负责：

- 动态菜单
- 动态路由
- 按钮权限显示



---

# 当前开发进度


## 基础工程

✅ Vue3 + TypeScript 初始化

✅ Vite配置

✅ Element Plus集成

✅ Axios请求封装

✅ ESLint / Prettier配置



## 用户认证


✅ 登录页面

✅ JWT Token保存

✅ Token自动携带

✅ 当前用户信息获取



## 路由系统


🚧 Router Guard

🚧 动态路由


## 权限系统


🚧 动态菜单

🚧 按钮权限控制



## 业务模块


计划接入：


```
System

├── User

├── Role

├── Menu


Master Data

├── Customer

├── Supplier

├── Factory

├── Warehouse

├── Material


Inventory

├── Stock

└── Transaction

```



---

# 开发规范


## API层


禁止页面直接调用 Axios：


错误：

```ts
axios.get('/xxx')
```


正确：

```ts
api/system/user.ts


export function getUser(){

    return request.get()

}

```


---

## 类型规范


接口必须定义 TypeScript 类型：


例如：

```ts
interface UserInfo {

    id:string

    username:string

    realName:string

}

```


避免：

```ts
any
```


---

## 状态管理规范


只把真正全局数据放入 Pinia。


例如：

适合：

```
token

userInfo

permissions

menus

```


不适合：

```
表格数据

分页参数

弹窗状态

```



---

# 安装运行


## 环境要求


Node:

```
>=22
```


## 安装依赖


```bash
npm install
```


## 启动开发环境


```bash
npm run dev
```


## 类型检查


```bash
npm run type-check
```


## 构建


```bash
npm run build
```


## 单元测试


```bash
npm run test:unit
```



---

# 后续规划


## 第一阶段

完成：

```
登录

↓

路由守卫

↓

动态菜单

↓

Layout

↓

权限控制

```


## 第二阶段

完成基础资料页面：

```
客户

供应商

工厂

仓库

物料

```


## 第三阶段

库存模块：

```
库存查询

库存流水

库存操作

```


## 第四阶段

ERP核心业务：

```
销售订单

采购订单

BOM

生产计划

生产工单

```



---

# 项目定位


SmartERP Frontend 是一个企业级 ERP 前端工程实践项目。

重点学习：

- Vue3工程化
- TypeScript类型设计
- 企业后台架构
- RBAC权限系统
- 前后端接口设计
- 制造ERP业务开发


持续开发中。
```

---

这个版本适合作为你的**求职项目 README**。

我建议你下一步再补两个东西：

1. `README` 顶部加项目截图（登录页、Layout、客户管理页面）
2. 加一个架构图：

```text
Vue3
 |
Axios
 |
Spring Boot API
 |
Spring Security JWT
 |
MySQL
```

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowUp, Box, DataAnalysis, ShoppingCart, TrendCharts, User } from '@element-plus/icons-vue'

const today = computed(() => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: 'long', day: 'numeric', weekday: 'long',
}).format(new Date()))

const metrics = [
  { label: '本月销售额', value: '¥ 286,420', trend: '+12.6%', note: '较上月', icon: ShoppingCart, tone: 'blue' },
  { label: '库存总价值', value: '¥ 1,248,600', trend: '+4.8%', note: '较上月', icon: Box, tone: 'violet' },
  { label: '活跃客户', value: '1,286', trend: '+8.2%', note: '本月新增', icon: User, tone: 'green' },
  { label: '订单完成率', value: '96.8%', trend: '+2.4%', note: '较上月', icon: TrendCharts, tone: 'orange' },
]

const quickLinks = [
  { title: '新增物料', description: '维护物料主数据', path: '/master/material', icon: Box },
  { title: '库存查询', description: '查看实时库存', path: '/inventory/material-stock', icon: DataAnalysis },
  { title: '客户管理', description: '管理客户档案', path: '/master/customer', icon: User },
]

const activities = [
  { title: '库存盘点任务已完成', detail: '仓库 A-01 · 15 分钟前', type: 'success' },
  { title: '新增客户「华东制造」', detail: '客户管理 · 1 小时前', type: 'primary' },
  { title: '采购订单待确认', detail: '采购协同 · 2 小时前', type: 'warning' },
]
</script>

<template>
  <div class="home-container">
    <section class="welcome-panel">
      <div><p class="eyebrow">ORIGIN ERP / 工作台</p><h1>欢迎回来，开始今天的工作</h1><p class="welcome-date">{{ today }}</p></div>
      <div class="welcome-illustration" aria-hidden="true"><DataAnalysis /></div>
    </section>

    <section class="metric-grid" aria-label="经营概览">
      <el-card v-for="metric in metrics" :key="metric.label" class="metric-card" shadow="never">
        <div class="metric-icon" :class="`metric-icon--${metric.tone}`"><component :is="metric.icon" /></div>
        <div class="metric-content"><span class="metric-label">{{ metric.label }}</span><strong>{{ metric.value }}</strong><span class="metric-trend"><ArrowUp /> {{ metric.trend }} <em>{{ metric.note }}</em></span></div>
      </el-card>
    </section>

    <section class="dashboard-grid">
      <el-card class="dashboard-card quick-card" shadow="never">
        <template #header><div class="card-heading"><div><strong>常用功能</strong><span>快速进入日常工作</span></div></div></template>
        <div class="quick-links">
          <router-link v-for="link in quickLinks" :key="link.path" :to="link.path" class="quick-link">
            <span class="quick-link-icon"><component :is="link.icon" /></span><span><strong>{{ link.title }}</strong><small>{{ link.description }}</small></span><el-icon class="quick-link-arrow"><ArrowUp /></el-icon>
          </router-link>
        </div>
      </el-card>

      <el-card class="dashboard-card activity-card" shadow="never">
        <template #header><div class="card-heading"><div><strong>最近动态</strong><span>系统操作与业务提醒</span></div><el-button link type="primary">查看全部</el-button></div></template>
        <div class="activity-list"><div v-for="activity in activities" :key="activity.title" class="activity-item"><span class="activity-dot" :class="`activity-dot--${activity.type}`"></span><div><strong>{{ activity.title }}</strong><span>{{ activity.detail }}</span></div></div></div>
      </el-card>
    </section>
  </div>
</template>

<style scoped>
.home-container { min-height: 100%; display: flex; flex-direction: column; gap: 18px; }
.welcome-panel { min-height: 148px; padding: 28px 34px; display: flex; align-items: center; justify-content: space-between; overflow: hidden; border: 1px solid #d2e3fc; border-left: 4px solid var(--el-color-primary); border-radius: 10px; color: var(--text-primary); background: var(--panel-background); box-shadow: var(--shadow-panel); }
.eyebrow { margin: 0 0 8px; color: #1a73e8; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; }
h1 { margin: 0; font-size: 25px; font-weight: 650; letter-spacing: -.3px; }
.welcome-date { margin: 10px 0 0; color: #5f6368; font-size: 13px; }
.welcome-illustration { margin-right: 28px; color: #d2e3fc; font-size: 104px; transform: rotate(-8deg); }
.metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.metric-card, .dashboard-card { border: 1px solid var(--border-color); border-radius: 9px; background: var(--panel-background); box-shadow: var(--shadow-panel); }
.metric-card :deep(.el-card__body) { display: flex; align-items: center; gap: 14px; padding: 20px; }
.metric-icon { width: 42px; height: 42px; flex: 0 0 42px; display: grid; place-items: center; border-radius: 9px; font-size: 20px; }
.metric-icon--blue { color: #1a73e8; background: #e8f0fe; } .metric-icon--violet { color: #7c3aed; background: #f5f3ff; } .metric-icon--green { color: #059669; background: #ecfdf5; } .metric-icon--orange { color: #ea580c; background: #fff7ed; }
.metric-content { min-width: 0; display: flex; flex-direction: column; gap: 4px; } .metric-label { color: var(--text-secondary); font-size: 12px; } .metric-content strong { color: var(--text-primary); font-size: 20px; letter-spacing: -.3px; } .metric-trend { color: #059669; font-size: 11px; } .metric-trend svg { width: 12px; vertical-align: -2px; } .metric-trend em { margin-left: 4px; color: var(--text-secondary); font-style: normal; }
.dashboard-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, .95fr); gap: 16px; flex: 1; }
.dashboard-card :deep(.el-card__header) { padding: 18px 20px; border-bottom: 1px solid #eef2f7; } .dashboard-card :deep(.el-card__body) { padding: 0 20px 18px; }
.card-heading { display: flex; align-items: center; justify-content: space-between; } .card-heading > div { display: flex; flex-direction: column; gap: 4px; } .card-heading strong { color: var(--text-primary); font-size: 15px; } .card-heading span { color: var(--text-secondary); font-size: 12px; font-weight: 400; }
.quick-links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding-top: 18px; } .quick-link { min-height: 104px; position: relative; padding: 16px 13px; display: flex; flex-direction: column; gap: 10px; border: 1px solid #edf1f6; border-radius: 7px; color: inherit; text-decoration: none; transition: all .2s ease; } .quick-link:hover { border-color: #aecbfa; background: #f8fbff; transform: translateY(-2px); } .quick-link-icon { width: 30px; height: 30px; display: grid; place-items: center; border-radius: 7px; color: var(--el-color-primary); background: var(--color-primary-soft); } .quick-link > span:nth-child(2) { display: flex; flex-direction: column; gap: 3px; } .quick-link strong { color: var(--text-primary); font-size: 13px; } .quick-link small { color: var(--text-secondary); font-size: 11px; } .quick-link-arrow { position: absolute; right: 10px; top: 10px; color: var(--text-secondary); font-size: 13px; transform: rotate(45deg); }
.activity-list { padding-top: 8px; } .activity-item { min-height: 62px; display: flex; align-items: center; gap: 13px; border-bottom: 1px solid #f1f5f9; } .activity-item:last-child { border-bottom: 0; } .activity-dot { width: 8px; height: 8px; flex: 0 0 8px; border-radius: 50%; } .activity-dot--success { background: #10b981; box-shadow: 0 0 0 4px #d1fae5; } .activity-dot--primary { background: var(--el-color-primary); box-shadow: 0 0 0 4px var(--color-primary-soft); } .activity-dot--warning { background: #f59e0b; box-shadow: 0 0 0 4px #fef3c7; } .activity-item div { display: flex; flex-direction: column; gap: 4px; } .activity-item strong { color: var(--text-primary); font-size: 13px; font-weight: 500; } .activity-item span { color: var(--text-secondary); font-size: 11px; }
@media (max-width: 1100px) { .metric-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 760px) { .welcome-panel { padding: 24px; } .welcome-illustration { display: none; } .dashboard-grid { grid-template-columns: 1fr; } .quick-links { grid-template-columns: 1fr; } }
</style>

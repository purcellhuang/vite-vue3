// @ts-nocheck
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

let envBaseConfig = {}
if (import.meta.env) {
  // env = process.env.parsed.NODE_ENV;
  envBaseConfig = import.meta.env
}

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/home' },

  { path: '/home', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/demo', name: 'Demo', component: () => import('@/views/Demo.vue') },
]

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHistory(envBaseConfig.VITE_APP_STATE),
  routes, // `routes: routes` 的缩写
})

export default router

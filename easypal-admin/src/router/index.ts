import { createRouter, createWebHistory } from 'vue-router'

import PcAuthView from '../views/PcAuthView.vue'
import AdminAppView from '../views/AdminAppView.vue'
import CounselorAppView from '../views/CounselorAppView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/auth' },
    { path: '/auth', name: 'auth', component: PcAuthView },
    { path: '/admin', name: 'admin', component: AdminAppView },
    { path: '/counselor', name: 'counselor', component: CounselorAppView },
  ],
})

export default router

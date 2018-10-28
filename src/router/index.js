import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: () => import('components/Index'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('components/Home')
        },
        {
          path: '/dailyTask',
          name: 'DailyTask',
          component: () => import('components/DailyTask')
        },
        {
          path: '/monthTask',
          name: 'MonthTask',
          component: () => import('components/MonthTask')
        },
        {
          path: '/annualTask',
          name: 'AnnualTask',
          component: () => import('components/AnnualTask')
        },
        {
          path: '/projectInfo',
          name: 'ProjectInfo',
          component: () => import('components/ProjectInfo')
        },
        {
          path: '/projectTask',
          name: 'ProjectTask',
          component: () => import('components/ProjectTask')
        },
        {
          path: '/typeInfo',
          name: 'TypeInfo',
          component: () => import('components/TypeInfo')
        },
        {
          path: '/userInfo',
          name: 'UserInfo',
          component: () => import('components/UserInfo')
        },
        {
          path: '/companyInfo',
          name: 'CompanyInfo',
          component: () => import('components/CompanyInfo')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('components/Login')
    }
  ]
})

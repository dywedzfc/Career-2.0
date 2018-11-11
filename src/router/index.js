import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      redirect: '/home',
      component: () => import('views/Index'),
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import('views/Home')
        },
        {
          path: '/dailyTask',
          name: 'DailyTask',
          component: () => import('views/DailyTask')
        },
        {
          path: '/monthTask',
          name: 'MonthTask',
          component: () => import('views/MonthTask')
        },
        {
          path: '/annualTask',
          name: 'AnnualTask',
          component: () => import('views/AnnualTask')
        },
        {
          path: '/projectInfo',
          name: 'ProjectInfo',
          component: () => import('views/ProjectInfo')
        },
        {
          path: '/projectTask',
          name: 'ProjectTask',
          component: () => import('views/ProjectTask')
        },
        {
          path: '/typeInfo',
          name: 'TypeInfo',
          component: () => import('views/TypeInfo')
        },
        {
          path: '/userInfo',
          name: 'UserInfo',
          component: () => import('views/UserInfo')
        },
        {
          path: '/companyInfo',
          name: 'CompanyInfo',
          component: () => import('views/CompanyInfo')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('views/Login')
    }
  ]
})

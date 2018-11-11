<template>
  <a-layout class="index-wrapper">
    <a-layout-header>
      <h1 class="header">剧场生涯</h1>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="300">
        <menu-nav :menu-list="menu.data"></menu-nav>
      </a-layout-sider>
      <a-layout-content>
        <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import {Layout, Icon} from 'ant-design-vue'
import MenuNav from 'components/MenuNav'
export default {
  name: 'Index',
  data () {
    return {
      menu: {
        data: [
          {id: 'home', title: '首页', icon: 'home', link: '/home', defaultActive: true},
          {
            id: 'dailyManage',
            title: '日报管理',
            icon: 'profile',
            children: [
              {id: 'dailyTask', title: '每日任务', link: '/dailyTask'},
              {id: 'monthTask', title: '本月任务', link: '/monthTask'},
              {id: 'annualTask', title: '年度任务', link: '/annualTask'}
            ]
          },
          {
            id: 'projectManage',
            title: '项目管理',
            icon: 'folder-open',
            children: [
              {id: 'projectInfo', title: '项目信息', link: '/projectInfo'},
              {id: 'projectTask', title: '项目任务', link: '/projectTask'}
            ]
          },
          {
            id: 'typeManage',
            title: '类型管理',
            icon: 'appstore-o',
            children: [
              {id: 'typeInfo', title: '类型信息', link: '/typeInfo'}
            ]
          },
          {
            id: 'userManage',
            title: '用户管理',
            icon: 'solution',
            children: [
              {id: 'userInfo', title: '用户信息', link: '/userInfo'},
              {id: 'companyInfo', title: '公司信息', link: '/companyInfo'}
            ]
          }
        ]
      }
    }
  },
  created () {
    console.info('created:', MenuNav, this.$route.path)
  },
  methods: {},
  components: {
    [Layout.name]: Layout,
    [Layout.Header.name]: Layout.Header,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Content.name]: Layout.Content,
    [Icon.name]: Icon,
    MenuNav
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .index-wrapper {
    height: 100%;
    h1.header {
      margin: 0;
      font-family: 'calligraphy 1';
      font-size: 32px;
      text-align: left;
      text-shadow: 1px 1px 6px #333
      color: #ffffff;
    }
  }
</style>

<template>
  <a-menu
    :selectedKeys="[selectedKeys]"
    :defaultSelectedKeys="[selectedKeys]"
    :openKeys="openKeys"
    mode="inline"
    theme="dark"
    @openChange="handleMenuOpenChange"
    @click="handleMenuListClick"
    style="text-align: left;"
  >
    <template v-for="item in menuList">
      <a-sub-menu v-if="item.children" :key="item.id">
        <span slot="title">
          <a-icon :type="iconTypeClassName(item.icon)" />
          <span v-text="item.title"></span>
        </span>
        <a-menu-item v-for="childrenItem in item.children" :key="childrenItem.id" >
          <router-link :to="childrenItem.link" v-text="childrenItem.title"></router-link>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item v-else :key="item.id">
        <router-link :to="item.link">
          <a-icon :type="iconTypeClassName(item.icon)" />
          <span v-text="item.title"></span>
        </router-link>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import {Menu, Icon} from 'ant-design-vue'
import _ from 'underscore'
export default {
  name: 'MenuNav',
  data () {
    return {
      selectedKeys: '',
      openKeys: [],
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4']
    }
  },
  props: {
    menuList: {
      type: Array
    }
  },
  created () {
    const route = this.$route.path
    let routeFlag = false
    this.rootSubmenuKeys = []
    this.$nextTick(() => {
      this.initMenuList(this.menuList, route, routeFlag)
      // if (this.$route.path === '/') this.selectedKeys = 'home'
      // else {
      //   this.selectedKeys = this.$route.path.substring(1)
      // }
      // this.selectedKeys = this.$route.path === '/' ? 'home' : this.$route.path.substring(1)
      // _.each(this.menuList, item => {
      //   if (route && route === item.link) {
      //     this.selectedKeys = item.id
      //     routeFlag = true
      //   }
      //   if (!routeFlag && item.children) {
      //     _.each(item.children, childrenItem => {
      //       if (route && route === childrenItem.link) {
      //         this.selectedKeys = childrenItem.id
      //         this.openKeys = [item.id]
      //         routeFlag = true
      //       }
      //     })
      //   }
      //   this.rootSubmenuKeys.push(item.id)
      // })
      // if (route.length > 1) this.selectedKeys = route.substring(1)
      // else if (route === '/') this.selectedKeys = 'home'
    })
  },
  methods: {
    iconTypeClassName (iconName) {
      if (iconName.indexOf('icon-') >= 0) return `iconfont ${iconName}`
      else return iconName
    },
    initMenuList (menuItem, route, flag, callback) {
      _.each(menuItem, item => {
        if (route && route === item.link) {
          this.selectedKeys = item.id
          if (callback) callback()
          flag = true
        }
        if (!flag && item.children) {
          this.initMenuList(item.children, route, flag, () => {
            this.openKeys = [item.id]
          })
        }
        if (!callback) this.rootSubmenuKeys.push(item.id)
      })
    },
    handleMenuOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    handleMenuListClick (item) {
      this.selectedKeys = item.key
    }
  },
  components: {
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    [Icon.name]: Icon
  }
}
</script>

<style scoped>

</style>

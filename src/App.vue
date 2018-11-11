<template>
  <div id="app">
    <a-locale-provider :locale="zh_CN">
      <router-view/>
    </a-locale-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import {LocaleProvider} from 'ant-design-vue'
export default {
  name: 'App',
  data () {
    return {
      zh_CN: zhCN
    }
  },
  components: {
    [LocaleProvider.name]: LocaleProvider
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @font-face {
    font-family: 'calligraphy 1';
    src: url('./assets/fonts/calligraphy.ttf?2i830z') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  #app {
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .panel-wrapper {
    height: 100%
    > h2.title {
      height: 50px
      margin-bottom: 0
      padding: 0 10px
      border-bottom: 1px solid #ccc
      line-height: 50px
      text-align: center
      font-size: 28px
      background-color: #ffffff
    }
    > .content-wrapper {
      padding: 15px
    }
  }

  .card-task {
    float: left;
    display: inline-block
    .ant-card-head {
      min-height: 40px
      padding: 0 20px
      .ant-card-head-title {
        padding: 10px 0
        font-size: 24px
      }
    }
    .ant-card-body {
      overflow: auto
      height: 180px
      padding: 20px
    }
  }

  .ant-input-group-lg .ant-select-selection__rendered {
    line-height: 40px;
  }

  button, html [type="button"], [type="reset"], [type="submit"] {
    -webkit-appearance: none;
  }
</style>

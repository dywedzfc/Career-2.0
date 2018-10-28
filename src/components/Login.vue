<template>
  <div class="login-wrapper">
    <h1 class="login-title">剧场生涯</h1>
    <login-box class="panel-login panel-login-position"></login-box>
  </div>
</template>

<script>
import LoginBox from 'module/LoginBox'
export default {
  name: 'Login',
  data () {
    return {}
  },
  components: {
    'login-box': LoginBox
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login-wrapper {
    height: 100%
    background: url(../assets/images/bg-image.jpg) center center
    .login-title {
      position: absolute
      top: calc(50% - 150px)
      left: 30%
      width: 260px
      font-family: 'calligraphy 1';
      font-size: 42px
      text-shadow: 1px 1px 6px #333
      color: #ffffff
      transform translate(-50%, -50%)
    }
    .panel-login {
      position: absolute;
      &.panel-login-position {
        top: 50%
        left: 30%
        transform translate(-50%, -50%)
      }
    }
  }

</style>

<template>
  <a-form class="login-form" @submit="handleLoginSubmit">
    <a-form-item class="login-form-item">
      <a-input class="login-form-input" placeholder="用户名" size="large" v-model="loginForm.username">
        <a-icon class="login-form-icon" slot="prefix" type="user"/>
      </a-input>
    </a-form-item>
    <a-form-item class="login-form-item">
      <a-input class="login-form-input" type="password" placeholder="密码" size="large" v-model="loginForm.password">
        <a-icon class="login-form-icon" slot="prefix" type="lock"/>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button class="login-form-button" type="primary" size="large" htmlType="submit">登&emsp;&emsp;陆</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// import {Form, FormItem, Input, Button, Icon} from 'ant-design-vue'
import {Form, Input, Button, Icon} from 'ant-design-vue'

export default {
  name: 'LoginBox',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    handleLoginSubmit () {
      console.info('handleLoginSubmit:')
      this.$router.push({name: 'Index'})
    }
  },
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Button.name]: Button,
    [Icon.name]: Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .login-form {
    .login-form-item {
      margin-bottom: 20px
    }
    .login-form-input {
      width: 260px
    }
    .login-form-icon {
      font-size: 18px
      margin-left: -2px
    }
    .login-form-button {
      width: 100%
    }
  }
</style>

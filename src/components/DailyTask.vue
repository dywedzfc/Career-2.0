<template>
  <div class="panel-wrapper dailyTask-wrapper">
    <h2 class="title">每日任务</h2>
    <div class="query-bar">
      <a-form layout='inline' @submit="handleDailyTaskSubmit" :autoFormCreate="(form)=>{this.query.form = form}">
        <a-form-item fieldDecoratorId="monthPickerFlag" style="margin: auto 8px;">
          <a-checkbox @change="headleMonthPickerFlagChange" :checked="query.monthPickerFlag"></a-checkbox>
        </a-form-item>
        <a-form-item fieldDecoratorId="month">
            <a-month-picker placeholder="月份" :disabled="!query.monthPickerFlag"/>
        </a-form-item>
        <a-form-item>
          <a-input type='password' placeholder='Password'>
            <a-icon slot="prefix" type='lock' style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type='primary' htmlType='submit'>Log in</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import {Form, Input, DatePicker, Checkbox, Button, Icon} from 'ant-design-vue'
import moment from 'moment'
export default {
  name: 'DailyTask',
  data () {
    return {
      query: {
        form: null,
        monthPickerFlag: true
      }
    }
  },
  methods: {
    handleDailyTaskSubmit (e) {
      e.preventDefault()
      let query = {}
      // console.info('handleDailyTaskSubmit:', this.query, this.query.form.validateFields())
      this.query.form.validateFields((error, values) => {
        if (!error) {
          console.log('Received values of form: ', values)
          if (values.month) {
            console.log('Received values of form-value: ', values.month._d)
            query.MonthPicker = moment(values.month._d).format('YYYY-MM')
            console.log('error', query)
          }
        }
      })
    },
    headleMonthPickerFlagChange (item) {
      console.info('headleMonthPickerFlagChange:', item.target.checked)
      this.query.monthPickerFlag = item.target.checked
    }
  },
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [DatePicker.name]: DatePicker,
    [DatePicker.MonthPicker.name]: DatePicker.MonthPicker,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    [Icon.name]: Icon
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dailyTask-wrapper {
    /*height: 100%*/
    .query-bar {
      /*height: 50px*/
      padding: 8px 10px 0 10px
      border-bottom: 1px solid #eee
      background-color: #fff
      .ant-form-item {
        margin-bottom: 8px
      }
    }
  }
</style>

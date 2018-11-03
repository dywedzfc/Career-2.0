<template>
  <div class="panel-wrapper dailyTask-wrapper" ref="wrapper">
    <h2 class="title" ref="title">每日任务</h2>
    <div class="query-bar" ref="queryBar">
      <a-form layout='inline' @submit="handleDailyTaskSubmit" :autoFormCreate="(form)=>{this.query.form = form}">
        <a-form-item fieldDecoratorId="monthPickerFlag" style="margin: auto 8px;">
          <a-checkbox @change="handleMonthPickerFlagChange" :checked="query.monthPickerFlag"></a-checkbox>
        </a-form-item>
        <a-form-item fieldDecoratorId="month">
          <a-month-picker placeholder="月份" :disabled="!query.monthPickerFlag"/>
        </a-form-item>
        <a-form-item>
          <a-button type='primary' htmlType='submit'>查询</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type='primary' icon="plus"></a-button>
        </a-form-item>
      </a-form>
    </div>
    <div class="content-wrapper" ref="panelContent">
        <a-card class="card-task" v-for="(item, index) in cardOption.data"
                :title="item.date" :key="item.id"
                :bordered="false"
                :style="{width: calculatedWidth + 'px', marginRight: calculatedMarginRight(index), marginBottom: calculatedMarginBottom(index)}"
        >
          <dl class="projectList">
            <template v-for="projectItem in item.content">
              <dt class="projectName" :key="projectItem.id" v-text="projectItem.projectName"></dt>
              <dd class="projectTaskItem" v-for="taskItem in projectItem.projectTask" :key="taskItem.id">
                <span v-text="taskItem.taskName"></span>
                <span v-text="taskItem.taskContent"></span>
              </dd>
            </template>
          </dl>
          <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" />
            <a-icon type="edit" />
            <a-icon type="caret-down" />
          </template>
        </a-card>
    </div>
  </div>
</template>

<script>
import {Form, Input, DatePicker, Checkbox, Button, Icon, Card} from 'ant-design-vue'
import moment from 'moment'
import axios from 'axios'
export default {
  name: 'DailyTask',
  data () {
    return {
      query: {
        form: null,
        monthPickerFlag: true
      },
      cardOption: {
        width: 400,
        totalWidth: 0,
        numberOfLines: 0,
        rows: 0,
        data: []
      }
    }
  },
  created () {
    this.$nextTick(() => {
      window.onresize = () => {
        this.calculatedCardNumberOfLines()
      }
    })
  },
  mounted () {
    this.$nextTick(() => {
      axios.get('http://localhost:3049/dailyTask').then((res) => {
        console.info('dailyTask:', res)
        this.cardOption.data = res.data
        setTimeout(() => this.calculatedCardNumberOfLines(), 0)
      })
    })
  },
  computed: {
    calculatedWidth () {
      if (this.cardOption.numberOfLines > 0) return (this.cardOption.totalWidth / this.cardOption.numberOfLines) - (15 * (this.cardOption.numberOfLines - 1) / this.cardOption.numberOfLines)
      else return 400
    }
  },
  methods: {
    calculatedMarginRight (index) {
      let marginRight = 0
      if (
        (
          this.cardOption.data.length === 1 &&
          this.cardOption.data.length - 1 === index
        ) || (
          index !== 0 &&
          (index + 1) % this.cardOption.numberOfLines === 0
        )
      ) marginRight = '-20px'
      else marginRight = '15px'
      return marginRight
    },
    calculatedMarginBottom (index) {
      let marginBottom = 0
      const length = this.cardOption.data.length
      const rows = this.cardOption.rows
      // const lastLineCount = length % rows
      // console.info(lastLineCount, this.cardOption.data.length, index, this.cardOption.rows)
      if (rows === 1 || (length === rows && index === rows)) {
        console.info('calculatedMarginBottom-1:')
      } else {
        if (length % rows === 0) {
          console.info('calculatedMarginBottom-2:')
          if ((length - rows) > index) marginBottom = '15px'
        } else {
          console.info('calculatedMarginBottom-3:', length, rows, length % rows, length - (length % rows))
          if (length - (length % rows) > index) marginBottom = '15px'
        }
      }
      // console.info('calculatedMarginBottom:', index, rows, marginBottom)
      return marginBottom
    },
    calculatedCardNumberOfLines () {
      const totalWidth = this.cardOption.totalWidth = this.$refs.panelContent.offsetWidth - 30
      this.cardOption.numberOfLines = Math.floor(totalWidth / 400)
      this.cardOption.rows = Math.ceil(this.cardOption.data.length / this.cardOption.numberOfLines)
    },
    handleDailyTaskSubmit (e) {
      e.preventDefault()
      let query = {}
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
    handleMonthPickerFlagChange (item) {
      console.info('handleMonthPickerFlagChange:', item.target.checked)
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
    [Icon.name]: Icon,
    [Card.name]: Card
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
    .content-wrapper {
      overflow-y: auto
      height: calc(100% - 106px)
      .projectList {
        .projectName {
          font-size: 18px
          font-weight: bold
        }
        .projectTaskItem{
          padding-left: 1.4em
        }
      }

    }
  }
</style>

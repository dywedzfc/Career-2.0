<template>
  <div class="panel-wrapper dailyTask-wrapper" ref="wrapper">
    <h2 class="title" ref="title">每日任务</h2>
    <div class="query-bar" ref="queryBar">
      <a-form layout='inline' @submit="handleDailyTaskSubmit" :autoFormCreate="(form)=>{this.query.form = form}">
        <a-form-item fieldDecoratorId="monthPickerFlag" style="margin: auto 8px;">
          <a-checkbox @change="handleMonthPickerFlagChange" :checked="query.monthPickerFlag"></a-checkbox>
        </a-form-item>
        <a-form-item fieldDecoratorId="month">
          <a-month-picker placeholder="月份" :disabled="!query.monthPickerFlag" @change="handleMonthSelectChange"/>
        </a-form-item>
        <a-form-item>
          <a-button type='primary' icon="sync" htmlType='submit'></a-button>
        </a-form-item>
        <a-form-item>
          <a-button type='primary' icon="plus" @click="handleAddDailyTaskClick"></a-button>
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
    <transition name="edit-panel">
      <div class="edit-panel" v-if="showEdit">
        <transition name="edit-panel-title">
          <div class="edit-panel-title" v-if="showTitle">
            <a-icon class="btn-return" type="left" @click="handleReturnClick"/>
            <span>添加每日任务</span>
          </div>
        </transition>
        <div class="edit-panel-body">
          <a-input-group class="mp-input-combination" size="large" compact>
            <a-select class="mp-input-project-name" v-model="dailyTaskForm[0].projectName" placeholder="项目名称">
              <a-select-option value="杭州工程车运管平台">杭州工程车运管平台</a-select-option>
              <a-select-option value="Jiangsu">Jiangsu</a-select-option>
            </a-select>
            <a-select class="mp-input-project-task" v-model="dailyTaskForm[0].projectTask" placeholder="项目任务">
              <a-select-option value="实时监控">实时监控</a-select-option>
              <a-select-option value="Jiangsu">Jiangsu</a-select-option>
            </a-select>
            <a-textarea class="mp-input-task-details" v-model="dailyTaskForm[0].taskDetails" placeholder="任务详情"></a-textarea>
            <a-button size="large" icon="save"></a-button>
            <a-button size="large" icon="delete"></a-button>
          </a-input-group>
        </div>
        <div class="edit-panel-footer"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import {Form, Input, Select, DatePicker, Checkbox, Button, Icon, Card, Modal} from 'ant-design-vue'
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
      },
      showEdit: false,
      showTitle: false,
      dailyTaskForm: [
        {
          gridId: 1,
          projectName: '',
          projectTask: '',
          taskDetails: ''
        }
      ]
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
      this.getDailyTaskList()
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
      } else {
        if (length % rows === 0) {
          if ((length - rows) > index) marginBottom = '15px'
        } else {
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
    getDailyTaskList () {
      this.query.form.validateFields((err, values) => {
        if (!err) {
          let month = null
          if (values.month) month = moment(values.month._d).format('YYYY-MM')
          console.info('getDailyTaskList:', values, month)
          axios.get('http://localhost:3049/dailyTask', {
            params: {
              date_like: month
            }
          }).then((res) => {
            console.info('dailyTask:', res)
            this.cardOption.data = res.data
            setTimeout(() => this.calculatedCardNumberOfLines(), 0)
          })
        }
      })
    },
    handleMonthSelectChange () {
      console.info('handleMonthSelectCange:', this.query.form)
      setTimeout(() => {
        this.getDailyTaskList()
      }, 0)
    },
    handleDailyTaskSubmit (e) {
      e.preventDefault()
      this.getDailyTaskList()
    },
    handleAddDailyTaskClick () {
      this.showEdit = true
      setTimeout(() => {
        this.showTitle = true
      }, 300)
    },
    handleReturnClick () {
      this.showTitle = false
      setTimeout(() => {
        this.showEdit = false
      }, 400)
    },
    handleMonthPickerFlagChange (item) {
      console.info('handleMonthPickerFlagChange:', item.target.checked)
      this.query.monthPickerFlag = item.target.checked
    },
    handleDialogSubmitClick () {
      this.getDailyTaskList()
    },
    handleDialogCancelClick () {}
  },
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Input.TextArea.name]: Input.TextArea,
    [Input.Group.name]: Input.Group,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [DatePicker.name]: DatePicker,
    [DatePicker.MonthPicker.name]: DatePicker.MonthPicker,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Card.name]: Card,
    [Modal.name]: Modal
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .dailyTask-wrapper {
    position: relative
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

    .mp-input-combination {
      display: block;
      .mp-input-project-name {
        width: 230px;
      }
      .mp-input-project-task {
        width: 160px;
      }
      .mp-input-task-details {
        width: calc(100% - 485px);
        height: 40px;
        resize: none;
      }
    }

    /* 动画效果 */
    .edit-panel-enter-active, .edit-panel-leave-active {
      transition: left .5s ease-in-out;
    }
    .edit-panel-enter, .edit-panel-leave-to {
      left: 100%;
    }
    .edit-panel-title-enter-active {
      transition: top .5s ease-in-out, z-index .4s ease-in-out .1s;
    }
    .edit-panel-title-leave-active {
      z-index: 0;
      transition: top .4s ease-in-out .1s, z-index .5s ease-in-out;
    }
    .edit-panel-title-enter, .edit-panel-title-leave-to {
      top: 0;
      z-index: -1;
    }
  }
</style>
<style lang="stylus" rel="stylesheet/stylus">
  .btn-return {
  }
  .edit-panel {
    position: absolute
    top: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    padding: 15px
    padding-bottom: 85px;
    background-color: #ffffff;
    /*transition: left .4s ease-in-out;*/
    .edit-panel-title {
      position: absolute
      top: -50px;
      left: 0
      width: 100%;
      height: 49px;
      padding: 0
      font-size: 28px;
      text-align: center;
      background-color: #ffffff;
      z-index: 1;
      /*transition: top .3s ease-in-out .4s, z-index .3s ease-in-out .4s;*/
      .btn-return {
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 49px;
        border-right: 1px solid #cccccc;
        font-size: 24px;
        line-height: 50px;
        transition: border-right-color .5s ease-in-out .4s
      }
    }
    .edit-panel-body {
      height: 100%;
    }
    .edit-panel-footer {
      position: absolute
      left: 0;
      bottom: 0;
      width: 100%;
      height: 70px;
      border-top: 1px solid #cccccc;
    }
  }
</style>

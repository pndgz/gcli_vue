<template>
  <el-dialog :title="title" :visible="visible" @close="closeDialog()" :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" size="small" :label-width="formLabelWidth">
      <el-form-item label="类型：" prop="type">
        <el-select v-model="form.type" filterable>
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入配置名称"></el-input>
      </el-form-item>
      <el-form-item label="数值：" prop="value">
        <el-input v-model.number="form.value" placeholder="请输入配置数值"></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog()">取 消</el-button>
      <el-button type="primary" size="small" @click="submitForm()">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import settingService from '@/api/setting'
  export default {
    props: ['show', 'itemInfo', 'typeList'],
    data: function() {
      return {
        formLabelWidth: '120px',
        form: {
          id: null,
          type: '',
          name: '',
          value: '',
          remark: ''
        },
        rules: {
          type: [{required: true, message: '请选择配置类型'}],
          name: [{required: true, message: '请输入配置名称'}],
          value: [{required: true, message: '请输入配置数值'}]
        }
      }
    },
    watch: {
      itemInfo() {
        if (this.itemInfo) {
          this.form.id = this.itemInfo.id
          this.form.name = this.itemInfo.name
          this.form.value = this.itemInfo.value
          this.form.remark = this.itemInfo.remark
        } else {
          this.resetForm()
        }
      }
    },
    computed: {
      create: function() {
        return this.form.id === null
      },
      visible: function() {
        return this.show
      },
      title: function() {
        return this.create ? '添加配置' : '修改配置'
      }
    },
    methods: {
      resetForm() {
        this.form = {
          id: null,
          type: '',
          name: '',
          value: '',
          remark: ''
        }
      },
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            settingService.saveItem(this.form).then((ret) => {
              if (ret.code === 0) {
                this.$refs['form'].resetFields()
                this.$emit('update:show', false)
                this.$emit('refreshList')
                this.$notify.success({
                  title: '成功',
                  message: ret.msg,
                  position: 'bottom-right'
                })
              } else {
                this.$notify.error({
                  title: '失败',
                  message: ret.msg,
                  position: 'bottom-right'
                })
              }
            })
          } else {
            return false
          }
        })
      },
      closeDialog() {
        this.$emit('update:show', false)
      }
    }
  }
</script>


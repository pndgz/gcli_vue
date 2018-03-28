<template>
  <el-dialog title="修改密码" width="500px" :visible.sync="visible" @close="closeDialog('form')" :show="show">
    <el-form ref="form" :model="form" :rules="rules" size="small">
      <el-form-item label="旧密码" prop="oldPassword" :label-width="formLabelWidth">
        <el-input v-model="form.oldPassword" type="password" placeholder="请输入原来密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" :label-width="formLabelWidth">
        <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认" prop="confirmPassword" :label-width="formLabelWidth">
        <el-input v-model="form.confirmPassword" type="password" placeholder="请再输入一次新密码" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeWin()">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        visible: this.show,
        formLabelWidth: '80px',
        form: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        rules: {
          oldPassword: [{required: true, message: '请输入原来密码', trigger: 'blur'}],
          newPassword: [{required: true, message: '请输入新密码', trigger: 'blur'}],
          confirmPassword: [{validator: this.validatePass, trigger: 'blur'}]
        }
      }
    },
    watch: {
      show() {
        this.visible = this.show
      }
    },
    methods: {
      validatePass(rule, value, callback) {
        if (value === '') {
          callback(new Error('请再输入一次新密码'))
        } else if (value !== this.form.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      closeWin() {
        this.visible = false
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit('update:show', false)
            this.$notify.success({
              title: '成功',
              message: '修改密码成功',
              position: 'bottom-right'
            })
          } else {
            return false
          }
        })
      },
      closeDialog(formName) {
        this.$emit('update:show', false)
        this.$refs[formName].resetFields()
      }
    }
  }
</script>


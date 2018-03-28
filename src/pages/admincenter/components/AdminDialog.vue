<template>
  <el-dialog :title="title" :visible="visible" @close="closeDialog()" :close-on-click-modal="false">
    <el-form ref="form" :model="form" :rules="rules" size="small" :label-width="formLabelWidth">
      <el-form-item label="账号：" prop="account">
        <el-input v-model="form.account" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别：" prop="sex">
        <el-radio v-model="form.sex" :label="0">女</el-radio>
        <el-radio v-model="form.sex" :label="1">男</el-radio>
      </el-form-item>
      <el-form-item label="出生日期：" prop="birthDate">
        <el-date-picker v-model="form.birthDate" type="date" placeholder="请输入出生日期"
                        value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="手机号：" prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="status">
        <el-radio v-model="form.status" :label="0">正常</el-radio>
        <el-radio v-model="form.status" :label="1">停用</el-radio>
        <el-button type="text" @click="showPassword = !showPassword;" v-if="!create" class="fright">
          修改密码
          <i v-if="showPassword" class="el-icon-arrow-up"></i>
          <i v-if="!showPassword" class="el-icon-arrow-down"></i>
        </el-button>
      </el-form-item>
      <el-form-item label="密码：" prop="password" v-if="create || showPassword">
        <el-input type="password" v-model="form.password" placeholder="请输入密码" autoComplete="false"></el-input>
      </el-form-item>
      <el-form-item label="确认：" prop="password2" v-if="create || showPassword">
        <el-input type="password" v-model="form.password2" placeholder="请确认密码" autoComplete="false"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="closeDialog()">取 消</el-button>
      <el-button type="primary" size="small" @click="submitForm()">保 存</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import adminServices from '@/api/admin'
  export default {
    props: ['show', 'itemInfo'],
    data: function() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          this.$refs.form.validateField('password2')
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请确认密码'))
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formLabelWidth: '120px',
        showPassword: false,
        form: {
          id: null,
          account: '',
          password: '',
          password2: '',
          name: '',
          mobile: '',
          sex: 0,
          birthDate: '',
          status: 0,
          pswd: 0
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          name: [{required: true, message: '请输入姓名'}],
          birthDate: [{required: true, message: '请输入出生日期'}],
          mobile: [{required: true, message: '请输入手机号'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          password2: [{validator: validatePass2, trigger: 'blur'}]
        }
      }
    },
    watch: {
      itemInfo() {
        if (this.itemInfo) {
          this.form.id = this.itemInfo.id
          this.form.account = this.itemInfo.account
          this.form.name = this.itemInfo.name
          this.form.mobile = this.itemInfo.mobile
          this.form.birthDate = this.itemInfo.birthDate
          this.form.sex = this.itemInfo.sex
          this.form.status = this.itemInfo.status
          this.form.pswd = this.itemInfo.pswd
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
        return this.create ? '添加' : '修改'
      }
    },
    methods: {
      resetForm() {
        this.form = {
          id: null,
          account: '',
          password: '',
          password2: '',
          name: '',
          mobile: '',
          sex: 0,
          birthDate: '',
          status: 0,
          pswd: 0
        }
      },
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            adminServices.saveItem(this.form).then((ret) => {
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


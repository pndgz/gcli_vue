<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator="/" class="breadcrumb-header">
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="main-box">
      <el-form ref="form" :model="myInfo" :rules="rules" :label-width="formLabelWidth" size="small" style="width: 600px;">
        <el-form-item label="用户邮箱：">
          {{myInfo.account}}
        </el-form-item>
        <el-form-item label="用户名称：" prop="name">
          <el-input v-model="myInfo.name" placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="用户手机：" prop="mobile">
          <el-input v-model="myInfo.mobile" placeholder="请输入用户手机"></el-input>
        </el-form-item>
        <el-form-item label="用户性别：" prop="sex">
          <el-radio v-model="myInfo.sex" :label="0">女</el-radio>
          <el-radio v-model="myInfo.sex" :label="1">男</el-radio>
          <el-button type="text" @click="togglePassword" class="fright">
            修改密码
            <i v-if="showPassword" class="el-icon-arrow-up"></i>
            <i v-if="!showPassword" class="el-icon-arrow-down"></i>
          </el-button>
        </el-form-item>
        <el-form-item label="新密码：" prop="password" v-if="showPassword">
          <el-input type="password" v-model="myInfo.password" placeholder="请输入新密码" autoComplete="false"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="password2" v-if="showPassword">
          <el-input type="password" v-model="myInfo.password2" placeholder="请确认密码" autoComplete="false"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitForm()">保 存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
  import adminServices from '../../../api/admin'
  export default {
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
        } else if (value !== this.myInfo.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formLabelWidth: '120px',
        showPassword: false,
        myInfo: {},
        rules: {
          name: [{required: true, message: '请输入姓名'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          password2: [{validator: validatePass2, trigger: 'blur'}]
        }
      }
    },
    methods: {
      togglePassword() {
        this.showPassword = !this.showPassword
        if (!this.showPassword) {
          this.myInfo.password = ''
          this.myInfo.password2 = ''
        }
      },
      submitForm() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            adminServices.saveMyInfo(this.myInfo).then((ret) => {
              if (ret.code === 0) {
                this.showPassword = false
                this.$store.commit('login', ret.data.myInfo)
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
      query() {
        adminServices.getMyInfo().then((ret) => {
          if (ret.code === 0) {
            this.myInfo = ret.data.myInfo
          } else {
            this.$notify.error({
              title: '失败',
              message: ret.msg,
              position: 'bottom-right'
            })
          }
        })
      }
    },
    mounted() {
      this.query()
    }
  }
</script>


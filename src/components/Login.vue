<template>
  <el-container id="logincontainer">
    <div class="logo">
      <img src="../assets/logo.png" width="60" height="38" style="vertical-align: text-bottom;"/>
      <h1>{{company}}</h1>
    </div>
    <el-card class="box-card login-card">
      <div slot="header">
        <span>欢迎登录</span>
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="account">
          <el-input v-model="form.account" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <el-input v-model="form.captcha" :maxlength="4" placeholder="验证码" style="width: 240px;"></el-input>
          <img src="/api/mlogin/captcha" ref="captcha_img" @click="refreshCaptcha()" width="100" height="40" style="vertical-align: top; margin-left: 4px; cursor: pointer;"/>
        </el-form-item>
        <!--<el-form-item class="tright">-->
          <!--<a href="#">忘记密码？</a>-->
        <!--</el-form-item>-->
        <el-button @click.prevent="login('form')" type="primary el-button-wa" nativeType="submit">登录</el-button>
      </el-form>
    </el-card>
    <p class="copyright">© 2017 ~ {{nowYear}} {{company}} 版权所有. </p>
  </el-container>
</template>
<script>
  import request from '../common/request'
  import projectConfig from '../../project'
  export default {
    data: function() {
      var checkCaptcha = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入验证码'))
        } else {
          callback()
          // request.post('/mlogin/checkCaptcha?captcha=' + value).then((ret) => {
          //   if (ret.code === 0) {
          //     callback()
          //   } else {
          //     callback(new Error('验证码输入有误或过期，请重新刷新'))
          //   }
          // })
        }
      }
      return {
        form: {
          account: '',
          password: '',
          captcha: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [{required: true, message: '请输入密码', trigger: 'blur'}],
          captcha: [{validator: checkCaptcha, trigger: 'blur'}]
        },
        company: projectConfig.companyName,
        nowYear: (new Date()).getFullYear()
      }
    },
    methods: {
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.commit('login', {
              id: 1,
              nick: 'testNick',
              name: '测试员'
            })
            request.post('/mlogin/login', this.form).then((ret) => {
              if (ret.code === 0) {
                this.$store.commit('login', ret.data.adminInfo)
              } else {
                this.$notify.error({
                  title: '错误',
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
      refreshCaptcha() {
        this.$refs['captcha_img'].setAttribute('src', '/api/mlogin/captcha?t=' + Math.random())
      }
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/index";
  #logincontainer {
    background: #080015 url("../assets/login_bg.jpg") top right no-repeat;
    height: 100%;
    background-size: auto 800px;
    .logo {
      @include absblock(60px, 40px);
      display: inline-block;
      color: #fff;
      font-size: 18px;
      h1 {
        display: inline-block;
      }
    }
    .login-card {
      @include absblock(0, 50%, 0);
      border: none;
      margin: 0 auto;
      width: 500px;
      transform: translate(0, -50%);
      .el-card__header {
        background-color: #2DC6F6;
        border-color: #2DC6F6;
        color: #fff;
        text-align: center;
      }
      .el-form {
        width: 350px;
        margin: 0 auto;
      }
    }
    .copyright {
      @include absblock(0, auto, 0, 40px);
      text-align: center;
      &, a {
        color: #fff;
      }
    }
  }
</style>


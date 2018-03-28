<template>
  <section class="topheader">
    <el-row>
      <div class="logo fleft">
        <img src="../assets/logo.png" width="30" height="30" style="vertical-align: text-bottom;"/>
        <h1>{{company}}</h1>
      </div>
      <div class="topmenus fleft">
        <el-menu mode="horizontal" @select="handleSelect" :default-active="activeIndex" class="topmenu">
          <template v-for="item in menus">
            <el-menu-item :index="item.idx">{{item.name}}</el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="ops fright tright">
        <span>欢迎 {{adminInfo.name}} 登录</span>
        <span class="split">|</span>
        <a href="#" @click="openChangePassword()">修改密码</a>
        <span class="split">|</span>
        <a href="#" @click="logout()">退出</a>
      </div>
    </el-row>
    <change-password :show.sync="show"></change-password>
  </section>
</template>
<script>
  import ChangePassword from '../dialogs/ChangePassword.vue'
  import projectConfig from '../../project'
  export default {
    props: {
      menus: {
        type: Array,
        required: false,
        default: []
      },
      activeIndex: {
        type: String,
        required: false,
        default: '0'
      }
    },
    data: function() {
      return {
        show: false,
        company: projectConfig.companyName
      }
    },
    computed: {
      adminInfo: function() {
        return this.$store.state.adminInfo
      }
    },
    methods: {
      handleSelect(val) {
        this.$store.commit('changeTopMenu', val)
      },
      logout() {
        this.$store.commit('logout')
      },
      openChangePassword() {
        this.show = true
      }
    },
    components: {
      ChangePassword
    }
  }
</script>
<style scoped lang="scss">
  @import "../common/styles/index";
  .topheader {
    background-color: $theme-color;
    color: #fff;
    padding: 0;
    margin: 0 -20px;
    .logo {
      text-align: center;
      color: #fff;
      padding: 16px 0 0 0;
      width: 220px;
      h1 {
        display: inline-block;
        font-size: 20px;
        margin-left: 10px;
      }
    }
    .topmenus {
      display: inline-block;
      .topmenu {
        background-color: $theme-color;
        border: none;
        .el-menu-item {
          color: #fff;
          border: none;
          padding: 0 25px;
          &.is-active, &:hover {
            background-color: rgba(15, 49, 84, 0.2) !important;
            border: none;
            font-weight: bolder;
          }
        }
      }
    }
    .ops {
      font-size: 14px;
      padding: 20px 20px 20px 0;
      .split {
        margin: 0 6px;
      }
      a {
        color: #fff;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .topheader .logo {
      width: 180px;
    }
    .el-menu-item {
      padding: 0 18px !important;
    }
  }
</style>

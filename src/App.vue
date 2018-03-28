<template>
  <el-container id="appcontainer" v-if="hasLogin">
    <el-header>
      <Header :menus="menus" :activeIndex="activeIndex"></Header>
    </el-header>
    <el-container>
      <SideMenu :submenus="submenus" :collapse.sync="asideCollapse" :pid="activeIndex"></SideMenu>
      <el-main class="topmain">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
  <Login v-else-if="!hasLogin"></Login>
</template>
<style scoped lang="scss">
  #appcontainer {
    &, .topbody, .topmenu, .topmain {
      height: 100%;
    }
    .topmain {
      padding: 0;
    }
  }
</style>
<script>
  import menus from './data/menus.json'
  import Login from './components/Login.vue'
  import Header from './components/Header.vue'
  import SideMenu from './components/SideMenu.vue'
  export default {
    data: function() {
      return {
        menus: menus,
        asideCollapse: false
      }
    },
    computed: {
      hasLogin: function() {
        return this.$store.state.hasLogin
      },
      submenus: function() {
        let index = this.menus.findIndex(d => d.idx === this.activeIndex)
        return this.menus[index === -1 ? 0 : index].submenus
      },
      activeIndex: function() {
        return this.$store.state.topMenuIdx
      }
    },
    methods: {
    },
    components: {
      Login, Header, SideMenu
    }
  }
</script>

<template>
  <el-aside :class="menuCollapse ? 'topaside collapse' : 'topaside'">
    <a class="menu-switcher" href="#" @click.prevent="onSwitchAside();">
      <i class="icon-switcher iconfont icon-vmenu" v-show="!menuCollapse"></i>
      <i class="icon-switcher iconfont icon-hmenu" v-show="menuCollapse"></i>
    </a>
    <el-menu class="sidemenu" :router="true" :collapse="menuCollapse" :defaultOpeneds="openeds" :defaultActive="activeMenu">
      <template v-for="item in submenus">
        <el-submenu :index="item.idx" v-if="item.hasChildren">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <template v-for="subitem in item.submenus">
            <el-menu-item :index="subitem.idx" :route="subitem.route" @click="saveOpends(item)">
              <span>{{subitem.name}}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <el-menu-item :index="item.idx" :route="item.route" v-else="item.hasChildren">
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
  export default {
    props: {
      collapse: {
        type: Boolean,
        required: false,
        default: false
      },
      submenus: {
        type: Array,
        required: false,
        default: []
      },
      pid: {
        type: String
      }
    },
    data: function() {
      return {
        openeds: [this.$store.state.sideMenuIdx],
        activeMenu: this.$store.state.activeSubMenuIdx,
        menuCollapse: this.collapse
      }
    },
    methods: {
      onSwitchAside() {
        this.menuCollapse = !this.menuCollapse
      },
      saveOpends(item) {
        this.$store.commit('openSideMenu', item.idx)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../common/styles/index";
  .topaside {
    border-right: solid 1px #e6e6e6;
    position: relative;
    transition:width .3s;
    overflow: visible;
    width: 220px !important;
    height: 100%;
    .el-submenu .el-menu-item {
      min-width: inherit;
    }
    .el-menu--collapse .el-submenu .el-menu .el-menu-item {
      padding: 0 40px !important;
    }
    .el-menu-item a {
      display: block;
    }
    &.collapse {
      width: 65px!important;
    }
    .el-menu {
      border-right: none;
      .title {
        font-size: 16px;
      }
      .el-menu-item {
        &.is-active {
          background-color: rgb(235, 243, 252);
        }
      }
    }
    .menu-switcher {
      display: block;
      padding: 5px 0;
      text-align: center;
      &:hover {
        background-color: #eef3f9;
      }
      .icon-switcher {
        font-size: 18px;
      }
    }
  }
  @media screen and (max-width: 1200px) {
    .topaside {
      width: 180px !important;
    }
  }
</style>

<template>
  <el-container>
    <el-header>
      <el-breadcrumb>
        <el-breadcrumb-item>系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>全局配置</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <el-tabs v-model="activeName">
        <el-tab-pane label="通用配置" name="type">
          <setting-list />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>
<script>
  import SettingList from './SettingList.vue'
  export default {
    data: function() {
      return {
        activeName: 'type'
      }
    },
    components: {
      SettingList
    }
  }
</script>

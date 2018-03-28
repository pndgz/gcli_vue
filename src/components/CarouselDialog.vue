<template>
  <el-dialog title="图片浏览" :visible="visible" @close="closeDialog()"
             :close-on-click-modal="false">
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="item in carousels" :key="item">
        <img :src="item" width="100%"/>
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>
<script>
  export default {
    props: ['show', 'carousels'],
    data: function() {
      return {
      }
    },
    computed: {
      visible: function() {
        return this.show
      }
    },
    methods: {
      closeDialog() {
        this.$emit('update:show', false)
      }
    }
  }
</script>


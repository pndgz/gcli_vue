<template>
  <el-container>
    <el-header>
      <el-breadcrumb>
        <el-breadcrumb-item>管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main class="main-box">
      <section class="pquery">
        <el-row>
          <el-col :span="16">
            <el-form :model="queryForm" :inline="true" size="small" @submit.native.prevent>
              <el-form-item>
                <el-input v-model="queryForm.keyword" placeholder="请输入账号/姓名/手机"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="query()" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="8" class="tright">
            <el-button type="primary" @click="addItem()" size="small">添加</el-button>
          </el-col>
        </el-row>
      </section>
      <el-table :data="adminList" tooltip-effect="dark">
        <el-table-column label="账号" prop="account" ></el-table-column>
        <el-table-column label="姓名" prop="name" ></el-table-column>
        <el-table-column label="手机号" prop="mobile" ></el-table-column>
        <el-table-column label="状态" prop="status" :formatter="adminStatusFormatter" ></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="modifyItem(scope.row)" type="text">修 改</el-button>
            <el-button @click="deleteItem(scope.row)" type="text">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handlePageSizeChange"
        @current-change="handlePageChange"
        :current-page="queryForm.page"
        :page-size="queryForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="queryResult.total"></el-pagination>
    </el-main>
    <admin-dialog :show.sync="showDialog" :itemInfo="itemInfo" @refreshList="query"></admin-dialog>
  </el-container>
</template>
<script>
  import adminServices from '@/api/admin'
  import AdminDialog from './AdminDialog.vue'
  import PagerMixin from '@/components/PagerMixin'
  export default {
    mixins: [PagerMixin],
    data: function() {
      return {
        activeName: 'admin',
        adminList: [],
        total: 0,
        itemInfo: null,
        showDialog: false,
        queryForm: {
          keyword: ''
        }
      }
    },
    methods: {
      query() {
        return adminServices.getItemList(this.queryForm).then((ret) => {
          if (ret.code === 0) {
            this.adminList = ret.data.list
            this.total = ret.data.pager.total
          } else {
            this.$notify.error({
              title: '失败',
              message: ret.msg,
              position: 'bottom-right'
            })
          }
        })
      },
      addItem() {
        this.itemInfo = null
        this.showDialog = true
      },
      modifyItem(item) {
        this.itemInfo = item
        this.showDialog = true
      },
      deleteItem(item) {
        this.$confirm('是否要删除『' + item.account + '』？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          adminServices.deleteItem(item.id).then((ret) => {
            if (ret.code === 0) {
              this.query()
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
        })
      },
      adminStatusFormatter(row, column, cellValue) {
        switch (cellValue) {
          case 0:
            return '正常'
          case 1:
            return '停用'
          default:
            return '未知'
        }
      }
    },
    mounted() {
      this.query()
    },
    components: {
      AdminDialog
    }
  }
</script>

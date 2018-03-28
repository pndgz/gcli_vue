<template>
  <el-container>
    <el-header>
      <el-breadcrumb>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <section class="pquery">
        <el-row>
          <el-col :span="24">
            <el-form :model="queryForm" :inline="true" size="small" @submit.native.prevent>
              <el-form-item label="用户状态">
                <el-select v-model="queryForm.status" placeholder="请选择用户状态">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="正常" value="0"></el-option>
                  <el-option label="黑名单" value="-1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input v-model="queryForm.keyword" placeholder="请输入用户ID/账号/昵称/手机" style="width: 240px;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="query()" type="primary">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </section>
      <el-table :data="userList" tooltip-effect="dark">
        <el-table-column label="用户 ID" prop="id"></el-table-column>
        <el-table-column label="用户账号" prop="account"></el-table-column>
        <el-table-column label="用户昵称" prop="nick"></el-table-column>
        <el-table-column label="状态" prop="statusName"></el-table-column>
        <el-table-column label="地区">
          <template slot-scope="scope">
            {{scope.row.address}}
          </template>
        </el-table-column>
        <el-table-column label="注册时间" prop="createTime"></el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="view(scope.row)" type="text">查  看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryForm.page"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"></el-pagination>
    </el-main>
  </el-container>
</template>
<script>
  import userService from '@/api/user'
  export default {
    data: function() {
      return {
        activeName: 'user',
        userList: [],
        total: 0,
        queryForm: {
          keyword: '',
          status: '',
          page: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      handleClick(tab, event) {
        switch (tab.name) {
          case 'user':
            this.$router.push({path: `/usercenter/user/list`})
            break
          case 'group':
            this.$router.push({path: `/usercenter/group/list`})
            break
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.query()
      },
      handleCurrentChange(val) {
        this.queryForm.page = val
        this.query()
      },
      query() {
        userService.getItemList(this.queryForm).then((ret) => {
          if (ret.code === 0) {
            this.userList = ret.data.list
            this.total = ret.data.total
          } else {
            this.$notify.error({
              title: '失败',
              message: ret.msg,
              position: 'bottom-right'
            })
          }
        })
      },
      view(item) {
        this.$router.push('/usercenter/user/detail?id=' + item.id)
      }
    },
    mounted() {
      this.query()
    }
  }
</script>

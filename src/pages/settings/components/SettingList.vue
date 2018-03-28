<template>
  <div>
    <section class="pquery">
      <el-row>
        <el-col :span="16">
          <el-form :model="queryForm" :inline="true" size="small">
            <el-form-item>
              <el-select v-model="queryForm.type" filterable placeholder="请筛选配置类型">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="queryForm.keyword" placeholder="请输入配置名称/数值/备注" style="width:200px;"></el-input>
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
    <el-table :data="itemList" tooltip-effect="dark">
      <el-table-column label="类型" prop="type" ></el-table-column>
      <el-table-column label="名称" prop="name" ></el-table-column>
      <el-table-column label="数值" prop="value" ></el-table-column>
      <el-table-column label="备注" prop="remark" ></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button @click="modifyItem(scope.row)" type="text">编 辑</el-button>
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
    <setting-dialog :show.sync="showDialog" :itemInfo="itemInfo" :typeList="typeList" @refreshList="query"></setting-dialog>
  </div>
</template>
<script>
  import SettingDialog from './SettingDialog.vue'
  import settingService from '@/api/setting'
  import PagerMixin from '@/components/PagerMixin'
  export default {
    mixins: [PagerMixin],
    data: function() {
      return {
        typeList: [],
        itemList: [],
        itemInfo: null,
        showDialog: false,
        queryForm: {
          type: ''
        }
      }
    },
    methods: {
      query() {
        return settingService.getItemList(this.queryForm).then((ret) => {
          if (ret.code === 0) {
            this.itemList = ret.data.list
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
        this.$confirm('是否要删除『' + item.name + '』？', '删除确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          settingService.deleteItem(item.id).then((ret) => {
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
      loadTypeList() {
        return settingService.getTypeList().then((ret) => {
          if (ret.code === 0) {
            this.typeList = ret.data.list
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
      this.loadTypeList()
      this.query()
    },
    components: {
      SettingDialog
    }
  }
</script>

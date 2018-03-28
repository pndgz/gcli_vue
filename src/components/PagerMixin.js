export default {
  data: function() {
    return {
      querying: false,
      queryForm: {
        page: 1,
        pageSize: 10
      },
      queryResult: {
        total: 0
      }
    }
  },
  methods: {
    handlePageSizeChange(val) {
      this.queryForm.pageSize = val
      this.query()
    },
    handlePageChange(val) {
      this.queryForm.page = val
      this.query()
    },
    query() {
      this.querying = true
      this.queryPageData().finally(() => {
        this.querying = false
      })
    }
  }
}

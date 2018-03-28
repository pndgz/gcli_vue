export default{
  install(Vue, options) {
    // common
    let formatDate = function(value) {
      // return moment(value).format('YYYY-MM-DD')
    }
    Vue.filter('dateFilter', function(value) {
      return formatDate(value)
    })
    Vue.prototype.dateFormatter = function(row, column, cellValue) {
      return formatDate(cellValue)
    }
    let formatSex = function(val) {
      switch (Number(val)) {
        case 0:
          return '男'
        case 1:
          return '女'
        default:
          return '未知'
      }
    }
    Vue.filter('sexFilter', function(value) {
      return formatSex(value)
    })
    Vue.prototype.sexFormatter = function(row, column, cellValue) {
      return formatSex(cellValue)
    }
  }
}

const app = new Vue({
  el: '#app',
  data: {
    selectedCategory: '',
    allItems: false,
    activeUser : function() {
      return localStorage.getItem('user')
    }
  },
  methods: {
    filterCategory: function(category) {
      this.selectedCategory = category
    },
    selectAllItems: function() {
      if (this.allItems === true) {
        this.allItems = false
      } else {
        this.allItems = true
      }
    },
    clearCategory: function() {
      this.selectedCategory = ''
    }
  },
  created() {
  }
})
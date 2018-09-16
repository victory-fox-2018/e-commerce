const app = new Vue({
  el: '#app',
  data: {
    selectedCategory: '',
    allItems: false,
    parentCart: []
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
    },
    addToCart: function(item) {
      let inCart = false
      for (let i = 0; i < this.parentCart.length; i++) {
        if (this.parentCart[i]._id === item._id) {
          inCart = true
          this.parentCart[i].quantity += 1
          break;
        }
      }

      if (!inCart) {
        item.quantity = 1
        this.parentCart.push(item)
      }
    },
    deleteItem: function(itemId) {
      var index = this.parentCart.findIndex(e => e._id === itemId);
      this.parentCart.splice(index, 1)
    },
    emptyCart: function() {
      this.parentCart = []
    }
  }
})
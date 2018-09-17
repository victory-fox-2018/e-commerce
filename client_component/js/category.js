Vue.component('category-vue', {
  data: function () {
    return {
      categories: []
    }
  },

  methods: {
    findallCategory : function() {
      let self = this
      axios({
          method: 'get',
          url: 'http://localhost:3000/category/findAll',
      })
      .then(data => {
          self.categories = data.data.data
      })
    },

    filterItem: function(categoryId){
      let self= this

        axios({
            method: 'get',
            url: `http://localhost:3000/item/filterAll/${categoryId}`,
        })
        .then(data => {
            console.log(data)
            self.items = data.data.data
        })
    }
  },  

  created() {
    this.findallCategory()
  },

  template: 
  `

  <div class="col-lg-3">
    <h1 class="my-4" style="color:yellow;"><b>Aduhai Shop</b></h1>
    <div class="list-group" v-for="category in categories">
      <a v-on:click="filterItem(category._id)" href="#" class="list-group-item">{{category.name}}</a>
    </div>
    <!-- <button @click="addToCart">aaa</button> -->
  </div>
  `

})
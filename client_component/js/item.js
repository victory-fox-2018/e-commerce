Vue.component('item-vue', {
  data: function () {
    return {
      items: []
    }
  },

  methods: {
    findallItem : function() {
      let self= this
      axios({
          method: 'get',
          url: `http://localhost:3000/item/findAll`,
      })
      .then(data => {
          self.items = data.data.data
      })
    },
  

  },

  created(){
    this.findallItem()
  },

  template: 
  `
  <div class="row">
    <div class="col-lg-4 col-md-6 mb-4"  v-for="item in items" >
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">{{item.name}}</a>
          </h4>
          <h5>{{ item.price }}</h5>
          <p class="card-text">{{item.description}} </p>
        </div>
        <div class="card-footer">
          <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
        </div>
      </div>
    </div>
  </div>
  `
})
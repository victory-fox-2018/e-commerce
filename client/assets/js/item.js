Vue.component('item', {
  data: function() {
    return {
    }
  },
  methods: {
      addToCart() {      
        this.$emit('add-cart', this.item)
      }
  },
  props: ['item', 'token'],
  template: 
  `
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
      <img class="card-img-top" src="http://placehold.it/500x400" alt="">
      <div class="card-body">
        <h4 class="card-title">
          <h3>{{ item.name }}</h3>
        </h4>
        <h5>{{ item.description }}</h5>
        <h5>Rp. {{ item.price }}</h5>
        <button type="button" class="btn btn-primary" @click="addToCart" v-if="token">Tambahkan ke keranjang</button>
      </div>
    </div>
  </div>
  `
})
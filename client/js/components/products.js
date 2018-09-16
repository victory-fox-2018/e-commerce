Vue.component('products', {
  props: ['products'],
  data() {
    return {
      showLoader: true,
      showEmptyMsg: false,
      parentProducts: []
    }
  },
  methods: {
    addToCart(id, name, price, seller, area) {
      let product = {
        id, name, price, seller, area
      }
      let cart = JSON.parse(localStorage.getItem('cart'));
      
      if(!cart) {
        localStorage.setItem('cart', JSON.stringify([]));
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  },
  created() {
    
  },
  watch: {
    products(newVal) {
      this.parentProducts = newVal.data;

      if(newVal.empty) {
        this.showLoader = false;
        this.showEmptyMsg = true;
      } else {
        this.showLoader = false;
        this.showEmptyMsg = false;
      }
    }
  },
  template: `
    <section class="section has-background-white">
      <div class="container is-fullhd">
        <h2 class="title has-text-grey-dark">Products</h2>
        <div class="loader-container" v-if="parentProducts.length === 0 && showLoader">
          <div class="loader"></div>
        </div>
        <p v-else-if="showEmptyMsg && !loader">No Products Data</p>
        <br>
        <div class="columns" style="flex-wrap: wrap; justify-content: left;" v-if="parentProducts.length !== 0 && !showEmptyMsg">
          <div class="card" v-for="product in parentProducts">
            <div class="card-image">
              <img src="https://via.placeholder.com/300x250" alt="sample image">
            </div>
            <div class="card-content">
              <p class="is-size-5"><strong>{{ product.name }}</strong></p>
              <p class="has-text-danger">Rp. {{ product.price }}</p>
              <br>
              <p><span class="fa fa-building"></span> <span>{{ product.seller }}</span></p>
              <p><span class="fa fa-map-marker-alt"></span> <span>{{ product.area }}</span></p>
            </div>
            <div class="card-footer">
              <a href="javascript:void(0)" class="button is-primary is-fullwidth" @click="addToCart(product._id, product.name, product.price, product.seller, product.area)">Add to Cart</a>
            </div>
          </div>     
        </div>
        
      </div>
    </section>
  `
});
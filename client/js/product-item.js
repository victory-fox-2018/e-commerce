Vue.component('product-item', {
  props: ['products'],
  
  data() {
    return {
      loader: true,
      empty: false,
      productsParent: null
    }
  },

  watch: {
    products(newVal) {
      this.productsParent = newVal
      
      console.log(this.productsParent, '<==== DATA');

      if(this.productsParent.empty) {
        this.loader = false;
        this.empty = true;
      } else {
        loader = false;
        empty = false;
      }
    }
  },

  created() {
    this.productsParent = this.products;
  },
  template: `
    <section id="recommendation">  
      <div class="container">
        <h2>Products</h2>
        <h3 v-if="empty && !loader">No products data</h3>
        <div class="loader-container" v-if="loader && !empty">
          <div class="loader" id="products-loader"></div>
        </div>
      </div>

      <div class="container" id="recommendation-container" v-if="!loader && !empty">

        <div class="recommend-item" v-for="product in products.data">
          <img src="https://via.placeholder.com/248x248" alt="Sample Image">

          <div class="recommend-white">
            <h3 class="recommend-name">
              {{ product.name }}
            </h3>
            <p class="recommend-price">
              Rp. {{ product.price }}
            </p>
            <div class="slide-to-top"></div>
          </div>

          <div class="recommend-grey">
            <p class="recommend-seller">
              <span class="fa fa-cube"></span>{{ product.seller }}
            </p>
            <p class="recommend-area">
              <span class="fa fa-map-marker"></span>{{ product.area }}
            </p>
          </div>
        </div> 
      </div>
    </section>
  `
});
Vue.component('product-item', {
  props: ['products'],
  
  data() {
    return {
      loader: true,
      productsParent: []
    }
  },

  watch: {
    products(newVal) {
      console.log('prodict')
      this.productsParent = newVal
    }
  },

  created() {
    // console.log(productsParent, '<======= #1');
    // console.log(this.products, '<================= #2');
    // console.log($props.products, '<=============== #3');
    // console.log(this.$props.products, '<=========== #4');

    // if(products.length === 0) {
    //   loader = true;
    // } else {
    //   loader = false;
    // }

    
    
    this.productsParent = this.products;
    console.log(this.productsParent)
    console.log(this.products)
  },
  template: `
    <section id="recommendation">  
      <div class="container">
        <h2>Products</h2>
        <h3>No products data</h3>
        <div class="loader-container" v-if="loader">
          <div class="loader" id="products-loader"></div>
        </div>
      </div>

      <div class="container" id="recommendation-container" v-else>

        <div class="recommend-item" v-for="product in products">
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
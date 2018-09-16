const baseurl = 'http://localhost:3000';

let app = new Vue({
  el: '#app',
  data: {
    products: [],
    categories: []
  },
  methods: {
    selectCategory(id) {
      let self = this;

      axios({
        method: 'GET',
        url: `${baseurl}/products/category/${id}`
      })
      .then(response => {
        let products = response.data.products.productId;
        let send = {
          empty: false,
          data: products
        }
        if(products.length === 0) send.empty = true;

        self.products = send;
      })
      .catch(err => {
        let message = err.response.data;
        let send = {
          message,
          empty: true,
          data: [],
        }

        self.products = send;
      });
    }
  },
  created() {
    let self = this;

    axios({
      method: 'GET',
      url: `${baseurl}/products`
    })
    .then(response => {
      let products = response.data.products;
      let send = {
        empty: false,
        data: products
      }
      if(products.length === 0) send.empty = true;

      self.products = send;
    })
    .catch(err => {
      let message = err.response.data;
      let send = {
        message,
        empty: true,
        data: [],
      }

      self.products = send;
    });

    axios({
      method: 'GET',
      url: `${baseurl}/categories`
    })
    .then(response => {
      let categories = response.data.categories;
      let send = {
        empty: false,
        data: categories
      }
      if(categories.length === 0) send.empty = true;

      self.categories = send;
    })
    .catch(err => {
      let message = err.response.data;
      let send = {
        message,
        empty: true,
        data: [],
      }

      self.products = send;
    });
  }
});
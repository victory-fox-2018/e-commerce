const baseurl = 'http://localhost:3000';

let app = new Vue({
  el: '#app',
  data: {
    products: null
  },
  methods: {

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
  }
});
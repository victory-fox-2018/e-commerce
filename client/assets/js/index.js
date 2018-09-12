const base_url = 'http://localhost:3000'
const data = []
const dataLocal = JSON.parse(localStorage.getItem('data'))

const cart = dataLocal ? dataLocal[0].cart : []
const token = dataLocal ? dataLocal[0].token : ''
const userId = dataLocal ? dataLocal[0].userId : ''
const totalPrice = dataLocal ? dataLocal[0].totalPrice : 0

var app = new Vue({
  el: '#app',
  data: {
    Item: [],
    Category: [],
    error: '',
    token: token,
    Cart: cart,
    cartCount: cart.length,
    totalPrice: totalPrice
  },
  methods: {
    register: function() {
      let self = this

      axios({
        method: 'POST',
        url: `${base_url}/api/users/register`,
        data: {
          name: this.$refs.nameRegist.value,
          email: this.$refs.emailRegist.value,
          password: this.$refs.pwdRegist.value
        }
      })
        .then(() => {
          alert('Register berhasil!')
          this.login()
        })
        .catch(error => {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              alert(error.response.data.error)
              self.error = ''
              self.error = error.response.data.error
              // console.log(error.response.status);
              // console.log(error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }
        })
    },
    login: function() {
      let self = this
      
      axios({
        method: 'POST',
        url: `${base_url}/api/users/login`,
        data: {
          email: this.$refs.emailLogin.value || this.$refs.emailRegist.value,
          password: this.$refs.pwdLogin.value || this.$refs.pwdRegist.value
        }
      })
        .then(response => {
          let obj = {
            token: response.data.token,
            userId: response.data.userId,
            cart: [],
            totalPrice: 0
          }
          data.push(obj)
          localStorage.setItem('data', JSON.stringify(data))
          location.reload()
        })
        .catch(error => {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              alert('Login gagal!')
              self.error = ''
              self.error = 'Login gagal!'
              // console.log(error.response.status);
              // console.log(error.response.headers);
          } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
          } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
          }
        })
    },
    logout: function() {
      localStorage.removeItem('data')
      location.reload()
    },
    showCategory: function(category) {
      let self = this
      let catName = category.target.text
      
      axios({
        method: 'GET',
        url: `${base_url}/api/itemCat/${catName}`
      })
        .then(response => {
          let items = response.data.items
          
          self.Item = ''
          self.Item = items
        })
        .catch(error => {
          console.log(error)
        })
    },
    addToCart: function(item) {
      let itemId = item.target.id
      
      let itemIndex
      
      this.Item.forEach((item, id) => {
        if (item._id === itemId) {
          itemIndex = id
        }
      })

      let cartObj = {
        _id: this.Item[itemIndex]._id,
        name: this.Item[itemIndex].name,
        qty: 1,
        price: this.Item[itemIndex].price,
        totalPrice: this.Item[itemIndex].price * 1
      }
    
      this.totalPrice += this.Item[itemIndex].price
      
      let exist = false 
      
      this.Cart.forEach(cart => {
        if (cart._id === cartObj._id) {
          exist = true
          cart.qty += 1
          cart.totalPrice  += cartObj.totalPrice
        }
      })

      if(!exist) {
        this.Cart.push(cartObj)
      } else {
        this.Cart = this.Cart.slice(0)
      }
    },
    checkout: function() {   
      let itemId = [] 
      let purchase = []
      let self = this

      if (this.Cart.length === 0) {
        alert('Cart anda kosong!')
      } else {
        this.Cart.forEach(cart => {
          let obj = {
            userId: userId,
            itemId: cart._id,
            qty: cart.qty,
            totalPrice: cart.totalPrice
          }
          
          itemId.push(cart._id)
          purchase.push(obj)
        })      

        axios({
          method: 'PATCH',
          url: `${base_url}/api/users/checkout/${userId}`,
          data: {
            purchase,
            itemId
          },
          headers: {
            token: token
          }
        })
          .then(() => {
            self.totalPrice = 0
            self.Cart = []
            location.reload()
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  },
  created() {
    let self = this
    
    axios.get(`${base_url}/api/items`)
      .then(response => {
        self.Item = response.data
        
        axios.get(`${base_url}/api/itemCat`)
          .then(response => {
            self.Category = response.data
          })
      })
      .catch(err => {
        console.log(err.responseText);
      })
  },
  watch: {
    Cart: function() {
      let newLocalDataObj = {
        token: token,
        userId: userId,
        cart: this.Cart,
        totalPrice: this.totalPrice
      }

      let newLocalData = []
      newLocalData.push(newLocalDataObj)
      
      localStorage.setItem('data', JSON.stringify(newLocalData))
      location.reload()
    }
  }
})
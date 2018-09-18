const base_url = 'http://api.ecommerce.skinborderevent.ml'

const dataLocal = JSON.parse(localStorage.getItem('data'))

let cart = dataLocal ? dataLocal.cart : []
let token = dataLocal ? dataLocal.token : ''
let userId = dataLocal ? dataLocal.userId : ''
let totalPrice = dataLocal ? dataLocal.totalPrice : 0
let cartCount = dataLocal ? dataLocal.cart.length : 0

var app = new Vue({
  el: '#app',
  data: {
    Item: [],
    Category: [],
    Cart: cart,
    token: token,
    totalPrice: totalPrice,
    userId: userId,
    cartCount: cartCount
  },
  methods: {
    changeLocalData(data) {
      Cart = data.cart
      token = data.token
      userId = data.userId
      
      this.userId = data.userId
      this.token = data.token
    },
    checkout() {
      this.Cart = [],
      this.cartCount = 0,
      this.totalPrice = 0
    },
    addToCart(item) {
      let itemId = item._id
      
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
      this.cartCount++
      
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
    }
  },
  watch: {
    Cart: function() {
      let newLocalDataObj = {
        token: this.token,
        userId: this.userId,
        cart: this.Cart,
        totalPrice: this.totalPrice
      }
      
      localStorage.setItem('data', JSON.stringify(newLocalDataObj))
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
  }
})
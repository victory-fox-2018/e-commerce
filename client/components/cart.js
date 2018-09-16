const cart = {
  template:
  `
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Your Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row" v-for="item in modalCart" v-if="cart.length">
              <div class="col-sm-2">
                <img src="https://via.placeholder.com/82x72" alt="placeholder">
              </div>
              <div class="col-sm-6">
                <div class="container">
                  {{ item.name }}
                </div>
                <div class="container">
                  <a href='#'><i class="fas fa-trash text-muted" v-on:click="deleteFromCart(item._id)"></i></a>
                </div>
              </div>
              <div class="col-sm-4">
                <p class="text-right" style="color: red;">Rp {{ item.price }}</p>
                <p class="text-right text-muted">{{ item.quantity }} Pcs</p>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <p>Sub-total: <b>Rp {{ totalPrice }}</b></p>
          </div>
          <div class="modal-footer" style="background-color: #003B6F;">
            <button type="button" class="btn btn-outline-light" v-on:click="checkout">Check Out</button>
          </div>
        </div>
      </div>
    </div>
  `,
  props: [ 'cart' ],
  data() {
    return {
      modalCart: [],
      totalPrice: 0,
    }
  },
  methods: {
    getToken: function() {
      return localStorage.getItem('token')
    },
    deleteFromCart: function (itemId) {
      this.$emit('delete-item', itemId)
    },
    checkout: function () {
      if(this.modalCart.length) {
        if(this.getToken()) {
          let self = this
          let arrCheckout = []
          this.modalCart.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
              arrCheckout.push(item._id)
            }
          })

          axios({
            method: 'post',
            url: 'http://localhost:3000/transactions',
            data: {
              totalPrice: this.totalPrice,
              items: arrCheckout
            },
            headers: {
              token: self.getToken()
            }
          })
            .then(transaction => {
              self.totalPrice = 0
              this.$emit('clear-cart')
            })
            .catch(err => {
              console.log(err)
            })
          } else {
            console.log('you have not log in!')
          }
      } else {
        console.log('your cart is empty!')
      }   
    },
    updateCart: function() {
      this.modalCart = this.cart
      let total = 0;
      for (let i = 0; i < this.modalCart.length; i++) {
        total += this.modalCart[i].quantity * this.modalCart[i].price
      }
      this.totalPrice = total
    }
  },
  watch: {
    cart: function(newVal, oldVal) {
      this.updateCart()
    }
  }
}
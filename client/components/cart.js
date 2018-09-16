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
            <div class="row" v-for="item in cart" v-if="cart.length">
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
                <p class="text-right" style="color: red;">{{ item.price }}</p>
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
  data() {
    return {
      cart: [],
      totalPrice: 0,
    }
  },
  methods: {
    deleteFromCart: function (itemId) {
      var index = this.cart.findIndex(e => e._id === itemId);
      this.totalPrice -= (this.cart[index].price * this.cart[index].quantity)
      this.cart.splice(index, 1)
    },
    checkout: function () {
      if(this.cart.length) {
        if(this.getToken()) {
        let self = this
        let arrCheckout = []
        this.cart.forEach(item => {
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
            self.cart = []
            self.totalPrice = 0
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
  }
}
Vue.component('navbar', {
  data: function() {
    return {
      token: token,
      error: '',
      registerData: {
        name: '',
        email: '',
        password: ''
      },
      emailLogin: '',
      passwordLogin: ''
    }
  },
  props: ['carts', 'count', 'total', 'user'],
  methods: {
    register: function() {
      let self = this

      axios({
        method: 'POST',
        url: `${base_url}/api/users/register`,
        data: {
          name: this.registerData.name,
          email: this.registerData.email,
          password: this.registerData.password
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
          email: this.emailLogin || this.register.email,
          password: this.passwordLogin || this.register.password
        }
      })
        .then(response => {
          let obj = {
            token: response.data.token,
            userId: response.data.userId,
            cart: [],
            totalPrice: 0
          }
          
          localStorage.setItem('data', JSON.stringify(obj))
          
          let data = JSON.parse(localStorage.getItem('data'))
          
          this.$emit('login', data)
          
          self.token = data.token
          self.Cart = data.cart
          self.totalPrice = data.totalPrice
          self.userId = data.userId
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
    checkout: function() {   
      let itemId = [] 
      let purchase = []
      let self = this

      if (this.carts.length === 0) {
        alert('Keranjang anda kosong!')
      } else {
        this.carts.forEach(cart => {
          let obj = {
            userId: this.user,
            itemId: cart._id,
            qty: cart.qty,
            totalPrice: cart.totalPrice
          }
          
          itemId.push(cart._id)
          purchase.push(obj)
        })      

        axios({
          method: 'PATCH',
          url: `${base_url}/api/users/checkout/${this.user}`,
          data: {
            purchase,
            itemId
          },
          headers: {
            token: token
          }
        })
          .then(() => {
            self.$emit('checkout', true)
          })
          .catch(error => {
            console.log(error);
          })
      }
    }
  },
  template: 
  `
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container flex-grow-1">
          <a class="navbar-brand" href="http://localhost:8080">E-commerce</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
            
              <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#cartModal" v-if="token"><i class="fas fa-shopping-cart"> ({{ count }})</i></a>
              </li>
              
              <li class="nav-item">
              <a class="nav-link" id="logout" v-on:click="logout" v-if="token">Logout</a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#loginModal" v-if="!token">Login</a>
              </li>
              
              <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#registerModal" v-if="!token">Register</a>
              </li>
              
            </ul>
          </div>
          
        </div>
      </nav>
      
      <!-- Modal Login -->
      <div class="modal fade" id="loginModal">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title"><i class="fas fa-user"></i> Login</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              
              <div class="container">  
                <div class="alert alert-warning" v-if="error">
                  <strong>Warning!</strong> {{ error }}
                </div>
                
                <form>
                  <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" v-model="emailLogin" required>
                  </div>
                  <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" v-model="passwordLogin" @keyup.enter="login" required>
                  </div>
                </form>
                
              </div>
            
            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="login">Login</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>
      
      <!-- Modal Register -->
      <div class="modal fade" id="registerModal">
        <div class="modal-dialog">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title"><i class="fas fa-user"></i> Register</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              
              <div class="container">  
                <div class="alert alert-warning" v-if="error">
                  <strong>Warning!</strong> {{ error }}
                </div>

                <form>
                  <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="name" class="form-control" v-model="registerData.name" required autocomplete="off">
                  </div>
                  <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" v-model="registerData.email" required>
                  </div>
                  <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" v-model="registerData.password" @keyup.enter="register" required>
                  </div>
                  
                </form>  
              </div>
              
              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" v-on:click="register" data-dismiss="modal">Register</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
              </div>
            
            </div>


          </div>
        </div>
      </div>
      
      <!-- Modal Cart -->
      <div class="modal fade" id="cartModal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
              <h4 class="modal-title"><i class="fas fa-shopping-cart"></i> Keranjang</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
              
              <div class="container">         
                <table class="table table-hover">
                  <tbody>
                    
                    <tr v-for="cart in carts">
                      <td>
                        <img class="card-img-top" src="http://placehold.it/30x30" alt="">
                      </td>
                      <td>{{ cart.name }}</td>
                      <td>{{ cart.qty }}</td>
                      <td>Rp. {{ cart.price }}</td>
                      <td>Rp. {{ cart.totalPrice }}</td>
                      <td><button type="button" class="close">&times;</button></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <h5>Sub Total: Rp. {{ total }}</h5>
            </div>
            
            <!-- Modal footer -->
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="checkout">Checkout</button>
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  `
})
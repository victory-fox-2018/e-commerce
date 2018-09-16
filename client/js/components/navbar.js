Vue.component('navbar', {
  data() {
    return {
      signin: {
        modal: false,
        email: '',
        password: '',
        message: ''
      },
      signup: {
        modal: false,
        name: '',
        email: '',
        password: '',
        message: ''
      },
      cart: {
        modal: false,
        message: '',
        data: [],
        emptyMsg: false
      },
      showLogout: false,
      showSnackbar: false
    }
  },
  methods: {
    doSignIn() {
      let self = this;

      axios({
        method: 'POST',
        url: `${baseurl}/customers/signin`,
        data: {
          email: self.signin.email,
          password: self.signin.password
        }
      })
      .then(response => {
        let data = response.data;
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);

        self.signin.modal = false;
        self.showLogout = true;
      })
      .catch(err => {
        let message = err.response.data.message;
        self.signin.message = message;
      });
    },

    doSignUp() {
      let self = this;

      axios({
        method: 'POST',
        url: `${baseurl}/customers/signup`,
        data: {
          name: self.signup.name,
          email: self.signup.email,
          password: self.signup.password
        }
      })
      .then(response => {
        let customer = response.data.customer;
        let message = response.data.message;

        self.signup.modal = false;
        self.signin.modal = true;
      })
      .catch(err => {
        let message = err.response.data.message;
        self.signup.message = message;
      });
    },
 
    openSignIn() {
      this.signin.modal = true;
    },

    openSignUp() {
      this.signup.modal = true;
    },

    closeSignIn() {
      this.signin.modal = false;
    },

    closeSignUp() {
      this.signup.modal = false;
    },

    openCart() {
      let cart = JSON.parse(localStorage.getItem('cart'));

      if(!cart || cart.length === 0) {
        this.cart.emptyMsg = true;
      } else {
        this.cart.emptyMsg = false;
      }

      this.cart.message = '';
      this.cart.data = cart;
      this.cart.modal = true;
    },

    closeCart() {
      this.cart.modal = false;
    },

    checkout() {
      let self = this;
      let userId = localStorage.getItem('userId');

      if(!userId) {
        this.cart.message = 'you must login to checkout'
      } else {
        this.cart.message = '';
        
        axios({
          method: 'POST',
          url: `${baseurl}/cart/checkout`,
          data: {
            customerId: userId,
            cart: this.cart.data
          }
        })
        .then(response => {
          localStorage.setItem('cart', JSON.stringify([]));
          self.cart.modal = false;
          self.showSnackbar = true;
  
          window.setTimeout(() => self.showSnackbar = false, 3000);
        })
        .catch(err => {
          self.cart.message = err.response.data.message;
        });
      }
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.showLogout = false;
    }
  },
  created() {
    let self = this;
    let token = localStorage.getItem('token');

    if(token) {
      axios({
        method: 'POST',
        url: `${baseurl}/customers/checklogin`,
        headers: {
          token: token
        }
      })
      .then(response => {
        self.signin.modal = false;
        self.signup.modal = false;
        self.showLogout = true;
      })
      .catch(err => {
        console.log(err.response.data.message);
      });
    }
  },
  template: `
    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a href="javascript:void(0)" class="navbar-item title">TutupLapak</a>
        </div>

        <div class="navbar-start">
          <div class="navbar-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Search something...">
              </p>
              <p class="control">
                <button class="button">
                  <span class="fa fa-search"></span>
                </button>
              </p>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              <div class="control">
                <a class="button is-primary" href="javascript:void(0)" @click="openCart">
                  <span class="icon">
                    <i class="fas fa-shopping-cart"></i>
                  </span>
                  <span>Cart</span>
                </a>
              </div>
              <div class="control" v-if="!showLogout">
                <a href="javascript:void(0)" class="button is-info is-inverted" @click="openSignIn">
                  <span class="icon fa fa-sign-in-alt"></span> <span>Sign In</span>
                </a>
              </div>
              <div class="control" v-if="!showLogout">
                <a class="button is-info" href="javascript:void(0)" @click="openSignUp">
                  <span class="icon fa fa-plus"></span> <span>Sign Up</span>
                </a>
              </div>
              <div class="control" v-if="showLogout">
                <a class="button is-danger" href="javascript:void(0)" @click="logout">
                  <span class="icon fa fa-sign-out-alt"></span> <span>Sign Out</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal is-active" v-if="cart.modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Cart</p>
            <button class="delete" aria-label="close" @click="closeCart"></button>
          </header>
          <section class="modal-card-body">
            <article class="message is-danger" v-if="cart.message !== '' ">
              <div class="message-body">
                {{ cart.message }}
              </div>
            </article>

            <article class="message is-primary" v-if="cart.emptyMsg">
              <div class="message-body">
                No Products in Cart, <a href="javascript:void(0)" @click="closeCart" class="has-text-danger">Buy something?</a>
              </div>
            </article>

            <article class="media" v-for="product in cart.data">
              <figure class="media-left">
                <p class="image is-100x100">
                  <img src="https://via.placeholder.com/100x100" alt="product image">
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <div>
                    <p class="has-text-grey-dark">
                      {{ product.name }}
                      <br>
                      <span class="has-text-red">Rp. {{ product.price }}</span>
                      <br>
                      <span class="has-text-red">{{ product.seller }}</span>
                      <br>
                      <span class="has-text-red">{{ product.area }}</span>
                    </p>
                    <div class="field">
                      <p class="control">
                        <input type="number" class="input" value="1" style="max-width: 50px">
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          
          </section>
          <footer class="modal-card-foot">
            <button class="button is-medium is-fullwidth is-primary is-outlined" @click="checkout">Checkout</button>
          </footer>
        </div>
      </div>

      <div class="modal is-active" v-if="signin.modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Sign In</p>
            <button class="delete" aria-label="close" @click="closeSignIn"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <article class="message is-danger" v-if="signin.message !== '' ">
                <div class="message-body">
                  {{ signin.message }}
                </div>
              </article>

              <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" v-model="signin.email">
                <span class="icon is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <!-- <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span> -->
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" v-model="signin.password">
                <span class="icon is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-medium is-success" @click="doSignIn">Sign In</button>
            <button class="button is-medium" @click="closeSignIn">Cancel</button>
          </footer>
        </div>
      </div>

      <div class="modal is-active" v-if="signup.modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Sign Up</p>
            <button class="delete" aria-label="close" @click="closeSignUp"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Name" v-model="signup.name">
                <span class="icon is-left">
                  <i class="fas fa-user"></i>
                </span>
                <!-- <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span> -->
              </p>
            </div>
            <div class="field">
              <article class="message is-danger" v-if="signup.message !== '' ">
                <div class="message-body">
                  {{ signup.message }}
                </div>
              </article>

              <p class="control has-icons-left has-icons-right">
                <input class="input" type="email" placeholder="Email" v-model="signup.email">
                <span class="icon is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <!-- <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span> -->
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password" v-model="signup.password">
                <span class="icon is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-medium is-success" @click="doSignUp">Sign Up</button>
            <button class="button is-medium" @click="closeSignUp">Cancel</button>
          </footer>
        </div>
        </div>
      <div class="snackbar is-inverted" v-if="showSnackbar">Success checkout</div>
    </nav>
  `
});
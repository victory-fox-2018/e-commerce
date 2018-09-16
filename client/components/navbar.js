Vue.component('navbar', {
  template:
  `
  <div>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark fixed-top">
      <a class="navbar-brand" href="#">Blanjapedia</a>
      <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive"
        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarResponsive">
        <categoryList v-on:filter-category="filterCategory" v-on:all-items="selectAllItems"></categoryList>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" id="navBarSearchForm" type="search" placeholder="Search product..."
            aria-label="Search">
          <button class="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
        </form>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item pt-1 pr-2">
            <i class="nav-link fas fa-shopping-cart" data-toggle="modal" data-target="#exampleModal"></i> 
            <label style="color: #809DB7;">{{ quantity() }}</label>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#loginModal" v-if="!isLogin">Login</a>
            <a class="nav-link" href="#" data-toggle="modal" data-target="#profileModal" v-if="isLogin">My Transactions</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" data-toggle="modal" data-target="#registerModal" v-if="!isLogin">Register</a>
            <a class="nav-link" href="#" v-if="isLogin" v-on:click="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </nav>

    <modalLogin v-on:is-login="changeIsLogin"></modalLogin>
    <modalRegister></modalRegister>
    <modalCart v-bind:cart="cart" v-on:delete-item="deleteItem" v-on:clear-cart="clearCart"></modalCart>
    <modalProfile v-bind:newtransaction="newTransaction"></modalProfile>
  </div>
  `,
  props: [ 'parentcart' ],
  data() {
    return {
      isLogin: '',
      cart: [],
      quantity: function () {
        let total = 0;
        this.parentcart.forEach(item => {
          total += item.quantity
        })
        return total
      },
      newTransaction: false
    }
  },
  methods: {
    getToken: function() {
      return localStorage.getItem('token')
    },
    logout: function() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.isLogin = false
    },
    filterCategory: function(category) {
      this.$emit('filter-category', category)
    },
    selectAllItems: function() {
      this.$emit('all-items')
    },
    changeIsLogin: function() {
      this.isLogin = true
    },
    deleteItem: function(itemId) {
      this.$emit('delete-item', itemId)
    },
    clearCart: function() {
      if (this.newTransaction === true) {
        this.newTransaction = false
      } else {
        this.newTransaction = true
      }
      this.$emit('empty-cart')
    }
  },
  components: {
    categoryList: category,
    modalLogin: login,
    modalRegister: register,
    modalCart: cart,
    modalProfile: profile
  },
  created() {
    this.isLogin = this.getToken()
  },
  watch: {
    parentcart: function(newVal, oldVal) {
      this.cart = this.parentcart 
    }
  }
})
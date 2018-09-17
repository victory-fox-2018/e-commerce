Vue.component('navbar-vue', {
  data: function () {
    return {
      cart: 0
    }
  },
  methods: {

  },

  template: 
  `

    <div class="container">
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">{{cart}}<i class="fas fa-cart-plus"></i></a>
          </li>
        </ul>
      </div>
    </div>

  `
})
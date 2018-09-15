Vue.component('main-header', {
  methods: {
    openSignInModal() {
      this.$emit('open-sign-in-modal');
    }
  },
  template: `
    <header>
      <div class="container" id="header">
        
        <div>
          <a href="#" class="brand">TutupLapak</a>
        </div>

        <div class="search-container">
          <input type="text" name="keyword">
          <button type="submit"><span class="fa fa-search"></span></button>
        </div>

        <div></div>

        <div class="header-btn">
          <a href="javascript:void(0)" id="cart"><span class="fa fa-shopping-cart"></span></a>
          <a href="javascript:void(0)" id="signin-btn" @click="openSignInModal">Sign In</a>
          <a href="javascript:void(0)" id="signup-btn">Sign Up</a>
          <a href="javascript:void(0)">Logout</a>
        </div>
      </div>
    </header>
  `
});
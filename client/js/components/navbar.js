Vue.component('navbar', {
  data() {
    return {

    }
  },
  template: `
    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
      <div class="container is-fullhd">
        <div class="navbar-brand">
          <a href="javascript:void(0)" class="navbar-item title">TutupLapak</a>
        </div>
        <!-- <a href="javascript:void(0)" role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a> -->

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
                <a class="button is-primary" href="javascript:void(0)">
                  <span class="icon">
                    <i class="fas fa-shopping-cart"></i>
                  </span>
                  <span>Cart</span>
                </a>
              </div>
              <div class="control">
                <a href="javascript:void(0)" class="button is-info is-inverted">
                  <span class="icon fa fa-sign-in-alt"></span> <span>Sign In</span>
                </a>
              </div>
              <div class="control">
                <a class="button is-info" href="javascript:void(0)">
                  <span class="icon fa fa-plus"></span> <span>Sign Up</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Sign In</p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input is-medium" type="email" placeholder="Email">
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
                <input class="input is-medium" type="password" placeholder="Password">
                <span class="icon is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-medium is-success">Sign In</button>
            <button class="button is-medium">Cancel</button>
          </footer>
        </div>
      </div>

      <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Sign Up</p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input is-medium" type="text" placeholder="Name">
                <span class="icon is-left">
                  <i class="fas fa-user"></i>
                </span>
                <!-- <span class="icon is-small is-right">
                  <i class="fas fa-check"></i>
                </span> -->
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left has-icons-right">
                <input class="input is-medium" type="email" placeholder="Email">
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
                <input class="input is-medium" type="password" placeholder="Password">
                <span class="icon is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-medium is-success">Sign Up</button>
            <button class="button is-medium">Cancel</button>
          </footer>
        </div>
      </div>

    </nav>
  `
});
Vue.component('navbar', {
  data() {
    return {
      signin: {
        modal: false,
        email: '',
        password: ''
      },
      signup: {
        modal: false,
        name: '',
        email: '',
        password: ''
      },
      showLogout: false
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

      })
      .catch(err => {

      });
    },

    doSignUp() {
      console.log('sign up...');
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
                <a href="javascript:void(0)" class="button is-info is-inverted" @click="openSignIn">
                  <span class="icon fa fa-sign-in-alt"></span> <span>Sign In</span>
                </a>
              </div>
              <div class="control">
                <a class="button is-info" href="javascript:void(0)" @click="openSignUp">
                  <span class="icon fa fa-plus"></span> <span>Sign Up</span>
                </a>
              </div>
              <div class="control" v-if="logoutBtn">
                <a class="button is-danger" href="javascript:void(0)">
                  <span class="icon fa fa-sign-out-alt"></span> <span>Sign Out</span>
                </a>
              </div>
            </div>
          </div>
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
              <p class="control has-icons-left has-icons-right">
                <input class="input is-medium" type="email" placeholder="Email" v-model="signin.email">
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
                <input class="input is-medium" type="password" placeholder="Password" v-model="signin.password">
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
                <input class="input is-medium" type="text" placeholder="Name" v-model="signup.name">
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
                <input class="input is-medium" type="email" placeholder="Email" v-model="signup.email">
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
                <input class="input is-medium" type="password" placeholder="Password" v-model="signup.password">
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

    </nav>
  `
});
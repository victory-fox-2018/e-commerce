Vue.component('signin', {
  props: ['opensigninmodal'],
  data() {
    return {
      message: '',
      email: '',
      password: '',
      showModal: this.opensigninmodal
    }
  },
  methods: {
    signin() {
      let self = this;

      axios({
        method: 'post',
        url: `${baseurl}/customers/signin`,
        data: {
          email: self.email,
          password: self.password
        }
      })
      .then(response => {
        let token = response.data.token;
        localStorage.setItem('token', token);

        
      })
      .catch(err => {
        console.log(err.response.data);
      });
    },

    closeModal() {
      this.showModal = false;
    }
  },
  // id="signin-modal"
  template: `
    
    <div class="modal-container" style="display: block" v-if="showModal">
      <div class="modal-content">
        <h3 class="modal-title">Sign In <span class="close" id="signin-close" @click="closeModal">&times;</span></h3>
        <p class="alert-danger" style="margin-top: 10px" v-if="message !== ''">
          <!-- {{ signinData.message }} -->
        </p>
        <hr>
        <div>
          <div class="input-group">
            <label for="">Email</label>
            <input type="text" id="signin-email" class="form-control" v-model="email">
          </div>

          <div class="input-group">
            <label for="">Password</label>
            <input type="password" id="signin-password" class="form-control" v-model="password">
          </div>

          <div class="input-group">
            <button type="button" class="button button-black" @click="signin">Sign In</button>
          </div>
        </div>
      </div>
    </div>  
  `
})
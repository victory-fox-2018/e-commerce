const register = {
  template: 
  `
  <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Register a New Account</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
              <div class="form-group">
                  <input id="nameRegister" type="text" class="form-control" placeholder="Name" required="required" v-model="nameRegister">
              </div>     
              <div class="form-group">
                  <input id="emailRegister" type="email" class="form-control" placeholder="Email" required="required" v-model="emailRegister">
              </div>
              <div class="form-group">
                  <input id="passwordRegister" type="password" class="form-control" placeholder="Password" required="required" v-model="passwordRegister">
              </div>
              <div class="form-group">
                  <button type="button" class="btn btn-primary btn-block" data-dismiss="modal" v-on:click="register()">Register</button>
              </div>     
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      nameRegister: '',
      passwordRegister: '',
      emailRegister: '',
    }
  },
  methods: {
    register: function() {
      let self = this
      axios({
        method: 'post',
        url: 'http://localhost:3000/users',
        data: {
          name: this.nameRegister,
          email: this.emailRegister,
          password: this.passwordRegister
        }
      })
        .then(user => {
          self.nameRegister = ''
          self.emailRegister = ''
          self.passwordRegister = ''
          window.location.reload()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
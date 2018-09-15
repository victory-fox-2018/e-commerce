Vue.component('signup', {
  template: `
    <div class="modal-container" id="signup-modal">
      <div class="modal-content">
        <h3 class="modal-title">Sign Up <span class="close" id="signup-close">&times;</span></h3>
        <hr>
        <p class="alert-danger" style="margin-top: 10px">
          <!-- {{ signupData.message }} -->
        </p>
        <div>

          <div class="input-group">
            <label for="">Full Name</label>
            <input type="text" id="signup-name" class="form-control">
          </div>
      
          <div class="input-group">
            <label for="">Email</label>
            <input type="text" id="signup-email" class="form-control">
          </div>
      
          <div class="input-group">
            <label for="">Password</label>
            <input type="password" id="signup-password" class="form-control">
          </div>
      
          <div class="input-group">
            <button type="button" class="button button-green">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  `
});
Vue.component(`login-logout`,{
    data: function(){
        return {
            name: '',
            email: '',
            password: '',
        }
    },
    template: `
    <span>
        <i class="fas fa-user" style="color:white; margin:20px;"></i>
        <button id="logout" class="btn btn-primary" style="background-color:#33363C;" v-on:click="logout">Logout</button>
        <button type="button" id="login" class="btn btn-primary" data-toggle="modal" data-target=".bd-login-modal-sm">Login</button>

        <div class="modal fade bd-login-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="text-center" style="margin:20px;">
                        <h1>Sign In</h1>
                        <div class="alert alert-danger" id="notification">
                            Incorrect email or password.
                        </div>
                        <form>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" placeholder="Enter email">
                                <small id="emailHelp" class="form-text text-muted">We'll never share your
                                    email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" v-model="password" class="form-control" id="exampleInputPassword1"
                                    placeholder="Password">
                                <small class="form-text">
                                    Dont have an account? <a href="/register">Register</a>
                                </small>
                            </div>
                        </form>
                        <button class="btn btn-primary" v-on:click="submitButton">Login</button>

                    </div>
                </div>
            </div>
        </div>
        <button type="button" id="register" class="btn btn-primary" data-toggle="modal" data-target=".bd-register-modal-sm">Register</button>

        <div class="modal fade bd-register-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="text-center" style="margin:20px;">
                        <h1>Register</h1>
                        <form>
                            <div class="form-group">
                                <label for="name">Name</label>
                                <input type="text" v-model="name" class="form-control" id="name"
                                    aria-describedby="emailHelp" placeholder="Enter name">
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" placeholder="Enter email">
                                <small id="emailHelp" class="form-text text-muted">We'll never share your
                                    email with anyone else.</small>
                            </div>
                            <div class="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" v-model="password" class="form-control" id="exampleInputPassword1"
                                    placeholder="Password">
                                <small class="form-text">
                                    Dont have an account? <a href="/register">Register</a>
                                </small>
                            </div>
                        </form>
                        <button class="btn btn-primary" v-on:click="submitButton('register')">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </span>`,
    methods: {
        submitButton: function (param) {
            let name = this.name
            let email = this.email
            let password = this.password
            if(param === 'register'){ // kalau register
                // console.log(param)
                axios({
                    url: 'http://api-e-commerce.minzard.xyz/register',
                    method: 'post',
                    data: {
                        name: name,
                        email: email,
                        password: password
                    }
                })
                .then(result =>{
                    window.location.replace('/')
                })
                .catch(err =>{
                    alert(`error`)
                })

            }else{   // kalau login
                axios({
                    method: 'post',
                    url: 'http://api-e-commerce.minzard.xyz/login',
                    data: {
                        email: email,
                        password: password
                    }
                })
                .then(result => {
                    let token = result.data.token
                    this.loginStatus = true
                    localStorage.setItem('token', token)
                    window.location.replace('/')
                })
                .catch(err => {
                    $('#notification').show()
                })
            }
        },
        logout: function () {
            localStorage.clear()
            window.location.replace('/')
        },
    }
})


if (localStorage.getItem('token')) {
    $('#login').hide()
    $('#register').hide()
    $('#logout').show()
} else {
    $('#login').show()
    $('#register').show()
    $('#logout').hide()
}
$('#notification').hide()
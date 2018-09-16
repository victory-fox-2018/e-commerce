Vue.component('nav-bar', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-light bg-info fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#"><i class="fas fa-fish"></i></a>
                <a class="navbar-brand" href="#">Amisquarium</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <input class="form-control" type="text" placeholder="Search item here">
                        </li>

                        <li class="nav-item" v-if="token">
                            <div class="dropdown">
                                <button class="btn btn-transaparent dropdown-toggle bg-transparent" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    My Transaction
                                    <i class="fas fa-money-bill"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <div class="card-fluid">
                                        <div class="card-header bg-transparent">My History Transaction</div>
                                        <div class="card-body">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                        <th scope="col">Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item" v-if="token">
                            <div class="dropdown">
                                <button class="btn btn-transaparent dropdown-toggle bg-transparent" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Cart
                                    <i class="fas fa-shopping-cart"></i>: {{cartvalue.countCart}}
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <div class="card-fluid">
                                        <div class="card-header bg-transparent">My Cart</div>
                                        <div class="card-body">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="(item, index) in cartvalue.cart" :key="index">
                                                        <td>{{index+1}}</td>
                                                        <td>{{item.name}}</td>
                                                        <td> Rp.{{item.price.toLocaleString()}}</td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                            <h4 style="text-align:center">
                                                Total Price : Rp.{{cartvalue.countPrice}}
                                            </h4>
                                            <button type="button" class="btn btn-info" v-on:click="createTransaction">Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>


                        <li class="nav-item" v-if="!token">
                            <div class="dropdown">
                                <button class="btn btn-transaparent dropdown-toggle bg-transparent" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Login
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <div class="card-fluid">
                                        <div class="card-header bg-transparent">Login Form</div>
                                        <div class="card-body">
                                            <div class="form-group">
                                                Email:
                                                <input class="form-control-sm" type="text" placeholder="Your email"
                                                    v-model="loginEmail">
                                                Password:
                                                <input class="form-control-sm" type="password" placeholder="Your password"
                                                    v-model="loginPassword">
                                            </div>
                                            <button type="button" class="btn btn-info" v-on:click="login">Submit</button>
                                        </div>
                                        <div class="card-footer bg-transparent" v-if="errorMessage.length > 0" v-for="(message, index) in errorMessage" :key="index">footer {{message}}</div>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item" v-if="token">
                            <button type="button" class="btn bg-transparent" v-on:click="logout">Logout</button>
                        </li>

                        <li class="nav-item" v-if="!token">
                            <div class="dropdown">
                                <button class="btn btn-transaparent dropdown-toggle bg-transparent" type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Register
                                </button>
                                <div class="dropdown-menu dropdown-menu-right">
                                    <div class="card-fluid">
                                        <div class="card-header bg-transparent">Register Form</div>
                                        <div class="card-body">
                                            <div class="form-group">
                                            
                                                <label for="registerName">Name:</label>
                                                <input class="form-control-sm" type="text" id="registerName" placeholder="Your email"
                                                    v-model="registerName">
                                                <label for="registerEmail">Email:</label>
                                                <input class="form-control-sm" type="email" id="registerEmail" placeholder="Your email"
                                                    v-model="registerEmail">
                                                    <label for="registerEmail">Password:</label>
                                                <input class="form-control-sm" type="password" id="registerPassword" placeholder="Your email"
                                                    v-model="registerPassword">
                                            </div>
                                            <button type="button" class="btn btn-info" v-on:click="register">Submit</button>
                                        </div>
                                        <div class="card-footer bg-transparent">footer</div>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    `,
    props:["cartvalue"],
    data: function(){
        return{
            token:false,
            loginName: '',
            loginEmail: '',
            loginPassword: '',
            registerName:'',
            registerEmail: '',
            registerPassword: '',
            errorMessage: [],
            message: '',
            item: [],
            cart: [],
            total: 0,
            isLogin:''
        }
    },
    methods: {
        login() {
            let self = this
            this.errorMessage = []
                axios({
                    method: "POST",
                    url: 'http://localhost:3000/users/login',
                    data: {
                        email: this.loginEmail,
                        password: this.loginPassword
                    }
                })
                .then(function ({data}) {
                    self.errorMessage = []
                    localStorage.setItem("token", data.token)
                    self.isLogin = localStorage.getItem("token")
                    self.loginEmail = ''
                    self.loginPassword = ''
                })
                .catch(function (err) {
                    // console.log('masuuk catch');
                    // console.log(err.response.data.message);
                    self.errorMessage.push(err.response.data.message)
                })
            // }
        },
        register() {
            let self = this
            axios({
                method: "POST",
                url: "http://localhost:3000/users/register",
                data:   {
                    name: this.registerName,
                    email: this.registerEmail,
                    password: this.registerPassword
                }
            })
                .then(function (result) {
                    // alert("register success")
                    console.log(result)
                    self.errorMessage=[]
                    self.message = "Register success"
                    self.registerName = ''
                    self.registerEmail = ''
                    self.registerPassword = ''
                })
                .catch(function (error) {
                    self.message = error.response.data.message
                    console.log(error.response.data.message);
                    
                    // alert("register failed")
                })
        },
        logout(){
            // this.isLogout = localStorage.getItem("token")
            localStorage.clear()
            this.token = false,
            this.isLogin = ''
        },
        createTransaction(){
            console.log('---', this.cartvalue.countPrice);
            console.log(typeof this.cartvalue.countPrice);
            
            let self = this
            axios({
                method:"POST",
                url:"http://localhost:3000/transactions",
                headers:{
                    token:localStorage.getItem("token")
                },
                data:{
                    itemList:this.cartvalue.cart,
                    totalPrice:this.cartvalue.countPrice
                }
            })
            .then(function(result){
                console.log(result);
                self.cartvalue.countCart = ''
            })
            .catch(function(err){
                console.log(err.response)
            })
        }
    },
    created() {
        let checkToken = localStorage.getItem("token")
        if(checkToken){
            this.token = true
        }
    },
    watch:{
        isLogin:function(newLogin, oldLogin){
            if(newLogin){
                this.token = true
                this.$emit('check-token',this.token)
            }else if(oldLogin){
                this.token = false
            }
        }
    }
})
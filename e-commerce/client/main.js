$(document).ready(function(){
    $(".button-collapse").sideNav()
    $('.modal').modal()
})

const url = `http://localhost:3000`
const app = new Vue({
    el: '#app',
    mounted() {
        this.checkLogin()
        this.getProducts()
        this.getCategory()
        this.getUserLogin()
        this.checkOutLogin()
    },
    data: {
        isRegister: false,
        isLogin: false,
        name: '',
        email: '',
        password: '',
        search: '',
        category: [],
        products: [],
        cart: [],
        checkout: [],
        user: {
            name: 'Unknown',
            email: 'Unknown'
        }
    },
    methods: {
        checkOutLogin(){
            console.log('Masuk');
            axios({
                url: url+`/transaction`,
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then( response => {
                this.checkout = response.data
            })
            .catch( err => {
                console.log(err)
            })
        },
        checkoutin() {
            axios({
                url: url+`/transaction`,
                method: 'POST',
                data: {
                    products: this.cart
                }, 
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then( response => {
                this.cart = []
                window.location = '/checkout.html'
            })
            .catch( err => console.log(err))
        },
        registerKah() {
            this.isRegister = true
        },
        gakRegisterKah(){
            this.isRegister = false
        },
        signin(e){
            if(this.name != '') {
                axios({
                    url: url+`/signup`,
                    method: 'POST',
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                })
                .then( response => {
                    localStorage.setItem('token', response.data.token)
                    this.isLogin = true
                    window.location = '/'
                })
                .catch( err => {
                    this.category = []
                })
            } else {
                axios({
                    url: url+`/signin`,
                    method: 'POST',
                    data: {
                        email: this.email,
                        password: this.password
                    }
                })
                .then( response => {
                    localStorage.setItem('token', response.data.token)
                    this.isLogin = true
                    window.location = '/'
                })
                .catch( err => {
                    this.category = []
                })
            }
        },
        signout(){
            this.isLogin = false
            localStorage.removeItem('token')
        },
        checkLogin() {
            let token = localStorage.getItem('token')
            if(token) {
                this.isLogin = true
            } else {
                this.isLogin = false
            }
        },
        filterCategory(category) {
            axios({
                url: url+`/products/like/${category}`,
                method: 'GET'
            })
            .then( response => {
                this.products = response.data.result
            })
            .catch( err => {
                this.products = []
            })
        },
        getProducts() {
            axios({
                url: url+`/products`,
                method: 'GET'
            })
            .then( response => {
                if(response.status == 200) {
                    this.products = response.data.result
                }

            })
            .catch( err => {
                this.products = []
            })
        },
        getCategory() {
            axios({
                url: url+`/category`,
                method: 'GET'
            })
            .then( response => {
                this.category = response.data.result
            })
            .catch( err => {
                this.category = []
            })
        },
        addCart(idx) {
            let item = {
                _id:this.products[idx]._id,
                name:this.products[idx].name,
                price:this.products[idx].price,
                category:this.products[idx].category,
                amount: 1,
                pay: this.products[idx].price
            }
            if(this.cart.length == 0) {
                this.cart.push(item)
                this.products[idx].stock -= 1
            }
            else {
                let exist = false
                this.cart.forEach( e => {
                    if(e._id == this.products[idx]._id) {
                        exist = true
                        e.amount += 1
                        e.pay += this.products[idx].price
                        this.products[idx].stock -= 1
                    }
                })
                if(!exist) {
                    this.cart.push(item)
                    this.products[idx].stock -= 1
                }
            }

        },
        getUserLogin() {
            axios({
                url: url+`/users`,
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then( response => {
                let user = {
                    name: response.data.name,
                    email: response.data.email
                }
                this.user = user
            })
            .catch( err => {
                this.user
            }) 
        },
        lessPrice(num) {
            axios({
                url: url+`/products/pricelt/${num}`,
                method: 'GET'
            })
            .then( response => {
                this.products = response.data.result
            })
            .catch( err => {
                this.products = []
            })
        }, 
        morePrice(num) {
            axios({
                url: url+`/products/pricegt/${num}`,
                method: 'GET'
            })
            .then( response => {
                this.products = response.data.result
            })
            .catch( err => {
                this.products = []
            })
        }
    },
    computed: {
        price: function() {
            return function(price) {
                return 'Rp.'+price
            }
        },
        filterProducts: function() {
            return this.products.filter( products => {
                return products.category.name(this.search)
            })
        }
    },
    watch: {
        cart: function() {
            [...this.cart]
        },
        products: function() {
            [...this.products]
        }
    }
})
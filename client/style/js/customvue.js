var app = new Vue({
    el: '#app',
    data: {
        categories: [],
        items: [],
        carts: [],
        tempCart : '',

        name: '',
        picture: '',
        gender: '',
        address: '',
        phoneNumber: '',
        email: '',
        password: '',

        cekLogin : false
    },
    created: function () {
        this.getAllCategoires()
        this.getAllItems()
        this.checkLogin()
    },
    methods: {
        getAllCategoires: function () {
            let self = this
            axios({
                    method: 'GET',
                    url: 'http://localhost:5000/categories'
                })
                .then(function (result) {
                    self.categories = result.data.categories
                })
        },
        getAllItems: function () {
            let self = this
            axios({
                    method: "GET",
                    url: 'http://localhost:5000/items'
                })
                .then(function (result) {
                    self.items = result.data.items
                })
        },
        getItemByCategory: function (categoryId) {
            let self = this
            axios({
                    method: 'GET',
                    url: `http://localhost:5000/items/categories/${categoryId}`
                })
                .then(function (result) {
                    self.items = result.data.items
                })
        },
        getDataItemToCart: function (index) {
       
            let item = {
                idItem    : this.items[index]._id,
                name      : this.items[index].name,
                price     : this.items[index].price,
                totalItem : 1,
                totalPrice : Number(this.items[index].price)
            }

            let trigger = true

            for(let i = 0; i < this.carts.length; i++){
                if(this.carts[i].idItem == item.idItem){
                    this.carts[i].totalItem += 1
                    this.carts[i].totalPrice += item.totalPrice
                    trigger = false
                    
                }
            }

            if(trigger){
                this.carts.push(item)
                this.subTotalPrice += item.totalPrice
            }
        },
        signupUser: function(){
            let data = {
                name : this.name,
                picture : this.picture,
                gender : this.gender,
                address : this.address,
                phoneNumber : this.phoneNumber,
                email : this.email,
                password : this.password
            }

            let self = this
            axios({
                method: "POST",
                url: 'http://localhost:5000/users/signup',
                data
            })
            .then(function (result) {
                console.log(result)
            })
            .catch(function (err){
                console.log(err)
            })
        },
        signinUser: function(){
            let data = {
                email : this.email,
                password : this.password
            }

            let self = this
            axios({
                method: "POST",
                url: 'http://localhost:5000/users/signin',
                data
            })
            .then(function (response) {
                // console.log(result)
                localStorage.setItem('token', response.data.token)
                location.reload()
            })
            .catch(function (err){
                // console.log(err.response.data.message)
            })
        },
        logoutUser: function(){
            localStorage.removeItem('token')
            location.reload()
        },
        checkLogin: function(){
            let token = localStorage.getItem('token')
            if(token){
                this.cekLogin = true
            } else {
                this.cekLogin = false
            }
        },
        checkoutItem: function(){
            // console.log(this.carts)

            axios({
                method: "POST",
                url: "http://localhost:5000/transactions/create",
                data:{
                    cart : this.carts
                },
                headers: {
                    token : localStorage.getItem('token')
                }
            })
            .then(function(response){
                swal(`${response.data.message}`, ``, "success")
                .then(function(){
                    location.reload()
                })
            })
            .catch(function(err){
                console.log(err.response)
            })
            
        }
    },

});
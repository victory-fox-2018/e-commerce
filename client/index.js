var token = localStorage.getItem("token")

var app = new Vue({
    el: '#app',
    data: {
        item: [],
        cart: [],
        total: 0
    },
    methods: {
        login() {
            axios({
                method: "POST",
                url: 'http://localhost:3000/users/login'
            })
                .then(function ({ data }) {
                    alert("login success")
                    console.log(data);
                })
                .catch(function (error) {
                    alert("login failed")
                })
        },
        register() {
            axios({
                method: "POST",
                url: "http://localhost:3000/users/register"
            })
                .then(function ({ data }) {
                    alert("register success")
                    console.log(data);
                })
                .catch(function (error) {
                    alert("register failed")
                })
        },
        getAllItem() {
            let self = this
            axios({
                method: "GET",
                url: "http://localhost:3000/items"
            })
                .then(function ({ data }) {
                    self.items = data.data
                })
                .catch(function(err){
                    console.log(err.message);
                })
        }
    },
    mounted() {
        this.getAllItem()
    },
    watch:{
        cart:this.cart
    }

})
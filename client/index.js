// var token = localStorage.getItem("token")

var app = new Vue({
    el: '#app',
    data: {
        items: [],
        cart: [],
        total: 0,
        token: false,
        Login: {
            name:'',
            email: '',
            password: ''
        },
        Register: {
            name: '',
            email: '',
            password: ''
        },
        errorMessage: [],
        message: '',
        isLogout:'',
        isLogin:''
    },
    methods: {
        // login() {
        //     console.log(this.token);
            
        //     let self = this
        //     this.errorMessage = []
        //         axios({
        //             method: "POST",
        //             url: 'http://localhost:3000/users/login',
        //             data: {
        //                 email: this.Login.email,
        //                 password: this.Login.password
        //             }
        //         })
        //         .then(function ({data}) {
        //             self.errorMessage = []
        //             localStorage.setItem("token", data.token)
        //             self.isLogin = localStorage.getItem("token")
        //         })
        //         .catch(function (err) {
        //             console.log('masuuk catch');
        //             console.log(err.response.data.message);
        //             self.errorMessage.push(err.response.data.message)
        //         })
        //     // }
        // },
        // register() {
        //     axios({
        //         method: "POST",
        //         url: "http://localhost:3000/users/register",
        //         data:   {
        //             name: this.Register.name,
        //             email: this.Register.email,
        //             password: this.Register.password
        //         }
        //     })
        //         .then(function (result) {
        //             // alert("register success")
        //             console.log(result)
        //             self.errorMessage=[]
        //         })
        //         .catch(function (error) {
        //             console.log(error.response.data.message);
                    
        //             // alert("register failed")
        //         })
        // },
        getAllItem() {
            let self = this
            axios({
                method: "GET",
                url: "http://localhost:3000/items"
            })
                .then(function ({ data }) {
                    console.log(data.data);
                    
                    self.items = data.data
                })
                .catch(function (err) {
                    console.log(err.message);
                })
        },
        // logout(){
        //     this.isLogout = localStorage.getItem("token")
        //     localStorage.clear()
        // }
    },
    created() {
        let checkToken = localStorage.getItem("token")
        if(checkToken){
            this.token = true
        }
        this.getAllItem()
    },
    watch: {
        isLogout:function(newLogout,oldLogout){
            if(newLogout){
                this.token = false
            }
        },
        isLogin:function(newLogin,oldLogin){
            if(newLogin){
                this.token = true  
            }
        },
    },
    computed:{
        priceTag:function(){
            
        }
    }
})
const app = new Vue({
    el: '#app',
    data() {
        return {
            isLogin: false,
            items: [],
            categories: [],
            cart: 0,
            name: '',
            email: '',
            password: '',
            errors : [],
            success : null
        }
    },
    mounted() {
        this.getItems(),
            this.getCategories()
    },
    methods: {
        signup() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/signup',
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
                .then(response => {
                    this.success = `${response.data.msg}`
                })
                .catch(err => {
                    this.errors = []
                    if(err.response.status == 400){
                        let error = err.response.data.errors
                        for(let i = 0 ; i < error.length ; i++){
                            this.errors.push(error[i])
                        }
                    }else {
                        this.errors.push('internal server error')
                    }
                })
        },
        signin() {
            axios({
                method : 'POST',
                url : 'http://localhost:3000/user/signin',
                data : {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                // console.log(localStorage.getItem("token"));
            })
            .catch(err => {
                this.errors = []
                let ERRORS = JSON.parse(JSON.stringify(err.response))
                if(err.response.status == 404){
                    this.errors.push(ERRORS.data.msg)
                }else{
                    this.errors.push('internal server error')
                }
            })
        },
        signinCheck() {
            this.errors = []
            if(!this.email){
                this.errors.push('email is empty')
            }else if(!this.password){
                this.errors.push('password is empty')
            }else{
                this.signin()
            }
        },
        addCart() {
            this.cart++
        },
        getItems() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/item/display'
            })
                .then(response => {
                    this.items = response.data.items
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getCategories() {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/category/display'
            })
                .then(response => {
                    this.categories = response.data.categories
                })
                .catch(error => {
                    console.log(error);
                })
        },
        registerSubmit() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/add',
                data: {
                    name: this.user.name,
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then(() => {
                    window.location = 'index.html'
                })
                .catch(error => {
                    console.log(error);
                })
        },
        loginSubmit() {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/login',
                data: {
                    email: this.user.email,
                    password: this.user.password
                }
            })
                .then((response) => {
                    localStorage.setItem('token', response.data.token)
                    window.location = 'dashboard.html'
                })
                .catch(error => {
                    console.log(error);
                })
        },
        filterItem(name) {
            axios({
                method: 'GET',
                url: `http://localhost:3000/item/filter/${name}`
            })
                .then(response => {
                    this.items = response.data.items
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
})
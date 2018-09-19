const app = new Vue({
    el: '#app',
    data() {
        return {
            isLogin: false,
            items: [],
            categories: [],
            countItem: 0,
            name: '',
            email: '',
            password: '',
            errors : [],
            success : null,
            itemCarts : [],
            totalItems : [],
            payTotal : 0,
            itemCartsiD : []
        }
    },
    mounted() {
        this.getItems(),
        this.getCategories(),
        this.checkLogin()
    },
    methods: {
        signup() {
            let self = this
            axios({
                method: 'POST',
                url: 'http://localhost:3000/user/signup',
                data: {
                    name: self.name,
                    email: self.email,
                    password: self.password
                }
            })
                .then(response => {
                    self.errors = []
                    self.success = `${response.data.msg}`
                })
                .catch(err => {
                    self.errors = []
                    self.success = null
                    if(err.response.status == 400){
                        let error = err.response.data.errors
                        for(let i = 0 ; i < error.length ; i++){
                            self.errors.push(error[i])
                        }
                    }else {
                        self.errors.push('internal server error')
                    }
                })
        },
        signin() {
            let self = this
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
                self.isLogin = true
                self.errors = []
                self.success = `${response.data.msg}`
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
        logout(){
            localStorage.removeItem("token");
            this.isLogin = false
        },
        signinCheck() {
            this.errors = []
            if(!this.email && !this.password){
                this.errors.push('email and password is empty')
            }else if(!this.email){
                this.errors.push('email is empty')
            }else if(!this.password){
                this.errors.push('password is empty')
            }else{
                this.signin()
            }
        },
        checkLogin() {
            let getToken = localStorage.getItem("token")
            if(getToken){
                this.isLogin = true
            }
        },
        getItems() {
            let self = this
            axios({
                method: 'GET',
                url: 'http://localhost:3000/item/display'
            })
                .then(response => {
                    self.items = response.data.items
                })
                .catch(error => {
                    console.log(error);
                })
        },
        getCategories() {
            let self = this
            axios({
                method: 'GET',
                url: 'http://localhost:3000/category/display'
            })
                .then(response => {
                    self.categories = response.data.categories
                })
                .catch(error => {
                    console.log(error);
                })
        },
        filterItem(name) {
            let self = this
            axios({
                method: 'GET',
                url: `http://localhost:3000/item/filter/${name}`
            })
                .then(response => {
                    self.items = response.data.items
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addCart(paramItemId) {
            let self = this
            self.countItem++
            axios({
                method: 'GET',
                url: `http://localhost:3000/item/${paramItemId}`
            })
                .then(response => {
                    self.itemCarts.push(response.data)
                    self.calculateItems(self.itemCarts)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        calculateItems(data){
            this.totalItems = []
            this.itemCartsiD = []
            this.payTotal = 0
            for(let i = 0 ; i < data.length ; i++){
                this.itemCartsiD.push(data[i]._id)
                this.payTotal += data[i].price
                let isDuplicate = false
                for(let j = 0 ; j < this.totalItems.length ; j++){
                    if(data[i]._id === this.totalItems[j]._id){
                        isDuplicate = true
                        this.totalItems[j].totalPrice += data[i].price
                        this.totalItems[j].qty ++
                    }
                }
                if(isDuplicate === false){
                    let obj = {
                        _id : data[i]._id,
                        name : data[i].name,
                        price : data[i].price,
                        totalPrice : data[i].price,
                        qty : 1
                    }
                    this.totalItems.push(obj)
                }
            }
            return this.totalItems
        },
        pay(){
            let self = this
            let token = localStorage.getItem("token")
            axios({
                method : 'POST',
                url : 'http://localhost:3000/cart/add',
                data : {
                    total: this.payTotal,
                    itemId: this.itemCartsiD
                },
                headers : {
                    token
                }
            })
            .then(() => {
                self.payTotal = 0
                self.itemCartsiD = []
                self.countItem = 0
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
})
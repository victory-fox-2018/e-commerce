let token = localStorage.getItem('token')

const vue = new Vue({
    el: '#app',
    data: {
        name: '',
        email: '',
        password: '',
        cart: [],
        items: [],
        categories: [],
        transaction: [],
        loginStatus: false,
        totalPrice: 0
    },
    methods: {
        submitButton: function (param) {
            let name = this.name
            let email = this.email
            let password = this.password
            if(param === 'register'){
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

            }else{
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
            // console.log(name,email,password)
        },
        logout: function () {
            localStorage.clear()
            window.location.replace('/')
        },
        addToCart: function (id, name, price) {
            this.cart.push({
                id: id,
                name: name,
                price: price
            })
            this.totalPrice += Number(price)
            // console.log(id)
        },
        shortByCategory: function (idCategory) {
            axios({
                method: 'get',
                url: `http://api-e-commerce.minzard.xyz/getItemByCategory?id=${idCategory}`
            })
            .then(result => {
                let items = result.data
                this.items = items
            })
            .catch(err => {
                console.log(err)
            })
            console.log(idCategory)
        },
        getAllItems: function () {
            axios({
                method: 'get',
                url: 'http://api-e-commerce.minzard.xyz/get-items'
            })
            .then(result => {
                let items = result.data
                this.items = items
            })
            .catch(err => {
                console.log(err)
            })
        },
        sortBy: function (price) {
            let items = []
            if (price === 'high') {
                this.items.forEach(item => {
                    items.push(item)
                })

                for (let i = 0; i < items.length - 1; i++) {
                    if (items[i].price < items[i + 1].price) {
                        let tmp = items[i]
                        items[i] = items[i + 1]
                        items[i + 1] = tmp
                        i = -1
                    }
                }
                this.items = items
            } else if (price === 'low') {
                this.items.forEach(item => {
                    items.push(item)
                })

                for (let i = 0; i < items.length - 1; i++) {
                    if (items[i].price > items[i + 1].price) {
                        let tmp = items[i]
                        items[i] = items[i + 1]
                        items[i + 1] = tmp
                        i = -1
                    }
                }
                this.items = items
            } else {
                axios({
                    method: 'get',
                    url: 'http://api-e-commerce.minzard.xyz/get-items'
                })
                .then(result => {
                    let items = result.data
                    this.items = items
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        pay: function () {
            // console.log(`hello`)
            let idItems = []

            this.cart.forEach(keranjang => {
                idItems.push(keranjang.id)
            })
            // console.log(idItems)
            axios({
                method: 'post',
                url: 'http://api-e-commerce.minzard.xyz/buy-items',
                data: {
                    itemId: idItems,
                    total: this.totalPrice
                },
                headers: {
                    "token": `${token}`
                }
            })
            .then(success => {
                window.location.replace('/')
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created: function () {
        axios({
            method: 'get',
            url: 'http://api-e-commerce.minzard.xyz/get-category'
        })
        .then(result => {
            let category = result.data
            this.categories = category
        })
        .catch(err => {
            console.log(err)
        })

        axios({
            method: 'get',
            url: 'http://api-e-commerce.minzard.xyz/get-items'
        })
        .then(result => {
            let items = result.data
            this.items = items
        })
        .catch(err => {
            console.log(err)
        })
        axios({
            method: 'get',
            url: 'http://api-e-commerce.minzard.xyz/get-transaction',
            headers: {
                token: token
            }
        })
        .then(result =>{
            console.log(result.data)
            this.transaction = result.data
        })
        .catch(err =>{
            console.log(err)
        })
    }
})


if (token) {
    $('#login').hide()
    $('#register').hide()
    $('#logout').show()
    vue.loginStatus = true
} else {
    $('#login').show()
    $('#register').show()
    $('#logout').hide()
}
$('#notification').hide()
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
        totalprice: 0
    },
    methods: {
        addToCart: function (id, name, price) {
            this.cart.push({
                id: id,
                name: name,
                price: price
            })
            this.totalprice += Number(price)
        },
        sortByCategory: function (idCategory) {
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
        }
    },
    created: function () {
        // axios({
        //     method: 'get',
        //     url: 'http://api-e-commerce.minzard.xyz/get-category'
        // })
        // .then(result => {
        //     let category = result.data
        //     this.categories = category
        // })
        // .catch(err => {
        //     console.log(err)
        // })

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
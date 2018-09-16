Vue.component('product-cards', {
    template:
        `
        <div class='container-fluid mt-4'>
            <div class="text-center text-md-left my-sm-2" style="font-size: 20px; padding-left: 2.5vw">{{ title }}</div>
                <div class="row no-gutters">
                    <div class="card col-6 col-md-4 col-lg-3 col-xl-2" v-for="product in products">
                        <img class="card-img-top" src="https://via.placeholder.com/300x300" alt="Product Image">
                        <div class="card-body">
                            <h5 class="card-title"> {{ product.name }} </h5>
                            <p class="card-text">Price: Rp{{ product.price }}</p>
                            <button class="btn btn-danger" v-on:click="addToCart(product.name, product.price)">Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    ,
    props: ['title', 'products'],
    methods: {
        addToCart: function (name, price) {
            let i = app.items.indexOf(name)
            if (i === -1) {
                app.items.push(name)
                app.cart.push({
                    name: name,
                    price: price,
                    count: 1,
                    total: price
                })
                app.totalSum += price
            } else {
                app.cart[i].count ++
                app.cart[i].total += price
                app.totalSum += price
            }
            
            localStorage.setItem('items', JSON.stringify(app.items))
            localStorage.setItem('cart', JSON.stringify(app.cart))
            localStorage.setItem('totalSum', app.totalSum)

            app.cartColor = 'red'

            if (localStorage.getItem('jwtToken')) {
                app.checkOutBtn = true
            } else {
                app.cantCheckOutBtn = true
            }
        }
    }
})
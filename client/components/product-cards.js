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
            let i = app3.items.indexOf(name)
            if (i === -1) {
                app3.items.push(name)
                app3.cart.push({
                    name: name,
                    price: price,
                    count: 1,
                    total: price
                })
                app3.totalSum += price
            } else {
                app3.cart[i].count ++
                app3.cart[i].total += price
                app3.totalSum += price
            }
            
            localStorage.setItem('items', JSON.stringify(app3.items))
            localStorage.setItem('cart', JSON.stringify(app3.cart))
            localStorage.setItem('totalSum', app3.totalSum)

            app3.cartColor = 'red'

            if (localStorage.getItem('jwtToken')) {
                app3.checkOutBtn = true
            } else {
                app3.cantCheckOutBtn = true
            }
        }
    }
})
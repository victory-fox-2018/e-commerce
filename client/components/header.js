Vue.component('header-comp', {
    template:
        `
        <div class="row">
            <div class="col-sm-12 col-md-10 text-center text-md-left my-sm-2" style="font-size: 30px; padding-left: 2.5vw">SuperDuperHyperMarket</div>
            <div class="col-sm-12 col-md-2 align-self-center text-center my-sm-2">
                <a class="mx-3 logoInHead" data-toggle="modal" data-backdrop="false" data-target="#logModal" href="#"><i class="fas fa-sign-in-alt" style="font-size: 30px"></i></a>
                    <a v-bind:style="{color: cartcolor}" id='cartLogo' class="mx-3 logoInHead" data-toggle="modal" data-backdrop="false" data-target="#cartModal" title="Cart" href="#products"><i class="fas fa-shopping-cart" style="font-size: 30px"></i></a>
                
                <div class="modal fade" id="logModal" tabindex="-1" role="dialog" aria-labelledby="logModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="logModalLabel">{{ modaltitle }}</h5>
                            </div>
                            <div class="modal-body">
                                <div v-if='islogout'>
                                    <input id='email' type="email" value="" placeholder="Email"><br><br>
                                    <input id='password' type="password" value="" placeholder="Password"><br>
                                    <div style="color: red">{{ notice }}</div><br>
                                    <button class="btn btn-danger" v-on:click="logIn()">Log In</button><br><br>
                                    <button class="btn btn-danger" v-on:click="register()">Register</button><br><br>
                                </div>
                                <div v-else>
                                    <button class="btn btn-danger" v-on:click="logOut()" data-dismiss="modal">Log Out</button><br><br>
                                </div>
                            </div>
                            <div class="modal-footer align-self-center">
                                <button id='logLaterBtn' type="button" class="modalBtn" data-dismiss="modal">Later</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content align-self-center">
                            <div class="modal-header">
                                <h5 class="modal-title" id="cartModalLabel">Cart</h5>
                            </div>
                            <div class="modal-body">
                                <div class="row mb-4" v-for="item in cart">
                                    <div class="col-5">
                                        <div class="row">
                                            <div class="col-12 text-left"><strong>{{ item.name }}</strong></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 text-left">{{ item.count }}xRp{{ item.price }}</div>
                                        </div>
                                    </div>
                                    <div class="col-5">
                                        <div class="row">
                                            <div class="col-12" style="visibility: hidden">placeholder</div>
                                            <div class="col-12 text-right"><strong>{{ item.total }}</strong></div>
                                        </div>
                                    </div>
                                    <div class="col-2">
                                        <button class="btn btn-danger" title="Remove from cart" v-on:click="removeFromCart(item.name, item.price)">-</button>
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col-6 text-left">Total:</div>
                                    <div class="col-6 text-right"><strong>Rp{{ totalsum }}</strong></div>
                                </div>
                            </div>
                            <div class="modal-footer align-self-center">
                                <button type="button" class="modalBtn" data-dismiss="modal">Continue Shopping</button>
                                <button v-if='checkout' id='checkOutBtn' type="button" class="modalBtn" data-dismiss="modal" v-on:click="checkOut()">Check Out</button>
                                <button v-else id='cantCheckOutBtn' type="button">You should log in to check out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    ,
    props: ['items', 'cart', 'totalsum', 'notice', 'modaltitle', 'cartcolor', 'islogout', 'checkout'],
    methods: {
        removeFromCart: function (name, price) {
            let i = app.items.indexOf(name)
            app.cart[i].count --
            app.cart[i].total -= price
            app.totalsum -= price
            
            if (app.cart[i].count === 0) {
                app.items.splice(i, 1)
                app.cart.splice(i, 1)
            }
            
            localStorage.setItem('items', JSON.stringify(app.items))
            localStorage.setItem('cart', JSON.stringify(app.cart))
            localStorage.setItem('totalsum', app.totalsum)

            if (app.items.length === 0) {
                app.cartcolor = 'grey'
            }
        },

        checkOut: function () {
            $.ajax({
                type: 'POST',
                url: 'http://e-commerce-server.ismailnagib.xyz/users/checkout',
                data: {jwtToken: localStorage.getItem('jwtToken'), cart: app.cart}
            })
            .then(() => {
                app.items = [],
                app.cart = [],
                app.totalsum = 0
    
                localStorage.removeItem('items')
                localStorage.removeItem('cart')
                localStorage.removeItem('totalsum')
    
                app.cartcolor = 'grey'
            })
            .catch(err => {
                console.log(err)
            })
        },

        logIn: function () {
            $.ajax({
                type: 'POST',
                url: 'http://e-commerce-server.ismailnagib.xyz/users/login',
                data: {email: $('#email').val(), password: $('#password').val()}
            })
            .then(data => {
                localStorage.setItem('jwtToken', data.token)
                app.notice = ''
                app.showLogOut()
            })
            .catch(err => {
                app.notice = err.responseJSON.message
            })
        },

        register: function () {
            $.ajax({
                type: 'POST',
                url: 'http://e-commerce-server.ismailnagib.xyz/users/register',
                data: {email: $('#email').val(), password: $('#password').val()}
            })
            .then(data => {
                localStorage.setItem('jwtToken', data.token)
                app.notice = ''
                app.showLogOut()
            })
            .catch(err => {
                app.notice = err.responseJSON.message
            })
        },

        logOut: function () {
            localStorage.clear()
            this.checkOut()
            app.showLogIn()
        }
    }
})
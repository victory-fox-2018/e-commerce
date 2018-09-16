Vue.component('navbar-cp',{
    props: ['cart','totalprice'],
    template: `
    <nav class="navbar navbar-dark bg-dark" style="background-color:#33363C;">
        <div class="container">
            <div class="navbar-link">
                <a href="/">HOME</a>
                <a href="#">ABOUT</a>
            </div>
            <div class="navbar-link-right">
                <transaction-user></transaction-user>
                <cart-user v-bind:cart="cart" v-bind:totalprice="totalprice"></cart-user>
                <login-logout></login-logout>
            </div>
        </div>
    </nav>
    `
})
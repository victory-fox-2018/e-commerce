Vue.component('cart-user',{
    data: function(){
        return {
        }
    },
    props: ['cart','totalprice'],
    template: `
    <span>
        <a href="#" data-toggle="modal" data-target=".bd-cart-modal-sm">
            <i class="fa fa-shopping-cart"></i><span class="cart">{{ cart.length }}</span>
        </a>

        <div class="modal fade bd-cart-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="text-center" style="margin:20px;">
                        <div class="row">
                            <div class="col-md-6">Name</div>
                            <div class="col-md-6">Price</div>
                        </div>
                        <div v-for="trolley in cart">
                            <div class="row">
                                <div class="col-md-6"> {{ trolley.name }} </div>
                                <div class="col-md-6"> {{ trolley.price }} </div>
                            </div>
                        </div>
                        Total Price: Rp.{{ totalprice }} <br>
                        <button class="btn btn-primary" v-if="cart.length !==0" v-on:click="pay">PAY</button>
                    </div>
                </div>
            </div>
        </div>
    </span>
    `,
    methods: {
        pay: function (id) {
            let idItems = []

            this.cart.forEach(trolley => {
                idItems.push(trolley.id)
            })
            axios({
                method: 'post',
                url: 'http://api-e-commerce.minzard.xyz/buy-items',
                data: {
                    itemId: idItems,
                    total: this.totalprice
                },
                headers: {
                    "token": `${token}`
                }
            })
            .then(success => {
                idItems = []
                window.location.replace('/')
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})
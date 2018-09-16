Vue.component('card-cp',{
    data: function(){
        return {
            loginStatus: localStorage.getItem('token')
        }
    },
    props: ['items'],
    template: `
    <div class="row">
        <div class="col-md-4" v-for="item in items">
            <div class="card-deck">
                <div class="card">
                    <img class="card-img-top" src="https://via.placeholder.com/300x200" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <h6 class="card-title">Price Rp. {{ item.price }}</h6>
                        <p class="card-text">{{ item.description }}</p>
                    </div>
                    <div class="card-footer">
                        <center>
                            <button type="button" class="btn btn-secondary" v-if="loginStatus"
                                v-on:click="$emit('add-to-cart', item._id, item.name, item.price)">Add To Cart</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})

// console.log(vue.loginStatus)
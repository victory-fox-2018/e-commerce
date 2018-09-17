Vue.component('item-card',{
    template:`
    <div class="row">
        <div class="col-lg-4 col-md-4 mb-4" v-for="(item, index) in items" :key="index">
            <div class="card h-100">
                <a href="#"><img class="card-img-top" :src="item.image" alt="ikan"></a>
                    <div class="card-body">
                        <h4 class="card-title">
                            <a href="#">{{item.name}}</a>
                        </h4>
                        <h5>Rp.{{item.price.toLocaleString()}}</h5>
                        <p class="card-text">{{item.description}}</p>
                    </div>
                    <div class="card-footer">
                        <small class="btn" v-if="token" v-on:click="addToCart(item)">Add to Cart</small>
                    </div>
            </div>
        </div>
    </div>
    `,
    props:["items","token"],
    data:function(){
        return{
            countCart:'',
            countPrice:0,
            cart:[],
            transaction:[],
        }
    },
    methods:{
        addToCart(item){
            this.cart.push(item)
            this.countPrice += item.price
            this.countCart = this.cart.length
            let cartvalue = {
                cart: this.cart,
                countCart: this.countCart,
                countPrice: this.countPrice.toLocaleString()
            }
            this.$emit('cart-value', cartvalue)
        }

    },
    created() {
        
    },
})
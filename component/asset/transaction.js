Vue.component('transaction-user', {
    data: function(){
        return {
            transaction: []
        }
    },
    template: `
    <span>
        <a href="#" data-toggle="modal" data-target=".bd-transaction-modal-sm">
            <i class="fas fa-exchange-alt" style="margin:20px;"></i>
        </a>
        <div class="modal fade bd-transaction-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="text-center" style="margin:20px;">
                        <b> YOUR TRANSACTION </b>
                        <div class="row">
                            <div class="col-md-6">Name</div>
                            <div class="col-md-6">Price</div>
                        </div>
                        <div v-for="(belanjaan, index) in transaction">
                            Transaction {{ index+1 }}
                            <div class="row" v-for="item in belanjaan.itemsId ">
                                <div class="col-md-6">{{ item.name }}</div>
                                <div class="col-md-6">{{ item.price }}</div>
                            </div>
                            Total Price: Rp.{{ belanjaan.totalPrice }}
                            <hr>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </span>
    `,
    created: function(){
        axios({
            method: 'get',
            url: 'http://api-e-commerce.minzard.xyz/get-transaction',
            headers: {
                token: token
            }
        })
        .then(result =>{
            this.transaction = result.data
        })
        .catch(err =>{
            console.log(err)
        })
    }
})
Vue.component('list-item', {
    data: function () {
        return {
            count: 0
        }
    },
    template: `
    <div class="col-lg-4 col-md-4 mb-4" v-for="(item, index) in items" :key="index">
        <div class="card h-100">
            <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
            <div class="card-body">
                <h4 class="card-title">
                    <a href="#">{{item.name}}</a>
                </h4>
                <h5>Rp.{{item.price.toLocaleString()}}</h5>
                <p class="card-text">{{item.description}}</p>
            </div>
            <div class="card-footer">
                <small class="btn">Add to Cart</small>
            </div>
        </div>
    </div>
    `,
    methods: {
        getAllItem() {
            let self = this
            axios({
                method: "GET",
                url: "http://localhost:3000/items"
            })
                .then(function ({ data }) {
                    console.log(data.data);

                    self.items = data.data
                })
                .catch(function (err) {
                    console.log(err.message);
                })
        },
    }



})
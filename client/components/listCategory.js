Vue.component('list-category',{
    template:`
    <div class="list-group">
        <a href="#" class="list-group-item bg-primary text-light" v-on:click="getAllItem">Category</a>
        <a href="#" class="list-group-item" v-on:click="getCategoryItem('small')">Small</a>
        <a href="#" class="list-group-item" v-on:click="getCategoryItem('medium')">Medium</a>
        <a href="#" class="list-group-item" v-on:click="getCategoryItem('big')">Big</a>
    </div>
    `,
    props:[],
    data:function(){
        return {

        }
    },
    methods:{
        getAllItem() {
            let self = this
            axios({
                method: "GET",
                url: "http://localhost:3000/items"
            })
            .then(function ({ data }) {
                console.log(data.data);
                self.items = data.data
                self.$emit('items-category', self.items)
            })
            .catch(function (err) {
                console.log(err.message);
            })
        },
        getCategoryItem(category){
            let self = this
            axios({
                method: "GET",
                url: `http://localhost:3000/items/category/${category}`
            })
            .then(function ({ data }) {
                console.log(data.data);
                self.items = data.data
                self.$emit('items-category',self.items)
            })
            .catch(function (err) {
                console.log(err.message);
            })
        }
    },
    created() {
        this.getAllItem()
    },
})
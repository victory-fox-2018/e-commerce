var app = new Vue({
    el: "#app",
    data: function() {
        return{
            categories: [],
            items: [],
            show: true,
            cart: 0
        }
    },

    methods: {
        addToCart : function() {
            this.cart++;
        },

        findallCategory : function() {
            axios({
                method: 'get',
                url: 'http://localhost:3000/category/findAll',
            })
            .then(data => {
                //console.log(data)
                app.categories = data.data.data
            })
        },

        findallItem : function() {
            axios({
                method: 'get',
                url: `http://localhost:3000/item/findAll`,
            })
            .then(data => {
                //console.log(data)
                app.items = data.data.data
            })
        },
        
        filterItem: function(categoryId){
            axios({
                method: 'get',
                url: `http://localhost:3000/item/filterAll/${categoryId}`,
            })
            .then(data => {
                console.log(data)
                app.items = data.data.data
            })
        }
    },

    created() { 
        this.findallCategory()
        this.findallItem()
    }

})
Vue.component(`categories-cp`,{
    data: function(){
        return {
            categories: []
        }
    },
    template: `
    <div class="col-md-3">
        <div class="dropdown" style="margin:10px;">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color:#33363C;">
                Kategori
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" v-on:click="$emit('get-all-items')">All Categories</a>
                <a class="dropdown-item" href="#" v-for="category in categories" v-on:click="$emit('short-by-category',category._id)">{{
                    category.name }}</a>
            </div>
        </div>
        <hr>
    </div>`,
    created: function(){
        axios({
            method: 'get',
            url: 'http://api-e-commerce.minzard.xyz/get-category'
        })
        .then(result => {
            let category = result.data
            this.categories = category
        })
        .catch(err => {
            console.log(err)
        })
    }
})
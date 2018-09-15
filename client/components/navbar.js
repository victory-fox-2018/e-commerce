Vue.component('navbar-comp', {
    template:
        `
        <div class="row">
            <nav class="navbar navbar-expand-lg navbar-dark bg-danger col-12">
                <div class="container-fluid pl-4">
                    <button class="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#theNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
        
                    <div class="collapse navbar-collapse" id="theNavbar">
                        <div id='app2' class="mx-auto">
                            <ul class="navbar-nav" style="font-size: 20px">
                                <li class="nav-item">
                                    <a class="nav-link" href="#app1" onclick="showAll()">All Products</a>
                                </li>
                                <li class="nav-tem" v-for="category in categories">
                                    <a class="nav-link" href="#app1" v-on:click="showByCategory(category.name)">{{ category.name }} Products</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
        `
    ,
    props: ['categories'],
    methods: {
        showByCategory: function(category) {
            $.ajax({
                type: 'POST',
                url: 'http://e-commerce-server.ismailnagib.xyz/products/sbc',
                data: {category: category}
            })
            .then(result => {
                app1.title = `${category} Products`
                app1.products = result.data
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
})
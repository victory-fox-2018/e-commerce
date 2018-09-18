Vue.component('leftcategories', {
    template:
        `
        <div class="container">
                <div class="row">
                    <div class="col-md-4">
                        <div class="panel-heading">Categories</div>
                        <ul>
                            <li v-for="category in categories"> <a href="#" @click="filterItem(category.name)"> {{ category.name }} </a></li>
                        </ul>
                    </div>
    
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-4 text-center" v-for="item in items">
                                <div class="panel panel-default" id=items>
                                    <div class="panel-heading"></div>
                                    <div class="panel-body"> {{ item.name }}
                                        <img src="https://placehold.it/150x80?text=IMAGE" class="img-responsive" style="width:100%"
                                            alt="Image">
                                        <p class="price"></p> Rp. {{ item.price }}
                                        <br><br>
                                    </div>
                                    <div class="panel-footer" v-if="isLogin">
                                        <p> <button type="button" class="btn btn-warning btn-xs" v-on:click="addCart">Add to Cart</button> </p>
                                        <br><br>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
})
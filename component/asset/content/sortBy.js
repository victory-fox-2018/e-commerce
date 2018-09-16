Vue.component("sort-by",{
    template: `
    <div class="float-right">
        <div class="btn-group">
            <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                Short By
            </button>
            <div class="dropdown-menu">
                <a class="dropdown-item" href="#" v-on:click="$emit('sort-by')">Featured</a>
                <a class="dropdown-item" href="#" v-on:click="$emit('sort-by','high')">Price, high to low</a>
                <a class="dropdown-item" href="#" v-on:click="$emit('sort-by','low')">Price. low to high</a>
            </div>
        </div>
    </div>`
})
Vue.component('search-cp', {
    template: `
    <div class="container">
        <div class="row">
            <a href="/">
                <img src="logo.png">
            </a>
            <form class="form-inline my-2 my-lg-0" style="margin:10px">
                <div class="form-group">
                    <input class="form-control" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </div>
            </form>
        </div>
    </div>  `
})
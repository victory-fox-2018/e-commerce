Vue.component('navbar', {
    template: 
        `
        <nav class="navbar navbar-dark navbar-expand-md bg-dark justify-content-center">
            <a href="#" class="navbar-brand d-flex w-50 mr-auto">e-Commerce</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
            </button>

            <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">

                <ul class="navbar-nav w-100 justify-content-center">
                    <li class="nav-item">
                        <div class="" v-if="isLogin">
                            <a href="#" class="btn btn-outline-warning" role="button">Logout</a>
                        </div>
                        <div v-else>
                            <a href="#" class="btn btn-outline-warning" role="button">Register</a>
                            <a href="#" class="btn btn-outline-warning" role="button">Login</a>
                        </div>
                    </li>
                </ul>

                <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                    <li class="nav-item">
                        <a class="nav-link" href="#"> Cart <span class="badge badge-light"> {{ cart }} </span></a>
                    </li>
                </ul>

            </div>
        </nav>
        <br><br>
        `
})
// let token = null

// if (token) {
//     $("#haveLogin").append(
//         `
//         <li><i class="fas fa-shopping-cart menu-horizontal" data-toggle="modal" data-target="#checkoutModal"></i></li>
//         <li><i class="fas fa-comment menu-horizontal"></i></li>
//         <li><i class="fas fa-handshake menu-horizontal"></i></li>
//         <li><i class="fas fa-bell menu-horizontal"></i></li>
//         <li class="dropdown" id="mydropdown">
//             <a href="#" class="dropdown-toggle" id="mydropdownaccess" data-toggle="dropdown" role="button"
//                 aria-haspopup="true" aria-expanded="false"><i class="fas fa-user menu-horizontal"></i>
//                 <span class="caret"></span></a>
//             <ul class="dropdown-menu" id="dropdownMenu">
//                 <li><i class="fas fa-pen"></i> Update Profile</li>
//                 <li v-on:click="logoutUser()"><i v-on:click="logoutUser()" class="fas fa-sign-out-alt"></i> Logout</li>
//             </ul>
//         </li>
//     `
//     )
//     $("#logedin").hide()
// } else {
//     $("#logedin").append(
//         `
//         <li class="login"><i class="menu-horizontal" data-toggle="modal" data-target="#signinModal">Login</i></li>
//         <li class="login"><i class="menu-horizontal" data-toggle="modal" data-target="#signupModal">Register</i></li>
//     `
//     )
//     $("#haveLogin").hide()
// }

function btnCarts() {
    $(".modal-content").text('')
    $(".modal-content").append(
        `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Cart</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Total Item</th>
                    <th scope="col">Total Price</th>
                    </tr>
                </thead>
                <tbody v-for="(cart, index) in carts" :key="index">
                    <tr>
                        <th scope="row"></th>
                        <td>{{ cart.name }}</td>
                        <td>Rp {{ cart.price }}</td>
                        <td>{{ cart.totalItem }}</td>
                        <td>Rp {{ cart.totalPrice }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        `
    )
}

// function btnUserLogin() {
//     $(".modal-content").text('')
//     $(".modal-content").append(
//         `
//         <div class="modal-header">
//             <h5 class="modal-title" id="exampleModalLabel">Login</h5>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//             </button>
//         </div>
//         <div class="modal-body">
//             <div class="form-group row">
//                 <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
//                 <div class="col-sm-10">
//                 <input type="email" class="form-control" id="inputEmail3" placeholder="email">
//                 </div>
//             </div>

//             <div class="form-group row">
//                 <label for="inputEmail3" class="col-sm-2 col-form-label">Password</label>
//                 <div class="col-sm-10">
//                 <input type="password" class="form-control" id="inputEmail3" placeholder="password">
//                 </div>
//             </div>
//         </div>
//         <div class="modal-footer">
//             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//             <button type="button" class="btn btn-primary">Sigin</button>
//         </div>
//         `
//     )
// }

// function btnuserRegister() {
//     $(".modal-content").text('')
//     $(".modal-content").append(
//         `
//         <div class="modal-header">
//             <h5 class="modal-title" id="exampleModalLabel">Register</h5>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//             <span aria-hidden="true">&times;</span>
//             </button>
//         </div>
//         <div class="modal-body">
//             <div class="form-group row">
//                 <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
//                 <div class="col-sm-10">
//                 <input type="text" class="form-control" placeholder="name">
//                 </div>
//             </div>
            
//             <div class="form-group  row">
//                 <legend class="col-form-label col-sm-2 pt-0">Gender</legend>
//                 <div class="col-sm-10">
//                     <div class="form-check">
//                         <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="male" checked>
//                         <label class="form-check-label" for="gridRadios1">
//                             Male
//                         </label>
//                     </div>
//                     <div class="form-check">
//                         <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="female">
//                         <label class="form-check-label" for="gridRadios2">
//                             Female
//                         </label>
//                     </div>
//                 </div>
//             </div>

//             <div class="form-group row">
//                 <label for="inputEmail3" class="col-sm-2 col-form-label">Address</label>
//                 <div class="col-sm-10">
//                 <input type="text" class="form-control" placeholder="address">
//                 </div>
//             </div>

//             <div class="form-group row">
//                 <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
//                 <div class="col-sm-10">
//                 <input type="email" class="form-control" placeholder="email">
//                 </div>
//             </div>

//             <div class="form-group row">
//                 <label for="inputEmail3" class="col-sm-2 col-form-label">Password</label>
//                 <div class="col-sm-10">
//                 <input type="password" class="form-control" placeholder="password">
//                 </div>
//             </div>
            
//         </div>
//         <div class="modal-footer">
//             <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
//             <button type="button" class="btn btn-primary" v-on:click="signupUser()">Submit</button>
//         </div>
//         `
//     )
// }
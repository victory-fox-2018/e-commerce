Vue.component('navbar-top', {
    data: function () {
      return {
				count: 0,
				name: '',
				email: '',
				password: '',
				phone: '',
				categories: '',
				items: [],
				wishlist: [],
				totalPrice: 0,
				whoisLogin: localStorage.getItem('name'),
				itemPerCategory: [],
				isLogin: false,
				fSignin: false,
				fSignup: false,
				borongSuccess: false,
				notifBorong: '',
      }
    },
    template: `
    <div> 
			<nav class="navbar navbar-expand-lg navbar-dark top-nav fixed-top">
				<div class="container">
					<a class="navbar-brand" href="#"><img src="img/logo without shadow.png" id="logo" alt="borong-borong"></a>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive"
						aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="collapse navbar-collapse" id="navbarResponsive">
						<h5 v-if="isLogin" class="sayhii">Hii {{ whoisLogin }}</h5>
						<ul class="navbar-nav ml-auto">
							<li class="nav-item">
								<a class="nav-link" v-if="!isLogin" @click="displayFormSignin()" href="JavaScript:Void(0)" data-toggle="modal" data-target="#signModal">Masuk</a>
							</li>
							<li class="nav-item">
								<button v-if="isLogin" class="btn btn-outline-light my-2 my-sm-0" type="button" data-toggle="modal" data-target=".bd-example-modal-lg">
									<i class="fas fa-shopping-cart"></i>
								</button>
							</li>
							<li>
								<p v-if="wishlist.length" >{{ wishlist.length }}</p>
							</li>
							<li class="nav-item">
								<a class="nav-link" v-if="isLogin" @click="signout()" href="JavaScript:Void(0)">Keluar</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" v-if="!isLogin" href="JavaScript:Void(0)" @click="displayFormSignup()" data-toggle="modal" data-target="#signModal">Daftar</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<div class="modal fade" id="signModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<!-- <i class="fas fa-user"></i> -->
							<h4><i class="fas fa-user"></i></h4>
							<h5 v-if="fSignin" class="modal-title" id="exampleModalLabel">Masuk</h5>
							<h5 v-if="fSignup" class="modal-title" id="exampleModalLabel">Daftar Baru</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<form>
								<div v-if="fSignup" class="form-group">
									<label for="name" class="col-form-label">Nama:</label>
									<input v-model="name" type="text" class="form-control" id="name">
								</div>
								<div class="form-group">
									<label for="email" class="col-form-label">Email:</label>
									<input v-model="email" type="text" class="form-control" id="email">
								</div>
								<div class="form-group">
									<label for="password" class="col-form-label">Password:</label>
									<input v-model="password" type="password" class="form-control" id="password"></input>
								</div>
								<div v-if="fSignup" class="form-group">
									<label for="phone" class="col-form-label">Nomor HP:</label>
									<input v-model="phone" type="text" class="form-control" id="phone">
								</div>
							</form>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Batal</button>
							<button v-if="fSignin" type="button" class="btn btn-primary" @click="signin(email, password)">Masuk</button>
							<button v-if="fSignup" type="button" class="btn btn-primary" @click="signup(name, email, password, phone)">Daftar</button>
						</div>
					</div>
				</div>
			</div>
		
			<div v-if="borongSuccess" class="modal fade" id="modalBorong" tabindex="-1" role="dialog" aria-labelledby="modalBorong" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLongTitle">
									<i class="far fa-smile-beam"></i>
								Berhasil ngeBorong
							</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							{{ notifBorong }}
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary">Borong Lagi</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		`
		,
		
})
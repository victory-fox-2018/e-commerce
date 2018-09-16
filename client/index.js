var app = new Vue({
    el: '#app',
    data: {
        items: '',
        cartvalue: '',
        total: 0,
        token: false,
        errorMessage: [],
        message: '',
    },
    methods: {
        
    },
    created() {
        let checkToken = localStorage.getItem("token")
        if(checkToken){
            this.token = true
        }
        // this.getAllItem()
    },
    watch: {
        isLogin:function(newLogin,oldLogin){
            if(newLogin){
                this.token = true  
            }
        },
    },
    computed:{
        priceTag:function(){
            
        }
    }
})
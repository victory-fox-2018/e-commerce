VUe.component('category', {
  methods: {
    showCategory: function(category) {
      let self = this
      let catName = category.target.text
      
      axios({
        method: 'GET',
        url: `${base_url}/api/itemCat/${catName}`
      })
        .then(response => {
          let items = response.data.items
          
          self.Item = ''
          self.Item = items
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
})
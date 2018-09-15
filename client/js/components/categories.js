Vue.component('categories', {
  props: ['categories'],
  data() {
    return {
      showLoader: true,
      showEmptyMsg: false,
      parentCategories: []
    }
  },
  methods: {

  },
  created() {
    
  },
  watch: {
    categories(newVal) {
      this.parentCategories = newVal.data;

      if(newVal.empty) {
        this.showLoader = false;
        this.showEmptyMsg = true;
      } else {
        this.showLoader = false;
        this.showEmptyMsg = false;
      }
    }
  },
  template: `
    <section class="section has-background-white-ter">
      <div class="container is-fullhd">
        <h2 class="title has-text-grey-dark">Categories</h2>
        <div class="loader-container" v-if="parentCategories.length === 0 && showLoader">
          <div class="loader"></div>
        </div>
        <p v-else-if="showEmptyMsg && !loader">No Categories Data</p>
        <br>
        <div class="columns" v-if="parentCategories.length !== 0 && !showEmptyMsg">
          <div class="column">
            <span v-for="category in parentCategories" >
              <a class="button is-primary is-outlined is-rounded is-large" href="javascript:void(0)" style="margin-right: 10px">{{ category.name }}</a> 
            </span>
          </div>
        </div>
      </div>
    </section>
  `
});
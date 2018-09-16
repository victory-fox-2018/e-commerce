Vue.component('category-item', {
  props: ['categories'],
  template: `
    <section class="bg-white" style="padding-bottom: 50px">
      <div class="container" id="category-heading">
          <h2>Category</h2>
      </div>
      <div class="container" id="category">
        <div class="loader-container">
          <div class="loader"></div>
        </div>

        <div class="category-item" v-for="category in categories">
          <img src="https://via.placeholder.com/200x200" alt="Fashion">
          <p class="category-name">
            {{ category.name }}
          </p>
        </div>

      </div>
    </section>
  `,
  methods: {
    
  }
});
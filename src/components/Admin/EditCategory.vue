<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <!-- edit here -->
          <h1>Edit Category</h1>
          <form @submit.prevent="handleUpdateForm">
            <div class="form-group">
                  <label for="categoryName">Category Name: </label>
                  <input type="text" class="form-control" v-model="category.categoryName" required>
              </div>

              <div class="form-group mt-3">
                  <button class="btn btn-success btn-block w-100" type="submit">Edit</button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
      return {
          category: {}
      }
  },
  created() {
      let apiURL = `http://localhost:4000/api/edit-category/${this.$route.params.id}`;
      axios.get(apiURL).then((res) => {
          this.category = res.data
      })
  
  },
  methods: {
      handleUpdateForm() {
          let apiURL = `http://localhost:4000/api/update-category/${this.$route.params.id}`;

          axios.put(apiURL, this.category).then((res) => {
              console.log(res)
              this.$router.push('/categories')
          }).catch(error => {
              console.log(error)
          })
      }
  }
}
</script>
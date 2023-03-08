<template>
  <div class="justify-content-center">
      <!-- Display jobpost list -->
      <h1>Categories</h1>
      <div class="row">
          <div class="col-md-12">
              <div class="table-responsive">
                  <table class="table table-striped">
                    <thead class="table-dark">
                          <tr>
                              <th>Category</th>
                              <th>
                                <router-link to="/createCategory" class="btn btn-secondary px-3">Create Category</router-link>
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="c in Categories" :key="c._id">
                              <td>{{ c.categoryName }}</td>
                              <td>
                                <router-link :to="{name: 'EditCategory', params: {id: c._id}}"
                                  class="btn btn-success me-2">
                                      Edit
                                  </router-link>
                                  <button @click.prevent="deleteCategory(c._id)"
                                  class="btn btn-danger">
                                      Delete
                                  </button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
      return {
          Categories: []
      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getCategories';
      axios.get(apiURL).then(res => {
          this.Categories = res.data
      }).catch(error => {
          console.log(error)
      })
  },
  methods: {
      deleteCategory(id) {
          let apiURL = `http://localhost:4000/api/delete-category/${id}`;
          let indexOfArrayItem = this.Categories.findIndex(i => i._id === id);

          if (window.confirm("Do you really want to delete?")) {
              axios.delete(apiURL).then(() => {
                  this.Categories.splice(indexOfArrayItem, 1)
              }).catch(error => {
                  console.log(error)
              })
          }
      }
  }
}
</script>

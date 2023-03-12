<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <!-- edit here -->
          <h1>Edit Project</h1>
          <form @submit.prevent="handleSubmitForm">
              <div class="form-group">
                  <label for="projectName">Project: </label>
                  <input type="text" class="form-control" v-model="freelancerProject.projectName" required>
              </div>
              <div class="form-group">
                <label for="jobCategory">Category:</label>
                <select v-model="freelancerProject.jobCategory">
                <option v-for="category in categories" :key="category._id" :value="category.categoryName">{{ category.categoryName }}</option>
                </select>
                 </div>
              <div class="form-group">
                  <label for="projectDescription">Description:</label>
                  <input type="text" class="form-control" v-model="freelancerProject.projectDescription" required>
              </div>
              <div class="form-group">
                  <label for="projectWebsite">Website: </label>
                  <input type="text" class="form-control" v-model="freelancerProject.projectWebsite" required>
              </div>
              <div class="form-group">
                  <label for="fileName">Thumbnail Image Link:</label>
                  <input type="text" class="form-control" v-model="freelancerProject.fileName" required>
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
          freelancerProject: {},
          categories: []
      }
  },
  created() {
      let apiURL = `http://localhost:4000/api/edit-freelancerProject/${this.$route.params.id}`;
      axios.get(apiURL).then((res) => {
          this.freelancerProject = res.data
      })

      let categoriesURL= 'http://localhost:4000/api/getCategories';
      axios.get(categoriesURL).then(res => {
          this.categories = res.data
          console.log(this.categories)
      }).catch(error => {
          console.log(error)
      })
  
  },
  methods: {
      handleUpdateForm() {
          let apiURL = `http://localhost:4000/api/update-freelancerProject/${this.$route.params.id}`;

          axios.put(apiURL, this.freelancerProject).then((res) => {
              console.log(res)
              this.$router.push('/freelancerprofile')
          }).catch(error => {
              console.log(error)
          })
      }
  }
}
</script>
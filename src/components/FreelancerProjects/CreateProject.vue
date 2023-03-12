<template>
  <div class="row justify-content-center">
      <div class="col-md-6">
          <!-- Content goes here -->
          <h1>Create Project</h1>
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
                  <button class="btn btn-success btn-block w-100" type="submit">Create</button>
              </div>
          </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
var freelancerId = localStorage.getItem('userId')

export default {
  data() {
      return {
          freelancerProject: {
            freelancerId: localStorage.getItem('userId'),
            freelancerName: '',
            projectName: '',
            jobCategory: '',
            projectDescription: '',
            projectWebsite: '',
            fileName: '',
          },
          categories: [],
      }
  },
  created() {
      let categoriesURL= 'http://localhost:4000/api/getCategories';
      axios.get(categoriesURL).then(res => {
          this.categories = res.data
          console.log(this.categories)
      }).catch(error => {
          console.log(error)
      })

      let freelancerDet = 'http://localhost:4000/api/getMyFreelancerDetails';
      axios.get(freelancerDet, { params: { freelancerId } })
      .then(response => {
        console.log(response.data)
        this.freelancerProject.freelancerName = response.data.at(0).firstName + " " + response.data.at(0).lastName
        // Handle the response data here
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
      handleSubmitForm() {
          let apiURL = 'http://localhost:4000/api/create-freelancerProject';

          axios.post(apiURL, this.freelancerProject).then(() => {
              this.$router.push('/freelancerprofile');
              this.freelancerProject = {
            projectName: '',
            jobCategory: '',
            projectDescription: '',
            projectWebsite: '',
            fileName: '',
            freelancerId: '',
          }
          }).catch(error => {
              console.log(error);
          })
      },
      isNumber: function(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
              evt.preventDefault();
          } else {
              return true;
          }
      }
  }
}
</script>
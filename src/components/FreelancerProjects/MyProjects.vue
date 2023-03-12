<template>
  <div class="justify-content-center">
      <!-- Display jobpost list -->
      <h1>Show Projects</h1>
      <div class="row">
          <div class="col-md-12">
              <div class="table-responsive">
                  <table class="table table-striped">
                      <thead class="table-dark">
                          <tr>
                              <th>Project</th>
                              <th>Category</th>
                              <th>Description</th>
                              <th>Website</th>
                              <th>Picture</th>
                              <th>
                                <router-link to="/createFreelancerProject" class="btn btn-secondary px-3">Create Project</router-link>
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="freelancerproject in FreelancerProjects" :key="freelancerproject._id">
                              <td>{{ freelancerproject.projectName }}</td>
                              <td>{{ freelancerproject.jobCategory}}€</td>
                              <td>{{ freelancerproject.projectDescription }}</td>
                              <td>{{ freelancerproject.projectWebsite }}</td>
                              <td>{{ freelancerproject.fileName }}</td>
                              <td>
                                  <router-link :to="{name: 'EditFreelancerProject', params: {id: freelancerproject._id}}"
                                  class="btn btn-success me-2">
                                      Edit
                                  </router-link>
                                  <button @click.prevent="deleteFreelancerProject(freelancerproject._id)"
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
var freelancerId = localStorage.getItem('userId')

export default {
  data() {
      return {
          FreelancerProjects: []
      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getMyProjects';
      axios.get(apiURL, { params: { freelancerId } })
  .then(response => {
    console.log(response.data)
    this.FreelancerProjects = response.data
    // Handle the response data here
  })
  .catch(error => {
    console.log(error)
  })
  },
  methods: {
      deleteJobPost(id) {
          let apiURL = `http://localhost:4000/api/delete-freelancerprojects/${id}`;
          let indexOfArrayItem = this.FreelancerProjects.findIndex(i => i._id === id);

          if (window.confirm("Do you really want to delete?")) {
              axios.delete(apiURL).then(() => {
                  this.FreelancerProjects.splice(indexOfArrayItem, 1)
              }).catch(error => {
                  console.log(error)
              })
          }
      }
  }
}
</script>
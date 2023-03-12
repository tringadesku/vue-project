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
                              <th></th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="freelancerproject in FreelancerProjects" :key="freelancerproject._id">
                              <td>{{ freelancerproject.projectName }}</td>
                              <td>{{ freelancerproject.jobCategory }}€</td>
                              <td>{{ freelancerproject.projectDescription }}</td>
                              <td>{{ freelancerproject.projectWebsite}}</td>
                              <td>{{ freelancerproject.fileName }}</td>
                              <td>
                                <router-link :to="{name: 'ViewFreelancerProfile', params: {id: freelancerproject.freelancerId}}"
                                  class="btn btn-success me-2">
                                      View Freelancer Profile
                                  </router-link>
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
          FreelancerProjects: [],

      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getProjects';
      axios.get(apiURL).then(res => {
          this.FreelancerProjects = res.data
      }).catch(error => {
          console.log(error)
      })

  },

}
</script>
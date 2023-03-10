<template>
  <div class="justify-content-center">
      <!-- Display jobpost list -->
      <h1>Suggested Freelancers</h1>
      <div class="row">
          <div class="col-md-12">
              <div class="table-responsive">
                  <table class="table table-striped">
                    <thead class="table-dark">
                          <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Category</th>
                              <th>City</th>
                              <th>Education</th>
                              <th>Experience</th>
                              <th>Hourly Rate</th>
                               <th>Profile Pic</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="cd in FreelancerDetails" :key="cd._id">
                              <td>{{ cd.firstName }}</td>
                              <td>{{ cd.lastName }}</td>
                              <td>{{ cd.jobCategory }}</td>
                              <td>{{ cd.city }}</td>
                              <td>{{ cd.education }}</td>
                              <td>{{ cd.experience }}</td>
                              <td>{{ cd.hourlyRate }}</td>
                              <td>
                              <img :src="'/uploads/' + cd.profileImg" alt="Profile Image">
                              </td>
                              <td>
                                <router-link :to="{name: 'ViewFreelancerProfile', params: {id: cd.freelancerId}}"
                                  class="btn btn-success me-2">
                                      View Profile
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
        FreelancerDetails: []
      }
  },
  created() {
    var jobCategory = this.$route.params.jobCategory
    let apiURL = 'http://localhost:4000/api/getFreelancersByCategory';
      axios.get(apiURL, { params: { jobCategory }   })
      .then(response => {
        console.log(response.data)
        this.FreelancerDetails = response.data
        // Handle the response data here
      })
      .catch(error => {
        console.log(error)
      })

  },
  methods: {
    
  }
}
</script>

<style>
tr img {
  height: 70px;
  width: 70px;
  object-fit: cover;
}
</style>
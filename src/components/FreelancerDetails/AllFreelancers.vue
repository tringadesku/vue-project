<template>
  <div class="justify-content-center">

    <h3>Search Freelancers:</h3>
    <input v-model="searchQuery" @input="searchFreelancerDetails()" type="text" placeholder="Search freelancer details...">
      <!-- Display jobpost list -->
      <h1>Freelancers</h1>
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
        query: '',
        results: [],
        FreelancerDetails: []
      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getFreelancerDetails';
      axios.get(apiURL).then(res => {
          this.FreelancerDetails = res.data
      }).catch(error => {
          console.log(error)
      })

  },
  methods: {
    searchFreelancerDetails() {
      axios.get(`http://localhost:4000/api/search-freelancerDetails/${this.searchQuery}`)
        .then(response => {
          this.FreelancerDetails = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
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
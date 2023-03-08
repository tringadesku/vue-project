<template>
  <div class="justify-content-center">
      <!-- Display jobpost list -->
      <h1></h1>
      <div class="row">
          <div class="col-md-12">
              <div class="table-responsive">
                  <table class="table table-striped">
                    <thead class="table-dark">
                          <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>City</th>
                              <th>Category</th>
                              <th>Education</th>
                              <th>Experience</th>
                              <th>Hourly Rate</th>
                              <th>Profile Pic</th>
                              <th>
                                <router-link to="/createFreelancerDetail" v-if="FreelancerDetails.at(0) == null" class="btn btn-secondary px-3">Add Profile Details</router-link>
                              </th>
                          </tr>
                      </thead>
                      <tbody v-if="FreelancerDetails.at(0) != null">
                          <tr v-for="cd in FreelancerDetails" :key="cd._id">
                              <td>{{ cd.firstName }}</td>
                              <td>{{ cd.lastName }}</td>
                              <td>{{ cd.city }}</td>
                              <td>{{ cd.jobCategory }}</td>
                              <td>{{ cd.education }}</td>
                              <td>{{ cd.experience }}</td>
                              <td>{{ cd.hourlyRate }}</td>
                              <td><img :src="'/uploads/' + cd.profileImg" alt="Profile Image"></td>
                              <td>
                                <router-link :to="{name: 'EditFreelancerDetail', params: {id: cd._id}}"
                                  class="btn btn-success me-2">
                                      Edit
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
var freelancerId = localStorage.getItem('userId')

export default {
  data() {
      return {
          FreelancerDetails: [],
      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getMyFreelancerDetails';
      axios.get(apiURL, { params: { freelancerId } })
      .then(response => {
        console.log(response.data)
        this.FreelancerDetails = response.data
        // Handle the response data here
      })
      .catch(error => {
        console.log(error)
      })


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
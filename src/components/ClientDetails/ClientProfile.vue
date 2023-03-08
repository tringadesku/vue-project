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
                              <th>Company</th>
                              <th>Position</th>
                              <th>City</th>
                              <th>Description</th>
                              <th>Profile Pic</th>
                              <th>
                                <router-link to="/createClientDetail" v-if="ClientDetails.at(0) == null" class="btn btn-secondary px-3">Add Profile Details</router-link>
                              </th>
                          </tr>
                      </thead>
                      <tbody v-if="ClientDetails.at(0) != null">
                          <tr v-for="cd in ClientDetails" :key="cd._id">
                              <td>{{ cd.firstName }}</td>
                              <td>{{ cd.lastName }}</td>
                              <td>{{ cd.companyName }}</td>
                              <td>{{ cd.position }}</td>
                              <td>{{ cd.city }}</td>
                              <td>{{ cd.description }}</td>
                              <td><img :src="'/uploads/' + cd.profileImg" alt="Profile Image"></td>
                              <td>
                                <router-link :to="{name: 'EditClientDetail', params: {id: cd._id}}"
                                  class="btn btn-success me-2">
                                      Edit
                                  </router-link>
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              <h2>My Job Posts:</h2>
              <div class="table-responsive">
                  <table class="table table-striped">
                      <thead class="table-dark">
                          <tr>
                              <th>Job Post Name</th>
                              <th>Job Post Budget</th>
                              <th>Job Post Description</th>
                              <th>Job Application Deadline</th>
                              <th>Job Category</th>
                              <th>Job Client</th>
                              <th>
                                <router-link to="/createJobPost" class="btn btn-secondary px-3">Create JobPost</router-link>
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="jobpost in JobPosts" :key="jobpost._id">
                              <td>{{ jobpost.jobPostName }}</td>
                              <td>{{ jobpost.jobPostBudget }}€</td>
                              <td>{{ jobpost.jobPostDescription }}</td>
                              <td>{{ jobpost.jobApplicationDeadline }}</td>
                              <td>{{ jobpost.jobCategory }}</td>
                              <td>{{ jobpost.clientName }}</td>
                              <td>
                                  <router-link :to="{name: 'EditJobPost', params: {id: jobpost._id}}"
                                  class="btn btn-success me-2">
                                      Edit
                                  </router-link>
                                  <button @click.prevent="deleteJobPost(jobpost._id)"
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
var clientId = localStorage.getItem('userId')

export default {
  data() {
      return {
          ClientDetails: [],
          JobPosts:[]
      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getMyClientDetails';
      axios.get(apiURL, { params: { clientId } })
      .then(response => {
        console.log(response.data)
        this.ClientDetails = response.data
        // Handle the response data here
      })
      .catch(error => {
        console.log(error)
      })


      let jobsURL = 'http://localhost:4000/api/getMyJobs';
      axios.get(jobsURL, { params: { clientId } })
      .then(response => {
        console.log(response.data)
        this.JobPosts = response.data
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
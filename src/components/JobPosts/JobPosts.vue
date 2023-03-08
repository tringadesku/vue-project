<template>
  <div class="justify-content-center">

    <h3>Search JobPosts:</h3>
    <input v-model="searchQuery" @input="searchJobPosts()" type="text" placeholder="Search job posts...">
      <!-- Display jobpost list -->
      <h1>Show JobPosts</h1>
      <div class="row">
          <div class="col-md-12">
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
                              <th></th>
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
                                <button>Apply</button>
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
          JobPosts: []
      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getJobs';
      axios.get(apiURL).then(res => {
          this.JobPosts = res.data
      }).catch(error => {
          console.log(error)
      })
  },
  methods: {
    searchJobPosts() {
      axios.get(`http://localhost:4000/api/search-jobPosts/${this.searchQuery}`)
        .then(response => {
          this.JobPosts = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  
}
</script>
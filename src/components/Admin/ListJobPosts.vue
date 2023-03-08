<template>
  <div class="justify-content-center">
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
      deleteJobPost(id) {
          let apiURL = `http://localhost:4000/api/delete-jobpost/${id}`;
          let indexOfArrayItem = this.JobPosts.findIndex(i => i._id === id);

          if (window.confirm("Do you really want to delete?")) {
              axios.delete(apiURL).then(() => {
                  this.JobPosts.splice(indexOfArrayItem, 1)
              }).catch(error => {
                  console.log(error)
              })
          }
      }
  }
}
</script>
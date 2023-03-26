<template>
  <div class="row justify-content-center">
      <div class="col-md-12">
          <!-- edit here -->
          <h1>Applicants for '{{ jobName }}'</h1>
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
                          <tr v-for="cd in filteredFreelancers" :key="cd._id">
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
</template>

<script>
import axios from "axios";

export default {
  data() {
      return {
          jobPost: {},
          archivedJobPost: {},
          categories: [],
          applicants: [],
          freelancers: [],
          jobName: this.$route.params.jobName
      }
  },
  created() {
      let apiURL = `http://localhost:4000/api/edit-jobPost/${this.$route.params.id}`;
      axios.get(apiURL).then((res) => {
          this.jobPost = res.data
      })

      let categoriesURL= 'http://localhost:4000/api/getCategories';
      axios.get(categoriesURL).then(res => {
          this.categories = res.data
          console.log(this.categories)
      }).catch(error => {
          console.log(error)
      })

      //get all freelancers
      let free = `http://localhost:4000/api/getFreelancerDetails`;
      axios.get(free).then((res) => {
          this.freelancers = res.data
      })

      var jobId = this.$route.params.id
      
      let appicantsAPI = 'http://localhost:4000/api/getByJobId';
        axios.get(appicantsAPI, { params: { jobId } })
          .then(response => {
            console.log(response.data)
            this.applicants = response.data
          })
          .catch(error => {
            console.log(error)
          })
  
  },
  computed: {
  filteredFreelancers() {
    return this.freelancers.filter(freelancer => {
      return this.applicants.some(jobApp => jobApp.freelancerId === freelancer.freelancerId)
    })
  }
},

}
</script>
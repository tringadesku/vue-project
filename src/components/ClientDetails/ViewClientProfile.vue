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
                          </tr>
                      </tbody>
                  </table>
              </div>

            <h2>{{ ClientDetails.at(0).firstName }}'s Job Posts:</h2>
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
                              <th v-if="userRole == 'Freelancer'"></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="jobpost in JobPosts" :key="jobpost._id">
                              <td>{{ jobpost.jobPostName }}</td>
                              <td>{{ jobpost.jobPostBudget }}€</td>
                              <td>{{ jobpost.jobPostDescription }}</td>
                              <td>{{ formatDate(jobpost.jobApplicationDeadline) }}</td>
                              <td>{{ jobpost.jobCategory }}</td>
                              <td>{{ jobpost.clientName }}</td>
                              <td>
                                <button v-if="userRole == 'Freelancer' &&  hasApplied(jobpost._id)" @click="unapply(jobpost._id)">Unapply</button>
                                <button v-if="userRole == 'Freelancer' &&  !hasApplied(jobpost._id)" @click="applyJobPost(jobpost._id)">Apply</button>
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
          ClientDetails: [],
          JobPosts:[],
          JobApplications: [],
          userRole: localStorage.getItem('userRole')
      }
  },
  created() {
    var clientId = this.$route.params.id
    let apiURL = 'http://localhost:4000/api/getMyClientDetails';
      axios.get(apiURL, { params: { clientId }   })
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

      //check if user applied for job
      let applications = 'http://localhost:4000/api/getMyJobApplications';
      axios.get(applications, { params: { freelancerId } })
      .then(response => {
        console.log(response.data)
        this.JobApplications = response.data
        // Handle the response data here
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    formatDate(dateString){
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear().toString().substr(-2);

      return `${day}/${month}/${year}`;
    },
    
    applyJobPost(jobId) {
      let freelancerId = localStorage.getItem('userId');
      axios.post(`http://localhost:4000/api/apply`, { freelancerId, jobId })
        .then(response => {
          console.log(response.data);
          this.$router.go(0);
        })
        .catch(error => {
          console.log(error);
        });
    },

    unapply(jobId) {
      let appl = 'http://localhost:4000/api/getJobApplication';
      axios.get(appl, { params: { freelancerId, jobId } })
      .then(response => {
        //console.log(response.data)
        var aplikimi = response.data
        var jobApplicationId = aplikimi.at(0)._id
        axios.delete(`http://localhost:4000/api/delete-jobApplication/${jobApplicationId}`)
        this.$router.go(0);

        // Handle the response data here
      })
    },

    hasApplied(jobId) {
    return this.JobApplications.some(jobApp => jobApp.jobId === jobId);
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
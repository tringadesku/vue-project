<template>
  <div class="justify-content-center">

      <!-- Display jobpost list -->
      <h1>Show My Job Applications:</h1>
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
                          <tr v-for="jobpost in filteredJobPosts" :key="jobpost._id">
                              <td>{{ jobpost.jobPostName }}</td>
                              <td>{{ jobpost.jobPostBudget }}€</td>
                              <td>{{ jobpost.jobPostDescription }}</td>
                              <td>{{ jobpost.jobApplicationDeadline }}</td>
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
          JobPosts: [],
          JobApplications: [],
          userRole: localStorage.getItem('userRole')

      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getJobs';
      axios.get(apiURL).then(res => {
          this.JobPosts = res.data
      }).catch(error => {
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
  computed: {
  filteredJobPosts() {
    return this.JobPosts.filter(jobpost => {
      return this.JobApplications.some(jobApp => jobApp.jobId === jobpost._id)
    })
  }
},
  methods: {

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
  },

}
</script>
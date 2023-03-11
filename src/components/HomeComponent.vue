<template>
  <div class="justify-content-center">
    <h1>This is the homepage!</h1>
    <div v-if="userRole == 'Freelancer'">
      <h3>Latest Job Posts: </h3>
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
                                <router-link :to="{name: 'ViewClientProfile', params: {id: jobpost.clientId}}"
                                  class="btn btn-success me-2">
                                      View Client Profile
                                  </router-link>
                              </td>
                              <td>
                                <button v-if="userRole == 'Freelancer' &&  hasApplied(jobpost._id)" @click="unapply(jobpost._id)">Unapply</button>
                                <button v-if="userRole == 'Freelancer' &&  !hasApplied(jobpost._id)" @click="applyJobPost(jobpost._id)">Apply</button>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <router-link :to="{name: 'JobPosts'}"
                                  class="btn btn-success me-2">
                                      View All Job Posts >> 
                  </router-link>


                  <h3>Suggested JobPosts for you: </h3>
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
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="job in SuggestedJobPosts" :key="job._id">
                              <td>{{ job.jobPostName }}</td>
                              <td>{{ job.jobPostBudget }}€</td>
                              <td>{{ job.jobPostDescription }}</td>
                              <td>{{ job.jobApplicationDeadline }}</td>
                              <td>{{ job.jobCategory }}</td>
                              <td>{{ job.clientName }}</td>
                              <td>
                                <router-link :to="{name: 'ViewClientProfile', params: {id: job.clientId}}"
                                  class="btn btn-success me-2">
                                      View Client Profile
                                  </router-link>
                              </td>
                              <td>
                                <button v-if="userRole == 'Freelancer' &&  hasApplied(job._id)" @click="unapply(job._id)">Unapply</button>
                                <button v-if="userRole == 'Freelancer' &&  !hasApplied(job._id)" @click="applyJobPost(job._id)">Apply</button>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <button>View All Suggested JobPosts >></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
var freelancerId = localStorage.getItem('userId')

export default{
  data(){
    return{
      JobPosts: [],
      SuggestedJobPosts: [],
      JobApplications: [],
      userRole: localStorage.getItem('userRole'),
    }
  },
  created(){
    let apiURL = 'http://localhost:4000/api/getLatestJobs';
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


      //get suggested jobposts by category
      var jobCategory = ''

      let apiiURL = 'http://localhost:4000/api/getMyFreelancerDetails';
      axios.get(apiiURL, { params: { freelancerId } })
      .then(response => {
        console.log(response.data)
        var freelancerdetails = response.data
        jobCategory = freelancerdetails.at(0).jobCategory
        console.log(jobCategory)

        let jobsURL = 'http://localhost:4000/api/getLatestSuggestedJobs';
        axios.get(jobsURL, { params: { jobCategory } })
          .then(response => {
            console.log(response.data)
            this.SuggestedJobPosts = response.data
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
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
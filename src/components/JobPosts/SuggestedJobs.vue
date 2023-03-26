<template>
  <div class="justify-content-center">
      <!-- Display jobpost list -->
      <h1>Suggested JobPosts for you: </h1>

      <div class="card">
        <div class="card-body">
            <div class="row gy-3">
              <div class="col-md-3" v-for="jobpost in SuggestedJobPosts" :key="jobpost._id">
              
                <div class="card">
                  <div class="card-body">
                    <h2 :style="{ fontSize: jobpost.jobPostName.length > 23 ? '18px' : '22px' }">{{ jobpost.jobPostName }}</h2>
                    <h6 :style="{ fontSize: jobpost.clientName.length + jobpost.jobCategory.length > 31 ? '14px' : '16px' }" class="card-title">{{ jobpost.jobCategory }} | {{ jobpost.clientName }}</h6>
                    <p class="card-text" id="FreelancerDescriptionCss">{{ jobpost.jobPostDescription }}</p>

                    <hr class="hr" />

                    <div class="d-flex justify-content-between mb-2">
                                    <div class="p fw-bold">Deadline</div>
                                    <div class="p">{{ formatDate(jobpost.jobApplicationDeadline) }}</div>
                        <div class="p">{{ daysLeft(jobpost.jobApplicationDeadline) }}</div>
                    </div>

                    <hr class="hr" />

                    <div class="d-flex justify-content-between mb-2">
                                    <div class="p fw-bold">Budget</div>
                                    <div class="p">{{ jobpost.jobPostBudget }} €</div>
                    </div>

                    <hr class="hr" />
                    <router-link :to="{name: 'ViewClientProfile', params: {id: jobpost.clientId}}"
                                  class="btn btn-primary btn-sm mb-1" style="width:100%;">
                                      View Client Profile
                                  </router-link>

                                  <button v-if="userRole == 'Freelancer' &&  hasApplied(jobpost._id)" @click="unapply(jobpost._id)" class="btn btn-outline-primary btn-sm" style="width:100%;">Unapply</button>
                                <button v-if="userRole == 'Freelancer' &&  !hasApplied(jobpost._id)" @click="applyJobPost(jobpost._id)" class="btn btn-primary btn-sm" style="width:100%;">Apply</button>
                  </div>
                </div>

              </div>
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
          SuggestedJobPosts: [],
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


      //get suggested jobposts by category
      var jobCategory = ''

      let apiiURL = 'http://localhost:4000/api/getMyFreelancerDetails';
      axios.get(apiiURL, { params: { freelancerId } })
      .then(response => {
        console.log(response.data)
        var freelancerdetails = response.data
        jobCategory = freelancerdetails.at(0).jobCategory
        console.log(jobCategory)

        let jobsURL = 'http://localhost:4000/api/getSuggestedJobs';
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
  },
    
  formatDate(dateString){
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear().toString().substr(-2);

      return `${day}/${month}/${year}`;
    },

    daysLeft(dateString) {
        const deadline = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(deadline - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 1) {
          return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
        } 

    },
  },



}
</script>
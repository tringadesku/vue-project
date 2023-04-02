<template>
  <div class="justify-content-center">
      <!-- Display jobpost list -->
      <h1>Your archived JobPosts:</h1>

      <div class="card">
        <div class="card-body">
            <div class="row gy-3">
              <div class="col-md-3" v-for="jobpost in JobPosts" :key="jobpost._id">
              
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
                    <router-link :to="{name: 'JobApplicants', params: {id: jobpost.previousId, jobName: jobpost.jobPostName}}"
                                    class="btn btn-primary btn-sm mb-1" style="width:100%;">
                                        View Applicants
                                    </router-link>
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

var clientId = localStorage.getItem('userId')

export default {
  data() {
      return {
          JobPosts: [],
          userRole: localStorage.getItem('userRole')

      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getMyArchivedJobs';
      axios.get(apiURL, { params: { clientId } }).then(res => {
          this.JobPosts = res.data
      }).catch(error => {
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

    daysLeft(dateString) {
        const deadline = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(deadline - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 1) {
          return `${diffDays} day${diffDays > 1 ? 's' : ''} passed`;
        } 

    },

   
  },

}
</script>
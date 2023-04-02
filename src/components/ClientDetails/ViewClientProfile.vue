<template>
      <div class="row">
        <div class="col-4">
           
            <div class="card" v-if="ClientDetails.at(0) != null">
                <div class="card-body" v-for="cd in ClientDetails" :key="cd._id">
                    <img :src="'/uploads/' + cd.profileImg" alt="Profile Image" style="width:100px;" onerror="this.src='https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png';">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h3>{{ cd.firstName }} {{ cd.lastName }}</h3>
                    </div>

                    <h5 class="card-title">{{ cd.position }} at <span class="fw-bold">{{ cd.companyName }}</span> | {{ cd.city }}</h5>
                    <p class="card-text">{{ cd.description }}</p>
                </div>
            </div>
          </div>

          <div class="col-8">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between mb-3">
                        <h3 class="Card Title">Job Posts</h3>
                    </div>

                    <div class="row gy-3">
                        <div class="col-md-4" v-for="jobpost in JobPosts" :key="jobpost._id">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{{ jobpost.jobPostName }}</h5>
                                    <h6 class="card-title">{{ jobpost.jobCategory }}</h6>
                                    <p class="card-text">{{ jobpost.jobPostDescription }}</p>

                                    <hr class="hr"/>

                                    <div class="d-flex justify-content-between mb-2">
                                            <div class="p fw-bold">Application Deadline</div>
                                            <div class="row">
                                                <div class="p text-right">{{ formatDate(jobpost.jobApplicationDeadline) }}</div>
                                             </div>
                                    </div>

                                    <hr class="hr" />

                                    <div class="d-flex justify-content-between mb-2">
                                            <div class="p fw-bold">Budget</div>
                                            <div class="p">{{ jobpost.jobPostBudget }} €</div>
                                    </div>

                                    <hr class="hr" />

                                 <button v-if="userRole == 'Freelancer' &&  hasApplied(jobpost._id)" @click="unapply(jobpost._id)" class="btn btn-outline-primary btn-sm" style="width:100%;">Unapply</button>
                                 <button v-if="userRole == 'Freelancer' &&  !hasApplied(jobpost._id)" @click="applyJobPost(jobpost._id)" class="btn btn-primary btn-sm" style="width:100%;">Apply</button>

                                </div>
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
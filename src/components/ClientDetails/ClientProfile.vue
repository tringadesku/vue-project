<template>

    <div class="row">
        <div class="col-4">
            <router-link to="/createClientDetail" v-if="ClientDetails.at(0) == null" class="btn btn-secondary px-3">Add Profile Details</router-link>
            <div class="card" v-if="ClientDetails.at(0) != null">
                <div class="card-body" v-for="cd in ClientDetails" :key="cd._id">
                    <img :src="'/uploads/' + cd.profileImg" alt="Profile Image" style="width:100px;">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <h3>{{ cd.firstName }} {{ cd.lastName }}</h3>
                        <router-link :to="{name: 'EditClientDetail', params: {id: cd._id}}"
                        class="btn btn-primary btn-sm">
                                        Edit
                                    </router-link>
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
                        <router-link to="/createJobPost" class="btn btn-primary">Create JobPost</router-link>
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
                                            <div class="p">{{ jobpost.jobApplicationDeadline }}</div>
                                    </div>

                                    <hr class="hr" />

                                    <div class="d-flex justify-content-between mb-2">
                                            <div class="p fw-bold">Budget</div>
                                            <div class="p">{{ jobpost.jobPostBudget }} €</div>
                                    </div>

                                    <router-link :to="{name: 'JobApplicants', params: {id: jobpost._id}}"
                                    class="btn btn-primary btn-sm mb-1" style="width:100%;">
                                        View Applicants
                                    </router-link>
                                    <router-link :to="{name: 'SuggestedFreelancers', params: {jobCategory: jobpost.jobCategory}}"
                                    class="btn btn-outline-primary btn-sm" style="width:100%;">
                                         Suggested Freelancers
                                    </router-link>

                                    <hr class="hr" />

                                    <div class="d-flex justify-content-between">
                                            <router-link :to="{name: 'EditJobPost', params: {id: jobpost._id}}"
                                            class="btn btn-warning btn-sm" style="width:40%;">
                                            Edit
                                        </router-link>
                                        <button @click.prevent="deleteJobPost(jobpost._id, jobpost.jobPostName)"
                                        class="btn btn-danger btn-sm ms-1" style="width:40%;">
                                            Delete
                                        </button>
                                    </div>
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
    },
    methods: {
      deleteJobPost(id, jobPostName) {
        var activity = {
                    activityDescription: "JobPost '" + jobPostName + "' was deleted",
                    activityDate: new Date(),
                    userId: localStorage.getItem('userId')
            }

            let apiURL = `http://localhost:4000/api/delete-jobpost/${id}`;
            let indexOfArrayItem = this.JobPosts.findIndex(i => i._id === id);
  
            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.JobPosts.splice(indexOfArrayItem, 1)

                    let activityURL = 'http://localhost:4000/api/create-activity';
                    axios.post(activityURL, activity).then(() => {
                        console.log(activity)
                    })

                }).catch(error => {
                    console.log(error)
                })
            }
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
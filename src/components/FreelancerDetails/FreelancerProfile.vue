<template>

        <!-- Display jobpost list -->
        <h1></h1>
    


    <div class="container mt-4 mb-4">
        <div class="row">
            <div class="col-4" v-if="FreelancerDetails.at(0) == null">
                <router-link to="/createFreelancerDetail" class="btn btn-primary px-3">Add Profile Details</router-link>
            </div>
            
            <div class="col-4" v-if="FreelancerDetails.at(0) != null">
                <div class="card" v-for="cd in FreelancerDetails" :key="cd._id">
                    <div class="card-body">
                        <img :src="'/uploads/' + cd.profileImg" alt="Profile Image" style="width:100px;">
                        <h3 class="card-title">{{ cd.firstName }} {{ cd.lastName }}</h3>
                        

                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h4 class="card-title">Details</h4>
                            <router-link :to="{name: 'EditFreelancerDetail', params: {id: cd._id}}"
                            class="btn btn-primary btn-sm">
                                            Edit
                                        </router-link>
                        </div>


                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Field</div>
                            <div class="p">{{ cd.jobCategory }}</div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Hourly Rate</div>
                            <div class="p">{{ cd.hourlyRate }} €</div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Location</div>
                            <div class="p">{{ cd.city }}</div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Education</div>
                            <div class="p">{{ cd.education }}</div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Experience</div>
                            <div class="p">{{ cd.experience }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-8">
                <div class="card">
                    <div class="card-body">
                        <router-link to="/myJobApplications" class="btn btn-primary btn-sm" style="width:100%">My Job Applications</router-link>

                        <div class="d-flex justify-content-between my-3">
                            <h3 class="Card Title">Projects</h3>
                            <router-link to="/createProject" class="btn btn-primary">Create Project</router-link>
                        </div>

                        <div class="row gy-3">
                            <div class="col-md-4" v-for="freelancerproject in FreelancerProjects" :key="freelancerproject._id">
                                <div class="card">
                                    <img :src=freelancerproject.fileName alt="Project Thumbnail" style="aspect-ratio:2/1;" class="card-img-top">
                                    <div class="card-body">
                                    <h5 class="card-title">{{ freelancerproject.projectName }}</h5>
                                    <p class="card-text">{{ freelancerproject.projectDescription }}</p>

                                    <a :href=freelancerproject.projectWebsite class="btn btn-primary w-100">Visit Website</a>

                                    <hr class="hr"/>

                                    <div class="d-flex justify-content-between">
                                        <router-link :to="{name: 'EditProject', params: {id: freelancerproject._id}}"
                                        class="btn btn-warning btn-sm" style="width:40%">
                                        Edit
                                    </router-link>
                                    <button @click.prevent="deleteFreelancerProject(freelancerproject._id, freelancerproject.projectName)"
                                    class="btn btn-danger btn-sm" style="width:40%">
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
    </div>
  </template>
  
  <script>
  import axios from "axios";
  var freelancerId = localStorage.getItem('userId')
  
  export default {
    data() {
        return {
            FreelancerDetails: [],
            FreelancerProjects: []
        }
    },
    created() {
        let apiURL = 'http://localhost:4000/api/getMyFreelancerDetails';
        axios.get(apiURL, { params: { freelancerId } })
        .then(response => {
          console.log(response.data)
          this.FreelancerDetails = response.data
          // Handle the response data here
        })
        .catch(error => {
          console.log(error)
        })
  
        let projects = 'http://localhost:4000/api/getMyProjects';
        axios.get(projects, { params: { freelancerId } })
        .then(response => {
          console.log(response.data)
          this.FreelancerProjects = response.data
          // Handle the response data here
        })
        .catch(error => {
          console.log(error)
        })
  
  
    },
    methods: {
        deleteFreelancerProject(id, projectName) {
          var activity = {
                      activityDescription: "Project '" + projectName + "' was deleted",
                      activityDate: new Date(),
                      userId: localStorage.getItem('userId')
              }
  
            let apiURL = `http://localhost:4000/api/delete-freelancerProject/${id}`;
            let indexOfArrayItem = this.FreelancerProjects.findIndex(i => i._id === id);
  
            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.FreelancerProjects.splice(indexOfArrayItem, 1)
  
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
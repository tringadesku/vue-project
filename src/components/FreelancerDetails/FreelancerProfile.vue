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
                                <th>City</th>
                                <th>Category</th>
                                <th>Education</th>
                                <th>Experience</th>
                                <th>Hourly Rate</th>
                                <th>Profile Pic</th>
                                <th>
                                  <router-link to="/createFreelancerDetail" v-if="FreelancerDetails.at(0) == null" class="btn btn-secondary px-3">Add Profile Details</router-link>
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="FreelancerDetails.at(0) != null">
                            <tr v-for="cd in FreelancerDetails" :key="cd._id">
                                <td>{{ cd.firstName }}</td>
                                <td>{{ cd.lastName }}</td>
                                <td>{{ cd.city }}</td>
                                <td>{{ cd.jobCategory }}</td>
                                <td>{{ cd.education }}</td>
                                <td>{{ cd.experience }}</td>
                                <td>{{ cd.hourlyRate }}</td>
                                <td><img :src="'/uploads/' + cd.profileImg" alt="Profile Image"></td>
                                <td>
                                  <router-link :to="{name: 'EditFreelancerDetail', params: {id: cd._id}}"
                                    class="btn btn-success me-2">
                                        Edit
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
  
                    <h2>My Projects:</h2>
                    <table class="table table-striped">
                        <thead class="table-dark">
                            <tr>
                                <th>Project</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Website</th>
                                <th>Picture</th>
                                <th>
                                  <router-link to="/createProject" class="btn btn-secondary px-3">Create Project</router-link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="freelancerproject in FreelancerProjects" :key="freelancerproject._id">
                                <td>{{ freelancerproject.projectName }}</td>
                                <td>{{ freelancerproject.jobCategory}}</td>
                                <td>{{ freelancerproject.projectDescription }}</td>
                                <td><a :href=freelancerproject.projectWebsite>Visit Website</a></td>
                                <td><img :src=freelancerproject.fileName alt="Project Thumbnail"></td>
                                <td>
                                    <router-link :to="{name: 'EditProject', params: {id: freelancerproject._id}}"
                                    class="btn btn-success me-2">
                                        Edit
                                    </router-link>
                                    <button @click.prevent="deleteFreelancerProject(freelancerproject._id, freelancerproject.projectName)"
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
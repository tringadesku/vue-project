<template>
    <div class="justify-content-center">
  
        <!-- Display jobpost list -->
        <h1>Freelancers</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
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
                            <tr v-for="cd in FreelancerDetails" :key="cd._id">
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
                                  <router-link :to="{name: 'EditFreelancerDetail', params: {id: cd._id}}"
                                    class="btn btn-success me-2">
                                        Edit
                                    </router-link>
                                  <router-link :to="{name: 'ViewFreelancerProfile', params: {id: cd.freelancerId}}"
                                    class="btn btn-success me-2">
                                        View Profile
                                    </router-link>
                                    <button @click.prevent="deleteFreelancerDetail(cd._id, cd.firstName, cd.lastName)"
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
  
  export default {
    data() {
        return {
          query: '',
          results: [],
          FreelancerDetails: []
        }
    },
    created() {
        let apiURL = 'http://localhost:4000/api/getFreelancerDetails';
        axios.get(apiURL).then(res => {
            this.FreelancerDetails = res.data
        }).catch(error => {
            console.log(error)
        })
  
    },
    methods: {
      deleteClientDetail(id, firstName, lastName) {
          var activity = {
              activityDescription: "FreelancerDetails for '" + firstName + " "+ lastName+"' were deleted",
                      activityDate: new Date(),
                      userId: localStorage.getItem('userId')
              }
  
            let apiURL = `http://localhost:4000/api/delete-freelancerDetail/${id}`;
            let indexOfArrayItem = this.FreelancerDetails.findIndex(i => i._id === id);
  
            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.FreelancerDetails.splice(indexOfArrayItem, 1)
  
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
<template>
    <div class="justify-content-center">
        <!-- Display jobpost list -->
        <h1>All Client Details</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                      <thead class="table-dark">
                            <tr>
                                <th>Client ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Company</th>
                                <th>Position</th>
                                <th>City</th>
                                <th>Description</th>
                                <th>Profile Pic</th>
                                <th>
                                 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cd in ClientDetails" :key="cd._id">
                                <td>{{ cd.clientId }}</td>
                                <td>{{ cd.firstName }}</td>
                                <td>{{ cd.lastName }}</td>
                                <td>{{ cd.companyName }}</td>
                                <td>{{ cd.position }}</td>
                                <td>{{ cd.city }}</td>
                                <td>{{ cd.description }}</td>
                                <td>
                                <img :src="'/uploads/' + cd.profileImg" alt="Profile Image">
                                </td>
                                <td>
                                  <router-link :to="{name: 'EditClientDetail', params: {id: cd._id}}"
                                    class="btn btn-success me-2">
                                        Edit
                                    </router-link>
                                    <router-link :to="{name: 'ViewClientProfile', params: {id: cd.clientId}}"
                                    class="btn btn-success me-2">
                                        View Profile
                                    </router-link>
                                    <button @click.prevent="deleteClientDetail(cd._id, cd.firstName, cd.lastName)"
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
            ClientDetails: []
        }
    },
    created() {
        let apiURL = 'http://localhost:4000/api/getClientDetails';
        axios.get(apiURL).then(res => {
            this.ClientDetails = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        deleteClientDetail(id, firstName, lastName) {
          var activity = {
              activityDescription: "ClientDetails for '" + firstName + " "+ lastName+"' were deleted",
                      activityDate: new Date(),
                      userId: localStorage.getItem('userId')
              }
  
            let apiURL = `http://localhost:4000/api/delete-clientDetail/${id}`;
            let indexOfArrayItem = this.ClientDetails.findIndex(i => i._id === id);
  
            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.ClientDetails.splice(indexOfArrayItem, 1)
  
                    
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
<template>
    <div class="justify-content-center">
        <!-- Display jobpost list -->
        <h1>Activity Log</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                      <thead class="table-dark">
                            <tr>
                                <th>Activity Description</th>
                                <th>Activity Date</th>
                                <th>UserId</th>
                                <th>User Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="a in Activities" :key="a._id">
                                <td>{{ a.activityDescription }}</td>
                                <td>{{ a.activityDate }}</td>
                                <td>{{ a.userId }}</td>
                                <td>{{ a.firstName }} {{ a.lastName }}</td>
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
            Activities: [],
            FreelancerDetails: [],
            ClientDetails: []
  
        }
    },
    created() {
      let apURL = 'http://localhost:4000/api/getFreelancerDetails';
      axios.get(apURL).then(res => {
          this.FreelancerDetails = res.data
       }).catch(error => {
          console.log(error)
       })
  
       let apiiURL = 'http://localhost:4000/api/getClientDetails';
      axios.get(apiiURL).then(res => {
          this.ClientDetails = res.data
       }).catch(error => {
          console.log(error)
       })
  
        let apiURL = 'http://localhost:4000/api/getActivities';
        axios.get(apiURL).then(res => {
            this.Activities = res.data
  
            this.Activities.forEach(activity => {
  
            const freelancerDetails = this.FreelancerDetails.find(
                (details) => details.freelancerId == activity.userId
            );
            const clientDetails = this.ClientDetails.find(
                (details) => details.clientId == activity.userId
            );
  
            if (freelancerDetails) {
                activity.firstName = freelancerDetails.firstName;
                activity.lastName = freelancerDetails.lastName;
            }
            else if(clientDetails){
                activity.firstName = clientDetails.firstName;
                activity.lastName = clientDetails.lastName;
            }
            else{
                activity.firstName = "Not";
                activity.lastName = "Defined";
            }
  
  });
        }).catch(error => {
            console.log(error)
        })
  
  
      },
    methods: {
      
    }
  }
  </script>
<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Content goes here -->
            <h1>Create JobPosts</h1>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label for="jobPostName">Job Name: </label>
                    <input type="text" class="form-control" v-model="jobPost.jobPostName" required>
                </div>
                <div class="form-group">
                    <label for="jobPostBudget">jobPostBudget:</label>
                    <input type="number" class="form-control" v-model="jobPost.jobPostBudget" required>
                </div>
                <div class="form-group">
                    <label for="jobPostDescription">jobPostDescription</label>
                    <input type="text" class="form-control" v-model="jobPost.jobPostDescription" required>
                </div>
                <div class="form-group">
                    <label for="jobApplicationDeadline">jobApplicationDeadline</label>
                    <input type="date" class="form-control" v-model="jobPost.jobApplicationDeadline" required>
                </div>
                <div class="form-group">
                  <label for="jobCategory">Category:</label>
                  <select class="form-control" v-model="jobPost.jobCategory">
                  <option v-for="category in categories" :key="category._id" :value="category.categoryName">{{ category.categoryName }}</option>
                  </select>
                </div>
                <div class="form-group" hidden>
                    <label for="jobClient">jobClient:</label>
                    <input type="text" class="form-control" v-model="jobPost.clientId">
                </div>
  
                <div class="form-group" hidden>
                    <label for="jobClient">ClientName:</label>
                    <input type="text" class="form-control" v-model="jobPost.clientName">
                </div>
  
                <div class="form-group mt-3">
                    <button class="btn btn-success btn-block w-100" type="submit">Create</button>
                </div>
  
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  var clientId = localStorage.getItem('userId')
  
  export default {
    data() {
        return {
            jobPost: {
              jobPostName: '',
              jobPostBudget: '',
              jobPostDescription: '',
              jobApplicationDeadline: '',
              jobCategory: '',
              clientId: localStorage.getItem('userId'),
              clientName: '',
              creationDate: new Date()
            },
            categories: [],
        }
    },
    created() {
        let categoriesURL= 'http://localhost:4000/api/getCategories';
        axios.get(categoriesURL).then(res => {
            this.categories = res.data
            console.log(this.categories)
        }).catch(error => {
            console.log(error)
        })
  
        let clientdet = 'http://localhost:4000/api/getMyClientDetails';
        axios.get(clientdet, { params: { clientId } })
        .then(response => {
          console.log(response.data)
          this.jobPost.clientName = response.data.at(0).firstName + " " + response.data.at(0).lastName + " - " + response.data.at(0).companyName
          // Handle the response data here
        })
        .catch(error => {
          console.log(error)
        })
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:4000/api/create-jobPost';
  
            axios.post(apiURL, this.jobPost).then(() => {
              var activity = {
                      activityDescription: "JobPost '" + this.jobPost.jobPostName + "' was created",
                      activityDate: new Date(),
                      userId: localStorage.getItem('userId')
              }
  
              let activityURL = 'http://localhost:4000/api/create-activity';
              axios.post(activityURL, activity).then(() => {
                  console.log(activity)
              })
  
              this.$router.push('/clientprofile');
  
            }).catch(error => {
                console.log(error);
            })
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                evt.preventDefault();
            } else {
                return true;
            }
        }
    }
  }
  </script>
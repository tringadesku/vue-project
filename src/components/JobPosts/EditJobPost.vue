<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- edit here -->
            <h1>Edit Job Post</h1>
            <form @submit.prevent="handleUpdateForm">
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
                    <input type="text" class="form-control" v-model="jobPost.jobApplicationDeadline" required>
                </div>
                <div class="form-group">
                  <label for="jobCategory">Category:</label>
                  <select v-model="jobPost.jobCategory">
                  <option v-for="category in categories" :key="category._id" :value="category.categoryName">{{ category.categoryName }}</option>
                  </select>
                </div>
                <div class="form-group" hidden>
                    <label for="jobClient">clientId:</label>
                    <input type="text" class="form-control" v-model="jobPost.clientId" required>
                </div>
  
                <div class="form-group" hidden>
                    <label for="jobClient">ClientName:</label>
                    <input type="text" class="form-control" v-model="jobPost.clientName">
                </div>
  
                <div class="form-group mt-3">
                    <button class="btn btn-success btn-block w-100" type="submit">Edit</button>
                </div>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
        return {
            jobPost: {},
            categories: []
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit-jobPost/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.jobPost = res.data
        })
  
        let categoriesURL= 'http://localhost:4000/api/getCategories';
        axios.get(categoriesURL).then(res => {
            this.categories = res.data
            console.log(this.categories)
        }).catch(error => {
            console.log(error)
        })
    
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:4000/api/update-jobPost/${this.$route.params.id}`;
  
            axios.put(apiURL, this.jobPost).then(() => {
              var activity = {
                      activityDescription: "JobPost '" + this.jobPost.jobPostName + "' was edited",
                      activityDate: new Date(),
                      userId: localStorage.getItem('userId')
              }
  
              let activityURL = 'http://localhost:4000/api/create-activity';
              axios.post(activityURL, activity).then(() => {
                  console.log(activity)
              })
  
              this.$router.push('/clientprofile')
            }).catch(error => {
                console.log(error)
            })
        }
    }
  }
  </script>
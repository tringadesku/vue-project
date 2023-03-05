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
                  <label for="jobCategory">jobCategory</label>
                  <input type="text" class="form-control" v-model="jobPost.jobCategory" required>
              </div>
              <div class="form-group" hidden>
                  <label for="jobClient">jobClient:y</label>
                  <input type="text" class="form-control" v-model="jobPost.jobClient" required>
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

export default {
  data() {
      return {
          jobPost: {
            jobPostName: '',
            jobPostBudget: '',
            jobPostDescription: '',
            jobApplicationDeadline: '',
            jobCategory: '',
            jobClient: ''
          }
      }
  },
  created() {
    this.$store.watch(
        (state) => state.user,
        (newUser) => {
        this.jobPost.jobClient = newUser ? newUser.uid : null
        }
        )
  },
  methods: {
      handleSubmitForm() {
          let apiURL = 'http://localhost:4000/api/create-jobPost';

          axios.post(apiURL, this.jobPost).then(() => {
              //this.$router.push('/viewJobPosts');
              this.jobPost = {
            jobPostName: '',
            jobPostBudget: '',
            jobPostDescription: '',
            jobApplicationDeadline: '',
            jobCategory: '',
            jobClient: ''
          }
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
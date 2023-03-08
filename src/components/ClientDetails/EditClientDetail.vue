<template>
  <div>
    <h1>Edit ClientDetails:</h1>
    <form @submit.prevent="handleUpdateForm">
      <div class="form-group" hidden>
        <label for="jobClient">jobClient:</label>
        <input type="text" class="form-control" v-model="clientDetail.clientId">
      </div>
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="clientDetail.firstName" required>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="clientDetail.lastName" required>
      </div>
      <div>
        <label for="companyName">Company Name:</label>
        <input type="text" id="companyName" v-model="clientDetail.companyName" required>
      </div>
      <div>
        <label for="position">Position:</label>
        <input type="text" id="position" v-model="clientDetail.position" required>
      </div>
      <div>
        <label for="city">City:</label>
        <input type="text" id="city" v-model="clientDetail.city" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="clientDetail.description" required></textarea>
      </div>
      <div>
        <label for="profileImg">Profile Image:</label>
        <input type="file" id="profileImg" @change="onFileChange">
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  data() {
      return {
          clientDetail: {}
      }
  },
  created() {
      let apiURL = `http://localhost:4000/api/edit-clientDetail/${this.$route.params.id}`;
      axios.get(apiURL).then((res) => {
          this.clientDetail = res.data
      })
  },
  methods: {
      handleUpdateForm() {
          let apiURL = `http://localhost:4000/api/update-clientDetail/${this.$route.params.id}`;

          axios.put(apiURL, this.jobPost).then((res) => {
              console.log(res)
              this.$router.push('/clientProfile')
          }).catch(error => {
              console.log(error)
          })
      }
  }
}
</script>
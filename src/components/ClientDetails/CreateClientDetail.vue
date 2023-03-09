<template>
  <div class="text-center" v-if="ClientDetails.at(0) != null">
    <h1>You've already set your details!</h1>
    <br>
    <router-link to="/clientProfile" class="btn btn-primary px-3">Go to Profile</router-link>
  </div>

  <div v-if="ClientDetails.at(0) == null">
    <h1>Add Profile Details:</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group" hidden>
        <label for="jobClient">jobClient:</label>
        <input type="text" class="form-control" v-model="form.clientId">
      </div>
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="form.firstName" required>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="form.lastName" required>
      </div>
      <div>
        <label for="companyName">Company Name:</label>
        <input type="text" id="companyName" v-model="form.companyName" required>
      </div>
      <div>
        <label for="position">Position:</label>
        <input type="text" id="position" v-model="form.position" required>
      </div>
      <div>
        <label for="city">City:</label>
        <input type="text" id="city" v-model="form.city" required>
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="form.description" required></textarea>
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
import axios from 'axios';
var clientId = localStorage.getItem('userId')

export default {
  data() {
    return {
      ClientDetails: [],
      form: {
        clientId: localStorage.getItem('userId'),
        firstName: '',
        lastName: '',
        position: '',
        companyName: '',
        city: '',
        description: '',
        profileImg: null
      }
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
  },
  methods: {
    onFileChange(event) {
      this.form.profileImg = event.target.files[0];
    },
    submitForm() {
      const formData = new FormData();
      formData.append('clientId', this.form.clientId);
      formData.append('firstName', this.form.firstName);
      formData.append('lastName', this.form.lastName);
      formData.append('position', this.form.position);
      formData.append('companyName', this.form.companyName);
      formData.append('city', this.form.city);
      formData.append('description', this.form.description);
      formData.append('profileImg', this.form.profileImg);
      axios.post('http://localhost:4000/api/create-clientDetail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data);
        // Reset the form
        this.form.clientId = '';
        this.form.firstName = '',
        this.form.lastName = '',
        this.form.position = '';
        this.form.companyName = '';
        this.form.city = '';
        this.form.description = '';
        this.form.profileImg = null;
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>
<template>
  <div class="text-center" v-if="FreelancerDetails.at(0) != null">
    <h1>You've already set your details!</h1>
    <br>
    <router-link to="/freelancerProfile" class="btn btn-primary px-3">Go to Profile</router-link>
  </div>

  <div v-if="FreelancerDetails.at(0) == null">
    <h1>Add Profile Details:</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group" hidden>
        <label for="freelancerid">ID:</label>
        <input type="text" class="form-control" v-model="form.freelancerId">
      </div>
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="form.firstName" required>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="form.lastName" required>
      </div>
      <div class="form-group">
                <label for="city">City:</label>
                <select v-model="form.city">
                <option v-for="city in cities" :key="city._id" :value="city.city">{{ city.city }}</option>
                </select>
      </div>
        <div class="form-group">
                <label for="jobCategory">Category:</label>
                <select v-model="form.jobCategory">
                <option v-for="category in categories" :key="category._id" :value="category.categoryName">{{ category.categoryName }}</option>
                </select>
      </div>
      <div>
        <label for="education">Education:</label>
        <textarea id="education" v-model="form.education" required></textarea>
      </div>
      <div>
        <label for="experience">Experience:</label>
        <textarea id="experience" v-model="form.experience" required></textarea>
      </div>
      <div>
        <label for="hourlyRate">Hourly Rate:</label>
        <textarea id="hourlyRate" v-model="form.hourlyRate" required></textarea>
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
var freelancerId = localStorage.getItem('userId')

export default {
  data() {
    return {
      FreelancerDetails: [],
      form: {
        freelancerId: localStorage.getItem('userId'),
        firstName: '',
        lastName: '',
        city: '',
        jobCategory: '',
        education: '',
        experience: '',
        hourlyRate: '',
        profileImg: null
      },

         categories: [],
         cities: []
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

      let categoriesURL= 'http://localhost:4000/api/getCategories';
      axios.get(categoriesURL).then(res => {
          this.categories = res.data
          console.log(this.categories)
      }).catch(error => {
          console.log(error)
      })

      let citiesURL= 'http://localhost:4000/api/getCities';
      axios.get(citiesURL).then(res => {
          this.cities = res.data
      }).catch(error => {
          console.log(error)
      })


  },
  methods: {
    onFileChange(event) {
      this.form.profileImg = event.target.files[0];
    },
    submitForm() {
      const formData = new FormData();
      formData.append('freelancerId', this.form.freelancerId);
      formData.append('firstName', this.form.firstName);
      formData.append('lastName', this.form.lastName);
      formData.append('city', this.form.city);
      formData.append('jobCategory', this.form.jobCategory);
      formData.append('education', this.form.education);
      formData.append('experience', this.form.experience);
      formData.append('hourlyRate', this.form.hourlyRate);
      formData.append('profileImg', this.form.profileImg);
      axios.post('http://localhost:4000/api/create-freelancerDetail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        console.log(response.data);
        // Reset the form
        this.form.freelancerId = '';
        this.form.firstName = '',
        this.form.lastName = '',
        this.form.city = '',
        this.form.jobCategory = '';
        this.form.education = '';
        this.form.experience = '';
        this.form.hourlyRate = '';
        this.form.profileImg = null;
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>
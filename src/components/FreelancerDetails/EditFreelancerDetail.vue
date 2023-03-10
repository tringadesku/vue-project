<template>
  <div>
    <h1>Edit FreelancerDetails:</h1>
    <form @submit.prevent="handleUpdateForm">
      <div class="form-group" hidden>
        <input type="text" class="form-control" v-model="freelancerDetail.freelancerId">
      </div>
      <div>
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="freelancerDetail.firstName" required>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="freelancerDetail.lastName" required>
      </div>
      <div class="form-group">
                <label for="city">City:</label>
                <select v-model="freelancerDetail.city">
                <option v-for="city in cities" :key="city._id" :value="city.city">{{ city.city }}</option>
                </select>
      </div>
      <div class="form-group">
                <label for="jobCategory">Category:</label>
                <select v-model="freelancerDetail.jobCategory">
                <option v-for="category in categories" :key="category._id" :value="category.categoryName">{{ category.categoryName }}</option>
                </select>
              </div>
      <div>
        <label for="education">Education:</label>
        <textarea id="eduaction" v-model="freelancerDetail.eduaction" required></textarea>
      </div>
      <div>
        <label for="experience">Experience:</label>
        <textarea id="experience" v-model="freelancerDetail.experience" required></textarea>
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
          freelancerDetail: {},
          cities: []
      }
  },
  created() {
      let apiURL = `http://localhost:4000/api/edit-clientDetail/${this.$route.params.id}`;
      axios.get(apiURL).then((res) => {
          this.clientDetail = res.data
      })

      let citiesURL= 'http://localhost:4000/api/getCities';
      axios.get(citiesURL).then(res => {
          this.cities = res.data
      }).catch(error => {
          console.log(error)
      })
  },
  methods: {
      handleUpdateForm() {
          let apiURL = `http://localhost:4000/api/update-freelancerDetail/${this.$route.params.id}`;

          axios.put(apiURL, this.freelancerDetail).then((res) => {
              console.log(res)
              this.$router.push('/freelancerProfile')
          }).catch(error => {
              console.log(error)
          })
      }
  }
}
</script>
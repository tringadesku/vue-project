<template>
  <div class="row justify-content-center col-md-6">
    <h1>Edit FreelancerDetails:</h1>
    <form @submit.prevent="handleUpdateForm">
      <div class="form-group" hidden>
        <input type="text" class="form-control" v-model="freelancerDetail.freelancerId">
      </div>
      <div>
        <label for="firstName">First Name:</label>
        <input type="text"  class="form-control" id="firstName" v-model="freelancerDetail.firstName" required>
      </div>
      <div>
        <label for="lastName">Last Name:</label>
        <input type="text" class="form-control"  id="lastName" v-model="freelancerDetail.lastName" required>
      </div>
      <div class="form-group">
                <label for="city">City:</label>
                <select class="form-control" v-model="freelancerDetail.city">
                <option v-for="city in cities" :key="city._id" :value="city.city">{{ city.city }}</option>
                </select>
      </div>
      <div class="form-group">
                <label for="jobCategory">Category:</label>
                <select  class="form-control" v-model="freelancerDetail.jobCategory">
                <option v-for="category in categories" :key="category._id" :value="category.categoryName">{{ category.categoryName }}</option>
                </select>
              </div>
      <div>
        <label for="education">Education:</label>
        <textarea class="form-control" id="eduaction" v-model="freelancerDetail.education" required></textarea>
      </div>
      <div>
        <label for="experience">Experience:</label>
        <textarea id="experience" v-model="freelancerDetail.experience"  class="form-control" required></textarea>
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
          cities: [],
          categories: []
      }
  },
  created() {
      let apiURL = `http://localhost:4000/api/edit-freelancerDetail/${this.$route.params.id}`;
      axios.get(apiURL).then((res) => {
          this.freelancerDetail = res.data
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
      handleUpdateForm() {
          let apiURL = `http://localhost:4000/api/update-freelancerDetail/${this.$route.params.id}`;

          var activity = {
                    activityDescription: "FreelancerDetails for '" + this.freelancerDetail.firstName + " "+ this.freelancerDetail.lastName+"' were edited",
                    activityDate: new Date(),
                    userId: localStorage.getItem('userId')
            }

            let activityURL = 'http://localhost:4000/api/create-activity';
            axios.post(activityURL, activity).then(() => {
                console.log(activity)
            })

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
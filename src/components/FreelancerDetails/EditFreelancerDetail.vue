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
      <div>
        <label for="city">City:</label>
        <input type="text" id="city" v-model="freelancerDetail.city" required>
      </div>
      <div>
        <label for="jobCategory">Category:</label>
        <input type="text" id="category" v-model="freelancerDetail.position" required>
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
          freelancerDetail: {}
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
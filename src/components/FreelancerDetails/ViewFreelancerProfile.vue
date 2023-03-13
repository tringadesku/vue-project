<template>
  <div class="justify-content-center">
      <!-- Display jobpost list -->
      <h1></h1>
      <div class="row">
          <div class="col-md-12">
              <div class="table-responsive">
                  <table class="table table-striped">
                    <thead class="table-dark">
                          <tr>
                              <th>First Name2</th>
                              <th>Last Name</th>
                              <th>City</th>
                              <th>Category</th>
                              <th>Education</th>
                              <th>Experience</th>
                              <th>Hourly Rate</th>
                              <th>Profile Pic</th>
                          </tr>
                      </thead>
                      <tbody v-if="FreelancerDetails.at(0) != null">
                          <tr v-for="cd in FreelancerDetails" :key="cd._id">
                              <td>{{ cd.firstName }}</td>
                              <td>{{ cd.lastName }}</td>
                              <td>{{ cd.city }}</td>
                              <td>{{ cd.jobCategory }}</td>
                              <td>{{ cd.education }}</td>
                              <td>{{ cd.experience }}</td>
                              <td>{{ cd.hourlyRate }}</td>
                              <td><img :src="'/uploads/' + cd.profileImg" alt="Profile Image"></td>

                          </tr>
                      </tbody>
                  </table>

                  <h2>{{ FreelancerDetails.at(0).firstName }}'s Projects:</h2>
                  <table class="table table-striped">
                      <thead class="table-dark">
                          <tr>
                              <th>Project</th>
                              <th>Category</th>
                              <th>Description</th>
                              <th>Website</th>
                              <th>Picture</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="freelancerproject in FreelancerProjects" :key="freelancerproject._id">
                              <td>{{ freelancerproject.projectName }}</td>
                              <td>{{ freelancerproject.jobCategory}}</td>
                              <td>{{ freelancerproject.projectDescription }}</td>
                              <td><a :href=freelancerproject.projectWebsite>Visit Website</a></td>
                              <td><img :src=freelancerproject.fileName alt="Project Thumbnail"></td>
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
          FreelancerDetails: [],
          FreelancerProjects: []
      }
  },
  created() {
    var freelancerId = this.$route.params.id
    let apiURL = 'http://localhost:4000/api/getMyFreelancerDetails';
      axios.get(apiURL, { params: { freelancerId }   })
      .then(response => {
        console.log(response.data)
        this.FreelancerDetails = response.data
        // Handle the response data here
      })
      .catch(error => {
        console.log(error)
      })

      let projects = 'http://localhost:4000/api/getMyProjects';
      axios.get(projects, { params: { freelancerId } })
      .then(response => {
        console.log(response.data)
        this.FreelancerProjects = response.data
        // Handle the response data here
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style>
tr img {
  height: 70px;
  width: 70px;
  object-fit: cover;
}
</style>
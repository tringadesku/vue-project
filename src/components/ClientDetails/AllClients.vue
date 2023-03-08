<template>
  <div class="justify-content-center">

    <h3>Search Clients:</h3>
    <input v-model="searchQuery" @input="searchClientDetails()" type="text" placeholder="Search client details...">
      <!-- Display jobpost list -->
      <h1>Clients</h1>
      <div class="row">
          <div class="col-md-12">
              <div class="table-responsive">
                  <table class="table table-striped">
                    <thead class="table-dark">
                          <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Company</th>
                              <th>Position</th>
                              <th>City</th>
                              <th>Description</th>
                              <th>Profile Pic</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="cd in ClientDetails" :key="cd._id">
                              <td>{{ cd.firstName }}</td>
                              <td>{{ cd.lastName }}</td>
                              <td>{{ cd.companyName }}</td>
                              <td>{{ cd.position }}</td>
                              <td>{{ cd.city }}</td>
                              <td>{{ cd.description }}</td>
                              <td>
                              <img :src="'/uploads/' + cd.profileImg" alt="Profile Image">
                              </td>
                              <td>
                                <router-link :to="{name: 'ViewClientProfile', params: {id: cd.clientId}}"
                                  class="btn btn-success me-2">
                                      View Profile
                                  </router-link>
                              </td>
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
        query: '',
        results: [],
        ClientDetails: []
      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getClientDetails';
      axios.get(apiURL).then(res => {
          this.ClientDetails = res.data
      }).catch(error => {
          console.log(error)
      })

  },
  methods: {
    searchClientDetails() {
      axios.get(`http://localhost:4000/api/search-clientDetails/${this.searchQuery}`)
        .then(response => {
          this.ClientDetails = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
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
<template>
  <div class="justify-content-center">

    <h3>Search Clients:</h3>
    <input v-model="searchQuery" @input="searchClientDetails()" type="text" placeholder="Search client details...">
      <!-- Display jobpost list -->
      <h1>Clients</h1>
      <!-- <div class="row">
          <div class="col-md-12">
              <div class="table-responsive">
                  <table class="table table-striped">
                    <thead class="table-dark">
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
      </div> -->


      <div class="card my-3">
        <div class="card-body">
            <div class="row gy-3">

                  <div class="col-md-3" v-for="cd in ClientDetails" :key="cd._id">
                            <div class="card">
                                <div class="card-body">


                                  <img :src="'/uploads/' + cd.profileImg" alt="Profile Image" style="width:100px;" onerror="this.src='https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png';">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h3>{{ cd.firstName }} {{ cd.lastName }}</h3>
                                    </div>

                                    <h5 class="card-title">{{ cd.position }} at <span class="fw-bold">{{ cd.companyName }}</span> | {{ cd.city }}</h5>
                                    <p class="card-text">{{ cd.description }}</p>
                                
                                <router-link :to="{name: 'ViewClientProfile', params: {id: cd.clientId}}"
                                class="btn btn-success w-100">
                                      View Profile
                                  </router-link>
                                </div>
                            </div>
                        </div>


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
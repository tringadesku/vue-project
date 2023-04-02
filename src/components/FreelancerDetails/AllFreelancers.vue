<template>
  <div class="justify-content-center">

    <h3>Search Freelancers:</h3>
    <input v-model="searchQuery" @input="searchFreelancerDetails()" type="text" placeholder="Search freelancer details...">
      <!-- Display jobpost list -->
      <h1>Freelancers</h1>
      <div class="card my-3">
        <div class="card-body">
            <div class="row gy-3">

                  <div class="col-md-3" v-for="cd in FreelancerDetails" :key="cd._id">
                            <div class="card">
                                <div class="card-body">


                                  <img :src="'/uploads/' + cd.profileImg" alt="Profile Image" style="width:100px;" onerror="this.src='https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png';">
                                    <div class="d-flex justify-content-between align-items-center mb-2">
                                    <h3>{{ cd.firstName }} {{ cd.lastName }}</h3>
                                    </div>

                                    <h5 class="card-title">{{ cd.jobCategory }}, {{ cd.city }}</h5>
                                    <div class="d-flex justify-content-between mb-2">
                                            <div class="p fw-semibold">Hourly Rate</div>
                                            <div class="p">{{ cd.hourlyRate }} €</div>
                                    </div>
                                
                                <router-link :to="{name: 'ViewFreelancerProfile', params: {id: cd.freelancerId}}"
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
        FreelancerDetails: []
      }
  },
  created() {
      let apiURL = 'http://localhost:4000/api/getFreelancerDetails';
      axios.get(apiURL).then(res => {
          this.FreelancerDetails = res.data
      }).catch(error => {
          console.log(error)
      })

  },
  methods: {
    searchFreelancerDetails() {
      axios.get(`http://localhost:4000/api/search-freelancerDetails/${this.searchQuery}`)
        .then(response => {
          this.FreelancerDetails = response.data;
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
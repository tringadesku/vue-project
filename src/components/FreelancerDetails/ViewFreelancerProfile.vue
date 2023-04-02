<template>
  
  <div class="container mt-4 mb-4">
        <div class="row">
            <div class="col-4" v-if="FreelancerDetails.at(0) == null">
                <router-link to="/createFreelancerDetail" class="btn btn-primary px-3">Add Profile Details</router-link>
            </div>
            
            <div class="col-4" v-if="FreelancerDetails.at(0) != null">
                <div class="card" v-for="cd in FreelancerDetails" :key="cd._id">
                    <div class="card-body">
                        <img :src="'/uploads/' + cd.profileImg" alt="Profile Image" style="width:100px;" onerror="this.src='https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png';">
                        <h3 class="card-title">{{ cd.firstName }} {{ cd.lastName }}</h3>


                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Field</div>
                            <div class="p">{{ cd.jobCategory }}</div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Hourly Rate</div>
                            <div class="p">{{ cd.hourlyRate }} €</div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Location</div>
                            <div class="p">{{ cd.city }}</div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Education</div>
                            <div class="p">{{ cd.education }}</div>
                        </div>

                        <div class="d-flex justify-content-between mb-2">
                            <div class="p fw-bold">Experience</div>
                            <div class="p">{{ cd.experience }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-8">
                <div class="card">
                    <div class="card-body">

                        <div class="d-flex justify-content-between mb-3">
                            <h3 class="Card Title">Projects</h3>
                        </div>

                        <div class="row gy-3">
                            <div class="col-md-4" v-for="freelancerproject in FreelancerProjects" :key="freelancerproject._id">
                                <div class="card">
                                    <img :src=freelancerproject.fileName alt="Project Thumbnail" style="aspect-ratio:2/1;" class="card-img-top" onerror="this.src='https://waterfieldtech.com/wp-content/uploads/2019/02/placeholder-image-gray-3x2.png';">
                                    <div class="card-body">
                                    <h5 class="card-title">{{ freelancerproject.projectName }}</h5>
                                    <p class="card-text">{{ freelancerproject.projectDescription }}</p>

                                    <a :href=freelancerproject.projectWebsite class="btn btn-primary w-100">Visit Website</a>
                                </div>
                                </div>
                                
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
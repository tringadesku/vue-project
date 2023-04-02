<template>
    <div class="justify-content-center">
        <!-- Display jobpost list -->
        <h1>Freelancer Projects</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="row gy-3">
                            <div class="col-md-3" v-for="freelancerproject in FreelancerProjects" :key="freelancerproject._id">
                                <div class="card">
                                    <img :src=freelancerproject.fileName alt="Project Thumbnail" style="aspect-ratio:2/1;" class="card-img-top" onerror="this.src='https://waterfieldtech.com/wp-content/uploads/2019/02/placeholder-image-gray-3x2.png';">
                                    <div class="card-body">
                                    <h5 class="card-title">{{ freelancerproject.projectName }}</h5>
                                    <p class="card-text">{{ freelancerproject.projectDescription }}</p>

                                    <a :href=freelancerproject.projectWebsite class="btn btn-primary w-100">Visit Website</a>

                                    <hr class="hr"/>
                                    
                                    <div class="d-flex justify-content-between">
                                        <h5>{{ freelancerproject.freelancerName}}</h5>
                                    <router-link :to="{name: 'ViewFreelancerProfile', params: {id: freelancerproject.freelancerId}}"
                                    class="btn btn-success me-2">
                                        View Profile
                                    </router-link>
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
            FreelancerProjects: [],
  
        }
    },
    created() {
        let apiURL = 'http://localhost:4000/api/getProjects';
        axios.get(apiURL).then(res => {
            this.FreelancerProjects = res.data
        }).catch(error => {
            console.log(error)
        })
  
    },
  
  }
  </script>
<template>
  <div class="justify-content-center">

    <div v-if="userRole == undefined" class="px-4 py-5 text-center" style="margin-top:100px;margin-bottom:100px">
      <h1 class="display-5 fw-bold">Welcome to JobMatch</h1>
      <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sed ante ac nisi euismod tincidunt. Ut nec auctor diam. Curabitur sit amet porttitor ligula, non feugiat dolor. Praesent pharetra felis eu fermentum aliquam. Cras at facilisis nulla. Aliquam sit amet ligula quis elit tristique accumsan. Sed quis lacus vitae orci congue porta. Pellentesque at eleifend ante. In velit ipsum, fringilla in arcu id, bibendum luctus justo.</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <router-link to="/login" class="btn btn-primary btn-lg px-4 gap-3">Log In</router-link>
            <router-link to="/signup" class="btn btn-outline-primary btn-lg px-4">Sign Up</router-link>
          </div>
        </div>
    </div>

    <div v-if="userRole == 'Freelancer' || userRole == 'Client'" class="slider">
      <h1>Qitu pls sliderin qe mundesh me ndreq, links t fotov ti kom lon te data poshte te array images</h1>
  </div>
  
    <div v-if="userRole == 'Freelancer'">
      <h3>Latest Job Posts: </h3>
      <table class="table table-striped">
                      <thead class="table-dark">
                          <tr>
                              <th>Job Post Name</th>
                              <th>Job Post Budget</th>
                              <th>Job Post Description</th>
                              <th>Job Application Deadline</th>
                              <th>Job Category</th>
                              <th>Job Client</th>
                              <th></th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="jobpost in JobPosts" :key="jobpost._id">
                              <td>{{ jobpost.jobPostName }}</td>
                              <td>{{ jobpost.jobPostBudget }}€</td>
                              <td>{{ jobpost.jobPostDescription }}</td>
                              <td>{{ jobpost.jobApplicationDeadline }}</td>
                              <td>{{ jobpost.jobCategory }}</td>
                              <td>{{ jobpost.clientName }}</td>
                              <td>
                                <router-link :to="{name: 'ViewClientProfile', params: {id: jobpost.clientId}}"
                                  class="btn btn-success me-2">
                                      View Client Profile
                                  </router-link>
                              </td>
                              <td>
                                <button v-if="userRole == 'Freelancer' &&  hasApplied(jobpost._id)" @click="unapply(jobpost._id)">Unapply</button>
                                <button v-if="userRole == 'Freelancer' &&  !hasApplied(jobpost._id)" @click="applyJobPost(jobpost._id)">Apply</button>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <router-link :to="{name: 'JobPosts'}"
                                  class="btn btn-success me-2">
                                      View All Job Posts >> 
                  </router-link>


                  <h3>Suggested JobPosts for you: </h3>
                  <table class="table table-striped">
                      <thead class="table-dark">
                          <tr>
                              <th>Job Post Name</th>
                              <th>Job Post Budget</th>
                              <th>Job Post Description</th>
                              <th>Job Application Deadline</th>
                              <th>Job Category</th>
                              <th>Job Client</th>
                              <th></th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="job in SuggestedJobPosts" :key="job._id">
                              <td>{{ job.jobPostName }}</td>
                              <td>{{ job.jobPostBudget }}€</td>
                              <td>{{ job.jobPostDescription }}</td>
                              <td>{{ job.jobApplicationDeadline }}</td>
                              <td>{{ job.jobCategory }}</td>
                              <td>{{ job.clientName }}</td>
                              <td>
                                <router-link :to="{name: 'ViewClientProfile', params: {id: job.clientId}}"
                                  class="btn btn-success me-2">
                                      View Client Profile
                                  </router-link>
                              </td>
                              <td>
                                <button v-if="userRole == 'Freelancer' &&  hasApplied(job._id)" @click="unapply(job._id)">Unapply</button>
                                <button v-if="userRole == 'Freelancer' &&  !hasApplied(job._id)" @click="applyJobPost(job._id)">Apply</button>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <button>View All Suggested JobPosts >></button>
    </div>

    <div v-if="userRole == 'Client'">
      <router-link :to="{name: 'CreateJobPost'}" class="btn btn-success me-2">
        Create New Job Post
      </router-link>

      <h3>Freelancers in JobMatch:</h3>
      <table class="table table-striped">
                    <thead class="table-dark">
                          <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Category</th>
                              <th>City</th>
                              <th>Education</th>
                              <th>Experience</th>
                              <th>Hourly Rate</th>
                               <th>Profile Pic</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="cd in Freelancers" :key="cd._id">
                              <td>{{ cd.firstName }}</td>
                              <td>{{ cd.lastName }}</td>
                              <td>{{ cd.jobCategory }}</td>
                              <td>{{ cd.city }}</td>
                              <td>{{ cd.education }}</td>
                              <td>{{ cd.experience }}</td>
                              <td>{{ cd.hourlyRate }}</td>
                              <td>
                              <img :src="'/uploads/' + cd.profileImg" alt="Profile Image">
                              </td>
                              <td>
                                <router-link :to="{name: 'ViewFreelancerProfile', params: {id: cd.freelancerId}}"
                                  class="btn btn-success me-2">
                                      View Profile
                                  </router-link>
                              </td>
                          </tr>
                      </tbody>
                  </table>

                  <router-link :to="{name: 'Freelancers'}"
                                  class="btn btn-success me-2">
                                      View All Freelancers >> 
                  </router-link>
      </div>
      <div v-if="userRole == 'Admin'" class="card my-5">
        <h1 class="my-5">Admin Dashboard</h1>

        <router-link :to="{name: 'ActivityLog'}"
                                class="w-100 btn btn-sm btn-primary my-3">
                                      View Activity Log >> 
        </router-link>

            <div class="card-body">
                <div class="row gy-5">
                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-center">Categories</h4>
                                <hr />
                                <router-link :to="{name: 'Categories'}"
                                class="w-100 btn btn-sm btn-primary mb-2">
                                      Manage Categories >> 
                                </router-link>
                                <router-link :to="{name: 'CreateCategory'}"
                                class="w-100 btn btn-sm btn-outline-primary">
                                      Create Category >> 
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-center">Cities</h4>
                                <hr />
                                <router-link :to="{name: 'cities'}"
                                class="w-100 btn btn-sm btn-primary mb-2">
                                      Manage Cities >> 
                                </router-link>
                                <router-link :to="{name: 'CreateCity'}"
                                class="w-100 btn btn-sm btn-outline-primary">
                                      Create City >> 
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-center">JobPosts</h4>
                                <hr />
                                <router-link :to="{name: 'ListJobPosts'}"
                                class="w-100 btn btn-sm btn-primary my-3">
                                      Manage JobPosts >> 
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-center">Client Details</h4>
                                <hr />
                                <router-link :to="{name: 'ClientDetails'}"
                                class="w-100 btn btn-sm btn-primary my-3">
                                      Manage Client Details >> 
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-center">Freelancer Details</h4>
                                <hr />
                                <router-link :to="{name: 'FreelancerDetails'}"
                                class="w-100 btn btn-sm btn-primary my-3">
                                      Manage Freelancer Details >> 
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="text-center">Manage Users</h4>
                                <hr />
                                <router-link :to="{name: 'Users'}"
                                class="w-100 btn btn-sm btn-primary my-3">
                                      Manage Users >> 
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
var freelancerId = localStorage.getItem('userId')

export default{
  data(){
    return{
      JobPosts: [],
      SuggestedJobPosts: [],
      JobApplications: [],
      Freelancers: [],
      userRole: localStorage.getItem('userRole'),
      images: [
        'https://publitas.com/wp-content/uploads/2023/01/how-to-amplify-word-of-mouth-marketing-with-online-catalogues.jpg',
        'https://t3.ftcdn.net/jpg/02/33/12/44/360_F_233124436_78mVMPy74gldjeo6rdyJgRklPIGSAwl7.jpg',
        'https://images.squarespace-cdn.com/content/v1/5f78e89c7ec702130762b178/1619791419750-OXMONJ7MO1SW0I2FGLIY/JoinOurTeam_Header.jpeg'
      ],
      currentSlide: 0,
      slideWidth: 0
    }
  },
  created(){

    let apiURL = 'http://localhost:4000/api/getLatestJobs';
      axios.get(apiURL).then(res => {
          this.JobPosts = res.data
      }).catch(error => {
          console.log(error)
      })

      let freelancers = 'http://localhost:4000/api/getFourFreelancers';
      axios.get(freelancers).then(res => {
          this.Freelancers = res.data
          console.log(res.data)
      }).catch(error => {
          console.log(error)
      })

      //check if user applied for job
      let applications = 'http://localhost:4000/api/getMyJobApplications';
      axios.get(applications, { params: { freelancerId } })
      .then(response => {
        console.log(response.data)
        this.JobApplications = response.data
        // Handle the response data here
      })
      .catch(error => {
        console.log(error)
      })


      //get suggested jobposts by category
      var jobCategory = ''

      let apiiURL = 'http://localhost:4000/api/getMyFreelancerDetails';
      axios.get(apiiURL, { params: { freelancerId } })
      .then(response => {
        console.log(response.data)
        var freelancerdetails = response.data
        jobCategory = freelancerdetails.at(0).jobCategory
        console.log(jobCategory)

        let jobsURL = 'http://localhost:4000/api/getLatestSuggestedJobs';
        axios.get(jobsURL, { params: { jobCategory } })
          .then(response => {
            console.log(response.data)
            this.SuggestedJobPosts = response.data
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.images.length
    },

    searchJobPosts() {
      axios.get(`http://localhost:4000/api/search-jobPosts/${this.searchQuery}`)
        .then(response => {
          this.JobPosts = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    applyJobPost(jobId) {
      let freelancerId = localStorage.getItem('userId');
      axios.post(`http://localhost:4000/api/apply`, { freelancerId, jobId })
        .then(response => {
          console.log(response.data);
          this.$router.go(0);
        })
        .catch(error => {
          console.log(error);
        });
    },

    unapply(jobId) {
      let appl = 'http://localhost:4000/api/getJobApplication';
      axios.get(appl, { params: { freelancerId, jobId } })
      .then(response => {
        //console.log(response.data)
        var aplikimi = response.data
        var jobApplicationId = aplikimi.at(0)._id
        axios.delete(`http://localhost:4000/api/delete-jobApplication/${jobApplicationId}`)
        this.$router.go(0);

        // Handle the response data here
      })
    },

    hasApplied(jobId) {
    return this.JobApplications.some(jobApp => jobApp.jobId === jobId);
  }
}
}


</script>

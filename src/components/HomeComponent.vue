<template>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
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

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <div v-if="userRole == 'Freelancer' || userRole == 'Client'" class="slider">
                <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://publitas.com/wp-content/uploads/2023/01/how-to-amplify-word-of-mouth-marketing-with-online-catalogues.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://t3.ftcdn.net/jpg/02/33/12/44/360_F_233124436_78mVMPy74gldjeo6rdyJgRklPIGSAwl7.jpg" class="d-block w-100" alt="...">
              </div>
              <div class="carousel-item">
                <img src="https://images.squarespace-cdn.com/content/v1/5f78e89c7ec702130762b178/1619791419750-OXMONJ7MO1SW0I2FGLIY/JoinOurTeam_Header.jpeg" class="d-block w-100" alt="...">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
  </div>
  
    <div v-if="userRole == 'Freelancer'">
      <div class="d-flex mb-3 justify-content-between align-items-center my-4">
      <h3>Latest Job Posts: </h3>
      <router-link :to="{name: 'JobPosts'}"
                  class="btn btn-primary">
                                      View All Job Posts >> 
                  </router-link>
                  </div>
      <div class="card">
        <div class="card-body">
            <div class="row gy-3">
              <div class="col-md-3" v-for="jobpost in JobPosts" :key="jobpost._id">
              
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title" :style="{ fontSize: jobpost.jobPostName.length > 20 ? '10px' : '18px' }">{{ jobpost.jobPostName }}</h5>
                    <h6 class="card-title" :style="{ paddingBottom: jobpost.clientName.length + jobpost.jobCategory.length < 22 ? '16.5px' : '0' }">{{ jobpost.jobCategory }} | {{ jobpost.clientName }}</h6>
                    <p class="card-text" id="FreelancerDescriptionCss">{{ jobpost.jobPostDescription }}</p>

                    <hr class="hr" />

                    <div class="d-flex justify-content-between mb-2">
                               <div class="p fw-bold">Deadline</div>
                               <div class="row">
                                    <div class="p text-right">{{ formatDate(jobpost.jobApplicationDeadline) }}</div>
                                    <div class="p text-right">{{ daysLeft(jobpost.jobApplicationDeadline) }}</div>
                               </div>
                    </div>

                    <hr class="hr" />

                    <div class="d-flex justify-content-between mb-2">
                                    <div class="p fw-bold">Budget</div>
                                    <div class="p">{{ jobpost.jobPostBudget }} €</div>
                    </div>

                    <hr class="hr" />
                    <router-link :to="{name: 'ViewClientProfile', params: {id: jobpost.clientId}}"
                                  class="btn btn-primary btn-sm mb-1" style="width:100%;">
                                      View Client Profile
                                  </router-link>

                                  <button v-if="userRole == 'Freelancer' &&  hasApplied(jobpost._id)" @click="unapply(jobpost._id)" class="btn btn-outline-primary btn-sm" style="width:100%;">Unapply</button>
                                <button v-if="userRole == 'Freelancer' &&  !hasApplied(jobpost._id)" @click="applyJobPost(jobpost._id)" class="btn btn-primary btn-sm" style="width:100%;">Apply</button>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </div>

                  

      <div class="d-flex mb-3 justify-content-between align-items-center my-4">
                  <h3>Suggested JobPosts for you: </h3>
                  <router-link :to="{name: 'SuggestedJobs'}"
                  class="btn btn-primary">
                                      View All Suggested Job Posts >> 
                  </router-link>
                  </div>
                  <table class="table table-striped">
                      <tbody>
                          <!-- <tr v-for="job in SuggestedJobPosts" :key="job._id">
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
                          </tr> -->
                      </tbody>
                  </table>

                  <div class="card">
        <div class="card-body">
            <div class="row gy-3">
              <div class="col-md-3" v-for="job in SuggestedJobPosts" :key="job._id">
              
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title" :style="{ fontSize: job.jobPostName.length > 20 ? '10px' : '18px' }">{{ job.jobPostName }}</h5>
                    <h6 class="card-title" :style="{ paddingBottom: job.clientName.length + job.jobCategory.length < 22 ? '16.5px' : '0' }">{{ job.jobCategory }} | {{ job.clientName }}</h6>
                    <p class="card-text" id="FreelancerDescriptionCss">{{ job.jobPostDescription }}</p>

                    <hr class="hr" />

                    <div class="d-flex justify-content-between mb-2">
                                    <div class="p fw-bold">Deadline</div>
                                    <div class="row">
                                    <div class="p text-right">{{ formatDate(job.jobApplicationDeadline) }}</div>
                                    <div class="p text-right">{{ daysLeft(job.jobApplicationDeadline) }}</div>
                               </div>
                    </div>

                    <hr class="hr" />

                    <div class="d-flex justify-content-between mb-2">
                                    <div class="p fw-bold">Budget</div>
                                    <div class="p">{{ job.jobPostBudget }} €</div>
                    </div>

                    <hr class="hr" />
                    <router-link :to="{name: 'ViewClientProfile', params: {id: job.clientId}}"
                                  class="btn btn-primary btn-sm mb-1" style="width:100%;">
                                      View Client Profile
                                  </router-link>

                                  <button v-if="userRole == 'Freelancer' &&  hasApplied(job._id)" @click="unapply(job._id)" class="btn btn-outline-primary btn-sm" style="width:100%;">Unapply</button>
                                <button v-if="userRole == 'Freelancer' &&  !hasApplied(job._id)" @click="applyJobPost(job._id)" class="btn btn-primary btn-sm" style="width:100%;">Apply</button>
                  </div>
                </div>

              </div>
            </div>
        </div>
      </div>

                  

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
        <div class="d-flex justify-content-between align-items-center px-3">
          <h1 class="my-5">Admin Dashboard</h1>

          <router-link :to="{name: 'ActivityLog'}"
                                  class="btn btn-sm btn-primary my-3">
                                        View Activity Log >> 
          </router-link>
        </div>

            <div class="card-body">
                <div class="row gy-5">
                    <div class="col-md-4">
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

                    <div class="col-md-4">
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

                    <div class="col-md-4">
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

                    <div class="col-md-4">
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

                    <div class="col-md-4">
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

                    <div class="col-md-4">
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
      ]
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
  },

  formatDate(dateString){
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear().toString().substr(-2);

      return `${day}/${month}/${year}`;
    },

    daysLeft(dateString) {
        const deadline = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(deadline - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 1) {
          return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
        } 

    },


}
}


</script>

<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- edit here -->
            <h1>Edit City</h1>
            <form @submit.prevent="handleUpdateForm">
              <div class="form-group">
                    <label for="city">City Name: </label>
                    <input type="text" class="form-control" v-model="city.city" required>
                </div>
  
                <div class="form-group mt-3">
                    <button class="btn btn-success btn-block w-100" type="submit">Edit</button>
                </div>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
        return {
            city: {}
        }
    },
    created() {
        let apiURL = `http://localhost:4000/api/edit-city/${this.$route.params.id}`;
        axios.get(apiURL).then((res) => {
            this.city = res.data
        })
    
    },
    methods: {
        handleUpdateForm() {
            let apiURL = `http://localhost:4000/api/update-city/${this.$route.params.id}`;
  
            axios.put(apiURL, this.city).then(() => {
                var activity = {
                    activityDescription: "City '" + this.city.city + "' was edited",
                    activityDate: new Date(),
                    userId: localStorage.getItem('userId')
            }

            let activityURL = 'http://localhost:4000/api/create-activity';
            axios.post(activityURL, activity).then(() => {
                console.log(activity)
            })

            this.$router.push('/cities')

            }).catch(error => {
                console.log(error)
            })
        }
    }
  }
  </script>
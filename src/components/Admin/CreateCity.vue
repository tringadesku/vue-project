<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            
            <h1>Create City</h1>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label for="city">City Name: </label>
                    <input type="text" class="form-control" v-model="city.city" required>
                </div>
                <div class="form-group mt-3">
                    <button class="btn btn-success btn-block w-100" type="submit">Create</button>
                </div>
            </form>
        </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
        return {
            city: {
                city: '',
            }
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:4000/api/create-city';
  
            axios.post(apiURL, this.city).then(() => {
                var activity = {
                    activityDescription: "City '" + this.city.city + "' was created",
                    activityDate: new Date(),
                    userId: localStorage.getItem('userId')
            }

            let activityURL = 'http://localhost:4000/api/create-activity';
            axios.post(activityURL, activity).then(() => {
                console.log(activity)
            })

            this.$router.push('/cities');
            
            }).catch(error => {
                console.log(error);
            })
        }
    }
  }
  </script>
<template>
    <div class="justify-content-center">
        <!-- Display jobpost list -->
        <h1>Cities</h1>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                      <thead class="table-dark">
                            <tr>
                                <th>City</th>
                                <th>
                                  <router-link to="/createCity" class="btn btn-secondary px-3">Create City</router-link>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="c in Cities" :key="c._id">
                                <td>{{ c.city }}</td>
                                <td>
                                  <router-link :to="{name: 'EditCity', params: {id: c._id}}"
                                    class="btn btn-success me-2">
                                        Edit
                                    </router-link>
                                    <button @click.prevent="deleteCity(c._id, c.city)"
                                    class="btn btn-danger">
                                        Delete
                                    </button>
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
            Cities: []
        }
    },
    created() {
        let apiURL = 'http://localhost:4000/api/getCities';
        axios.get(apiURL).then(res => {
            this.Cities = res.data
        }).catch(error => {
            console.log(error)
        })
    },
    methods: {
        deleteCity(id, city) {
            var activity = {
                    activityDescription: "City '" + city + "' was deleted",
                    activityDate: new Date(),
                    userId: localStorage.getItem('userId')
            }

            let apiURL = `http://localhost:4000/api/delete-city/${id}`;
            let indexOfArrayItem = this.Cities.findIndex(i => i._id === id);
  
            if (window.confirm("Do you really want to delete?")) {
                axios.delete(apiURL).then(() => {
                    this.Cities.splice(indexOfArrayItem, 1)

                    let activityURL = 'http://localhost:4000/api/create-activity';
                    axios.post(activityURL, activity).then(() => {
                        console.log(activity)
                    })
                    
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }
  }
  </script>
<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <!-- Content goes here -->
            <h1>Create Category</h1>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label for="categoryName">Category Name: </label>
                    <input type="text" class="form-control" v-model="category.categoryName" required>
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
            category: {
                categoryName: '',
            }
        }
    },
    methods: {
        handleSubmitForm() {
            let apiURL = 'http://localhost:4000/api/create-category';
  
            axios.post(apiURL, this.category).then(() => {
              var activity = {
                      activityDescription: "Category '" + this.category.categoryName + "' was created",
                      activityDate: new Date(),
                      userId: localStorage.getItem('userId')
              }
  
              let activityURL = 'http://localhost:4000/api/create-activity';
              axios.post(activityURL, activity).then(() => {
                  console.log(activity)
              })
  
                this.$router.push('/categories');
            }).catch(error => {
                console.log(error);
            })
        },
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                evt.preventDefault();
            } else {
                return true;
            }
        }
    }
  }
  </script>
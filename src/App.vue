<template>
  <div>
      <!-- Nav bar  -->
      <nav class="navbar navbar-dark bg-primary justify-content-between flex-nowrap flex-row">
        <div class="container">
          <router-link to="/" class="navbar-brand float-left">JobMatch</router-link>
          <ul class="nav navbar-nav flex-row float-right">
            <li v-if="!user" class="nav-item">
              <router-link to="/signup" class="nav-link px-3">Sign Up</router-link>
            </li>
            <li v-if="!user" class="nav-item">
              <router-link to="/login" class="nav-link px-3">Log In</router-link>
            </li>
            <li v-if="user" class="nav-item">
              <router-link to="/" class="nav-link px-3">Home</router-link>
            </li>
            <li v-if="user" class="nav-item">
              <router-link to="/jobposts" class="nav-link px-3">JobPosts</router-link>
            </li>
            <li v-if="user && userRole == 'Client'" class="nav-item">
              <router-link to="/freelancers"  class="nav-link px-3">Freelancers</router-link>
            </li>
            <li v-if="user && userRole == 'Freelancer'" class="nav-item">
              <router-link to="/clients" class="nav-link px-3">Clients</router-link>
            </li>
            <li v-if="user" class="nav-item">
              <span class="nav-link active px-3">{{ user.email }} </span>
            </li>
            <li v-if="user && userRole == 'Client'" class="nav-item">
              <router-link to="/clientProfile" class="btn btn-light px-3 mx-3">Client Profile</router-link>
            </li>
            <li v-if="user && userRole == 'Freelancer'" class="nav-item">
              <router-link to="/freelancerProfile" class="btn btn-light px-3 mx-3">Freelancer Profile</router-link>
            </li>
            <li v-if="user" class="nav-item">
              <button class="btn btn-danger px-3" @click="handleClick">Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      
    <!-- Router view -->
    <div class="container mt-5">
      <router-view>
        
      </router-view>
    </div>
  </div>

</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  data(){
    return{
      userRole: localStorage.getItem('userRole')
    }
  },
  setup() {
    const store = useStore()

    const handleClick = () => {
      store.dispatch('logout')
    }

    return {
      handleClick,
      user: computed(() => store.state.user),
      authIsReady: computed(() => store.state.authIsReady)
    }
  }
}
</script>
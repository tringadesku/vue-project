<template>
  <section style="margin-top:150px;margin-bottom:150px;">
    <div class="px-4 py-5 px-md-5 text-center text-lg-start" style="background-color: hsl(0, 0%, 96%)">
      <div class="container">
        <div class="row gx-lg-5 align-items-center">
          <div class="col-lg-6 mb-5 mb-lg-0">
            <h1 class="my-5 display-3 fw-bold ls-tight">
                        Login to <br />
                        <span class="text-primary">JobMatch</span>
                    </h1>
                    <p style="color: hsl(217, 10%, 50.8%)">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                        quibusdam tempora at cupiditate quis eum maiores libero
                        veritatis? Dicta facilis sint aliquid ipsum atque?
                    </p>
          </div>

          <div class="col-lg-6 mb-5 mb-lg-0">
                    <div class="card">
                        <div class="card-body py-5 px-md-5">
                          <form @submit.prevent="handleSubmit">
                                    <div class="row">
                                      <div class="col-md-6 mb-4">
                                        <div class="form-outline">
                                          <label for="email" class="form-label">Email:</label>
                                          <input type="email" class="form-control" name="email" v-model="email" required>
                                        </div>
                                      </div>

                                      <div class="col-md-6 mb-4">
                                        <div class="form-outline">
                                          <label for="email" class="form-label">Password:</label>
                                          <input type="password" class="form-control" name="password" v-model="password" required>
                                        </div>
                                      </div>
                                    </div>

                                    <button class="btn btn-primary btn-block mb-4">Login</button>
                                    <div v-if="error" class="text-danger">{{ error }}</div>
                                    <div class="form-outline mb-4">
                                      New to our site? <a href="/signup">Register</a>
                                  </div>
                          </form>
                        </div>
                    </div>
                </div>
          


        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }

    return { handleSubmit, email, password, error }
  }
}
</script>
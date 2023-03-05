<template>
<h1>Homeee</h1>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {

    const store = useStore()

    return { 
      user: computed(() => store.state.user)
    }
  }
}
</script>

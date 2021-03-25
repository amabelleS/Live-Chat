<template>
  <form @submit.prevent="handelSubmit">
      <input type="email" required placeholder="EMAIL" v-model="email">
      <input type="password" required placeholder="PASSWORD" v-model="password">
      <div class="error">{{error}}</div>
      <button>Log in</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from "../composables/useLogin";

export default {
    setup(props, context) {
        // refs
        const email = ref('')
        const password = ref('')

        const {error, login} = useLogin()

        const handelSubmit = async () => {
            await login(email.value, password.value)

            if (!error.value) {
                context.emit('login')
            }
        }

        return {email, password, handelSubmit, error}
    }
}
</script>

<style>

</style>
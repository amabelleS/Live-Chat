<template>
  <form >
      <textarea 
      placeholder="Type in message and hit enter to send..."
      v-model="message"
      @keypress.enter.prevent="handelSubmit"
      ></textarea>
      <div class="error">{{error}}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import useCollection from '../composables/useCollection'
import { timestamp } from '../firebase/config'

export default {
    setup() {
      const {user} = getUser()
      const {error, addDoc} = useCollection('messages')

      // refs
      const message = ref('')

      const handelSubmit = async () => {
          const chat = {
            name: user.value.displayName,
            message: message.value,
            createdAt: timestamp()
          }

          await addDoc(chat)
          if (!error.value) {
               message.value = ''
          }
         
      }

      return {handelSubmit, message, error}
    }
}
</script>

<style scoped>
  form {
    margin: 10px;
  }
 textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
    background: #FFE7FF;
    font-size: 1.2rem;
  }
</style>
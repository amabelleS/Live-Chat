<template>
  <div class="chat-window">
      <div v-if="error">{{error}}</div>
      <div v-if="documents" class="messages" ref="messages">
          <div v-for="doc in formatedDocuments" :key="doc.id" class="single">
              <span class="created-at">{{doc.createdAt}}</span>
              <span class="name">{{doc.name}}</span>
              <span class="message">{{doc.message}}</span>
          </div>
      </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from 'vue';

export default {
    setup() {
        const {error, documents} = getCollection('messages')

        const formatedDocuments = computed(() => {
            if (documents.value) {
                return documents.value.map(doc => {
                    let time = formatDistanceToNow(doc.createdAt.toDate())
                    return {...doc, createdAt: time}
                })
            }
        })

        // auto-scroll to buttom of messages
        const messages = ref(null) 

        onUpdated(() => {
            messages.value.scrollTop = messages.value.scrollHeight
        })

        return {error, documents, formatedDocuments, messages}
    }
}
</script>

<style scoped>
      .chat-window {
    /* background: #5FFBF1; */
    background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);
    /* background: url('../assets/spiral2.jpg');
    background-repeat: no-repeat;
    background-size: auto; */
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #245161;
    font-size: 0.8rem;
    margin-bottom: 4px;
  }
  .name {
    color: #5f34a3;
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    color: #051937;
    max-height: 400px;
    overflow: auto;
  }
</style>
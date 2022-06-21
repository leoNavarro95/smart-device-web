<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useGpio from '../stores/gpio.js'

import { getCurrentInstance } from "vue"
const { proxy } = getCurrentInstance()

defineProps({
  msg: String
})

const count = ref(0)

const gpio = useGpio()

const {pin, status} = storeToRefs(gpio)

const sendGPIO = () => {
   gpio.status = !gpio.status 
   console.log(pin.value + ': ' + status.value);

      let data = {
        command: "setGPIO",
        id: pin.value,
        status: status.value
      }

      let json = JSON.stringify(data)
      proxy.$socket.send(json)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="p-5">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click=sendGPIO>{{pin}} status is: {{ status }} </button>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="count++" >count is: {{ count }}</button>
  </div>
</template>


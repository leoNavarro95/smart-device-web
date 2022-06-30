<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getCurrentInstance } from "vue"

import Card from '../components/Card.vue'
import DigitalStatus from '../components/DigitalStatus.vue'

import useGpioStore from '../stores/gpio.js'

const { proxy } = getCurrentInstance()

defineProps({
  msg: String
})

const count = ref(0)

const gpio = useGpioStore()

const {digitalOutput, digitalInput} = storeToRefs(gpio)

const sendGPIO = ( outPin ) => {
   outPin.status = !outPin.status 
   console.log(outPin.pin.value + ': ' + outPin.status.value);

      let data = {
        command: "setGPIO",
        id: outPin.pin.value,
        status: outPin.status.value
      }

      let json = JSON.stringify(data)
      proxy.$socket.send(json)
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <div class="p-5">    
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="count++" >count is: {{ count }}</button>
  </div>

  <div class="grid grid-cols-2 md:grid-cols-3 justify-center items-center">
    
    <card header="Outputs   +">
      
      <div v-for="output in digitalOutput" >
        <digital-status @change-status="sendGPIO(output)" type="Output" :pin="output.pin" :status="output.status"></digital-status>
      </div>

    </card>
    
    <card header="PWM State">
      <p>Multiples slots</p>
      <button class="bg-pink-500 hover:bg-pink-700 active:bg-pink-300 text-white py-2 px-4 rounded">Press me</button>
    </card>
    
    <card header="Analog Reading">
      Body here
      <template #footer>
        Footer content  
      </template>
    </card>
  </div>

  
</template>


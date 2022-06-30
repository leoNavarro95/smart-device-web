<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import Card from '../components/Card.vue'
import DigitalStatus from '../components/DigitalStatus.vue'

import useMCUStore from '../stores/mcu.js'

defineProps({
  msg: String
})

const mcu = useMCUStore()
const {digitalOutput, digitalInput} = storeToRefs(mcu)

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="grid grid-cols-2 md:grid-cols-3 justify-center items-center">
    
    <card header="Outputs   +">
      <div v-for="output in digitalOutput" >
        <digital-status @change-status="mcu.changePinStatus(output)" type="Output" :pin="output.pin" :status="output.status"></digital-status>
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


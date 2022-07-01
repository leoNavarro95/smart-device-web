<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import Card from '../components/Card.vue'
import DigitalStatus from '../components/DigitalStatus.vue'
import Modal from '../components/Modal.vue'
import DropDownMenu from '../components/DropDownMenu.vue'

import useMCUStore from '../stores/mcu.js'

defineProps({
  msg: String
})

const modalNewOutput = {type: 'AddOutput', title:'Add new output'}
const modalNewInput = {type: 'AddInput', title:'Add new input'}
const modalNewPWM = {type: 'AddPWM', title:'Add new PWM output'}

const mcu = useMCUStore()
const {digitalOutput, digitalInput} = storeToRefs(mcu)

const isOpen = ref(false) // modal show status
const modalData = ref({type:"", title: ""})

const openModal = ( newModalData ) =>{
  modalData.value = {...newModalData}

  isOpen.value = true
}

</script>

<template>
  <!-- MODAL for add new Items -->
  <Modal 
      @close="isOpen=false"
      :is-open="isOpen" 
      :title="modalData.title"
      >
      <!-- AddOutput type -->
      <div v-if="modalData.type == 'AddOutput'">
        <DropDownMenu></DropDownMenu>        
      </div>
      <!-- /AddOutput type -->

      <!-- AddInput type -->
      <div v-if="modalData.type == 'AddInput'">
        AddModal Slot here!!!  input
      </div>
      <!-- /AddInput type -->

      <!-- AddPWM type -->
      <div v-if="modalData.type == 'AddPWM'">
        AddModal Slot here!!!  pwm
      </div>
      <!-- /AddPWM type -->

      </Modal>

  <h1>{{ msg }}</h1>

  <div class="grid grid-cols-1 md:grid-cols-3 justify-center items-start">
    
    <card header="Outputs" @add-new-item="openModal(modalNewOutput)">
      <div v-for="output in digitalOutput" >
        <digital-status @change-status="mcu.changePinStatus(output)" type="Output" :pin="output.pin" :status="output.status"></digital-status>
      </div>
    </card>
    
    <card header="Inputs" @add-new-item="openModal(modalNewInput)">
      <p>Multiples slots</p>
      <button class="bg-pink-500 hover:bg-pink-700 active:bg-pink-300 text-white py-2 px-4 rounded">Press me</button>
    </card>
    
    <card header="PWM" @add-new-item="openModal(modalNewPWM)">
      Body here
      <template #footer>
        Footer content  
      </template>
    </card>
  </div>

  
</template>


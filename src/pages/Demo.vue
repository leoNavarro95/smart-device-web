<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getCurrentInstance } from "vue"

import Card from '../components/Card.vue'
import DigitalStatus from '../components/DigitalStatus.vue'
import Modal from '../components/Modal.vue'
import DropDownMenu from '../components/DropDownMenu.vue'

import MCUStore from '../stores/mcu.js'
import { groupBy, getNotUsedGpios } from '../utils/mcu_data_structure'

defineProps({
  msg: String
})

const { proxy } = getCurrentInstance()

const isOpen = ref(false) // modal show status
const modalData = ref({type:"", title: "", dropDownTitle: ""})
const selectedGpioNumber = ref("")

const mcu = MCUStore()

const usedGpiosByMode = ref(Array)
const availablesGpios =  ref(Array)

const refreshGpios = () => {
  usedGpiosByMode.value =  groupBy( mcu.used_gpios, 'mode' )
  availablesGpios.value =  getNotUsedGpios(mcu.gpios)

  console.log(mcu.gpios);
}

refreshGpios()

// TODO filter by modes for each gpio (i.e not all can be analog, or PWM, or Capacitive...)

const openModal = ( newModalData ) =>{
  selectedGpioNumber.value = "" 
  modalData.value = {...newModalData}

  isOpen.value = true
}

const addNewGpio = () => {
  mcu.addNewGPIO(selectedGpioNumber.value, modalData.value.type)
  refreshGpios()
  isOpen.value = false
}

const deleteItem = (type) =>{
    switch (type) {
      case 'Output':
        
        break;
    
      default:
        break;
    }
}


const sendGPIO = () => {
  // console.log(this.gpio.text + ': ' + this.gpio.status);
  console.log("sendGPIO executed");
  
  let data = {
    command: "setGPIO",
    id: 0,
    status: false
  }

  let json = JSON.stringify(data);
  proxy.$socket.send(json)
}

</script>

<template>
  <!-- MODAL for add new Items -->
  <Modal 
      @add="addNewGpio()" 
      @close="isOpen=false"
      :is-open="isOpen" :title="modalData.title"
      >
      <div class="flex justify-start items-center">
        <DropDownMenu 
          @changed-opt="(opt) => selectedGpioNumber = opt"
          :title="modalData.dropDownTitle" 
          :items="availablesGpios.map((gpio) => gpio.pin_number.toString())"
        >
        </DropDownMenu>
      </div>
  </Modal>

  <h1>{{ msg }}</h1>

  <div class="grid grid-cols-1 md:grid-cols-3 justify-center items-start">
    
    <card header="Outputs" @add-new-item="openModal({type: 'OUTPUT', title:'Add new output', dropDownTitle: 'Select new output pin'})">
      <div v-for="output in usedGpiosByMode['OUTPUT']" >
        <digital-status 
            @change-status="mcu.changePinStatus(output)"
            @delete-item="deleteItem" 
            type="OUTPUT" 
            :pin="output.pin_number.toString()" 
            :status="output.value === 'HIGH' ? true : false"
        >
        </digital-status>
      </div>
    </card>
    
    <card header="Inputs" @add-new-item="openModal({type: 'INPUT', title:'Add new input', dropDownTitle: 'Select new input pin'})">
    <div v-for="input in usedGpiosByMode['INPUT']" >
      <digital-status 
            @delete-item="deleteItem" 
            type="INPUT" 
            :pin="input.pin_number.toString()" 
            :status="input.value === 'HIGH' ? true : false"
        >
      </digital-status>
    </div>
    </card>
    
    <card header="PWM" @add-new-item="openModal({type: 'PWM', title:'Add new PWM output', dropDownTitle: 'Select new PWM pin'})">
      Body here
      <button @click="sendGPIO"
          class="bg-pink-500 hover:bg-pink-700 active:bg-pink-300 text-white py-2 px-4 rounded">
          Press me
      </button>
      <template #footer>
        Footer content  
      </template>
    </card>
  </div>

  
</template>


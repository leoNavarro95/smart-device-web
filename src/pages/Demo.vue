<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { getCurrentInstance } from "vue"

import Card from '../components/Card.vue'
import DigitalStatus from '../components/DigitalStatus.vue'
import Modal from '../components/Modal.vue'
import DropDownMenu from '../components/DropDownMenu.vue'

import MCUStore from '../stores/mcu.js'
import { groupBy } from '../utils/mcu_data_structure'

defineProps({
  msg: String
})

const { proxy } = getCurrentInstance()

const isOpen = ref(false) // modal show status
const modalData = ref({type:"", title: "", dropDownTitle: ""})
const selectedOpt = ref("")

const mcu = MCUStore()


const openModal = ( newModalData ) =>{
  selectedOpt.value = "" 
  modalData.value = {...newModalData}

  isOpen.value = true
}

const addNewPin = () => {

  // FIXME no es necesario diferenciar cuando se van a adicionar salidas, entradas o lo que sea. Para eso se usa el campo 'mode' de 'used_gpios' en la base de datos
  switch (modalData.value.type) {
    case 'AddOutput':
      mcu.addNewOutput(selectedOpt.value)
      isOpen.value = false
      break
  
    default:
      console.error("Modal Data type incorrect")
      console.log(modalData.value.type)
      break
  }
}

const deleteItem = (type) =>{
    switch (type) {
      case 'Output':
        
        break;
    
      default:
        break;
    }
}

// grouping used gpios by mode
let usedGpiosByMode =  groupBy( mcu.used_gpios, 'mode' )
console.log(usedGpiosByMode)

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
      @add="addNewPin()" @close="isOpen=false"
      :is-open="isOpen" :title="modalData.title"
      >
      <div class="flex justify-start items-center">
        <DropDownMenu :title="modalData.dropDownTitle" @changed-opt="(opt) => selectedOpt = opt" :items="['D1','D2', 'D3']"></DropDownMenu>
        <div v-if="selectedOpt">{{selectedOpt}}</div>
      </div>
  </Modal>

  <h1>{{ msg }}</h1>

  <div class="grid grid-cols-1 md:grid-cols-3 justify-center items-start">
    
    <card header="Outputs" @add-new-item="openModal({type: 'AddOutput', title:'Add new output', dropDownTitle: 'Select new output pin'})">
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
    
    <card header="Inputs" @add-new-item="openModal({type: 'AddInput', title:'Add new input', dropDownTitle: 'Select new input pin'})">
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
    
    <card header="PWM" @add-new-item="openModal({type: 'AddPWM', title:'Add new PWM output', dropDownTitle: 'Select new PWM pin'})">
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


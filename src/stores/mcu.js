import { defineStore } from 'pinia'
import main from '../main'

const useMCUStore = defineStore('mcu', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      digitalOutput:[
        {pin: "D25", status: false},
        {pin: "D2", status: true},
      ],
      digitalInput:[
        {pin: "D0", status: true},
        {pin: "D15", status: false},
      ],
    }
  },
  actions: {
    changePinStatus: ( outPin ) => {
      outPin.status = !outPin.status 
      console.log(outPin.pin + ': ' + outPin.status);
   
         let data = {
           command: "setGPIO",
           id: outPin.pin.value,
           status: outPin.status.value
         }
   
         let json = JSON.stringify(data)
         main.config.globalProperties.$socket.send(json)
         
   }
  }
})

export default useMCUStore
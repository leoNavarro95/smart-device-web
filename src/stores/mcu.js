import { defineStore } from 'pinia'
import main from '../main'

import { Convert } from '../utils/parse_data'
import data from '../assets/database/esp_soc.json'  //this is a mock json just for testing, the real one come from the device when needed

const espSoc = Convert.toEspSoc(data)

const MCUStore = defineStore('mcu', {
  // arrow function recommended for full type inference
  state: () => ({
    ap_pass:         espSoc.ap_pass,
    ap_ssid:         espSoc.ap_ssid,
    connection_mode: espSoc.connection_mode,
    sta_pass:        espSoc.sta_pass,
    sta_ssid:        espSoc.sta_ssid,
    mac:             espSoc.mac,
    
    ip_config:       espSoc.ip_config,
    used_gpios:      espSoc.used_gpios,
    gpios:           espSoc.gpios,


    
    
    digitalOutput:[
      {pin: "D25", status: false},
      {pin: "D2", status: true},
    ],
    digitalInput:[
      {pin: "D0", status: true},
      {pin: "D15", status: false},
    ],
   
  }),
  
  actions: {
    // this is just for OUTPUT gpio mode
    changePinStatus( gpio ) {
      if(gpio.mode !== 'OUTPUT') return

      gpio.value === 'HIGH' ? gpio.value = 'LOW' : gpio.value = 'HIGH'
      console.log(gpio.pin_number + ': ' + gpio.value);
      
      this.used_gpios[gpio.id].value.value = gpio.value // updated the store

   /* FIXME ojo para enviar datos por websocket
      let data = {
        command: "setGPIO",
        id: gpio.pin.value,
        status: gpio.status.value
      }

      let json = JSON.stringify(data)
      main.config.globalProperties.$socket.send(json)
   */
   },

   addNewOutput( newOutputPin ) {
    // TODO: Send to MCU backend new updated state with new output pin
    this.digitalOutput.push({pin: newOutputPin, status: false})
   },

   addNewGPIO(){
    
   }
  }
})

export default MCUStore
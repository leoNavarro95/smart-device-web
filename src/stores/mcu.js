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
   
  }),
  
  actions: {
    // this is just for OUTPUT gpio mode
    changePinStatus( gpio ) {
      if(gpio.mode !== 'OUTPUT') return

      gpio.value === 'HIGH' ? gpio.value = 'LOW' : gpio.value = 'HIGH' // toggle the HIGH/LOW state
      this.used_gpios[gpio.id].value = gpio.value // updated the store

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
    
    addNewGPIO( newGpio ){
      this.gpios[Number(newGpio.pin_number)] = {...this.gpios[Number(newGpio.pin_number)], used: true} //update to used the state
      const id = this.used_gpios.length
      this.used_gpios.push({ ...newGpio, id })
      // TODO: Send to MCU backend new updated state

   },

   removeGPIO( gpio ){
    this.gpios[Number(gpio.pin_number)] = {...this.gpios[Number(gpio.pin_number)], used: false} //update the state 

    const removed = this.used_gpios.splice( gpio.id, 1 )
    
    if(gpio.id < this.used_gpios.length)  //need to update ids to be equal to array index
      for( let index = gpio.id; index < this.used_gpios.length; index++){
        this.used_gpios[index].id--
      }
   }

  }
})

export default MCUStore
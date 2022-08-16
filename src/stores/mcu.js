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

      gpio.value === 'HIGH' ? gpio.value = 'LOW' : gpio.value = 'HIGH'
      this.used_gpios[gpio.id - 1].value = gpio.value // updated the store

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
    
    addNewGPIO( pin_number, mode ){
      this.gpios[Number(pin_number)] = {...this.gpios[Number(pin_number)], used: true} //update to used the state
      const id = this.used_gpios.length
      this.used_gpios.push({
        id, 
        pin_number: Number(pin_number),
        mode,
        label: "", //TODO: Add label field in Modal
        value: "" // NOT allways it is going to be digital, i.e can be a sensor with numeric value
      })
      // TODO: Send to MCU backend new updated state

   }
  }
})

export default MCUStore
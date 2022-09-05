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
   },

   /**
    * 
    * @param {'STA'|'AP'} mode the wifi's connection mode
    */
   setConnectionMode(mode){
    this.connection_mode = mode
   },

   /**
    * @description Set the principal wifi settings
    * @param {String} mode the wifi connection mode can be 'STA' or 'AP'
    * @param {String} ssid from 3 to 31 chars
    * @param {String} pass from 0 (only available in STA, without password) to 32 chars 
    */
   setWifiSettings( mode, ssid, pass ){
    this.setConnectionMode(mode)
    if(mode == 'STA'){
      this.sta_ssid = ssid
      this.sta_pass = pass
    } else {
      this.ap_ssid = ssid
      this.ap_pass = pass
    }
   }

  },

  getters: {
    /**
     *  
     * @returns {String} Return the SSID depending on the connection_mode selected
     */
    wifi_ssid: (state) => state.connection_mode == "STA" ? state.sta_ssid : state.ap_ssid,

    wifi_pass: (state) => state.connection_mode == "STA" ? state.sta_pass : state.ap_pass
  }
})

export default MCUStore
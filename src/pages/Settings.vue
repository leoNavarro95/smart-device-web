
<script setup>
import { ref, computed } from 'vue'

import BoxContainer from '../components/BoxContainer.vue'
import MyInput from '../components/Input.vue'
import Selectable from '../components/Selectable.vue'

import MCUStore from '../stores/mcu.js'
const mcu = MCUStore()


const wifi_mode_index = computed(() => mcu.connection_mode == 'STA' ? 1 : 0)

var ssid = ref(mcu.wifi_ssid)
const setSsid = (newSsid) => ssid.value = newSsid

var pass = ref(mcu.wifi_pass)
const setPass = (newPass) => pass.value = newPass

var wifimode = mcu.connection_mode
const setWifiMode = (mode) => {
  wifimode = mode
  mcu.setConnectionMode(mode)
  ssid.value = mcu.wifi_ssid
}

const saveWifiSetting = () => mcu.setWifiSettings(wifimode, ssid.value, pass.value)

</script>

<template>
  <div class="
            grid grid-cols-1 md:grid-cols-2 justify-center items-start
            bg-indigo-100 
            p-2
            ">
    <box-container title="Wifi">
      <div class="flex justify-center items-center flex-col">

        <my-input 
          @edited="(text) => setSsid(text)"
          id="w-ssid" 
          label="Wifi SSID" placeholder="SSID"
          :value="ssid" :minlength="3" :maxlength="32"
        />
        
        <my-input 
          @edited="(text) => setPass(text)"
          id="w-pass" 
          label="Wifi Password" placeholder="Password" type="password"
          :value="mcu.wifi_pass" :minlength="3" :maxlength="32" 
        />
 
        <selectable 
          @selected="(mode) => setWifiMode(mode)"
          selector-type="radio"
          title="Select wifi mode:"
          name="wifiMode"
          :options="['AP', 'STA']" :selected_index="wifi_mode_index"
        />

        <button @click="saveWifiSetting"
          class="max-w-xl px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded active:bg-blue-300 disabled:bg-zinc-500"
        >
          Save
        </button>

      </div>

    </box-container>
    <box-container title="Microcontroller">
      <ul>
        <li>Temperature</li>
        <li>RAM</li>
        <li>CPU</li>
        <li>MAC</li>
        <li>Wifi signal strengh</li>
      </ul>
    </box-container>
  </div>
</template>
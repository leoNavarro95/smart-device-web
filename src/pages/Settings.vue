
<script setup>
import BoxContainer from '../components/BoxContainer.vue'
import MyInput from '../components/Input.vue'
import Selectable from '../components/Selectable.vue'

const selectedWifiMode = (mode) => {
  console.log(mode);
}

</script>

<template>
  <div class="
            grid grid-cols-1 md:grid-cols-2 justify-center items-start
            bg-indigo-100 
            p-2
            ">
    <box-container title="Wifi">
      <div class="flex justify-center items-center flex-col">

        <my-input id="wifi" label="Wifi SSID" placeholder="SSID" :minlength="3" :maxlength="32" />
        <my-input id="wpass" label="Wifi Password" placeholder="Password" type="password" :minlength="3" :maxlength="32" />
 
        <selectable @selected="(mode) => selectedWifiMode(mode)"
                    title="Select wifi mode:"
                    name="wifiMode"
                    :options="['SoftAp', 'Station']"/>

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
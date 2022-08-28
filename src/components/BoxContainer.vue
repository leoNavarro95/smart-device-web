<script setup>
import { ref } from 'vue'

defineProps({
  title: { type: String, default: "Empty title" }
})

let show = ref(true)

</script>


<template>
  <div class="bg-white m-3 p-0 border border-indigo-400 rounded-lg transition duration-300 ease-in-out">
    <div class="
          flex justify-between items-start
        bg-indigo-400 
          rounded-t-md 
          text-xl font-semibold font-mono text-white
          px-2 
          "
          :class="{'rounded-md': !show}"
    >
      <div>{{ title }}</div>

      <!-- TODO Collapse button here -->
      <button @click="show = !show" 
              class="
                m-0 p-0 
                rounded-full hover:bg-indigo-300
                text-md font-normal hover:text-gray-500
              ">^
      </button>
    </div>

    <div v-show="show" class="p-1 md:p-5 text-gray-700">
      <!-- BODY: Default slot -->
        <slot></slot>
      <!-- /BODY -->

      <!-- FOOTER: Footer slot -->
      <div class="
          bg-indigo-200
            rounded-b-lg
          text-white
            px-2
          ">
        <slot name="footer">

        </slot>
      </div>
      <!-- /FOOTER -->
    </div>

  </div>
</template>
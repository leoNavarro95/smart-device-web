<script setup>

defineProps({
  type: {
    type: String,
    validator(value) {
      return ['Input', 'Output', 'PWM'].includes(value) // Must match: "Input", "Output" or "PWM"
    }
  }, 
  pin: String,
  status: Boolean
})

</script>


<template>
    <!-- if type is OUTPUT -->
    <div v-if="type == 'Output'"
        class="
            m-1 p-1
            grid grid-cols-2 justify-center items-center
            bg-slate-200
            border rounded-md border-slate-400
            "
    >
        <div > {{ pin }}</div> 

        <button @click="$emit('changeStatus')"
            class="bg-slate-600 hover:bg-slate-500 active:bg-slate-300
                    border border-slate-300 rounded-md
                    flex justify-center items-center
                    p-1"
            :class="status? 'text-green-600':'text-red-600'"
        > {{ status? 'ON' : 'OFF' }}</button> 

    </div>
    <!-- /type OUTPUT -->

</template>
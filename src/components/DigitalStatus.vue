<script setup>

defineProps({
  type: {
    type: String,
    validator(value) {
      return ['INPUT', 'OUTPUT', 'PWM'].includes(value) // Must match: "INPUT", "OUTPUT" or "PWM"
    }
  }, 
  label: String,
  gpio: Number,
  status: Boolean
})

</script>


<template>
    <div class="
              m-1 p-1
              flex flex-row justify-center items-center
              bg-slate-200
              border rounded-md border-slate-400
              "
    >
      <div class="basis-2/3 pl-3 flex flex-row space-x-1 justify-start items-center">
        <p class="md:text-lg text-yellow-500 bg-blue-200 border rounded-md py-0 px-2"
        > {{ gpio }}</p> 
      <p class="md:text-lg text-gray-600"
      > {{ label }}</p> 
      </div>

      <div class="basis-2/5 md:basis-2/6 flex flex-row justify-end items-center"
      >

        <div v-if="type == 'OUTPUT'">
          <button @click="$emit('changeStatus')"
              class="bg-slate-600 hover:bg-slate-500 active:bg-slate-300
                      border border-slate-300 rounded-md
                      py-1 px-3"
              :class="status? 'text-green-600 bg-slate-400':'text-red-600'"
            > {{ status? 'ON' : 'OFF' }}
          
          </button> 
        </div>

        <div v-if="type == 'INPUT'">
            <!-- This is an input, so can't be editable -->
            <div
                class="bg-slate-600
                        border border-slate-300 rounded-md
                        py-1 px-3"
                :class="status? 'text-green-600 bg-slate-400':'text-red-600'"
            > {{ status? 'ON' : 'OFF' }}</div> 
        </div>
        
      </div>

      
  
      <!-- Delete button -->
      <button
          @click="$emit('deleteItem', type)"
          class=" basis-1/5 md:basis-1/6 
                  flex items-center justify-center 
                  p-2 rounded-md
                "
        >
          <svg 
            class="w-5 h-5 text-red-500 hover:text-red-400 active:text-red-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            ><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z M 8 9 L 10 9 L 10 20 L 8 20 L 8 9 z M 14 9 L 16 9 L 16 20 L 14 20 L 14 9 z">
            </path>
          </svg>
        </button>
      <!-- /Delete button -->
    </div>

</template>
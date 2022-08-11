<script setup>
    import { ref } from 'vue'

    const props = defineProps({
        items: { type: Array, required: true},
        title: { type: String, required: true},
    })

    const emit = defineEmits(['changedOpt'])

    // const { selectedOpt } = toRefs(props)
    let selectedOpt = ref(String)

    let show = ref(false)
    const toggleMenu = () => (show.value = !show.value)

    const onSelected = (opt) => {
        selectedOpt.value = opt
        emit('changedOpt', opt) //it is emitted new selected option, then the parent can get it 
        toggleMenu()
    }

    selectedOpt.value = props.title //just inicializate slectOpt with title value

</script>

<template>
  <div>
    <div class="relative">
      <!-- Dropdown toggle button -->
      <button
        @click="toggleMenu"
        class="flex items-center p-2 text-indigo-100 bg-indigo-600 rounded-md"
      >
        <span class="mr-4">{{selectedOpt}}</span>
        <svg
          class="w-5 h-5 text-indigo-100 dark:text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <!-- Dropdown menu -->
      <div
        v-show="show"
        class="absolute right-0 py-2 mt-2 bg-indigo-500 rounded-md shadow-xl  w-44"
      >
        <div @click="onSelected(item)" 
            v-for="(item, index) in items" :key="index" 
            class="block px-4 py-2 text-sm text-indigo-100  hover:bg-indigo-400 hover:text-indigo-100">
            {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

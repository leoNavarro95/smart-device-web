<script setup>

const props = defineProps({
  options: { type: Array, required: true },
  title: { type: String, required: true },
  name: { type: String, required: true},
  selected_index: { type: Number, required: false},
  selectorType: { 
    type: String,
    default: 'radio', 
    validator(value) {
      return ['radio', 'checkbox'].includes(value)
    }
  },
})

const emit = defineEmits(['selected'])

const onSelected = (option) => {
  emit('selected', option)
}

</script>

<template>
  <div class="rounded-lg border border-gray-100">
    
    <ul class="m-1 flex flex-row gap-2 justify-start items-center">
      <div class="mb-1 ml-1 text-lg text-gray-500">{{props.title}}</div>
      <li v-for="(option, index) in props.options" :key="index" class="relative">
        
        <input 
          @click="onSelected(option)" 
          class="sr-only peer" type="radio" 
          :value="option" :name="props.name" :id="props.name + 'choice' + index.toString()"
          :checked="selected_index == index"
        />

        <label
          class="p-0.5 transition duration-500 ease-in-out
            bg-white border border-gray-300 rounded-lg 
            cursor-pointer focus:outline-none 
            hover:bg-gray-50 peer-checked:ring-indigo-300 peer-checked:ring-2 peer-checked:border-transparent peer-checked:bg-indigo-50
          "
          :for="props.name + 'choice' + index.toString()">
            {{option}}
        </label>
      </li>
    </ul>
    
  </div>

</template>
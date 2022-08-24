<script setup>
import { ref } from 'vue';

const props = defineProps({
  placeholder: { type: String, required: true },
  label: { type: String, required: true },
  id: { type: String, required: true },
  type: { 
    type: String,
    default: 'text', 
    validator(value) {
      return ['text', 'password', 'checkbox'].includes(value) // Must match: "INPUT", "OUTPUT" or "PWM"
    }
  },
  minlength: { type: Number, default: 3},
  maxlength: { type: Number, default: 8}
})

const emit = defineEmits(['edited'])

let text = ref("")

const onEdited = (text) => {
  emit('edited', text)
}

</script>

<template>
    <div class="mb-3 xl:w-96">
      <label :for="props.id" class="text-gray-500">{{label}}</label>
      <input @focusout="onEdited(text)"
        :type="type" :id="props.id" required
        v-model="text"
        :placeholder="placeholder" :minlength="minlength" :maxlength="maxlength"
        class="
            block
            w-full m-0 px-3 py-1.5
            text-base font-normal text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300 rounded
            transition ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      >
    </div>
</template>
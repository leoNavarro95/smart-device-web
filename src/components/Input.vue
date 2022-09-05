<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  placeholder: { type: String, required: true },
  label: { type: String, required: true },
  id: { type: String, required: true },
  value: { type: String, required: false },
  type: { 
    type: String,
    default: 'text', 
    validator(value) {
      return ['text', 'password'].includes(value)
    }
  },
  minlength: { type: Number, default: 3},
  maxlength: { type: Number, default: 8}
})

const emit = defineEmits(['edited'])

let text = ref("")
props.value ? text = props.value : text = ""

const onEdited = (text) => {
  emit('edited', text)
}


// password type, show logic
let showpass = ref(false)
const toggleShowPass = () => {
  showpass.value = !showpass.value
}

const input_type = computed( ()=>{
  if(props.type == 'password') {
    if(showpass.value) return 'text'
    else return 'password'
  }
  return 'text'
})

</script>

<template>
    <div class="mb-3 xl:w-96 group">
      <label :for="props.id" class="text-gray-500">{{label}}</label>
      <div class="flex items-center justify-end">
        <input @focusout="onEdited(text)" @keyup.enter="onEdited(text)"
          :type="input_type" :id="props.id" required
          v-model="text" 
          :placeholder="placeholder" :minlength="minlength" :maxlength="maxlength"
          class="
              block 
              w-full m-0 pl-3 pr-7 py-1.5
              text-base font-normal text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300 rounded
              transition duration-500 ease-in-out
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        >

          <div class="absolute">
            <button v-if="type=='password'"
              :for="props.id"
              @click="toggleShowPass()"
              class="flex items-center justify-center p-2 rounded-md"
            >

            <div class="w-5 h-5 
                    text-gray-500 group-focus-within:text-blue-600 active:text-blue-700">

            <svg v-if="showpass"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"></path>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"></path>
              </svg>

              <svg v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <g> <path fill="none" d="M0 0h24v24H0z"/> 
                  <path d="M9.342 18.782l-1.931-.518.787-2.939a10.988 10.988 0 0 1-3.237-1.872l-2.153 2.154-1.415-1.415 2.154-2.153a10.957 10.957 0 0 1-2.371-5.07l1.968-.359C3.903 10.812 7.579 14 12 14c4.42 0 8.097-3.188 8.856-7.39l1.968.358a10.957 10.957 0 0 1-2.37 5.071l2.153 2.153-1.415 1.415-2.153-2.154a10.988 10.988 0 0 1-3.237 1.872l.787 2.94-1.931.517-.788-2.94a11.072 11.072 0 0 1-3.74 0l-.788 2.94z"/> 
                </g> 
              </svg>
            </div>



            </button>
          </div>

      </div>
    </div>
</template>
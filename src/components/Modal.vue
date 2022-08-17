<script setup>
    defineProps({
    isOpen: {type: Boolean, required: true},
    disabled: {type: Boolean, required: true},
    title: {type: String, default: "Title of modal"},
    })
</script>

<template>
      <div
        v-if="isOpen"
        class="
          absolute
          inset-0
          flex
          items-center
          justify-center
          bg-gray-700 bg-opacity-50
        "
      >
        <div class="max-w-2xl p-6 pt-2 bg-white rounded-md shadow-xl">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl">{{title}}</h3>
          </div>
          <div class="mt-4">
            <div class="mb-4 text-sm">
              <slot></slot>
            </div>
            <button
              @click="$emit('close')"
              class="px-6 py-2 text-blue-800 border border-blue-600 rounded active:bg-blue-600 active:text-white"
            >
              Cancel
            </button>
            <button @click="$emit('add')"
              :disabled="disabled"
              class="px-6 py-2 ml-2 text-blue-100 bg-blue-600 rounded active:bg-blue-300 disabled:bg-zinc-500"
              >
              Add
            </button>
          </div>
        </div>
      </div>
</template>
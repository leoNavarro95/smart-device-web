<script setup>

defineProps({
  title: String
})

</script>


<template>
    <div class="object-contain bg-white m-3 p-0 rounded-lg shadow-lg">
    <h2 class="
        bg-indigo-400 
          rounded-t-lg 
          text-2xl font-bold text-white
          mb-2 px-2 
          ">
          {{title}}
    </h2>
    <p class="text-gray-700">This is my cool new card!</p>
  </div>
</template>
<script setup>

defineProps({
  header: {type: String, default: "Empty header"}
})

</script>


<template>
    <div class="bg-white m-3 p-0 border border-indigo-400 rounded-lg">
    <div class="
          flex justify-between items-start
        bg-indigo-400 
          rounded-t-md 
          text-xl font-semibold font-mono text-white
          mb-2 px-2 
          ">
          <div>{{header}}</div>

          <button @click="$emit('addNewItem')" 
          class="
              m-0 p-0 
              rounded-full hover:bg-indigo-300
              text-md font-normal hover:text-gray-500
              ">+</button>
    </div>

    <!-- BODY: Default slot -->
    <div class="p-1 md:p-5 text-gray-700 ">
      <slot></slot>
    </div>
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
</template>
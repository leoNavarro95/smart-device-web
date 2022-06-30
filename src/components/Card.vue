<script setup>

defineProps({
  header: String
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
          {{header}}
    </h2>

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
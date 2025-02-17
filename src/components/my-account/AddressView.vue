<script setup lang="ts">
import EditIcon from "@/components/icons/EditIcon.vue";
</script>

<template>
  <div class="flex items-center justify-between gap-6 pt-7 pb-2 border-b border-dashed border-neutral-300">
    <p class="text-lg capitalize font-semibold">Address</p>
  </div>
  
  <div class="flex items-center justify-between gap-6 py-7">
    <div class="text-neutral-500">
      <p class="font-bold text-lg">John Doe</p>
      <br/>
      <p>1355 Market St, Suite 900</p>
      <p>San Francisco, CA 94103</p>
      <br/>
      <p>Mobile: (123) 456-7890</p>
      <br/>
      <button class="flex items-center gap-2 cursor-pointer">
        <span><EditIcon /></span>
        <span>Address</span>
      </button>
    </div>
  </div>
          
</template>
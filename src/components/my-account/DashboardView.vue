<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue"

defineProps<{
  isLoading: boolean,
  userNames: {
    firstName: string;
    lastName: string;
  },
}>();
</script>

<template>
  <div class="flex items-center justify-between gap-6 pt-7 pb-2 border-b border-dashed border-neutral-300">
    <p class="text-lg capitalize font-semibold">Dashboard</p>
  </div>
  
  <div class="flex items-center justify-between gap-6 py-7">
    <div v-if="isLoading" class="w-full py-6 flex items-center justify-center"><LoadingSpinner dynamicSize="size-8" /></div>
    
    <p v-else class="text-neutral-500">
      <span>Hello, <span class="font-semibold text-neutral-800">{{`${userNames.firstName} ${userNames.lastName}`}}</span> (If Not <span class="font-semibold text-neutral-800 capitalize">{{userNames.firstName}} !</span> Logout)</span>
      <span> from your account dashboard. you can easily check & view your recent orders, manage your shipping and billing addresses and edit your password and account details.</span>
    </p>
  </div>
          
</template>
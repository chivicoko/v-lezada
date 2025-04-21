<script setup lang="ts">
import EditIcon from "@/components/icons/EditIcon.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import type { UserProps } from '@/types';

defineProps<{
  userProfile: UserProps | null,
  isLoading: boolean
}>();
</script>

<template>
  <div class="flex items-center justify-between gap-6 pt-7 pb-2 border-b border-dashed border-neutral-300">
    <p class="text-lg capitalize font-semibold">Address</p>
  </div>
  
  <div class="flex items-center justify-between gap-6 py-7">
    <div v-if="isLoading" class="w-full py-6 flex items-center justify-center"><LoadingSpinner dynamicSize="size-8" /></div>
    
    <div v-else class="text-neutral-500">
      <p class="font-bold text-lg">{{`${userProfile?.name}` || 'John Doe'}}</p>
      <br/>
      <p>{{`${userProfile?.address}` || '1355 Market St, Suite 900'}}</p>
      <p>San Francisco, CA 94103</p>
      <br/>
      <p>Mobile: {{`${userProfile?.phone_number}` || '(123) 456-7890'}}</p>
      <br/>
      <button class="flex items-center gap-2 cursor-pointer">
        <span><EditIcon /></span>
        <span>Address</span>
      </button>
    </div>
  </div>
          
</template>
<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <div class="flex min-h-full flex-col items-center justify-center gap-4 px-5 md:p-24">
      <h2 class="text-center text-7xl mb-4">Oops!</h2>
      <h2 class="text-center text-7xl mb-4">Page not found!</h2>
      <span class="text-2xl text-neutral-500 uppercase">
        Please go back to the 
        <button @click="goBack" class="text-neutral-700 underline uppercase font-semibold py-2 px-4 rounded">
          previous page
        </button>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
  // Programmatically navigate to the previous page
  router.back();
}
</script>

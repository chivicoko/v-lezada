<script setup lang="ts">
import { RouterView } from 'vue-router'
import ScrollToTopButton from '@/components/buttons/ScrollToTopButton.vue';
</script>

<template>
  <div class="relative">  
    <ScrollToTopButton/>
  </div>
  <RouterView />
</template>
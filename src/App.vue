<script setup lang="ts">
import { RouterView } from 'vue-router'
import ScrollToTopButton from '@/components/buttons/ScrollToTopButton.vue';
import {defineProps} from "vue";

// const threshold = 85;

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="relative">    
    <ScrollToTopButton/>
  </div>
  <RouterView />
</template>
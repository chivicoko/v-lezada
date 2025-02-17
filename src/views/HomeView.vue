<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue"
import HeaderView from "@/components/HeaderView.vue"
import ProductsSection from "@/components/ProductsSection.vue"
import CTA from "@/components/CTA.vue"
</script>

<template>
  <AppLayout>
    <main class="w-full">
      <HeaderView/>
      <ProductsSection/>
      <CTA/>
    </main>
  </AppLayout>
</template>

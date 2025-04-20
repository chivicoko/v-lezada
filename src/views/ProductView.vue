<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue"
import HeaderView from "@/components/HeaderView.vue"
import CTA from "@/components/CTA.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'

const route = useRoute()
const productsStore = useProductsStore()

// This ensures selectedProduct remains reactive in the template
const { selectedProduct, isLoading } = storeToRefs(productsStore)
const { fetchProductById } = productsStore

onMounted(() => {
  const productId = parseInt(route.params.id as string)
  fetchProductById(productId)
})
</script>


<template>
  <AppLayout>
    <main class="w-full">
      <!-- <HeaderView /> -->
      
      <div v-if="selectedProduct !== null" class="p-4">
        <h2 class="text-xl font-bold">{{ selectedProduct.name }}</h2>
        <p class="text-gray-700">{{ selectedProduct.description }}</p>
        <p class="text-gray-700">{{ selectedProduct.price }}</p>
        <p class="text-gray-700">{{ selectedProduct.stock }}</p>
        <p class="text-gray-700">{{ selectedProduct.category }}</p>
        <p class="text-lg font-semibold mt-2">$ {{ selectedProduct.price }}</p>
        <img :src="selectedProduct.image" alt="product" class="w-64 mt-4" />
        <img :src="selectedProduct.hover_image" alt="product" class="w-64 mt-4" />
      </div>

      <!-- <div v-else class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div> -->
      <div v-if="isLoading" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>

      <CTA />
    </main>
  </AppLayout>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import LoadingSpinner from "@/components/LoadingSpinner.vue"

const route = useRoute()
const productsStore = useProductsStore()

const { selectedProduct, isLoading } = storeToRefs(productsStore)
const { fetchProductById } = productsStore

const dynamicSlug = ref(['']);
const pathName = route.path.slice(1, route.path.length).split('/').map(item => item.trim()).filter(item => item !== '');
const updatedPathName = pathName[0].split('-').map(item => item.trim()).filter(item => item !== '');

if (pathName[1]) {
    const updatedDynamicSlug = pathName[1].split('%20').map(item => item.trim()).filter(item => item !== ' ');
    dynamicSlug.value = updatedDynamicSlug;
}

onMounted(() => {
  const productId = parseInt(route.params.id as string)
  if (productId) fetchProductById(productId);
})
</script>

<template>
    <div class="relative h-[35vh] w-full bg-bottom-right bg-cover" style="background-image: url(../images/breadcrumb-bg-1.png);">
        <div class="w-full h-full absolute top-1/3 left-46">
            <h1 class="text-5xl pb-4 capitalize flex items-center gap-2">
                <span v-if="!selectedProduct">
                    <span v-for="(path, index) in updatedPathName" :key="index">{{path}} </span>
                </span>
                <span v-if="pathName[1]" class="capitalize flex items-center gap-2">
                    <span v-if="!selectedProduct">-</span>
                    <span v-for="(path, index) in dynamicSlug" :key="index" class="whitespace-wrap text-3xl">
                        <span v-if="isLoading"><LoadingSpinner /></span>
                        <span v-else>{{selectedProduct ? selectedProduct.name : path}}</span>
                    </span>
                </span>
            </h1>
            
            <div class="flex items-center gap-4 pt-4">
                <RouterLink to="/" class="text-neutral-500 hover:font-bold hover:underline">
                    Home
                </RouterLink>
                <span class="text-neutral-500">/</span>
                <RouterLink to="/shop" v-if="selectedProduct && route.path !== '/shop'" class="text-neutral-500 hover:font-bold hover:underline">
                    Shop
                </RouterLink>
                <span v-if="selectedProduct" class="text-neutral-500">/</span>
                <p class="capitalize flex items-center gap-2">
                    <span v-for="(path, index) in updatedPathName" :key="index">{{path}} </span>
                </p>
            </div>
        </div>
    </div>
</template>
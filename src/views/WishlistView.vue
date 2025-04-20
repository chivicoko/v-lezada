<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { onMounted, ref } from "vue";
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { useWishlistStore } from '@/stores/wishlist'
import type { Product } from '@/types'
import { initialProduct } from '@/data'
import { storeToRefs } from 'pinia'

const wishlistStore = useWishlistStore()

const { wishlist, isLoading } = storeToRefs(wishlistStore)
const { fetchWishlist, removeFromWishlist } = wishlistStore

const isOpen = ref(false);
const currentItem = ref<Product>(initialProduct);

const cancelDelete = () => {
  isOpen.value = false;
  // console.log(isOpen.value)
}

const openModal = (id: number) => {
  const item = wishlist.value.find((item) => item.id === id);
  if (item) {
    currentItem.value = item;
  }
  isOpen.value = true;
}

const handleDelete = (id: number) => {
  removeFromWishlist(id);
  isOpen.value = false;
}

onMounted(() => {
  fetchWishlist()
})

</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-24 px-42">
        <div v-if="isLoading" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>
        
        <div v-else-if="wishlist.length > 0" class="w-full h-full">
          <div class="w-full h-full border border-neutral-300 divide-y-2 divide-neutral-300">
            <div class="flex items-center justify-between gap-6 py-4 px-6">
              <p class="text-lg uppercase">Product</p>
              <p class="text-lg uppercase">Price</p>
              <p class="text-lg uppercase">&nbsp;</p>
            </div>

            <div v-for="item in wishlist" :key="item.product.id" class="flex items-center justify-between gap-6 p-6">
              <div class="flex items-center gap-6">
                <img :src="`${item.product.image}`" alt="" class="w-30 h-40 object-cover"/>
                <p class="text-gray-600 truncate">{{ item.product.name }}</p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                  <span class="text-lg font-bold">${{ item.product.price }}</span>
                  <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">added</button>
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <button @click="() => openModal(item.id)" class="cursor-pointer py-2 px-4 border border-neutral-300 text-neutral-300 text-2xl hover:text-red-700 hover:border-red-700">
                  &times;
                </button>
              </div>
            </div>
            
          </div>
          
          <div class="py-6 border-b border-neutral-300 flex items-center justify-end">
            <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
              clear wishlist
            </button>
          </div>
        </div>
          
        <div v-else class="w-full h-full flex flex-col items-center justify-center gap-6">
          <span class="text-9xl font-bold"><FavoriteIcon/></span>
          <p class="text-lg text-neutral-500">No items found in wishlist</p>
          <RouterLink to="/" class="cursor-pointer uppercase px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-lg text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
            Add items
          </RouterLink>
        </div>
      </div>
    </Section>
    
    <ConfirmDeleteModal  
      v-if="isOpen"
      :cancelDelete="cancelDelete" 
      :handleDelete="handleDelete" 
      :item="currentItem" 
      :isLoading="isLoading" 
      mode="wishlist"
    />
  </AppLayout>
</template>
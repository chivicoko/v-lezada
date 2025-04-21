<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { onMounted, ref } from "vue";
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue";
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue"
import ItemCard from "@/components/cards/ItemCard.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'
import type { WishlistItemProps } from '@/types'
import { initialProduct } from '@/data'
import { storeToRefs } from 'pinia'

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const { wishlist, isLoading } = storeToRefs(wishlistStore)
const { fetchWishlist, removeFromWishlist, clearWishlist } = wishlistStore

const { addToCart } = cartStore

const isOpen = ref(false);
const isClearance = ref(false);
const currentItem = ref<WishlistItemProps>(initialProduct);

const cancelDelete = () => {
  isOpen.value = false;
  isClearance.value = false;
}

const openModal = (id: number | null) => {
  if (id !== null) {
    const item = wishlist.value.find((item) => item.id === id);
    if (item) {
      currentItem.value = item;
    }
  } else {
    isClearance.value = true;
  }
  isOpen.value = true;
}

const handleClearAll = () => {
  isClearance.value = true;
  clearWishlist();
  isOpen.value = false;
  isClearance.value = false;
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
          <div class="w-full h-full border border-neutral-300 divide-y divide-neutral-300">
            <div class="flex items-center justify-between gap-6 py-4 px-6">
              <p class="text-lg uppercase">Product</p>
              <p class="text-lg uppercase">Price</p>
              <p class="text-lg uppercase">&nbsp;</p>
            </div>
            
            <ItemCard :items="wishlist" :openModal="openModal" :addToCart="addToCart" mode="wishlist" />
          </div>
          
          <div class="py-6 border-b border-neutral-300 flex items-center justify-end">
            <button @click="openModal(null)"  class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-red-700 border border-transparent hover:border-red-700 transition-all duration-300 ease-in-out">
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
      :handleClearAll="handleClearAll"
      :isClearance="isClearance"
      :item="currentItem" 
      :isLoading="isLoading" 
      clearWishlist
      mode="wishlist"
    />
  </AppLayout>
</template>
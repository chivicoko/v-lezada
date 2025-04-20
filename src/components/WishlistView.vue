<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import CancelIcon from "@/components/icons/CancelIcon.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue"
import { useWishlistStore } from '@/stores/wishlist'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types'
import { initialProduct } from '@/data'

const isOpen = ref(false);
const currentItem = ref<Product>(initialProduct);

const wishlistStore = useWishlistStore()

const { wishlist, isLoading } = storeToRefs(wishlistStore);
const { fetchWishlist, removeFromWishlist } = wishlistStore;

const cancelDelete = () => {
    isOpen.value = false;
    // console.log(isOpen.value)
}

const openModal = (id: number) => {
    const item = wishlist.value.find((item) => item.id === id);
    isOpen.value = true;
    if (item) {
        currentItem.value = item;
    }
}

const handleDelete = (id: number) => {
    removeFromWishlist(id);
    isOpen.value = false;
}

onMounted(() => {
  fetchWishlist()
  // console.log(cart.value);
})

defineProps<{
    toggleWishlistbarVisibility: () => void,
}>();
</script>

<template>
    <div class="flex items-center justify-between text-neutral-700 gap-4 border-b border-neutral-300 py-2">
        <h2 class="text-2xl">Wishlist</h2>
        <button @click="toggleWishlistbarVisibility" class="cursor-pointer text-3xl transform hover:text-red-700 hover:rotate-90 transition-all duration-700 ease-in-out">
            <CancelIcon/>
        </button>
    </div>

    <div v-if="isLoading" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>

    <div v-else-if="wishlist.length > 0">
        <div class="h-[60vh] overflow-auto custom-scrollbar">
            <div v-for="item in wishlist" :key="item.id" class="flex items-start justify-between gap-2 border-b border-neutral-300 py-5">
                <img :src="`${item.product.image}`" alt="" class="w-20 h-30 object-cover"/>
                <div class="">
                    <p class="text-gray-600 text-whitespace pb-3">{{ item.product.name }}</p>
                    <p class="text-gray-600 truncate">${{ parseFloat(item.product.price).toFixed(2) }}</p>
                </div>
                <button @click="openModal(item.id)" class="cursor-pointer py-2 px-4 text-neutral-300 text-2xl hover:text-red-700">
                    &times;
                </button>
            </div>
        </div>
            
        <div class="py-12 w-full flex items-center justify-center">
            <RouterLink to="/wishlist" class="w-full text-center cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
                view wishlist
            </RouterLink>
        </div>
        
        <!-- <ProductCard v-for="product in wishlist" :key="product.id" :product="product" /> -->
    </div>

    <div v-else>
        <p>No items found in the wishlist</p>
    </div>
    
    <ConfirmDeleteModal  
        v-if="isOpen"
        :cancelDelete="cancelDelete" 
        :handleDelete="handleDelete" 
        :item="currentItem" 
        :isLoading="isLoading" 
        mode="cart"
    />
</template>
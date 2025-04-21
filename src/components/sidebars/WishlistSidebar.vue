<script setup lang="ts">
import { onMounted, ref } from "vue";
import CancelIcon from "@/components/icons/CancelIcon.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue"
import SidebarItemCard from "@/components/cards/SidebarItemCard.vue"
import { useWishlistStore } from '@/stores/wishlist'
import { storeToRefs } from 'pinia'
import type { WishlistItemProps } from '@/types'
import { initialProduct } from '@/data'

const isOpen = ref(false);
const currentItem = ref<WishlistItemProps>(initialProduct);

const wishlistStore = useWishlistStore()

const { wishlist, isLoading } = storeToRefs(wishlistStore);
const { fetchWishlist, removeFromWishlist } = wishlistStore;

const cancelDelete = () => {
    isOpen.value = false;
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
})

defineProps<{
    toggleWishlistbarVisibility: () => void,
    viewWishlistPage: () => void,
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
            <SidebarItemCard :items="wishlist" :openModal="openModal" />
        </div>
            
        <div class="py-12 w-full flex items-center justify-center">
            <button @click="viewWishlistPage" class="w-full text-center cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
                view wishlist
            </button>
        </div>
        
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
        mode="wishlist"
    />
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import CancelIcon from "@/components/icons/CancelIcon.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue"
import SidebarItemCard from "@/components/cards/SidebarItemCard.vue"
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import type { CartItemProps } from '@/types'
import { initialProduct } from '@/data'

const cartStore = useCartStore()
const isOpen = ref(false);
const currentItem = ref<CartItemProps>(initialProduct);

const { cart, cartTotal, isLoading } = storeToRefs(cartStore);
const { fetchCart, removeFromCart } = cartStore;

onMounted(() => {
  fetchCart()
})

const cancelDelete = () => {
    isOpen.value = false;
}

const openModal = (id: number) => {
    const item = cart.value.find((item) => item.id === id);
    isOpen.value = true;
    if (item) {
        currentItem.value = item;
    }
}

const handleDelete = (id: number) => {
    removeFromCart(id);
    isOpen.value = false;
}

defineProps<{
    toggleCartbarVisibility: () => void,
    viewCartPage: () => void,
    viewCheckoutPage: () => void,
}>();
</script>

<template>
    <div class="flex items-center justify-between text-neutral-700 gap-4 border-b border-neutral-300 py-2">
        <h2 class="text-2xl">Cart</h2>
        <button @click="toggleCartbarVisibility" class="cursor-pointer text-3xl transform hover:text-red-700 hover:rotate-90 transition-all duration-700 ease-in-out">
            <CancelIcon/>
        </button>
    </div>
    
    <div v-if="isLoading" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>

    <div v-else-if="cart.length > 0">
        <div class="h-[55vh] overflow-auto custom-scrollbar">
            <SidebarItemCard :items="cart" :openModal="openModal" />
        </div>

        <p class="flex items-center justify-between gap-4 border-b border-neutral-300 py-3">
            <span class="font-semibold">Subtotal</span>
            <span class="font-semibold">${{parseFloat(cartTotal.toString()).toFixed(2)}}</span>
        </p>
            
        <div class="py-6 w-full flex flex-col items-center justify-center gap-4">
            <button @click="viewCartPage" class="w-full text-center cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">view cart</button>
            <button @click="viewCheckoutPage" class="w-full text-center cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">checkout</button>
            <p class="capitalize text-neutral-500">Free shipping on all orders above $100!</p>
        </div>        
    </div>

    <div v-else>
        <p>No items found in the cart</p>
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
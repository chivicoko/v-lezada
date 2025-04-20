<script setup lang="ts">
import { defineProps, ref, onMounted } from "vue";
import CancelIcon from "@/components/icons/CancelIcon.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue"
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types'
import { initialProduct } from '@/data'

const cartStore = useCartStore()
const isOpen = ref(false);
const currentItem = ref<Product>(initialProduct);

const { cart, cartTotal, isLoading } = storeToRefs(cartStore);
const { fetchCart, removeFromCart } = cartStore;

onMounted(() => {
  fetchCart()
  // console.log(cart.value);
})

const cancelDelete = () => {
    isOpen.value = false;
    // console.log(isOpen.value)
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
            <div v-for="item in cart" :key="item.id" class="flex items-start justify-between gap-2 border-b border-neutral-300 py-5">
                <img :src="`${item.product.image}`" alt="" class="w-20 h-30 object-cover"/>
                <div class="">
                    <p class="text-gray-600 text-whitespace pb-3">{{ item.product.name }}</p>
                    <p class="text-gray-600 truncate">${{ parseFloat(item.product.price).toFixed(2) }}</p>
                </div>
                <button @click="openModal(item.id)" class="cursor-pointer py-2 px-4 text-neutral-300 text-2xl hover:text-red-700">
                    &times;
                </button>
                
                <!-- <section v-if="isOpen" class="fixed inset-0 -top-5 bg-gray-800 bg-opacity-80 flex justify-center items-center p-2 z-[999999]">
                    <ConfirmDeleteModal :cancelDelete="cancelDelete" :handleDelete="handleDelete" :item="currentItem" :isLoading="isLoading" />
                </section> -->
            </div>
        </div>

        <p class="flex items-center justify-between gap-4 border-b border-neutral-300 py-3">
            <span class="font-semibold">Subtotal</span>
            <span class="font-semibold">${{parseFloat(cartTotal).toFixed(2)}}</span>
        </p>
            
        <div class="py-6 w-full flex flex-col items-center justify-center gap-4">
            <RouterLink to="/cart" class="w-full text-center cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">view cart</RouterLink>
            <RouterLink to="/checkout" class="w-full text-center cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">checkout</RouterLink>
            <p class="capitalize text-neutral-500">Free shipping on all orders above $100!</p>
        </div>
        
        <!-- <ProductCard v-for="product in wishlist" :key="product.id" :product="product" /> -->
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
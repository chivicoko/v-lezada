<script setup lang="ts">
import { defineProps, ref } from "vue";
import CancelIcon from "@/components/icons/CancelIcon.vue"

const wishlistItems = ref([
    {
        id: 1,
        title: 'Product Decor 1',
        price: 16.50,
        old_price: 19.00,
        percentageDiscount: 15.00,
        new: true,
        out: false,
        img1: '1.jpg',
        img2: '9.jpg',
    },
    {
        id: 2,
        title: 'Product Decor 2',
        price: 16.50,
        old_price: 19.00,
        percentageDiscount: 0.00,
        new: true,
        out: false,
        img1: '2.jpg',
        img2: '3.jpg',
    },
    {
        id: 3,
        title: 'Product Decor 3',
        price: 16.50,
        old_price: 19.00,
        percentageDiscount: 0.00,
        new: true,
        out: false,
        img1: '3.jpg',
        img2: '4.jpg',
    },
]);

defineProps<{
    toggleWishlistbarVisibility: () => void,
}>();
</script>

<template>
    <div class="flex items-center justify-between text-neutral-700 gap-4 border-b border-neutral-300 py-2">
        <h2 class="text-2xl">Wishlist</h2>
        <button @click="toggleWishlistbarVisibility" class="cursor-pointer text-3xl transform hover:rotate-90 transition-all duration-700 ease-in-out"><CancelIcon/></button>
    </div>

    <div v-if="wishlistItems.length > 0">
        <div class="h-[60vh] overflow-hidden hover:overflow-auto custom-scrollbar">
            <div v-for="item in wishlistItems" :key="item.id" class="flex items-start justify-between gap-2 border-b border-neutral-300 py-5">
                <img :src="`/src/assets/images/product/decor/${item.img1}`" alt="" class="w-20 h-30 object-cover" />
                <div>
                    <p class="text-gray-600 truncate">{{ item.title }}</p>
                    <p class="text-gray-600 truncate">${{ item.price }}</p>
                </div>
                <button class="cursor-pointer py-2 px-4 text-neutral-300 text-2xl hover:text-red-700">&times;</button>
            </div>
        </div>
            
        <div class="py-12 w-full flex items-center justify-center">
            <RouterLink to="/wishlist" class="w-full text-center cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">view wishlist</RouterLink>
        </div>
        
        <!-- <ProductCard v-for="product in wishlist" :key="product.id" :product="product" /> -->
    </div>

    <div v-else>
        <p>No items found in the wishlist</p>
    </div>
</template>
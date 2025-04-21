<script setup lang="ts">
import type { Product } from '@/types'
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue";
import ShareIcon from "@/components/icons/ShareIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import CancelIcon from "@/components/icons/CancelIcon.vue";

defineProps<{
    addToWishlist: (id: number) => void,
    isInStore: (id: number) => boolean,
    toggleImageQuickview: (id: number) => void,
    addToCart: (id: number, quantity: number) => void,
    products: Product[],
    isExpanded: boolean,
    expandedProductId: number | null,
}>();

</script>

<template>
    <div v-for="(product, index) in products" :key="product.id" :class="`${expandedProductId === product.id && isExpanded ? 'fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-2 z-50' : ''} pt-1 transition-all duration-300 ease-in-out`">
        <div :class="`animate-fade-in duration-[${index * 50}] relative flex flex-col items-start gap-6 group ${expandedProductId === product.id && isExpanded ? 'bg-white w-[95%] h-[97%] md:w-[80%] md:h-[90%] p-4 sm:p-7 md:p-10' : ''}`">
            <div class="absolute top-5 left-5 flex flex-col gap-2 z-10">
                <p v-if="product.price && +product.price > 400" class="size-13 p-1 text-xs font-semibold bg-[#98d8ca] rounded-full flex items-center justify-center text-white">
                    -{{+product.price > 750 ? '15' : +product.price > 600 ? '10' : '15'}}%
                </p>
                <p v-if="product.id % 2 === 0" class="size-13 bg-red-700 rounded-full flex items-center justify-center text-white">new</p>
                <p v-if="product.stock && product.stock % 2 === 0" class="size-13 bg-neutral-700 rounded-full flex items-center justify-center text-white">out</p>
            </div>
            <div class="absolute top-5 right-5 flex flex-col gap-2 overflow-hidden z-10">
                <div class="-translate-y-full group-hover:-translate-0 flex flex-col gap-[6px] transition-all duration-300 ease-in-out">
                    <button 
                        @click="addToWishlist(product.id)" 
                        title="Add to wishlist" 
                        :class="`${isInStore(product.id) ? 'stroke stroke-red-700 text-red-700' : 'text-neutral-500'} cursor-pointer size-10 p-2 bg-white hover:bg-neutral-200 border border-transparent hover:border-neutral-800 flex items-center justify-center text-[20px] transition-all duration-1000 ease-in-out`"
                    >
                        <FavoriteIcon/>
                    </button>
                    <button title="Add to compare" class="cursor-pointer size-10 p-2 bg-white hover:bg-neutral-200 border border-transparent hover:border-neutral-800 flex items-center justify-center text-[20px] text-neutral-500 transition-all duration-1000 ease-in-out">
                        <ShareIcon/>
                    </button>
                    <button 
                        @click="toggleImageQuickview(product.id)" 
                        :title="`${isExpanded ? 'Cancel Quick view' : 'Quick view'}`" 
                        :class="`cursor-pointer size-10 p-2 bg-white hover:bg-neutral-200 border border-transparent ${isExpanded ? 'hover:border-red-700 text-[30px] hover:text-red-700' : 'hover:border-neutral-800 text-[20px]'} text-neutral-500 flex items-center justify-center transition-all duration-1000 ease-in-out`"
                    >
                        <span v-if="isExpanded"><CancelIcon/></span>
                        <span v-else><SearchIcon/></span>
                    </button>
                </div>
            </div>
            <RouterLink :to="`/products/${product.id}`" :class="`${isExpanded ? 'h-full w-full' : 'h-[25rem] w-[23rem]'}`">
                <img 
                    loading="lazy" 
                    :src="product.image ? product.image : '/src/assets/images/product/decor/2.jpg'" 
                    :alt="`product: ${product.name}`" 
                    :class="`opacity-100 ${isExpanded ? 'h-full w-full ' : 'h-[25rem] w-[23rem] '} object-cover group-hover:opacity-0 transition-all duration-1000 ease-in-out`"
                />
                <img 
                    loading="lazy" 
                    :src="product.hover_image ? product.hover_image : '/src/assets/images/product/decor/3.jpg'" 
                    :alt="`product: ${product.name}`" 
                    :class="`absolute top-0 left-0 opacity-0 ${isExpanded ? 'h-full w-full ' : 'h-[25rem] w-[23rem] '} object-cover group-hover:opacity-100 transition-all duration-1000 ease-in-out`"
                />
            </RouterLink>
            <div :class="`${isExpanded ? 'hidden' : 'flex'} flex-col items-start gap-2`">
                <span class="overflow-hidden flex flex-col items-start">
                    <span class="leading-none -translate-y-0 group-hover:-translate-y-[115%] text-lg text-neutral-700 transition-all duration-300 ease-in-out">
                        {{ product.name }}
                    </span>
                    <button 
                        @click="addToCart(product.id, 1)" 
                        :class="`${product.stock && product.stock % 2 === 0 ? 'disable cursor-default' : 'cursor-pointer'} leading-none translate-y-full group-hover:-translate-y-2 text-red-700 text-lg transition-all duration-300 ease-in-out`"
                    >
                        {{ product.stock && product.stock % 2 === 0 ? 'Out of Stock' : '+ Add to cart' }}
                    </button>
                </span>
                <div class=" flex items-center gap-2 font-semibold text-sm mt-0">
                    <p class="text-neutral-300 line-through">${{ product.old_price ? product.old_price : 5.30 }}</p>
                    <p>${{ parseFloat(product.price ?? '').toFixed(2) }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
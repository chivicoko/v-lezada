<script setup lang="ts">
import { products } from '@/utils/data';
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import ShareIcon from "@/components/icons/ShareIcon.vue"
import SearchIcon from "@/components/icons/SearchIcon.vue"
import { ref, computed } from 'vue';

const productTabs = ref(['new', 'popular', 'sale']);
const currentTab = ref(productTabs.value[0]);
const currentProduct = computed(() => currentTab.value === productTabs.value[0] ? products.slice(0, 5) : currentTab.value === productTabs.value[1] ? products.slice(3, products.length) : products.slice(1, products.length));
</script>

<template>
    <div id="productsContent" class="pt-24 flex flex-col items-center justify-center gap-16">
        <ul class="flex items-center gap-12">
            <li><button @click="currentTab = productTabs[0]" :class="`${currentTab === productTabs[0] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer`">New</button></li>
            <li><button @click="currentTab = productTabs[1]" :class="`${currentTab === productTabs[1] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer`">Popular</button></li>
            <li><button @click="currentTab = productTabs[2]" :class="`${currentTab === productTabs[2] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer`">Sale</button></li>
        </ul>
        <div class="max-w-[73rem] grid grid-cols-3 gap-y-12 gap-x-7">
            <div v-for="product in currentProduct" :key="product.id" class="relative flex flex-col items-start gap-6 group">
                <div class="absolute top-5 left-5 flex flex-col gap-2 z-10">
                    <p v-if="product.percentageDiscount > 0" class="size-13 p-1 text-xs font-semibold bg-[#98d8ca] rounded-full flex items-center justify-center text-white">-{{product.percentageDiscount}}%</p>
                    <p v-if="product.new" class="size-13 bg-red-700 rounded-full flex items-center justify-center text-white">new</p>
                    <p v-if="product.out" class="size-13 bg-neutral-700 rounded-full flex items-center justify-center text-white">out</p>
                </div>
                <div class="absolute top-5 right-5 flex flex-col gap-2 overflow-hidden z-10">
                    <div class="-translate-y-full group-hover:-translate-0 flex flex-col gap-[6px] transition-all duration-300 ease-in-out">
                        <button title="Add to wishlist" class="cursor-pointer size-10 p-2 bg-white flex items-center justify-center text-[20px] text-neutral-500"><FavoriteIcon/></button>
                        <button title="Add to compare" class="cursor-pointer size-10 p-2 bg-white flex items-center justify-center text-[20px] text-neutral-500"><ShareIcon/></button>
                        <button title="Quick view" class="cursor-pointer size-10 p-2 bg-white flex items-center justify-center text-[20px] text-neutral-500"><SearchIcon/></button>
                    </div>
                </div>
                <RouterLink to="/" class="">
                    <img :src="`/src/assets/images/product/decor/${product.img1}`" :alt="`product ${product.id}`" class="opacity-100 group-hover:opacity-0 transition-all duration-1000 ease-in-out">
                    <img :src="`/src/assets/images/product/decor/${product.img2}`" :alt="`product ${product.id}`" class="absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-in-out">
                </RouterLink>
                <div class="flex flex-col items-start gap-2">
                    <!-- <p class="group-hover:hidden text-lg text-neutral-700 transition-all duration-300 ease-in-out">{{ product.title }}</p> -->
                    <!-- <button class="hidden group-hover:block cursor-pointer text-red-700 text-lg transition-all duration-300 ease-in-out">+ Add to cart</button> -->
                     <span class="overflow-hidden flex flex-col items-start">
                        <span class="leading-none -translate-y-0 group-hover:-translate-y-full text-lg text-neutral-700 transition-all duration-300 ease-in-out">{{ product.title }}</span>
                        <button :class="`${product.out ? 'disable cursor-default' : 'cursor-pointer'} leading-none translate-y-full group-hover:-translate-y-2 text-red-700 text-lg transition-all duration-300 ease-in-out`">{{ product.out ? 'Out of Stock' : '+ Add to cart' }}</button>
                     </span>
                    <div class=" flex items-center gap-2 font-semibold text-sm mt-0">
                        <p class="text-neutral-300 line-through">${{ product.old_price }}</p>
                        <p>${{ product.price }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
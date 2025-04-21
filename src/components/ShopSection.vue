<script setup lang="ts">
// import { products } from '@/utils/data';
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import { ref, onMounted, onUnmounted, watch } from 'vue';;
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
// import type { Product } from '@/types';

const productTabs = ref(['new', 'popular', 'sale']);
const currentTab = ref(productTabs.value[0]);
const whichLoading = ref<'initial' | 'later'>('initial');
const isExpanded = ref(false);
const expandedProductId = ref<number | null>(null);

const productsStore = useProductsStore();
const { products, isLoading, hasMore } = storeToRefs(productsStore)
const { fetchProducts } = productsStore;

const cartStore = useCartStore();
const { addToCart, isInCart } = cartStore

const wishlistStore = useWishlistStore();
const { addToWishlist } = wishlistStore

const authStore = useAuthStore();
const { getUserProfile } = authStore;

const bottom = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const toggleImageQuickview = (id: number) => {
    if (expandedProductId.value === id) {
        isExpanded.value = false;
        expandedProductId.value = null;
    } else {
        isExpanded.value = true;
        expandedProductId.value = id;
    }
}

onMounted(() => {
    console.log(isInCart(91));
    fetchProducts()
    getUserProfile()

    let debounceTimeout: number | null = null;
    let scrollLock = false;

    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore.value && !isLoading.value && !scrollLock) {
            scrollLock = true;
            whichLoading.value = 'later'

            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = window.setTimeout(() => {
                fetchProducts().then(() => {
                    scrollLock = false;
                });
            }, 300);
        }
    });


    if (bottom.value) {
        observer.observe(bottom.value as HTMLElement)
    }
})

onUnmounted(() => {
    if (observer && bottom.value) {
    observer.unobserve(bottom.value);
    observer.disconnect();
  }
})

watch(bottom, (newVal, oldVal) => {
  if (oldVal && observer) observer.unobserve(oldVal);
  if (newVal && observer) observer.observe(newVal);
});

</script>

<template>
    <div v-if="isLoading && whichLoading === 'initial'" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>

    <div v-else-if="products.length > 0" id="productsContent" class="pt-24 flex flex-col items-center justify-center gap-16">
        <ul class="flex items-center gap-12">
            <li>
                <button @click="currentTab = productTabs[0]" :class="`${currentTab === productTabs[0] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer hover:text-neutral-800 transition-all duration-300 ease-in-out`">
                    New
                </button>
            </li>
            <li>
                <button @click="currentTab = productTabs[1]" :class="`${currentTab === productTabs[1] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer hover:text-neutral-800 transition-all duration-300 ease-in-out`">
                    Popular
                </button>
            </li>
            <li>
                <button @click="currentTab = productTabs[2]" :class="`${currentTab === productTabs[2] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer hover:text-neutral-800 transition-all duration-300 ease-in-out`">
                    Sale
                </button>
            </li>
        </ul>
        <div :class="`${isExpanded ? 'w-full' : 'max-w-[73rem] grid grid-cols-3'} gap-y-12 gap-x-7`">
            <ProductCard
                :addToWishlist="addToWishlist"
                :toggleImageQuickview="toggleImageQuickview"
                :addToCart="addToCart"
                :isInStore="isInCart"
                :products="products" 
                :isExpanded="isExpanded" 
                :expandedProductId="expandedProductId" 
            />
        </div>

        <div ref="bottom" class="h-12 w-full flex items-center justify-center">
            <LoadingSpinner v-if="isLoading && hasMore && whichLoading !== 'initial'" dynamicSize="size-12" />
        </div>
    </div>
    
    <div v-else class="py-16 flex items-center justify-center text-lg">No products available at the moment</div>
</template>
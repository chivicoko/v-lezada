<script setup lang="ts">
// import { products } from '@/utils/data';
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import ShareIcon from "@/components/icons/ShareIcon.vue"
import SearchIcon from "@/components/icons/SearchIcon.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/authStore';


const productTabs = ref(['new', 'popular', 'sale']);
const currentTab = ref(productTabs.value[0]);
const whichLoading = ref<'initial' | 'later'>('initial');

const productsStore = useProductsStore();
const { products, isLoading, hasMore } = storeToRefs(productsStore)
const { fetchProducts } = productsStore;

const cartStore = useCartStore();
const { addToCart } = cartStore

const wishlistStore = useWishlistStore();
const { addToWishlist } = wishlistStore

const authStore = useAuthStore();
const { getUserProfile } = authStore;

const bottom = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
    fetchProducts()
    getUserProfile()
    whichLoading.value = 'later'

    let debounceTimeout: number | null = null;
    let scrollLock = false; // new

    observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore.value && !isLoading.value && !scrollLock) {
            scrollLock = true;

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
            <li><button @click="currentTab = productTabs[0]" :class="`${currentTab === productTabs[0] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer`">New</button></li>
            <li><button @click="currentTab = productTabs[1]" :class="`${currentTab === productTabs[1] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer`">Popular</button></li>
            <li><button @click="currentTab = productTabs[2]" :class="`${currentTab === productTabs[2] ? 'text-neutral-800' : 'text-neutral-300'} text-5xl cursor-pointer`">Sale</button></li>
        </ul>
        <div class="max-w-[73rem] grid grid-cols-3 gap-y-12 gap-x-7">
            <div v-for="(product, index) in products" :key="product.id" :class="`animate-fade-in duration-[${index * 50}] relative flex flex-col items-start gap-6 group`">
                <div class="absolute top-5 left-5 flex flex-col gap-2 z-10">
                    <p v-if="product.percentageDiscount && product.percentageDiscount > 0" class="size-13 p-1 text-xs font-semibold bg-[#98d8ca] rounded-full flex items-center justify-center text-white">-{{product.percentageDiscount}}%</p>
                    <p v-if="product.id % 2 === 0" class="size-13 bg-red-700 rounded-full flex items-center justify-center text-white">new</p>
                    <p v-if="product.stock % 2 === 0" class="size-13 bg-neutral-700 rounded-full flex items-center justify-center text-white">out</p>
                </div>
                <div class="absolute top-5 right-5 flex flex-col gap-2 overflow-hidden z-10">
                    <div class="-translate-y-full group-hover:-translate-0 flex flex-col gap-[6px] transition-all duration-300 ease-in-out">
                        <button @click="addToWishlist(product.id)" title="Add to wishlist" class="cursor-pointer size-10 p-2 bg-white flex items-center justify-center text-[20px] text-neutral-500"><FavoriteIcon/></button>
                        <button title="Add to compare" class="cursor-pointer size-10 p-2 bg-white flex items-center justify-center text-[20px] text-neutral-500"><ShareIcon/></button>
                        <button title="Quick view" class="cursor-pointer size-10 p-2 bg-white flex items-center justify-center text-[20px] text-neutral-500"><SearchIcon/></button>
                    </div>
                </div>
                <RouterLink :to="`/products/${product.id}`" class="">
                    <img loading="lazy" :src="product.image ? product.image : '/src/assets/images/product/decor/2.jpg'" :alt="`product: ${product.name}`" class="opacity-100 h-[25rem] w-[23rem] object-cover group-hover:opacity-0 transition-all duration-1000 ease-in-out">
                    <img loading="lazy" :src="product.hover_image ? product.hover_image : '/src/assets/images/product/decor/3.jpg'" :alt="`product: ${product.name}`" class="absolute top-0 left-0 opacity-0 h-[25rem] w-[23rem] object-cover group-hover:opacity-100 transition-all duration-1000 ease-in-out">
                </RouterLink>
                <div class="flex flex-col items-start gap-2">
                     <span class="overflow-hidden flex flex-col items-start">
                        <span class="leading-none -translate-y-0 group-hover:-translate-y-full text-lg text-neutral-700 transition-all duration-300 ease-in-out">{{ product.name }}</span>
                        <button @click="addToCart(product.id, 1)" :class="`${product.out ? 'disable cursor-default' : 'cursor-pointer'} leading-none translate-y-full group-hover:-translate-y-2 text-red-700 text-lg transition-all duration-300 ease-in-out`">{{ product.out ? 'Out of Stock' : '+ Add to cart' }}</button>
                     </span>
                    <div class=" flex items-center gap-2 font-semibold text-sm mt-0">
                        <p class="text-neutral-300 line-through">${{ product.old_price ? parseFloat(product.old_price).toFixed(2) : 5.30 }}</p>
                        <p>${{ parseFloat(product.price).toFixed(2) }}</p>
                    </div>
                </div>
            </div>
        </div>
            
        <div ref="bottom" class="h-12 w-full flex items-center justify-center">
            <LoadingSpinner v-if="isLoading && hasMore && whichLoading !== 'initial'" dynamicSize="size-12" />
        </div>
    </div>
    
    <div v-else class="py-16 flex items-center justify-center text-lg">No products available at the moment</div>
</template>
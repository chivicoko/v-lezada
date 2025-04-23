<script setup lang="ts">
// import { products } from '@/utils/data';
import SearchIcon from "@/components/icons/SearchIcon.vue";
import GridOneIcon from "@/components/icons/GridOneIcon.vue";
import GridThreeIcon from "@/components/icons/GridThreeIcon.vue";
import GridFourIcon from "@/components/icons/GridFourIcon.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ProductCard from "@/components/cards/ProductCard.vue";
import { ref, onMounted, onUnmounted, watch } from 'vue';;
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { storeToRefs } from 'pinia';
import { allCategories } from '@/data';

const grid = ref('three');

const whichLoading = ref<'initial' | 'later'>('initial');
const isExpanded = ref(false);
const expandedProductId = ref<number | null>(null);

const productsStore = useProductsStore();
const { 
    products,
    isLoading,
    hasMore,
    filteredProducts,
    searchTerm,
    selectedCategory,
    sortOption,
    showingCount,
    totalCount 
} = storeToRefs(productsStore);
const { fetchProducts, setCategory, resetFilters } = productsStore;

const cartStore = useCartStore();
const { addToCart, isInCart } = cartStore

const wishlistStore = useWishlistStore();
const { addToWishlist } = wishlistStore

const bottom = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const handleGridToggle = (gridState: string) => {
    grid.value = gridState;
    console.log(grid.value);
}

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
    fetchProducts()

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

    <div v-else-if="products.length > 0" class="divide-y divide-neutral-400">
        
        <div class="flex items-center justify-between gap-3 px-32 py-2">
            <p class="text-base text-gray-600 mt-2">
                Showing {{ showingCount }} of {{ totalCount ?? '...' }} results
            </p>

            <div class="flex items-center gap-4 p-2 z-20">
                <select v-model="sortOption" class="border cursor-pointer py-[14px] ">
                    <option value="default">Default</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
    
                <button @click="resetFilters" class="w-ful text-center cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
                    Reset Filters
                </button>
    
                <div class="flex items-center justify-end gap-2">
                    <button @click="handleGridToggle('three')" :class="`${grid === 'three' ? 'text-gray-900' : 'text-gray-500'} text-4xl hover:text-gray-900 cursor-pointer transition-all duration-300 ease-in-out`">
                        <GridThreeIcon />
                    </button>
                    
                    <button @click="handleGridToggle('four')" :class="`${grid === 'four' ? 'text-gray-900' : 'text-gray-500'} text-4xl hover:text-gray-900 cursor-pointer transition-all duration-300 ease-in-out`">
                        <GridFourIcon />
                    </button>
                    
                    <button @click="handleGridToggle('one')" :class="`${grid === 'one' ? 'text-gray-900' : 'text-gray-500'} text-4xl hover:text-gray-900 cursor-pointer transition-all duration-300 ease-in-out`">
                        <GridOneIcon />
                    </button>
                </div>
            </div>
        </div>
            
        <div class="py-16 px-32 pt-24 flex items-start justify-center gap-6">

            <div class="w-1/5 flex flex-col items-center justify-center gap-6 p-2">
                <div class="group w-full flex items-center justify-between border-b-2 border-neutral-400 hover:border-neutral-700 focus-within:border-neutral-700 transition-all duration-300 ease-in-out">
                    <input v-model="searchTerm" placeholder="Search products..." class="w-full outline-0" />
                    <span class="p-1 cursor-pointer text-[20px] text-neutral-400 group-hover:text-neutral-800 group-focus-within:text-neutral-800 transition-all duration-300 ease-in-out">
                        <SearchIcon/>
                    </span>
                </div>

                <h3 class="w-full text-2xl text-start py-3">Categories</h3>

                <div class="w-full">
                    <p 
                        v-for="(cat, index) in allCategories" 
                        :key="index" 
                        @click="setCategory(cat.categoryName)" 
                        :class="`${selectedCategory === cat.categoryName ? 'underline' : ''} cursor-pointer py-2`">
                        {{cat.name}}
                    </p>
                </div>
            </div>

            <div class="w-4/5 flex flex-col items-center justify-center gap-16">
                <div v-if="filteredProducts.length > 0" :class="`${isExpanded ? 'w-full' : grid === 'one' ? 'max-w-[73rem] grid-cols-1' : grid === 'four' ? 'max-w-[73rem] grid-cols-4' : 'max-w-[73rem] grid grid-cols-3'} gap-y-12 gap-x-7`">
                    <ProductCard
                        :addToWishlist="addToWishlist"
                        :toggleImageQuickview="toggleImageQuickview"
                        :addToCart="addToCart"
                        :isInStore="isInCart"
                        :products="filteredProducts"
                        :isExpanded="isExpanded" 
                        :expandedProductId="expandedProductId" 
                    />
                </div>

                <div v-else class="text-xl py-16">No items at this time!</div>

                <div ref="bottom" class="h-12 w-full flex items-center justify-center">
                    <LoadingSpinner v-if="isLoading && hasMore && whichLoading !== 'initial'" dynamicSize="size-12" />
                </div>
            </div>
        </div>

    </div>
        
    <div v-else class="py-16 flex items-center justify-center text-lg">No products available at the moment</div>
</template>
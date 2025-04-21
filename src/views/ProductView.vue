<script setup lang="ts">
import AppLayout from "@/layouts/AppLayout.vue";
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue";
import SearchIcon from "@/components/icons/SearchIcon.vue";
import CancelIcon from "@/components/icons/CancelIcon.vue";
import HeaderTwo from "@/components/HeaderTwo.vue";
import CTA from "@/components/CTA.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useProductsStore } from '@/stores/products';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { storeToRefs } from 'pinia';

const route = useRoute()
const isExpanded = ref(false);
const expandedProductId = ref<number | null>(null);

const productsStore = useProductsStore()
const { selectedProduct, isLoading } = storeToRefs(productsStore)
const { fetchProductById } = productsStore

const cartStore = useCartStore()
const { addToCart, isInCart } = cartStore

const wishlistStore = useWishlistStore();
const { addToWishlist } = wishlistStore

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
  const productId = parseInt(route.params.id as string)  
  fetchProductById(productId)
  console.log(selectedProduct.value);
})
</script>


<template>
  <AppLayout>
    <main class="w-full">
      <HeaderTwo />
      
      <div class="py-16 px-42">
        <div v-if="isLoading" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>

        <div v-if="selectedProduct !== null" class="w-full flex item-start gap-5">
          <div :class="`${isExpanded ? 'w-full' : 'w-1/2'} gap-y-12 gap-x-7`">
            <div :class="`${expandedProductId === selectedProduct?.id && isExpanded ? 'fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center p-2 z-50' : ''} pt-1 transition-all duration-300 ease-in-out`">
              <div :class="`relative flex flex-col items-start gap-6 group ${expandedProductId === selectedProduct?.id && isExpanded ? 'bg-white w-[95%] h-[97%] md:w-[80%] md:h-[90%] p-4 sm:p-7 md:p-10' : ''}`">
                <div class="absolute top-5 left-5 flex flex-col gap-2 z-10">
                  <p v-if="selectedProduct?.price && +selectedProduct?.price > 400" class="size-13 p-1 text-xs font-semibold bg-[#98d8ca] rounded-full flex items-center justify-center text-white">
                    -{{+selectedProduct?.price > 750 ? '15' : +selectedProduct?.price > 600 ? '10' : '15'}}%
                  </p>
                  <p v-if="selectedProduct?.id !== undefined && selectedProduct.id % 2 === 0" class="size-13 bg-red-700 rounded-full flex items-center justify-center text-white">new</p>
                  <p v-if="selectedProduct?.stock && selectedProduct?.stock % 2 === 0" class="size-13 bg-neutral-700 rounded-full flex items-center justify-center text-white">out</p>
                </div>
                <div class="absolute top-5 right-5 flex flex-col gap-2 overflow-hidden z-10">
                  <div class="flex flex-col gap-[6px] transition-all duration-300 ease-in-out">
                    <button 
                      @click="addToWishlist(selectedProduct?.id ?? 0)" 
                      title="Add to wishlist" 
                      :class="`${isInCart(selectedProduct?.id ?? 0) ? 'stroke stroke-red-700 text-red-700' : 'text-neutral-500'} cursor-pointer size-16 p-2 bg-white hover:bg-neutral-200 border border-transparent hover:border-neutral-800 flex items-center justify-center text-[20px] transition-all duration-1000 ease-in-out`"
                    >
                      <FavoriteIcon/>
                    </button>
                    <button 
                      @click="toggleImageQuickview(selectedProduct?.id ?? 0)" 
                      :title="`${isExpanded ? 'Cancel Quick view' : 'Quick view'}`" 
                      :class="`cursor-pointer size-16 p-2 bg-white hover:bg-neutral-200 border border-transparent ${isExpanded ? 'hover:border-red-700 text-[30px] hover:text-red-700' : 'hover:border-neutral-800 text-[20px]'} text-neutral-500 flex items-center justify-center transition-all duration-1000 ease-in-out`"
                    >
                      <span v-if="isExpanded"><CancelIcon/></span>
                      <span v-else><SearchIcon/></span>
                    </button>
                  </div>
                </div>
                <div :class="`${isExpanded ? 'h-full w-full' : 'h-[40rem] w-full'}`">
                  <img 
                    loading="lazy" 
                    :src="selectedProduct?.image ? selectedProduct?.image : '/src/assets/images/product/decor/2.jpg'" 
                    :alt="`product: ${selectedProduct?.name}`" 
                    :class="`opacity-100 ${isExpanded ? 'h-full w-full ' : 'h-[40rem] w-full '} object-cover group-hover:opacity-0 transition-all duration-1000 ease-in-out`"
                  />
                  <img 
                    loading="lazy" 
                    :src="selectedProduct?.hover_image ? selectedProduct?.hover_image : '/src/assets/images/product/decor/3.jpg'" 
                    :alt="`product: ${selectedProduct?.name}`" 
                    :class="`absolute top-0 left-0 opacity-0 ${isExpanded ? 'h-full w-full ' : 'h-[40rem] w-full '} object-cover group-hover:opacity-100 transition-all duration-1000 ease-in-out`"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="w-1/2 p-4 self-center">
            <h2 class="py-3 text-3xl font-bold">{{ selectedProduct.name }}</h2>
            <p class="py-3 text-xl text-gray-700 flex flex-col"><span class="text-neutral-800 underline">Description</span> <span>{{ selectedProduct.description }}</span></p>
            <p class="py-3 text-lg text-gray-700">Stock: <strong>{{ selectedProduct.stock }}</strong></p>
            <p class="py-3 text-lg text-gray-700">Category: <strong>{{ selectedProduct.category }}</strong></p>
            <p class="py-3 text-3xl font-semibold mt-2"><strong>${{ selectedProduct.price }}</strong></p>
            <button 
                @click="addToCart(selectedProduct.id, 1)" 
                :class="`${selectedProduct.stock && selectedProduct.stock % 2 === 0 ? 'disable cursor-default' : 'cursor-pointer'} leading-none translate-y-full group-hover:-translate-y-2 text-red-700 text-lg transition-all duration-300 ease-in-out`"
            >
                {{ selectedProduct.stock && selectedProduct.stock % 2 === 0 ? 'Out of Stock' : '+ Add to cart' }}
            </button>
          </div>
        </div>

      </div>
      <CTA />
    </main>
  </AppLayout>
</template>

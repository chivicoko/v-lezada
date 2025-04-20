<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { onMounted, ref } from "vue";
import CartIcon from "@/components/icons/CartIcon.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import ConfirmDeleteModal from "@/components/ConfirmDeleteModal.vue"
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import type { Product } from '@/types'
import { initialProduct } from '@/data'

const cartStore = useCartStore()

const { cart, cartTotal, isLoading } = storeToRefs(cartStore);
const { fetchCart, removeFromCart, handleCartUpdate } = cartStore;

const isOpen = ref(false);
const currentItem = ref<Product>(initialProduct);

const cancelDelete = () => {
  isOpen.value = false;
  // console.log(isOpen.value)
}

const openModal = (id: number) => {
  const item = cart.value.find((item) => item.id === id);
  if (item) {
    currentItem.value = item;
  }
  isOpen.value = true;
}

const handleDelete = (id: number) => {
  removeFromCart(id);
  isOpen.value = false;
}

onMounted(() => {
  fetchCart()
  // console.log(cart.value);
})

</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-24 px-42">
        <div v-if="isLoading" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>

        <div v-else-if="cart.length > 0" class="w-full h-full">
          <div class="w-full h-full border border-neutral-300 divide-y-1 divide-neutral-300">
            <div class="flex items-center justify-between gap-6 py-4 px-6">
              <p class="text-lg w-[50%] uppercase">Product</p>
              <p class="text-lg w-[13%] uppercase">Price</p>
              <p class="text-lg w-[10%] uppercase">quantity</p>
              <p class="text-lg w-[24%] pl-3 uppercase">
                <span>total</span>
                <span>&nbsp;</span>
              </p>
            </div>

            <div v-for="item in cart" :key="item.id" class="flex items-center justify-between gap-6 p-6">
              <div class="flex items-center gap-6 w-[50%]">
                <img :src="`${item.product.image}`" alt="" class="w-30 h-40 object-cover"/>
                <p class="text-gray-600 truncate">{{ item.product.name }}</p>
              </div>
              <div class="w-[13%]">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                  <span class="font-bold">${{ item.product.price }}</span>
                </p>
              </div>
              <div class="flex items-center justify-start gap-9 border-b border-neutral-300 w-[10%]">
                <button @click="handleCartUpdate(item.id, 'decrease')" class="cursor-pointer text-2xl">-</button>
                <p class="flex items-center gap-8">
                  <span class="font-bold">{{ item.quantity }}</span>
                </p>
                <button @click="handleCartUpdate(item.id, 'increase')" class="cursor-pointer text-2xl">+</button>
              </div>
              <div class="w-[24%] flex items-center justify-between gap-6 pl-3">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                  <span class="font-bold">${{ (parseFloat(item.product.price) * item.quantity).toFixed(2) }}</span>
                </p>
                <button @click="openModal(item.id)" class="cursor-pointer py-2 px-4 border border-neutral-300 text-neutral-300 text-2xl hover:text-red-700 hover:border-red-700">
                  &times;
                </button>
              </div>
            </div>
          </div>
          
          <div class="py-6 border-b border-neutral-300 flex items-center justify-between">
            <div class="w-1/2 flex items-end justify-start gap-4">
              <input type="text" placeholder="Enter your coupon code" class="w-[70%] border-b-2 border-neutral-300 focus:px-3 py-2 outline-0" />
              <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white whitespace-nowrap hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">Apply coupon</button>
            </div>
            <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">clear cart</button>
          </div>

          <div class="w-full pt-24 pb-6 flex items-center justify-end">
            <div class="w-[35%] bg-neutral-100 p-10">
              <h3 class="text-center text-3xl">Cart totals</h3>
              <div class="py-10">
                <div class="flex items-center justify-between gap-6">
                  <p class="uppercase text-lg">subtotal</p>
                  <p class="text-lg">${{cartTotal.toFixed(2)}}</p>
                </div>
                <div class="flex items-center justify-between gap-6 py-5">
                  <p class="uppercase text-lg">total</p>
                  <p class="text-2xl font-semibold">${{cartTotal.toFixed(2)}}</p>
                </div>
              </div>
              
              <div class="flex items-center justify-center">  
                <RouterLink to="/checkout" :disabled="cart.length < 1" class="disabled:cursor-not-allowed disabled:bg-neutral-800/50 disabled:border-0 disabled:text-neutral-600 cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
                  proceed to checkout
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
          
        <div v-else class="w-full h-full flex flex-col items-center justify-center gap-6">
          <span class="text-9xl font-bold"><CartIcon/></span>
          <p class="text-lg text-neutral-500">No items found in cart</p>
          <RouterLink to="/" class="cursor-pointer uppercase px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-lg text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
            Add items
          </RouterLink>
        </div>
      </div>
    </Section>
      
    <ConfirmDeleteModal  
      v-if="isOpen"
      :cancelDelete="cancelDelete" 
      :handleDelete="handleDelete" 
      :item="currentItem" 
      :isLoading="isLoading" 
      mode="cart"
    />
  </AppLayout>
</template>
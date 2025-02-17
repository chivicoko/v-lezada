<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { ref } from "vue";
import CartIcon from "@/components/icons/CartIcon.vue";

const cartItems = ref([
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
        quantity: 3,
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
        quantity: 2,
    },
]);

</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-24 px-42">

        <div v-if="cartItems.length > 0" class="w-full h-full">
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

            <div v-for="item in cartItems" :key="item.id" class="flex items-center justify-between gap-6 p-6">
              <div class="flex items-center gap-6 w-[50%]">
                <img :src="`/src/assets/images/product/decor/${item.img1}`" alt="" class="w-30 h-40 object-cover"/>
                <p class="text-gray-600 truncate">{{ item.title }}</p>
              </div>
              <div class="w-[13%]">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                  <span class="font-bold">${{ item.price }}</span>
                </p>
              </div>
              <div class="flex items-center justify-start gap-9 border-b border-neutral-300 w-[10%]">
                <button class="cursor-pointer text-2xl">-</button>
                <p class="flex items-center gap-8">
                  <span class="font-bold">{{ item.quantity }}</span>
                </p>
                <button class="cursor-pointer text-2xl">+</button>
              </div>
              <div class="w-[24%] flex items-center justify-between gap-6 pl-3">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                  <span class="font-bold">${{ item.price * item.quantity }}</span>
                </p>
                <button class="cursor-pointer py-2 px-4 border border-neutral-300 text-neutral-300 text-2xl hover:text-red-700 hover:border-red-700">&times;</button>
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
                  <p class="text-lg">$130.60</p>
                </div>
                <div class="flex items-center justify-between gap-6 py-5">
                  <p class="uppercase text-lg">total</p>
                  <p class="text-2xl font-semibold">$130.60</p>
                </div>
              </div>
              
              <div class="flex items-center justify-center">  
                <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">proceed to checkout</button>
              </div>
            </div>
          </div>
        </div>
          
        <div v-else class="w-full h-full flex flex-col items-center justify-center gap-6">
          <span class="text-9xl font-bold"><CartIcon/></span>
          <p class="text-lg text-neutral-500">No items found in cart</p>
          <button class="cursor-pointer uppercase px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-lg text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">Add items</button>
        </div>
      </div>
    </Section>
  </AppLayout>
</template>
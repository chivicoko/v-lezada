<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { ref } from "vue";
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue";

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
]);

</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-24 px-42">
        
        <div v-if="wishlistItems.length > 0" class="w-full h-full">
          <div class="w-full h-full border border-neutral-300 divide-y-2 divide-neutral-300">
            <div class="flex items-center justify-between gap-6 py-4 px-6">
              <p class="text-lg uppercase">Product</p>
              <p class="text-lg uppercase">Price</p>
              <p class="text-lg uppercase">&nbsp;</p>
            </div>

            <div v-for="item in wishlistItems" :key="item.id" class="flex items-center justify-between gap-6 p-6">
              <div class="flex items-center gap-6">
                <img :src="`/src/assets/images/product/decor/${item.img1}`" alt="" class="w-30 h-40 object-cover"/>
                <p class="text-gray-600 truncate">{{ item.title }}</p>
              </div>
              <div class="flex flex-col gap-1">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                  <span class="text-lg font-bold">${{ item.price }}</span>
                  <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">added</button>
                </p>
              </div>
              <div class="flex flex-col gap-1">
                <button class="cursor-pointer py-2 px-4 border border-neutral-300 text-neutral-300 text-2xl hover:text-red-700 hover:border-red-700">&times;</button>
              </div>
            </div>
            
          </div>
          
          <div class="py-6 border-b border-neutral-300 flex items-center justify-end">
            <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">clear wishlist</button>
          </div>
        </div>
          
        <div v-else class="w-full h-full flex flex-col items-center justify-center gap-6">
          <span class="text-9xl font-bold"><FavoriteIcon/></span>
          <p class="text-lg text-neutral-500">No items found in wishlist</p>
          <button class="cursor-pointer uppercase px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-lg text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">Add items</button>
        </div>
      </div>
    </Section>
  </AppLayout>
</template>
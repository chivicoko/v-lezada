<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { ref } from "vue";
import ShareIcon from "@/components/icons/ShareIcon.vue";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import TransparentStar from "@/components/icons/TransparentStar.vue";
import YellowStar from "@/components/icons/YellowStar.vue";

const compareItems = ref([
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
        rating: 3,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id',
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
        rating: 4,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id',
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
        rating: 5,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id',
    },
    {
        id: 4,
        title: 'Product Decor 4',
        price: 16.50,
        old_price: 19.00,
        percentageDiscount: 0.00,
        new: true,
        out: false,
        img1: '6.jpg',
        img2: '1.jpg',
        rating: 4,
        description: 'Lorem ipsum dolor sit amet, tempor incidid id Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id Lorem ipsum dolor sit amet, consectetur adipiscing elit in fac sapien sed do eiusmod tempor incidid id',
    },
]);

</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-16 px-42">
        <div v-if="compareItems.length > 0" class="flex h-fit">
          <div class="bg-neutral-200 min-h-full w-1/5 py-8 flex flex-col justify-between">
            <p class="px-8 h-[238px]">Product Info</p>
            <p class="px-8 py-3 border-y border-neutral-300">Price</p>
            <p class="px-8">Description</p>
            <p class="px-8 pt-[17px] border-t border-neutral-300">Rating</p>
          </div>

          <div class="w-4/5 border-r border-y border-neutral-300 grid grid-cols-4 divide-x divide-neutral-300">
            <div v-for="item in compareItems" :key="item.id" class="py-8 flex flex-col justify-between gap-4 text-neutral-700 divide-y divide-neutral-300">
              <div class="flex flex-col gap-4 ">
                <div class="flex items-center justify-center">
                  <button class="cursor-pointer hover:text-red-700 text-2xl transition-all duration-300 ease-in-out"><TrashIcon /></button>
                </div>
                
                <div class="flex items-center justify-center">
                  <RouterLink to="/">
                    <img :src="`/src/assets/images/product/decor/${item.img1}`" :alt="`${item.title} preview`" class="w-50 h-60 object-cover" />
                  </RouterLink>
                </div>
    
                <div class="flex flex-col items-center justify-center gap-2 pb-2 px-4">
                  <h3 class="text-lg text-neutral-800">{{item.title}}</h3>
                  <button class="cursor-pointer uppercase px-8 py-1 bg-transparent hover:bg-neutral-800 text-lg text-neutral-800 hover:text-white border border-neutral-800 hover:border-transparent transition-all duration-300 ease-in-out">Added</button>
                </div>
              </div>
  
              <div class="flex items-center justify-center gap-3 pb-2 px-4">
                <del class="cross-through text-neutral-400">${{item.old_price}}</del>
                <p class="text-neutral-800">${{item.price}}</p>
              </div>
  
              <div class="pb-2 px-4 flex-1">
                <p class="text-center text-sm">{{item.description}}</p>
              </div>
  
              <div class="flex items-center justify-center gap-3 py-1 px-4">
                <span v-for="(_, index) in [...Array(item.rating)]" :key="index" class="text-yellow-500">
                  <YellowStar/>
                </span>
                <span v-for="(_, index) in [...Array(5 - item.rating)]" :key="index">
                  <TransparentStar/>
                </span>
              </div>
  
            </div>
          </div>
        </div>
          
        <div v-else class="w-full h-full flex flex-col items-center justify-center gap-6">
            <span class="text-9xl font-bold"><ShareIcon/></span>
            <p class="text-lg text-neutral-500">No items to compare</p>
            <button class="cursor-pointer uppercase px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-lg text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">Add items</button>
        </div>
      </div>
    </Section>
  </AppLayout>
</template>
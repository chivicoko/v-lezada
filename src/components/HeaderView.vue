<script setup lang="ts">
import ArrowLeft from "@/components/icons/ArrowLeft.vue"
import ArrowRight from "@/components/icons/ArrowRight.vue"
import { hero_slides } from '@/data';
import {ref} from "vue";

const slide_index = ref(0);
const slide = ref(hero_slides[slide_index.value]);
// console.log(slide);

const handleNext = () => {
    if (slide_index.value === hero_slides.length - 1) {
        slide_index.value = 0;
        slide.value = hero_slides[slide_index.value];
    } else {
        slide_index.value = slide_index.value + 1;
        slide.value = hero_slides[slide_index.value];
    }
}

const handlePrev = () => {
    if (slide_index.value === 0) {
        slide_index.value = hero_slides.length - 1;
        slide.value = hero_slides[slide_index.value];
    } else {
        slide_index.value = slide_index.value - 1;
        slide.value = hero_slides[slide_index.value];
    }
}

const handleScroll = () => {
    const element = document.getElementById('productsContent');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
</script>

<template>
    <div class="flex items-center justify-center gap-16 group w-full transition-all duration-300 ease-in-out overflow-hidden">
        <button @click="handlePrev" class="cursor-pointer text-7xl text-neutral-200 -z-10 group-hover:z-0 translate-x-[9rem] group-hover:translate-x-0 hover:text-neutral-700 transition-all duration-500 ease-in-out"><ArrowLeft/></button>
        <div class="relative">
            <div class="absolute top-1/3 left-18 flex items-start flex-col gap-7">
                <h2 class="uppercase text-blue-400 text-[18px]">{{slide.title}}</h2>
                <p class="capitalize flex flex-col items-start gap-1 text-[35px] text-neutral-700 font-bold">
                    <span>{{slide.p1}}</span>
                    <span>{{slide.p2}}</span>
                </p>
                <button @click="handleScroll" class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">shop now</button>
            </div>
            <img :src="`/src/assets/images/hero-slider/1.jpg`" :alt="`slide ${slide.id}`" class="">
            <!-- <img :src="`/src/assets/images/hero-slider/${slide.img}`" :alt="`slide ${slide.id}`" class=""> -->
        </div>
        <button @click="handleNext" class="cursor-pointer text-7xl text-neutral-200 -z-10  group-hover:z-0 -translate-x-[9rem] group-hover:translate-x-0 hover:text-neutral-700 transition-all duration-500 ease-in-out"><ArrowRight/></button>
    </div>
</template>
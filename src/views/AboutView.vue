<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";

import ArrowLeft from "@/components/icons/ArrowLeft.vue"
import ArrowRight from "@/components/icons/ArrowRight.vue"
import { testimonials_slides } from '@/utils/data';
import {ref} from "vue";

const slide_index = ref(0);
const slide = ref(testimonials_slides[slide_index.value]);
// console.log(slide);

const handleNext = () => {
    if (slide_index.value === testimonials_slides.length - 1) {
        slide_index.value = 0;
        slide.value = testimonials_slides[slide_index.value];
    } else {
        slide_index.value = slide_index.value + 1;
        slide.value = testimonials_slides[slide_index.value];
    }
}

const handlePrev = () => {
    if (slide_index.value === 0) {
        slide_index.value = testimonials_slides.length - 1;
        slide.value = testimonials_slides[slide_index.value];
    } else {
        slide_index.value = slide_index.value - 1;
        slide.value = testimonials_slides[slide_index.value];
    }
}

</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="pt-32 pb-28">
        <p class="text-center uppercase">LEZADA STORE - SIMPLE AND BASIC</p>
        <h2 class="text-center text-5xl py-6">Basic minimalism</h2>

        <div class="flex items-start gap-16 px-16 pt-12">
          <div class="flex-1">
            <img src="/src/assets/images/about/about-bg.png" alt="about us image" />
          </div>

          <div class="flex-1 text-neutral-500">
            <p>Lorem ipsum dolor sit amet, consectetur cing elit. Suspe ndisse suscipit sagittis leo sit estibulum issim Lorem ipsum dolor sit amet, consectetur cing elit. ipsum dolor sit amet, consectetur cing elit. Suspe ndisse suscipit sagittis leo sit es</p>

            <div class="py-6">
              <h3 class="uppercase text-neutral-800">address</h3>
              <P class="pt-2">1800 Abbot Kinney Blvd. Unit D & E Venice</P>
            </div>
            <div class="py-4">
              <h3 class="uppercase text-neutral-800">phone</h3>
              <P class="pt-2">Mobile: (+88) - 1990</P>
              <P class="">Hotline: 1800 - 1102</P>
            </div>
            <div class="py-4">
              <h3 class="uppercase text-neutral-800">email</h3>
              <P class="pt-2">contact@lezadastore.com</P>
            </div>
          </div>
        </div>
      </div>

      <div class="relative px-42 flex items-center justify-center gap-16 group transition-all duration-300 ease-in-out overflow-hidden h-[90vh] w-full bg-center bg-cover" style="background-image: url(../src/assets/images/about/testimonials-bg.png);">
        <button @click="handlePrev" class="absolute top-2/5 left-10 md:left-20 cursor-pointer text-7xl text-neutral-200 z-10 md:opacity-0 md:group-hover:opacity-100 hover:text-neutral-700 transition-all duration-500 ease-in-out"><ArrowLeft/></button>
        <div class="relative flex items-center justify-between gap-6">
          <div class="">
            <img :src="`/src/assets/images/about/${slide.img}`" :alt="`testimonial slide ${slide.id}`" class="">
          </div>
          
          <div class="flex-1 text-neutral-500 text-center">
            <div class="flex items-center justify-center pb-6">
              <img src="/src/assets/images/about/quote.png" :alt="`play button`" class="">
            </div>
            <p class="text-2xl">{{slide.testimony}}</p>
            <div class="py-10">
              <p class="text-neutral-800 font-semibold text-xl">{{slide.name}}</p>
              <p class="text-xl pt-4"> / {{slide.occupation}}</p>
            </div>
          </div>
        </div>
        <button @click="handleNext" class="absolute top-2/5 right-10 md:right-20 cursor-pointer text-7xl text-neutral-200 z-10 md:opacity-0 md:group-hover:opacity-100 hover:text-neutral-700 transition-all duration-500 ease-in-out"><ArrowRight/></button>
      </div>

      <div class="py-24">
        <div class="flex flex-col items-center justify-center gap-6 overflow-hidden h-[90vh] w-full bg-center bg-cover" style="background-image: url(../src/assets/images/about/about-video-bg-2.png);">
          <button class="cursor-pointer">
            <img src="/src/assets/images/about/icon-play-100x100.png" :alt="`play button`" class="hover:scale-130 transition-all duration-700 ease-in-out">
          </button>
          <h3 class="uppercase text-5xl text-white">our story</h3>
        </div>
      </div>

      
      <div class="px-32 pb-28 flex items-center justify-center gap-16">
        <div class="flex-1">
          <p class="uppercase text-neutral-600">On at oders over $99</p>
          <h2 class="text-4xl py-6 text-neutral-800">Free shipping & return</h2>
          <p class="text-neutral-500">Lorem ipsum dolor sit amet, consectetur cing elit. Suspe ndisse suscipit sagittis leo sit met condimentum estibulum issim Lorem ipsum dolor sit amet, consectetur cing elit.</p>
        </div>

        <div class="flex-1">
          <p class="uppercase text-neutral-600">Support 24/7</p>
          <h2 class="text-4xl py-6 text-neutral-800">Money back</h2>
          <p class="text-neutral-500">Lorem ipsum dolor sit amet, consectetur cing elit. Suspe ndisse suscipit sagittis leo sit met condimentum estibulum issim Lorem ipsum dolor sit amet, consectetur cing elit.</p>
        </div>
      </div>

    </Section>
  </AppLayout>
</template>
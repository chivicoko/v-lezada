<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { ref } from "vue";
import ShareIcon from "@/components/icons/ShareIcon.vue";
import CalendarIcon from "@/components/icons/CalendarIcon.vue";

const blogPosts = ref([
    {
        id: 1,
        title: 'Perfect Perfume & Cologne',
        date: 'June 5, 2020',
        description: "Michele seemed to say, was the 21st-century Gucci girl, an eccentric, fresh-faced weirdo who wasn't afraid to wear backless fur-lined loafers, to personify the idea of “ugly pretty.",
    },
    {
        id: 2,
        title: 'Shirt Color Picking Guide',
        date: 'June 5, 2020',
        description: "Michele seemed to say, was the 21st-century Gucci girl, an eccentric, fresh-faced weirdo who wasn't afraid to wear backless fur-lined loafers, to personify the idea of “ugly pretty.",
    },
    {
        id: 3,
        title: 'Chic Fashion Phenomenon',
        date: 'June 5, 2020',
        description: "Michele seemed to say, was the 21st-century Gucci girl, an eccentric, fresh-faced weirdo who wasn't afraid to wear backless fur-lined loafers, to personify the idea of “ugly pretty.",
    },
    {
        id: 4,
        title: 'T-Shirts as Minimalist Style',
        date: 'June 5, 2020',
        description: "Michele seemed to say, was the 21st-century Gucci girl, an eccentric, fresh-faced weirdo who wasn't afraid to wear backless fur-lined loafers, to personify the idea of “ugly pretty.",
    },
]);

</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-16 px-42">
        <div v-if="blogPosts.length > 0" class="">
            <h2 class="text-5xl text-center py-3 capitalize">From our blog</h2>
            <p class="text-lg text-center text-neutral-500 py-1">Lorem ipsum dolor sit amet, consecte tur cing elit. Suspe ndisse suscipit sagittis leo sit met condim entum.</p>
            <div class="grid grid-cols-3 gap-7 pt-5">
                <div v-for="item in blogPosts" :key="item.id" class="py-8 text-neutral-700 space-y-3">
                    <p class="flex items-center gap-1">
                        <span><CalendarIcon /></span>
                        <span class="text-neutral-500">{{item.date}}</span>
                    </p>
                    <RouterLink :to="`/blog-posts/${item.title}`" class="cursor-pointer text-2xl text-neutral-800">{{item.title}}</RouterLink>
                    <p class="text-neutral-500 py-3">{{item.description}}</p>
                    <RouterLink :to="`/blog-posts/${item.title}`" class="uppercase cursor-pointer hover:text-red-700 transition-all duration-300 ease-in-out underline">read more</RouterLink>
                </div>
            </div>
        </div>
          
        <div v-else class="w-full h-full flex flex-col items-center justify-center gap-6">
            <span class="text-9xl font-bold"><ShareIcon/></span>
            <p class="text-lg text-neutral-500">No blog posts available now</p>
            <button class="cursor-pointer uppercase px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-lg text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">Add items</button>
        </div>
      </div>
    </Section>
  </AppLayout>
</template>
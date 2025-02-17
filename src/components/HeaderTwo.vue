<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";

const dynamicSlug = ref(['']);
const route = useRoute();
const pathName = route.path.slice(1, route.path.length).split('/').map(item => item.trim()).filter(item => item !== '');
// console.log(pathName[0]);
const updatedPathName = pathName[0].split('-').map(item => item.trim()).filter(item => item !== '');

if (pathName[1]) {
    const updatedDynamicSlug = pathName[1].split('%20').map(item => item.trim()).filter(item => item !== ' ');
    dynamicSlug.value = updatedDynamicSlug;
}
// console.log(dynamicSlug.value);

// console.log(route.params);
// const id = route.params.id;
</script>

<template>
    <div class="relative h-[40vh] w-full bg-bottom-right bg-cover" style="background-image: url(../src/assets/images/breadcrumb-bg-1.png);">
        <div class="w-full h-full absolute top-1/3 left-46">
            <h1 class="text-5xl pb-4 capitalize flex items-center gap-2">
                <span v-for="(path, index) in updatedPathName" :key="index">{{path}} </span>
                <span v-if="dynamicSlug.length > 0" class="capitalize flex items-center gap-2">
                    -<span v-for="(path, index) in dynamicSlug" :key="index"> {{path}} </span>
                </span>
            </h1>
            <div class="flex items-center gap-4 pt-6">
                <RouterLink to="/" class="text-neutral-500">Home</RouterLink>
                <span class="text-neutral-500">/</span>
                <p class="capitalize flex items-center gap-2">
                    <span v-for="(path, index) in updatedPathName" :key="index">{{path}} </span>
                </p>
            </div>
        </div>
    </div>
</template>
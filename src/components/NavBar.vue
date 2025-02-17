<script setup lang="ts">
import SearchIcon from "@/components/icons/SearchIcon.vue"
import PersonIcon from "@/components/icons/PersonIcon.vue"
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import CartIcon from "@/components/icons/CartIcon.vue"
import ArrowDown from "@/components/icons/ArrowDown.vue"
import CartView from "@/components/CartView.vue"
import WishlistView from "@/components/WishlistView.vue"
import { nav_tabs, blogTab, pagesTab } from '@/utils/data';
import { ref } from 'vue';

const isVisible = ref(false);
const isCartbarVisible = ref(false);
const isWishlistbarVisible = ref(false);

// for cart
const toggleCartbarVisibility = () => {
    if (isCartbarVisible.value === false) {
        isCartbarVisible.value = true;
    } else {
        isCartbarVisible.value = false;
    }
};

// for wishlist
const toggleWishlistbarVisibility = () => {
    if (isWishlistbarVisible.value === false) {
        isWishlistbarVisible.value = true;
    } else {
        isWishlistbarVisible.value = false;
    }
};

// for navbar
const toggleVisibility = () => {
    if (window.scrollY > 85) {
        isVisible.value = true;
        // console.log(isVisible.value);
    } else {
        isVisible.value = false;
        console.log(isVisible.value);
    }
};

window.addEventListener('scroll', toggleVisibility);

// window.addEventListener('scroll', () => {
//         if (window.scrollY > 85) {
//             isVisible.value = true;
//             // console.log(isVisible.value);
//         } else {
//             isVisible.value = false;
//             // console.log(isVisible.value);
//         }
//     }
// );

</script>

<template>
    <nav :class="`${isVisible ? 'shadow-lg sticky top-0 left-0 right-0 z-40' : 'normal'} w-full py-[27px] px-[49.5px] bg-white flex items-center justify-between`">
        <RouterLink to="/" class="">
            <img src="@/assets/images/logo.png" alt="logo" class="">
        </RouterLink>
        
        <ul class="flex items-center gap-12 relative">
            <li v-for="tab in nav_tabs" :key="tab.id" class="group">
                <button class="flex items-center gap-2 cursor-pointer overflow-hidden">
                    <span class="">
                        <span class="text-[15px] text-gray-500 group-hover:text-gray-800 font-semibold">{{tab.tabTitle}}</span>
                        <div class="h-[1.7px] w-full bg-transparent transform -translate-x-full group-hover:-translate-x-0 group-hover:bg-black transition-all duration-300 ease-in-out"></div>
                    </span>
                    <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span>
                </button>
                
                <!-- dropdowns -->
                <span class="hidden group-hover:block absolute -bottom-[277.5px] left-1/2 -translate-x-1/2 w-fit px-15 bg-white z-50 shadow-sm">
                    <div class="flex items-start gap-10 divide-x-1 divide-neutral-300 px-4 border">
                        <div v-for="item in tab.dropdownItems" :key="item.id" class="h-full flex flex-col gap-3 py-9 pr-[5.5rem]">
                            <h2 class="font-semibold whitespace-nowrap">{{ item.title }}</h2>
                            <ul v-for="(itemText, index) in item.items" :key="index" class="">
                                <li class="whitespace-nowrap text-neutral-500 hover:underline"><RouterLink to="/">{{itemText.title}}</RouterLink></li>
                            </ul>
                        </div>
                        <div class="h-[230px] w-[200px] p-0">
                            <img v-if="tab.img" :src="`/src/assets/images/menu-image/${tab.img}`" alt="menu image" class="h-full w-full object-cover">
                        </div>
                    </div>
                </span>
            </li>
            
            <li class="group relative">
                <button class="flex items-center gap-2 cursor-pointer overflow-hidden">
                    <span class="">
                        <span class="text-[15px] text-gray-500 group-hover:text-gray-800 font-semibold">Pages</span>
                        <div class="h-[1.7px] w-full bg-transparent transform -translate-x-full group-hover:-translate-x-0 group-hover:bg-black transition-all duration-300 ease-in-out"></div>
                    </span>
                    <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span>
                </button>
                
                <!-- dropdowns -->
                <div class="hidden group-hover:block absolute -bottom-[251.5px] left-6 -translate-x-1/2 w-fit py-4 px-12 bg-white z-50">
                    <ul v-for="item in pagesTab" :key="item.id" class="">
                        <li class="whitespace-nowrap py-1 hover:underline text-neutral-500"><RouterLink :to="`/${item.url}`">{{item.title}}</RouterLink></li>
                    </ul>
                </div>
            </li>

            <li class="group relative">
                <button class="flex items-center gap-2 cursor-pointer overflow-hidden">
                    <span class="">
                        <span class="text-[15px] text-gray-500 group-hover:text-gray-800 font-semibold">Blog</span>
                        <div class="h-[1.7px] w-full bg-transparent transform -translate-x-full group-hover:-translate-x-0 group-hover:bg-black transition-all duration-300 ease-in-out"></div>
                    </span>
                    <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span>
                </button>
                
                <!-- dropdowns -->
                <div class="hidden group-hover:block absolute -bottom-[187.5px] left-6 -translate-x-1/2 w-fit py-4 bg-white z-50">
                    <div class="w-full h-full px-12">
                        <ul v-for="item in blogTab" :key="item.id" class="relative w-full flex flex-col gap-3 h-full">
                            <li class="whitespace-nowrap w-full flex items-center justify-between gap-12 py-1">
                                <span>{{item.title}}</span>
                                <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span>
                            </li>
                            <!-- <li class="whitespace-nowrap absolute right-0 top-0 bg-white">
                                <ul v-for="(itemText, index) in item.menu" :key="index">
                                    <li class="whitespace-nowrap">{{itemText}}</li>
                                </ul>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </li>

        </ul>

        <div class="flex items-center gap-[30.1px]">
            <button class="cursor-pointer text-[20px] text-gray-800"><SearchIcon/></button>
            <button class="cursor-pointer text-[20px] text-gray-800"><PersonIcon/></button>
            <button @click="toggleWishlistbarVisibility" class="cursor-pointer text-[20px] text-gray-800"><FavoriteIcon/></button>
            <button @click="toggleCartbarVisibility" class="cursor-pointer text-[20px] text-gray-800"><CartIcon/></button>
        </div>
    </nav>

    <div v-if="isCartbarVisible || isWishlistbarVisible" className="fixed inset-0 p-2 flex items-center justify-center bg-transparent opacity- z-50">
        <div :class="`${isCartbarVisible ? 'translate-x-0 fixed' : 'translate-x-full'} absolute top-0 right-0 z-50 h-screen w-94 px-4 py-3 bg-white shadow-xl transition-all duration-700 ease-in-out`">
            <CartView :toggleCartbarVisibility="toggleCartbarVisibility" />
        </div>
        <div :class="`${isWishlistbarVisible ? 'translate-x-0 fixed' : 'translate-x-full'} absolute top-0 right-0 z-50 h-screen w-94 px-4 py-3 bg-white shadow-xl transition-all duration-700 ease-in-out`">
            <WishlistView :toggleWishlistbarVisibility="toggleWishlistbarVisibility" />
        </div>
    </div>
</template>

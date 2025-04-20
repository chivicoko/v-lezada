<script setup lang="ts">
import SearchIcon from "@/components/icons/SearchIcon.vue"
import PersonIcon from "@/components/icons/PersonIcon.vue"
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue"
import CartIcon from "@/components/icons/CartIcon.vue"
import ArrowDown from "@/components/icons/ArrowDown.vue"
import CartView from "@/components/CartView.vue"
import WishlistView from "@/components/WishlistView.vue"
import { nav_tabs, blogTab, pagesTab } from '@/data';
import { ref } from 'vue';
// import { debounce } from 'lodash';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";

const isVisible = ref(false);
const isCartbarVisible = ref(false);
const isWishlistbarVisible = ref(false);
const isDropdownMenuVisible = ref(false);
const dropdownStates = ref({});

const router = useRouter();

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();

const { cartCount } = storeToRefs(cartStore)
const { wishlist } = storeToRefs(wishlistStore);
const { logoutUser } = authStore;

const handleLogout = () => {
    logoutUser();
    router.push('/login-register');
};

// const handleDropdownToggle = (id: number) => {
//     if (!id) return;
//     isDropdownMenuVisible.value = !isDropdownMenuVisible.value;
// }

const handleDropdownToggle = (id: number) => {
    dropdownStates.value = {
        ...dropdownStates.value,
        [id]: !dropdownStates.value[id],
    };
    console.log(dropdownStates.value);
};

const handleDropdownHover = (id: number) => {
    dropdownStates.value = {
        ...dropdownStates.value,
        [id]: true,
    };
};

const isDropdownVisible = (id: number) => {
    return !!dropdownStates.value[id];
};


const handleDropdownMouseover = () => {
    isDropdownMenuVisible.value = true;
}

const handleDropdownMouseout = () => {
    isDropdownMenuVisible.value = !isDropdownMenuVisible.value;
}

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
        // console.log(isVisible.value);
    }
};

window.addEventListener('scroll', toggleVisibility);
// window.addEventListener('scroll', debounce(toggleVisibility, 100));
</script>

<template>
    <nav :class="`relative ${isVisible ? 'shadow-lg sticky top-0 left-0 right-0 z-30' : 'normal'} w-full px-[49.5px] bg-white flex items-center justify-between`">
        <RouterLink to="/" class="">
            <img src="@/assets/images/logo.png" alt="logo" class="">
        </RouterLink>
        
        <ul class="flex items-center">
            <li v-for="tab in nav_tabs" :key="tab.id" class="group">
                <button @click="handleDropdownToggle(tab.id)" @mouseover="handleDropdownHover(tab.id)" class="cursor-pointer py-[27px] px-6">
                    <span class="flex items-center gap-2 overflow-hidden">
                        <span class="">
                            <span class="text-[15px] text-gray-500 group-hover:text-gray-800 font-semibold">{{tab.tabTitle}}</span>
                            <div class="h-[1.7px] w-full bg-transparent transform -translate-x-full group-hover:-translate-x-0 group-hover:bg-black transition-all duration-300 ease-in-out"></div>
                        </span>
                        <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span>
                    </span>
                </button>
                
                <!-- dropdowns -->
                <!-- <span class="overflow-hidden absolute top-[80.5px] left-1/2 -translate-x-1/2 w-full h-[50vh] px-15 bg-transparent z-50">
                    <span :class="`${isDropdownVisible(tab.id) ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} w-fit px-15 bg-white shadow-sm transition-all duration-700 ease-in-out flex items-start gap-10 divide-x-1 divide-neutral-300`">
                        <span v-for="item in tab.dropdownItems" :key="item.id" class="h-full flex flex-col gap-3 py-9 pr-[5.5rem]">
                            <h2 v-if="item.title" class="font-semibold whitespace-nowrap">{{ item.title }}</h2>
                            <ul v-for="(itemText, index) in item.items" :key="index" class="">
                                <li class="whitespace-nowrap text-neutral-500 hover:underline"><RouterLink to="/">{{itemText.title}}</RouterLink></li>
                            </ul>
                        </span>
                        <span v-if="tab.img" class="h-[230px] w-[200px] p-0">
                            <img :src="`/src/assets/images/menu-image/${tab.img}`" alt="menu image" class="h-full w-full object-cover">
                        </span>
                    </span>
                </span> -->
            </li>
            
            <!-- pages tab -->
            <!-- <li class="group relative">
                <button class="flex items-center gap-2 cursor-pointer overflow-hidden">
                    <span class="">
                        <span class="text-[15px] text-gray-500 group-hover:text-gray-800 font-semibold">Pages</span>
                        <div class="h-[1.7px] w-full bg-transparent transform -translate-x-full group-hover:-translate-x-0 group-hover:bg-black transition-all duration-300 ease-in-out"></div>
                    </span>
                    <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span>
                </button>
                
                <div class="hidden group-hover:block absolute -bottom-[251.5px] left-6 -translate-x-1/2 w-fit py-4 px-12 bg-white z-50">
                    <ul v-for="item in pagesTab" :key="item.id" class="">
                        <li class="whitespace-nowrap py-1 hover:underline text-neutral-500"><RouterLink :to="`/${item.url}`">{{item.title}}</RouterLink></li>
                    </ul>
                </div>
            </li> -->

            <!-- blog tab -->
            <li class="group relative">
                <button class="flex items-center gap-2 cursor-pointer overflow-hidden">
                    <span class="">
                        <span class="text-[15px] text-gray-500 group-hover:text-gray-800 font-semibold">Blog</span>
                        <div class="h-[1.7px] w-full bg-transparent transform -translate-x-full group-hover:-translate-x-0 group-hover:bg-black transition-all duration-300 ease-in-out"></div>
                    </span>
                    <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span>
                </button>
                
                <!-- blog dropdowns -->
                <div v-show="handleDropdownMouseover" @click="handleDropdownMouseout" :class="`${isDropdownMenuVisible ? 'block' : 'hidden'} absolute -bottom-[187.5px] left-6 -translate-x-1/2 w-fit py-4 bg-white z-50`">
                    <div class="w-full h-full px-12">
                        <ul v-for="blogItem in blogTab" :key="blogItem.id" class="relative w-full flex flex-col gap-3 h-full">
                            <li class="whitespace-nowrap w-full flex items-center justify-between gap-12 py-1">
                                <span>{{blogItem.title}}</span>
                                <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span>
                            </li>
                            <li class="whitespace-nowrap absolute right-0 top-0 bg-white">
                                <ul v-for="item in blogItem.menu" :key="item.id">
                                    <li class="whitespace-nowrap">
                                        <RouterLink :to="item.link">{{item.title}}</RouterLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>

        </ul>

        <div class="flex items-center gap-[30.1px]">
            <button class="cursor-pointer text-[20px] text-gray-800"><SearchIcon/></button>
            <button @click="handleLogout" class="cursor-pointer text-[20px] text-gray-800">
                <PersonIcon/>
            </button>
            <button @click="toggleWishlistbarVisibility" class="cursor-pointer text-[20px] text-gray-800 relative">
                <FavoriteIcon/>
                <div class="size-5 bg-amber-700 text-white text-sm flex items-center justify-center rounded-md absolute -top-3 -right-3 ">{{wishlist.length}}</div>
            </button>
            <button @click="toggleCartbarVisibility" class="cursor-pointer text-[20px] text-gray-800 relative">
                <CartIcon/>
                <div class="size-5 bg-amber-700 text-white text-sm flex items-center justify-center rounded-md absolute -top-3 -right-3 ">{{cartCount}}</div>
            </button>
        </div>
    </nav>

    <!-- cart and wishlist side bars -->
    <div v-if="isCartbarVisible || isWishlistbarVisible" className="fixed inset-0 flex items-center justify-center z-30">
        <div className="fixed inset-0 p-2 flex items-center justify-center bg-black opacity-30 z-10 transition-all duration-700 ease-in-out"></div>

        <div :class="`${isCartbarVisible ? 'translate-x-0 fixed' : 'translate-x-full'} absolute top-0 right-0 z-50 h-screen w-94 px-4 py-3 bg-white shadow-xl transition-all duration-700 ease-in-out`">
            <CartView :toggleCartbarVisibility="toggleCartbarVisibility" />
        </div>
        <div :class="`${isWishlistbarVisible ? 'translate-x-0 fixed' : 'translate-x-full'} absolute top-0 right-0 z-50 h-screen w-94 px-4 py-3 bg-white shadow-xl transition-all duration-700 ease-in-out`">
            <WishlistView :toggleWishlistbarVisibility="toggleWishlistbarVisibility" />
        </div>
    </div>
</template>

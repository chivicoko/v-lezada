<script setup lang="ts">
import SearchIcon from "@/components/icons/SearchIcon.vue";
import PersonIcon from "@/components/icons/PersonIcon.vue";
import FavoriteIcon from "@/components/icons/FavoriteIcon.vue";
import CartIcon from "@/components/icons/CartIcon.vue";
// import ArrowDown from "@/components/icons/ArrowDown.vue";
import CartSidebar from "@/components/sidebars/CartSidebar.vue";
import WishlistSidebar from "@/components/sidebars/WishlistSidebar.vue";
import UserDropdown from "@/components/UserDropdown.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { nav_tabs } from '@/data';
// import { nav_tabs, blogTab, pagesTab } from '@/data';
import { ref, onMounted } from 'vue';
// import { debounce } from 'lodash';
import { useCartStore } from '@/stores/cart';
import { useWishlistStore } from '@/stores/wishlist';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from "vue-router";

const isVisible = ref(false);
const isCartbarVisible = ref(false);
const isWishlistbarVisible = ref(false);
const isUserDropdownOpen = ref(false);
const isActive = ref('/');
// const isDropdownMenuVisible = ref(false);
// const dropdownStates = ref({});

const route = useRoute();
const router = useRouter();

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();

const { cartCount } = storeToRefs(cartStore)
const { wishlist } = storeToRefs(wishlistStore);
const { fetchCart } = cartStore
const { fetchWishlist } = wishlistStore;
const { getUserProfile, logoutUser } = authStore;
const { userProfile, isLoading } = storeToRefs(authStore);

const handleLogout = () => {
    logoutUser();
    router.push('/login-register');
};

const handleTabNavigation = (url: string) => {
    if (route.path === '/') {
        isActive.value = '/';
    }
    
    if (route.path !== '/' && route.path.includes(url)) {
        isActive.value = '/';
    }
    
    router.push(url);
};

const toggleUserDropdown = () => {
    isUserDropdownOpen.value = isUserDropdownOpen.value === false ? true : false;
}

// const handleDropdownToggle = (id: number) => {
//     if (!id) return;
//     isDropdownMenuVisible.value = !isDropdownMenuVisible.value;
// }

// const handleDropdownToggle = (id: number) => {
//     dropdownStates.value = {
//         ...dropdownStates.value,
//         // [id]: !dropdownStates.value[id],
//     };
//     console.log(dropdownStates.value, id);
// };

// const handleDropdownHover = (id: number) => {
//     dropdownStates.value = {
//         ...dropdownStates.value,
//         [id]: true,
//     };
// };

// const isDropdownVisible = (id: number) => {
//     return !!dropdownStates.value[id];
// };


// const handleDropdownMouseover = () => {
//     isDropdownMenuVisible.value = true;
// }

// const handleDropdownMouseout = () => {
//     isDropdownMenuVisible.value = !isDropdownMenuVisible.value;
// }

// for cart
const toggleCartbarVisibility = () => {
    if (isCartbarVisible.value === false) {
        isCartbarVisible.value = true;
    } else {
        isCartbarVisible.value = false;
    }
};

const viewCartPage = () => {
    isCartbarVisible.value = false;
    router.push('/cart');
}

const viewCheckoutPage = () => {
    isCartbarVisible.value = false;
    router.push('/checkout');
}

// for wishlist
const toggleWishlistbarVisibility = () => {
    if (isWishlistbarVisible.value === false) {
        isWishlistbarVisible.value = true;
    } else {
        isWishlistbarVisible.value = false;
    }
};

const viewWishlistPage = () => {
    isWishlistbarVisible.value = false;
    router.push('/wishlist')
}

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

onMounted(() => {
    getUserProfile()
    fetchCart()
    fetchWishlist()
})
</script>

<template>
    <nav v-if="route.path !== '/login-register'" :class="`relative ${isVisible ? 'shadow-lg sticky top-0 left-0 right-0 z-30' : 'normal'} w-full px-[49.5px] bg-white flex items-center justify-between`">
        <div class="w-1/3">
            <RouterLink to="/" class="">
                <img src="/images/logo.png" alt="logo" class="">
            </RouterLink>
        </div>
        
        <ul class="flex items-center justify-center w-1/3">
            <li v-for="tab in nav_tabs" :key="tab.id" class="w-1/5 py-[22px] text-center flex items-center justify-center group">
                <button @click="handleTabNavigation(tab.url)" class="w-full cursor-pointer py-[5px] text-center group">
                    <span class="flex items-center gap-2 overflow-hidden">
                        <span class="">
                            <span :class="`${route.path === tab.url ? 'text-neutral-800' : 'text-gray-500'} text-lg group-hover:text-neutral-800 font-semibold`">{{tab.tabTitle}}</span>
                            <div :class="`${route.path === tab.url ? '-translate-x-0 bg-black' : '-translate-x-full group-hover:-translate-x-0 bg-transparent group-hover:bg-black'} h-[1.7px] w-full transform transition-all duration-300 ease-in-out`"></div>
                        </span>
                        <!-- <span class="pt-1 text-gray-300 group-hover:text-gray-800 text-sm"><ArrowDown/></span> -->
                    </span>
                </button>
            </li>
        </ul>

        <div class="w-1/3 flex items-center justify-end gap-[16.1px] relative">
            <button class="hover:bg-neutral-800/10 rounded-full p-2 cursor-pointer text-[20px] text-gray-800 transition-all duration-300 ease-in-out">
                <SearchIcon/>
            </button>
            <button @click="toggleWishlistbarVisibility" class="hover:bg-neutral-800/10 rounded-full p-2 cursor-pointer text-[20px] text-gray-800 relative transition-all duration-300 ease-in-out">
                <FavoriteIcon/>
                <div class="size-5 bg-red-700 text-white text-xs font-medium flex items-center justify-center rounded-full absolute -top-1 -right-1">
                    {{wishlist.length}}
                </div>
            </button>
            <button @click="toggleCartbarVisibility" class="hover:bg-neutral-800/10 rounded-full p-2 cursor-pointer text-[20px] text-gray-800 relative transition-all duration-300 ease-in-out">
                <CartIcon/>
                <div class="size-5 bg-red-700 text-white text-xs font-medium flex items-center justify-center rounded-full absolute -top-1 -right-1">
                    {{cartCount}}
                </div>
            </button>
            <div v-if="isLoading" class="px-10"><LoadingSpinner /></div>
            <button v-else @click="toggleUserDropdown" class="pl-3 border-l border-l-neutral-300 border-b border-b-transparent hover:border-b-neutral-300 flex items-center gap-2 cursor-pointer text-[20px] text-gray-800 transition-all duration-300 ease-in-out">
                <div class="bg-neutral-800/10 rounded-full p-2 ">
                    <PersonIcon/>
                </div>
                <span class="flex flex-col items-start">
                    <span class="text-sm font-semibold">{{userProfile?.name}}</span>
                    <span class="text-xs">{{userProfile?.email}}</span>
                </span>
                <UserDropdown v-if="isUserDropdownOpen" :handleLogout="handleLogout" />
            </button>
        </div>
    </nav>

    <!-- cart and wishlist side bars -->
    <div v-if="isCartbarVisible || isWishlistbarVisible" className="fixed inset-0 flex items-center justify-center z-30">
        <div className="fixed inset-0 p-2 flex items-center justify-center bg-black opacity-30 z-10 transition-all duration-700 ease-in-out"></div>

        <div :class="`${isCartbarVisible ? 'translate-x-0 fixed' : 'translate-x-full'} absolute top-0 right-0 z-50 h-screen w-94 px-4 py-3 bg-white shadow-xl transition-all duration-700 ease-in-out`">
            <CartSidebar :toggleCartbarVisibility="toggleCartbarVisibility" :viewCartPage="viewCartPage" :viewCheckoutPage="viewCheckoutPage" />
        </div>
        <div :class="`${isWishlistbarVisible ? 'translate-x-0 fixed' : 'translate-x-full'} absolute top-0 right-0 z-50 h-screen w-94 px-4 py-3 bg-white shadow-xl transition-all duration-700 ease-in-out`">
            <WishlistSidebar :toggleWishlistbarVisibility="toggleWishlistbarVisibility" :viewWishlistPage="viewWishlistPage" />
        </div>
    </div>
</template>

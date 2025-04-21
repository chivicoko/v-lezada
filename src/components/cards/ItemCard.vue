<script setup lang="ts">
import type { CartItemProps, WishlistItemProps } from '@/types'

defineProps<{
    openModal: (id: number) => void,
    addToCart?: (id: number, quantity: number) => void,
    handleCartUpdate?: (id: number, quantity: string) => void,
    items: (CartItemProps | WishlistItemProps)[],
    mode?: 'cart' | 'wishlist',
}>();
</script>

<template>
    <div v-for="item in items" :key="item.product.id" class="p-6">
        <div v-if="mode === 'wishlist'" class="flex items-center justify-between gap-5">
            <RouterLink :to="`/products/${item.product?.id}`" class="flex items-center gap-6 hover:bg-neutral-800/10 p-1 transition-all duration-500 ease-in-out">
                <img :src="`${item.product?.image}`" alt="" class="w-30 h-40 object-cover"/>
                <p class="text-gray-600 truncate">{{ item.product?.name }}</p>
            </RouterLink>
            <div class="flex flex-col gap-1">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                    <span class="text-lg font-bold">${{ item.product?.price }}</span>
                    <button @click="addToCart?.(item.id, 1)" class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
                        add
                    </button>
                </p>
            </div>
            <div class="flex flex-col gap-1">
                <button @click="() => openModal(item.id)" class="cursor-pointer py-2 px-4 border border-neutral-300 text-neutral-300 text-2xl hover:text-red-700 hover:border-red-700 transition-all duration-300 ease-in-out">
                    &times;
                </button>
            </div>
        </div>

        <div v-else class="flex items-center justify-between gap-5">
            <RouterLink :to="`/products/${item.product?.id}`" class="flex items-center gap-6 w-[50%] hover:bg-neutral-800/10 p-1 transition-all duration-500 ease-in-out">
                <img :src="`${item.product?.image}`" alt="" class="w-30 h-40 object-cover"/>
                <p class="text-gray-600 truncate">{{ item.product?.name }}</p>
            </RouterLink>
            <div class="w-[13%]">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                    <span class="font-bold">${{ item.product?.price }}</span>
                </p>
            </div>
            <div class="flex items-center justify-start gap-9 border-b border-neutral-300 w-[10%]">
                <button @click="handleCartUpdate?.(item.id, 'decrease')" class="cursor-pointer text-2xl">-</button>
                <p class="flex items-center gap-8">
                    <span class="font-bold">{{ item.quantity }}</span>
                </p>
                <button @click="handleCartUpdate?.(item.id, 'increase')" class="cursor-pointer text-2xl">+</button>
            </div>
            <div class="w-[24%] flex items-center justify-between gap-6 pl-3">
                <p class="text-sm text-gray-500 flex items-center gap-8">
                    <span class="font-bold">${{ (parseFloat(item.product.price ?? '') * (item.quantity ?? 0)).toFixed(2) }}</span>
                </p>
                <button @click="openModal(item.id)" class="cursor-pointer py-2 px-4 border border-neutral-300 text-neutral-300 text-2xl hover:text-red-700 hover:border-red-700 transition-all duration-300 ease-in-out">
                    &times;
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { CartItemProps, WishlistItemProps } from '@/types'

defineProps<{
    openModal: (id: number) => void,
    items: (CartItemProps | WishlistItemProps)[],
}>();
</script>

<template>
    <div v-for="item in items" :key="item.id" class="flex items-start justify-between gap-2 border-b border-neutral-300 py-5">
        <img :src="`${item.product?.image}`" alt="" class="w-20 h-30 object-cover"/>
        <div class="">
            <RouterLink :to="`/products/${item.product?.id}`" class="text-gray-600 text-whitespace pb-3 hover:underline transition-all duration-500 ease-in-out">{{ item.product?.name }}</RouterLink>
            <p class="text-gray-600 truncate">${{ item.product?.price }}</p>
        </div>
        <button @click="openModal(item?.id)" class="cursor-pointer py-2 px-4 text-neutral-300 text-2xl hover:text-red-700 transition-all duration-300 ease-in-out">
            &times;
        </button>
    </div>
</template>
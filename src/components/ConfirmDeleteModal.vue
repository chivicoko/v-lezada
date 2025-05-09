<script setup lang="ts">
import TrashIcon from "@/components/icons/TrashIcon.vue"
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import type { CartItemProps, WishlistItemProps } from '@/types'

defineProps<{
    handleDelete: (id: number) => void,
    handleClearAll?: () => void,
    item: CartItemProps | WishlistItemProps,
    isLoading: boolean,
    cancelDelete: () => void,
    mode: "cart" | "wishlist",
    isClearance?: boolean,
}>();
</script>

<template>
    <section class="fixed inset-0 -top-5 bg-gray-800/95 flex justify-center items-center p-2 z-[999999]">
        <div class="bg-white w-[27rem] rounded-radius-12 shadow-lg flex flex-col justify-center items-center">
            <div class="w-full p-6 flex flex-col items-start justify-between gap-4 rounded-radius-12">
                <div class='rounded-radius-12 size-10 border border-gray-200 flex items-center justify-center'>
                    <span class='text-red-500 text-3xl'><TrashIcon /></span>
                </div>
            
                <div class='pt-3 pb-5 space-y-3'>
                    <h3 class='text-textGrayDarker text-xl font-semibold pb-5'>Delete <span class="underline font-medium">{{isClearance ? 'all items' : item.product.name}}</span> ?</h3>
                    <p class='text-sm'>
                        Are you sure you want to delete <span class="font-semibold">{{isClearance ? 'all items' : item.product.name}}</span> from {{mode === 'cart' ? 'cart' : 'wishlist'}}?
                    </p>
                    <p class='text-sm pt-3'><em>This cannot be undone!</em></p>
                </div>
                
                <div class="w-full flex items-center justify-end gap-3">
                    <button @click="cancelDelete" class='cursor-pointer py-2 px-8 text-sm border hover:bg-neutral-800/10 transition-all duration-300 ease-in-out'>
                        Cancel
                    </button>
                    <button v-if="isClearance" @click="handleClearAll" class='cursor-pointer py-2 px-8 text-sm bg-neutral-800 hover:bg-transparent text-white hover:text-neutral-800 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out'>
                        <LoadingSpinner v-if="isLoading" />
                        <span>{{isLoading ? 'Clearing all...' : 'Clear all'}}</span>
                    </button>
                    <button v-else @click="handleDelete(item.id)" class='cursor-pointer py-2 px-8 text-sm bg-neutral-800 hover:bg-transparent text-white hover:text-neutral-800 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out'>
                        <LoadingSpinner v-if="isLoading" />
                        <span>{{isLoading ? 'Deleting...' : 'Delete'}}</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
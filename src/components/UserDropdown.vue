<script setup lang="ts">

defineProps<{
    handleLogout: () => void;
}>();
</script>

<template>
    <div class="w-36 bg-white absolute top-11 right-[2.7rem] z-50 py-[3px] flex flex-col shadow-md border border-neutral-200">
        <RouterLink to="/checkout" class="w-full h-full py-1 px-4 hover:bg-neutral-800/10 text-base cursor-pointer">Orders</RouterLink>
        <RouterLink to="/my-account" class="w-full h-full py-1 px-4 hover:bg-neutral-800/10 text-base cursor-pointer">Profile</RouterLink>
        <button @click="handleLogout" class="w-full py-1 px-4 hover:bg-neutral-800/10 text-base cursor-pointer">Logout</button>
    </div>
</template>
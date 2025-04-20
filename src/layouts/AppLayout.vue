<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
import FooterView from '@/components/FooterView.vue';
</script>

<template>
    <section class="w-full h-fit min-h-screen flex flex-col items-center relative">
        <NavBar/>
        <div class="overflow-hidden w-full">
            <slot />
        </div>
        <FooterView/>
    </section>
</template>
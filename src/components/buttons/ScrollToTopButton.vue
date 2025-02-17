<script setup lang="ts">
import { ref } from 'vue';

const isVisible = ref(false);

const toggleVisibility = () => {
    if (window.scrollY > 90) {
        isVisible.value = true;
    } else {
        isVisible.value = false;
    }
};

window.addEventListener('scroll', toggleVisibility);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};
</script>

<template>
    <button
        @click="scrollToTop"
        :className="`${isVisible ? 'translate-y-0' : 'translate-y-20'} fixed bottom-5 z-50 right-6 bg-neutral-700 hover:bg-neutral-500 rounded-full text-white text-2xl p-1 size-13 cursor-pointer shadow-lg transition-all duration-300 ease-in-out group focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none`"
    >
        <p className='transition-all duration-200 ease-in-out transform group-hover:-translate-y-2'>↑</p>
    </button>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from '@/stores/authStore';

const email = ref(``);
const password = ref('');

const userData2 = ref({
    email: 'victor.okoye@gmail.com',
    // email: `user${Date.now()}@example.com`,
    password: 'password123',
})

const authStore = useAuthStore();
const { loginUser } = authStore;

const isRegisterd = ref(true);

const handleLogin = () => {
    loginUser({
        email: email.value || userData2.value.email,
        password: password.value || userData2.value.password,
    });
};
</script>

<template>
    <form @submit.prevent="handleLogin" class="flex-1 bg-neutral-100 p-16 flex flex-col items-center justify-center gap-7">
        <h3 class="text-3xl">Login</h3>
        <p class="text-neutral-500">Great to have you back!</p>
        <div class="w-full flex flex-col gap-8">
            <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300 focus-within:border-neutral-700">
                <label for="email" class="text-xl uppercase">email address<span class="text-red-700">*</span> </label>
                <input type="text" :autofocus="isRegisterd" id="email" v-model="email" placeholder="example@email.com" class="py-1 outline-0" />
            </div>
            <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300 focus-within:border-neutral-700">
                <label for="password" class="text-xl uppercase">password<span class="text-red-700">*</span> </label>
                <input type="text" id="password" v-model="password" placeholder="***********" class="py-1 outline-0" />
            </div>
        </div>

        <div class="w-full flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
                <input type="checkbox" id="rememberMe" class="border-2 border-neutral-400 size-4" />
                <label for="rememberMe" class="">Remember me</label>
            </div>
            <RouterLink to="/">Lost your password?</RouterLink>
        </div>

        <div class="flex items-center justify-center pt-6">  
            <button type="submit" class="cursor-pointer uppercase font-semibold px-16 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
                login
            </button>
        </div>
    </form>
</template>
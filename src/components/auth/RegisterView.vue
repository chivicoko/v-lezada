<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from '@/stores/authStore';

const isRegisterd = ref(false);
const name = ref('');
const email = ref(``);
const password = ref('');
const phone_number = ref('');
const address = ref('');

const userData2 = ref({
    name: 'Victor Okoye',
    email: 'victor.okoye@gmail.com',
    // email: `user${Date.now()}@example.com`,
    phone_number: '+1234567890',
    address: '123 Test Street',
    password: 'password123',
})

const authStore = useAuthStore();
const { registerUser } = authStore;

const handleRegister = () => {
    registerUser({
        name: name.value || userData2.value.name,
        email: email.value || userData2.value.email,
        password: password.value || userData2.value.password,
        phone_number: phone_number.value || userData2.value.phone_number,
        address: address.value || userData2.value.address,
    });
    isRegisterd.value = true;
};

</script>

<template>
    <form @submit.prevent="handleRegister" class="flex-1 bg-transparent p-16 flex flex-col items-center justify-center gap-7">
        <h3 class="text-3xl">Register</h3>
        <p class="text-neutral-500">If you don't have an account, register now!</p>
        <div class="w-full flex flex-col gap-8">
            <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300 focus-within:border-neutral-700">
                <label for="name" class="text-xl uppercase">Full Name<span class="text-red-700">*</span> </label>
                <input type="text" :autofocus="!isRegisterd" id="name" v-model="name" placeholder="Victor Adeyemi" class="py-1 outline-0" />
            </div>
            <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300 focus-within:border-neutral-700">
                <label for="email" class="text-xl uppercase">email address<span class="text-red-700">*</span> </label>
                <input type="text" :autofocus="!isRegisterd" id="email" v-model="email" placeholder="example@email.com" class="py-1 outline-0" />
            </div>
            <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300 focus-within:border-neutral-700">
                <label for="phone_number" class="text-xl uppercase">phone number<span class="text-red-700">*</span> </label>
                <input type="text" :autofocus="!isRegisterd" id="phone_number" v-model="phone_number" placeholder="+234 80 8759 8746" class="py-1 outline-0" />
            </div>
            <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300 focus-within:border-neutral-700">
                <label for="address" class="text-xl uppercase">Address<span class="text-red-700">*</span> </label>
                <input type="text" :autofocus="!isRegisterd" id="address" v-model="address" placeholder="No.6 Abeokuta Street, Ilesha, Kano State" class="py-1 outline-0" />
            </div>
            <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300 focus-within:border-neutral-700">
                <label for="password" class="text-xl uppercase">password<span class="text-red-700">*</span> </label>
                <input type="password" id="password" v-model="password" placeholder="***********" class="py-1 outline-0" />
            </div>
        </div>

        <div class="flex items-center justify-center pt-6">  
            <button type="submit" class="cursor-pointer uppercase font-semibold px-16 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
                register
            </button>
        </div>
    </form>
</template>
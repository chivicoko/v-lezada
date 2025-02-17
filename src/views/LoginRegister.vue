<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-24 px-42">

        <div class="w-full h-full flex items-center justify-center gap-6">

            <div class="w-full flex gap-6">
                <form class="flex-1 bg-neutral-100 p-16 flex flex-col items-center justify-center gap-7">
                    <h3 class="text-3xl">Login</h3>
                    <p class="text-neutral-500">Great to have you back!</p>
                    <div class="w-full flex flex-col gap-8">
                        <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                            <label for="emailAddress" class="text-xl uppercase">email address<span class="text-red-700">*</span> </label>
                            <input type="text" id="emailAddress" placeholder="example@email.com" class="py-1 outline-0" />
                        </div>
                        <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                            <label for="password" class="text-xl uppercase">password<span class="text-red-700">*</span> </label>
                            <input type="text" id="password" placeholder="***********" class="py-1 outline-0" />
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
                        <button class="cursor-pointer uppercase font-semibold px-16 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">login</button>
                    </div>
                </form>

                <form class="flex-1 bg-transparent p-16 flex flex-col items-center justify-center gap-7">
                    <h3 class="text-3xl">Register</h3>
                    <p class="text-neutral-500">If you don't have an account, register now!</p>
                    <div class="w-full flex flex-col gap-8">
                        <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                            <label for="emailAddress" class="text-xl uppercase">email address<span class="text-red-700">*</span> </label>
                            <input type="text" id="emailAddress" placeholder="example@email.com" class="py-1 outline-0" />
                        </div>
                        <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                            <label for="password" class="text-xl uppercase">password<span class="text-red-700">*</span> </label>
                            <input type="text" id="password" placeholder="***********" class="py-1 outline-0" />
                        </div>
                    </div>

                    <div class="flex items-center justify-center pt-6">  
                        <button class="cursor-pointer uppercase font-semibold px-16 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">register</button>
                    </div>
                </form>
            </div>
        </div>
          
      </div>
    </Section>
  </AppLayout>
</template>
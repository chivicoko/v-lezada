<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import ClockIcon from "@/components/icons/ClockIcon.vue";
import LocationIcon from "@/components/icons/LocationIcon.vue";
import MailIcon from "@/components/icons/MailIcon.vue";
import PhoneIcon from "@/components/icons/PhoneIcon.vue";
import AppLayout from "@/layouts/AppLayout.vue";
</script>

<template>
    <AppLayout>
        <section class="w-full">
            <HeaderTwo/>

            <div class="pt-32 pb-28">
                <p class="text-center uppercase">come have a look</p>
                <h2 class="text-center text-5xl py-6">Contact detail</h2>

                <div class="flex items-start justify-between gap-6 px-42">
                    <div class="space-y-12">
                        <p class="uppercase py-6 pl-14">Address</p>
                        <p class="flex items-center gap-4">
                            <span class="text-4xl text-neutral-300"><LocationIcon/></span>
                            <span class="text-neutral-500">1800 Abbot Kinney Blvd. Unit D & E Venice</span>
                        </p>
                    </div>

                    <div class="">
                        <p class="uppercase  py-6 pl-13">Contact</p>
                        <p class="flex items-center gap-4">
                            <span class="text-4xl text-neutral-300"><PhoneIcon/></span>
                            <span class="text-neutral-500">Mobile: (+88) - 1990 - 6886</span>
                        </p>
                        <p class="flex items-center gap-4">
                            <span class="text-4xl text-neutral-300"><PhoneIcon/></span>
                            <span class="text-neutral-500">Hotline: 1800 - 1102</span>
                        </p>
                        <p class="flex items-center gap-4">
                            <span class="text-4xl text-neutral-300"><MailIcon/></span>
                            <span class="text-neutral-500">Mail: contact@lezadastore.com</span>
                        </p>
                    </div>

                    <div class="">
                        <p class="uppercase  py-6 pl-13">Hour of operation</p>
                        <p class="flex items-center gap-4">
                            <span class="text-4xl text-neutral-300"><ClockIcon/></span>
                            <span class="text-neutral-500">Monday - Friday : 09:00 - 20:00</span>
                        </p>
                        <p class="flex items-center gap-4">
                            <span class="text-neutral-500 pl-13">Sunday & Saturday: 10:30 - 22:00</span>
                        </p>
                    </div>
                </div>
            </div>

            
            <div class="pt-32 pb-28">
                <h2 class="text-center text-5xl py-6">Get in touch</h2>
                <form class="w-full px-6 sm:px-16 md:px-32 lg:px-96">
                    <div class="flex justify-between gap-12 py-12">
                        <input type="text" placeholder="First Name *" class="border-b-3 border-neutral-300 w-full py-2 focus:outline-0">
                        <input type="text" placeholder="Email *" class="border-b-3 border-neutral-300 w-full py-2 focus:outline-0">
                    </div>
                    <div class="flex justify-between gap-12 pb-12">
                        <input type="text" placeholder="Subject" class="border-b-3 border-neutral-300 w-full py-2 focus:outline-0">
                    </div>
                    <div class="flex justify-between gap-12 pb-12">
                        <textarea rows="4" name="" id="" placeholder="Message" class="border-b-3 border-neutral-300 w-full py-2 focus:outline-0"></textarea>
                    </div>
                    
                    <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">Submit</button>
                </form>

            </div>
        </section>
    </AppLayout>
</template>
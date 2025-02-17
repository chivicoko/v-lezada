<script setup lang="ts">
import TwitterIcon from "@/components/icons/TwitterIcon.vue"
import FacebookIcon from "@/components/icons/FacebookIcon.vue"
import InstagramIcon from "@/components/icons/InstagramIcon.vue"
import YoutubeIcon from "@/components/icons/YoutubeIcon.vue"
</script>

<template>
    <footer class="w-full bg-neutral-100 py-[95px] px-[165px] flex items-center justify-between gap-5">
        <div class="flex flex-col gap-5 p-2 text-gray-600">
            <ul class="flex items-center gap-12">
                <li>
                    <button class="uppercase text-[14px] cursor-pointer">About us</button>
                </li>
                <li>
                    <button class="uppercase text-[14px] cursor-pointer">store location</button>
                </li>
                <li>
                    <button class="uppercase text-[14px] cursor-pointer">contact</button>
                </li>
                <li>
                    <button class="uppercase text-[14px] cursor-pointer">support</button>
                </li>
                <li>
                    <button class="uppercase text-[14px] cursor-pointer">policy</button>
                </li>
                <li>
                    <button class="uppercase text-[14px] cursor-pointer">faqs</button>
                </li>
            </ul>
            <div class="flex items-center gap-3 text-sm">
                <span>&copy; 2025 v-lezada. All rights reserved</span> | <span class="font-bold">(+00) 123 567990</span> | <span>contact@v-lezada.com</span>
            </div>
        </div>
        <div class="flex flex-col items-end gap-5">
            <div class="flex items-center gap-5 text-[15px]">
                <button class="cursor-pointer">
                    <TwitterIcon/>
                </button>
                <button class="cursor-pointer">
                    <FacebookIcon/>
                </button>
                <button class="cursor-pointer">
                    <InstagramIcon/>
                </button>
                <button class="cursor-pointer">
                    <YoutubeIcon/>
                </button>
            </div>
            
            <img src="@/assets/images/pay.png" alt="payment icons" class="">
        </div>
    </footer>
</template>
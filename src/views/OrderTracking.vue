<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="w-full py-24 px-42">

        <div class="w-full h-full flex items-center justify-center gap-6">

            <div class="pb-6 flex flex-col gap-6">
                <form class="w-[40vw] bg-neutral-100 py-12 px-16 flex flex-col items-center justify-center gap-5">
                    <p class="text-neutral-500">To track your order please enter your Order ID in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
                    <div class="w-full flex flex-col gap-6">
                        <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                            <label for="orderId" class="text-xl">Order ID</label>
                            <input type="text" id="orderId" placeholder="Found in your order confirmation email" class="py-1 outline-0" />
                        </div>
                        <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                            <label for="billingEmail" class="text-xl">Billing email</label>
                            <input type="text" id="billingEmail" placeholder="Email you used during checkout" class="py-1 outline-0" />
                        </div>
                    </div>

                    <div class="flex items-center justify-center pt-6">  
                        <button class="cursor-pointer uppercase font-semibold px-16 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">track</button>
                    </div>
                </form>
            </div>
        </div>
          
      </div>
    </Section>
  </AppLayout>
</template>
<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-24 px-42">

        <div class="w-full flex items-start gap-6 h-full">

          <div class="w-4/7 py-6 flex flex-col gap-6">
            <h3 class="underline text-xl font-semibold">Billing Address</h3>

            <form class="flex flex-col gap-9">
                <div class="w-full flex items-end gap-6">
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="firstName" class="uppercase">first name*</label>
                        <input type="text" id="firstName" placeholder="First Name" class="py-1 outline-0" />
                    </div>
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="lastName" class="uppercase">last name*</label>
                        <input type="text" id="lastName" placeholder="Last Name" class="py-1 outline-0" />
                    </div>
                </div>
                <div class="w-full flex items-end gap-6">
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="emailAddress" class="uppercase">email address*</label>
                        <input type="text" id="emailAddress" placeholder="Email Address" class="py-1 outline-0" />
                    </div>
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="phoneNumber" class="uppercase">phone number*</label>
                        <input type="text" id="phoneNumber" placeholder="Phone Number" class="py-1 outline-0" />
                    </div>
                </div>
                <div class="w-full flex items-end gap-6">
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="companyName" class="uppercase">company name</label>
                        <input type="text" id="companyName" placeholder="Company Name" class="py-1 outline-0" />
                    </div>
                </div>
                <div class="w-full flex items-end gap-6">
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="addressLine1" class="uppercase">address*</label>
                        <input type="text" id="addressLine1" placeholder="Address line 1" class="py-1 outline-0" />
                    </div>
                </div>
                <div class="w-full flex items-end gap-6">
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <input type="text" id="addressLine2" placeholder="Address line 2" class="py-1 outline-0" />
                    </div>
                </div>
                <div class="w-full flex items-end gap-6">
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="country" class="uppercase">country*</label>
                        <input type="text" id="country" placeholder="Nigeria" class="py-1 outline-0" />
                    </div>
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="townCity" class="uppercase">town/city*</label>
                        <input type="text" id="townCity" placeholder="Town/City" class="py-1 outline-0" />
                    </div>
                </div>
                <div class="w-full flex items-end gap-6">
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="state" class="uppercase">state*</label>
                        <input type="text" id="state" placeholder="State" class="py-1 outline-0" />
                    </div>
                    <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                        <label for="zipCode" class="uppercase">zip code*</label>
                        <input type="text" id="zipCode" placeholder="Zip Code" class="py-1 outline-0" />
                    </div>
                </div>
            </form>
          </div>

          <div class="w-3/7 pb-6 flex flex-col gap-6">
            <h3 class="underline text-xl font-semibold">Cart Total</h3>

            <div class="w-full bg-neutral-100 p-10">
              <h3 class="flex items-end justify-between gap-4 text-2xl font-semibold py-2">
                <span>Product</span>
                <span>Total</span>
              </h3>

              <p class="flex items-end justify-between gap-4 py-[9px]">
                <span class="text-neutral-500">Lorem ipsum decor x 4</span>
                <span>$54.22</span>
              </p>

              <p class="flex items-end justify-between gap-4 py-[9px]">
                <span class="text-neutral-500">Lorem ipsum decor x 2</span>
                <span>$24.00</span>
              </p>

              <p class="flex items-end justify-between gap-4 py-[9px]">
                <span class="text-neutral-500">Lorem ipsum decor x 5</span>
                <span>$74.45</span>
              </p>

              <p class="flex items-end justify-between gap-4 py-[9px]">
                <span class="text-neutral-500">Lorem ipsum decor x 1</span>
                <span>$14.05</span>
              </p>

              <p class="flex items-end justify-between font-bold gap-4 py-[14px] border-y border-neutral-300">
                <span class="capitalize">sub total</span>
                <span>$294.70</span>
              </p>

              <p class="flex items-end justify-between font-bold gap-4 py-[14px] border-b border-neutral-300">
                <span class="capitalize">shipping fee</span>
                <span>$4.00</span>
              </p>

              <p class="flex items-end justify-between text-lg font-bold gap-4 py-[14px]">
                <span class="capitalize">grand total</span>
                <span>$298.70</span>
              </p>
            </div>

            <h3 class="underline text-xl font-semibold pt-6">Payment Method</h3>
            <div class="w-full bg-neutral-100 p-10 flex flex-col gap-5">
                <div class="flex items-center gap-3">
                    <input type="checkbox" id="checkPayment" class="border-2 border-neutral-400 size-6" />
                    <label for="checkPayment" class="uppercase">check payment</label>
                </div>
                <div class="flex items-center gap-3">
                    <input type="checkbox" id="directBankTransfer" class="border-2 border-neutral-400 size-6" />
                    <label for="directBankTransfer" class="uppercase">direct bank transfer</label>
                </div>
                <div class="flex items-center gap-3">
                    <input type="checkbox" id="cashOnDelivery" class="border-2 border-neutral-400 size-6" />
                    <label for="cashOnDelivery" class="uppercase">cash on delivery</label>
                </div>
                <div class="flex items-center gap-3">
                    <input type="checkbox" id="paypal" class="border-2 border-neutral-400 size-6" />
                    <label for="paypal" class="uppercase">paypal</label>
                </div>
                <div class="flex items-center gap-3">
                    <input type="checkbox" id="payoneer" class="border-2 border-neutral-400 size-6" />
                    <label for="payoneer" class="uppercase">payoneer</label>
                </div>
                <div class="flex items-center gap-3">
                    <input type="checkbox" id="termsAndConditions" class="border-2 border-neutral-400 size-6" />
                    <label for="termsAndConditions" class="uppercase">I've read and accept the terms & conditions</label>
                </div>
            </div>
              
            <div class="flex items-center justify-start">  
              <button class="cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">place order</button>
            </div>
          </div>
        </div>
          
      </div>
    </Section>
  </AppLayout>
</template>
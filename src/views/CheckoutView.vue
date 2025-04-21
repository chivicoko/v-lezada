<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue"
import AppLayout from "@/layouts/AppLayout.vue";
import { useRouter } from "vue-router";
import { useOrderStore } from '@/stores/orders'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

const cartStore = useCartStore()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const subTotal = ref(294.70)
const shippingAmount = ref(4.70)

const { cartTotal, cart, isLoading: cartLoading } = storeToRefs(cartStore);
const { fetchCart } = cartStore;

const { userProfile, userNames, isLoading: userProfileLoading } = storeToRefs(authStore);
const { getUserProfile } = authStore;

// const { orders } = storeToRefs(orderStore);
// const { isLoading: orderLoading, isCheckingOut } = storeToRefs(orderStore);
const { isCheckingOut } = storeToRefs(orderStore);
const { fetchOrders, handleCheckout } = orderStore;

const router = useRouter();

const handleOrderPlacement = () => {
  handleCheckout();
  router.push('/order-tracking');
};

onMounted(() => {
  fetchOrders()
  fetchCart()
  getUserProfile()
  // console.log(cart.value);
})
</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="w-full py-24 px-42">

        <div class="w-full flex items-start gap-6 h-full">

          <div class="w-4/7 py-6 flex flex-col gap-6">
            <div v-if="userProfileLoading" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>

            <div v-else class="py-6 flex flex-col gap-6">
              <h3 class="underline text-xl font-semibold">Billing Address</h3>
  
              <form class="flex flex-col gap-9">
                  <div class="w-full flex items-end gap-6">
                      <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                          <label for="firstName" class="uppercase">first name*</label>
                          <input type="text" id="firstName" :defaultValue="userNames.firstName" placeholder="First Name" class="py-1 outline-0" />
                      </div>
                      <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                          <label for="lastName" class="uppercase">last name*</label>
                          <input type="text" id="lastName" :defaultValue="userNames.lastName" placeholder="Last Name" class="py-1 outline-0" />
                      </div>
                  </div>
                  <div class="w-full flex items-end gap-6">
                      <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                          <label for="emailAddress" class="uppercase">email address*</label>
                          <input type="text" id="emailAddress" :defaultValue="userProfile?.email" placeholder="Email Address" class="py-1 outline-0" />
                      </div>
                      <div class="flex-1 flex flex-col gap-3 border-b-2 border-neutral-300">
                          <label for="phoneNumber" class="uppercase">phone number*</label>
                          <input type="text" id="phoneNumber" :defaultValue="userProfile?.phone_number" placeholder="Phone Number" class="py-1 outline-0" />
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
                          <input type="text" id="addressLine1" :defaultValue="userProfile?.address" placeholder="Address line 1" class="py-1 outline-0" />
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
          </div>

          <div class="w-3/7">
            <div v-if="cartLoading" class="py-16 flex items-center justify-center"><LoadingSpinner dynamicSize="size-12" /></div>
            
            <div v-else class="pb-6 flex flex-col gap-6">
              <h3 class="underline text-xl font-semibold">Cart Total</h3>
  
              <div class="w-full bg-neutral-100 p-10">
                <h3 class="flex items-end justify-between gap-4 text-2xl font-semibold py-2">
                  <span>Product</span>
                  <span>Total</span>
                </h3>
  
                <div v-if="cart.length > 0">
                  <p v-for="item in cart" :key="item.id" class="flex items-end justify-between gap-4 py-[9px]">
                    <span class="text-neutral-500">{{item.product.name}} x {{item.quantity}}</span>
                    <span>${{parseFloat(item.product.price ?? '0.00').toFixed(2)}}</span>
                  </p>
                </div>
  
                <div v-else class="text-center py-6">No orders yet!</div>
  
                <p class="flex items-end justify-between font-bold gap-4 py-[14px] border-y border-neutral-300">
                  <span class="capitalize">sub total</span>
                  <span>${{subTotal}}</span>
                </p>
  
                <p class="flex items-end justify-between font-bold gap-4 py-[14px] border-b border-neutral-300">
                  <span class="capitalize">shipping fee</span>
                  <span>${{shippingAmount}}</span>
                </p>
  
                <p class="flex items-end justify-between text-lg font-bold gap-4 py-[14px]">
                  <span class="capitalize">grand total</span>
                  <span>${{parseFloat(cartTotal + shippingAmount + subTotal.toString()).toFixed(2)}}</span>
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
                <button @click="handleOrderPlacement" :disabled="cart.length < 1" class="disabled:cursor-not-allowed disabled:bg-neutral-800/50 disabled:border-0 disabled:text-neutral-600 cursor-pointer uppercase font-semibold px-12 py-[14px] bg-neutral-800 hover:bg-transparent text-[13.4px] text-white hover:text-neutral-900 border border-transparent hover:border-neutral-800 transition-all duration-300 ease-in-out">
                  {{`${isCheckingOut ? 'Loading...' : 'place order'}`}}
                </button>
              </div>
            </div>
          </div>

        </div>
          
      </div>
    </Section>
  </AppLayout>
</template>
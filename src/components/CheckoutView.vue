<script setup lang="ts">
import { ref } from 'vue'
import { useEcommerceStore } from '@/stores/products'

const ecommerce = useEcommerceStore()
const cardNumber = ref('')
const cvv = ref('')
const expiry = ref('')

const handleCheckout = async () => {
  await ecommerce.placeOrder({ cardNumber: cardNumber.value, cvv: cvv.value, expiry: expiry.value })
  alert('Order placed successfully!')
}
</script>

<template>
  <div class="max-w-md mx-auto">
    <h2 class="text-xl font-bold mb-4">Checkout</h2>
    <input v-model="cardNumber" placeholder="Card Number" class="border p-2 w-full mb-2" />
    <input v-model="cvv" placeholder="CVV" class="border p-2 w-full mb-2" />
    <input v-model="expiry" placeholder="Expiry Date" class="border p-2 w-full mb-2" />
    <button @click="handleCheckout" class="bg-blue-600 text-white px-4 py-2">Pay Now</button>
  </div>
</template>


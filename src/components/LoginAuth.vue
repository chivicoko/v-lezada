<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    await auth.login({ email: email.value, password: password.value })
  } catch (err) {
    alert('Login failed')
  }
}
</script>

<template>
    <div class="max-w-md mx-auto mt-10">
      <input v-model="email" type="email" placeholder="Email" class="w-full border p-2 mb-4">
      <input v-model="password" type="password" placeholder="Password" class="w-full border p-2 mb-4">
      <button @click="handleLogin" class="w-full bg-green-500 text-white py-2 rounded">Login</button>
    </div>
</template>
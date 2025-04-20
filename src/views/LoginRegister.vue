<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import LoginView from "@/components/auth/LoginView.vue";
import RegisterView from "@/components/auth/RegisterView.vue";
</script>

<template>
  <AppLayout>
    <section class="w-full">
      <HeaderTwo/>
      
      <div class="py-24 px-42">

        <div class="w-full h-full flex items-center justify-center gap-6">

            <div class="w-full flex gap-6">
                <LoginView />
                <RegisterView />
            </div>
        </div>
          
      </div>
    </Section>
  </AppLayout>
</template>
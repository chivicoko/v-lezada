<script setup lang="ts">
import HeaderTwo from "@/components/HeaderTwo.vue";
import DashboardView from "@/components/my-account/DashboardView.vue";
import OrdersView from "@/components/my-account/OrdersView.vue";
import DownloadView from "@/components/my-account/DownloadView.vue";
import PaymentView from "@/components/my-account/PaymentView.vue";
import AddressView from "@/components/my-account/AddressView.vue";
import AccountDetails from "@/components/my-account/AccountDetails.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/authStore'
import { useOrderStore } from '@/stores/orders'
import { storeToRefs } from 'pinia'

const tabs = ref(['dashboard', 'orders', 'download', 'payment', 'address', 'account details']);
const currentTab = ref('dashboard');

const orderStore = useOrderStore()

// const { isLoading: orderLoading, orders } = storeToRefs(orderStore);
const { fetchOrders } = orderStore;

const authStore = useAuthStore()
const { userProfile, userNames, isLoading: userProfileLoading } = storeToRefs(authStore);
const { getUserProfile } = authStore;

onMounted(() => {
    fetchOrders()
    getUserProfile()
    console.log(userProfile.value)
})
</script>

<template>
  <AppLayout>
    <section class="w-full">
        <HeaderTwo/>
        
        <div class="py-24 px-42">
            <div class="flex items-center gap-2 pb-12">
                <button v-for="(tab, index) in tabs" :key="index" @click="currentTab = tab" :class="`${currentTab === tab ? 'bg-neutral-800 text-white' : 'bg-transparent text-neutral-500'} cursor-pointer capitalize px-3 py-2 hover:bg-neutral-800 text-sm hover:text-white transition-all duration-300 ease-in-out`">{{tab}}</button>
            </div>

            <div v-if="currentTab === 'dashboard'" class="w-full h-full border border-neutral-200 px-8">    
                <DashboardView :userNames="userNames" :isLoading="userProfileLoading" />
            </div>
            <div v-if="currentTab === 'orders'" class="w-full h-full border border-neutral-200 px-8">    
                <OrdersView />
            </div>
            <div v-if="currentTab === 'download'" class="w-full h-full border border-neutral-200 px-8">    
                <DownloadView />
            </div>
            <div v-if="currentTab === 'payment'" class="w-full h-full border border-neutral-200 px-8">    
                <PaymentView />
            </div>
            <div v-if="currentTab === 'address'" class="w-full h-full border border-neutral-200 px-8">    
                <AddressView :userProfile="userProfile" :isLoading="userProfileLoading" />
            </div>
            <div v-if="currentTab === 'account details'" class="w-full h-full border border-neutral-200 px-8">    
                <AccountDetails :userProfile="userProfile" :userNames="userNames" :isLoading="userProfileLoading" />
            </div>
        </div>
    </Section>
  </AppLayout>
</template>
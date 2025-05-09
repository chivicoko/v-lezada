import { defineStore } from 'pinia';
import { ref } from 'vue';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { CartItemProps, Order } from '@/types'
import { useToast } from 'vue-toast-notification';

// const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

const isProduction = import.meta.env.PROD;

const API_BASE_URL = isProduction 
  ? `/api` 
  : `${import.meta.env.VITE_API_BASE_URL}/api`;

export const useOrderStore = defineStore('order', () => {
    const orders = ref<Order[]>([]);
    const cart = ref<CartItemProps[]>([]);
    const isLoading = ref(true);
    const isCheckingOut = ref(false);
    const toast = useToast();

    async function handleCheckout() {
        isCheckingOut.value = true;
        const url = `${API_BASE_URL}/orders/checkout`;
        
        const payload = {
            payment_method: 'card',
            shipping_address: '123 Shipping St'
        };
        
        const { data, error } = await withTryCatch(() =>
            sendApiRequest('post', url, payload)
        );
    
        if (data && data.status === 'success') {
            if (!isProduction) toast.error(data.message);
        } else {
            if (!isProduction) toast.error("Failed to added product to cart.");
        }
        
        if (error) {
            if (!isProduction) toast.error(`Error: ${error || 'An unexpected error occurred'}`);
        }

        isCheckingOut.value = false;
    }

    async function fetchOrders() {
        const url = `${API_BASE_URL}/orders`;

        const { data, error } = await withTryCatch(() =>
            sendApiRequest('get', url)
        );
    
        if (data && data.status !== 'success') {
            if (!isProduction) toast.error("Failed to fetch orders at this time.");
        }
        
        if (error) {
            if (!isProduction) toast.error(`Error: ${error || 'An unexpected error occurred'}`);
        }

        isLoading.value = false;
    }

  return {
    isLoading,
    isCheckingOut,
    orders,
    handleCheckout,
    fetchOrders,
    cart,
  };
});

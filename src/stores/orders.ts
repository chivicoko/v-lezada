import { defineStore } from 'pinia';
import { ref } from 'vue';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { CartItem, Order } from '@/types'

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const useOrderStore = defineStore('order', () => {
    const orders = ref<Order[]>([]);
    const cart = ref<CartItem[]>([]);
    const isLoading = ref(true);
    const isCheckingOut = ref(false);

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
        // console.log(data);
    
        if (data.status === 'success') {
            console.log("Success!", data.message);
        } else {
            console.error("Failed to added product to cart.");
        }
        
        if (error) {
            console.log(error);
        }

        isCheckingOut.value = false;
    }

    async function fetchOrders() {
        const url = `${API_BASE_URL}/orders`;

        const { data, error } = await withTryCatch(() =>
            sendApiRequest('get', url)
        );
        // console.log(data);
    
        if (data.status === 'success') {
            // console.log("Success!", data);
            // console.log("Success!", data.data);
            console.log("Success!", data.data.data);
        } else {
            console.error("Failed to added product to cart.");
        }
        
        if (error) {
            console.log(error);
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

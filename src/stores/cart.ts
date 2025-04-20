import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { Product, CartItem } from '@/types'

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const useCartStore = defineStore('cart', () => {
  const products = ref<Product[]>([]);
  const selectedProduct = ref<Product | null>(null);
  const cart = ref<CartItem[]>([]);
  const wishlist = ref<Product[]>([]);
  const isLoading = ref(true);

  const cartTotal = computed(() => {
    return cart.value.reduce((sum, item) => {
      return sum + ((parseFloat(item.product.price) || 0) * item.quantity);
    }, 0)
  })

  const cartCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  async function fetchCart() {
    const url = `${API_BASE_URL}/cart`;
    
    const { data, error } = await withTryCatch(() =>
      sendApiRequest('get', url)
    );
    // console.log(data);

    if (data.status === 'success') {
      cart.value = data.data;
      // console.log("Cart items retrieved successfully:", cart.value);
    } else {
      console.error("Failed to retrieve cart.");
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }

  async function updateCartItem(itemId: number, newQuantity: number) {
    const url = `${API_BASE_URL}/cart/${itemId}`;
    
    const { data, error } = await withTryCatch(() =>
      sendApiRequest('put', url, { quantity: newQuantity })
    );

    if (data.status === 'success') {
      await fetchCart();
      console.log(data.message);
      // console.log("Cart update response:", data);
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }
  
  async function addToCart(productId: number, quantity: number) {
    const url = `${API_BASE_URL}/cart/add`;

    const item = cart.value.find((item) => item.id === productId);
    if (item !== undefined) {
      handleCartUpdate(productId, 'increase');
      await fetchCart();
      return;
    }

    const requestBody = {
      product_id: productId,
      quantity: quantity
    };

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('post', url, requestBody)
    );
    // console.log(data);

    if (data.status === 'success') {
      await fetchCart();
      console.log("Success!", data.message);
    } else {
      console.error("Failed to added product to cart.");
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }

  async function removeFromCart(itemId: number) {
    const url = `${API_BASE_URL}/cart/${itemId}`;
    
    const { data, error } = await withTryCatch(() =>
      sendApiRequest('delete', url)
    );

    if (data.status === 'success') {
      await fetchCart();
      console.log("Success!", data.message);
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }
  
  const handleCartUpdate = (id:number, mode: string) => {
    const item = cart.value.find((item) => item.id === id);

    if (item) {
      item.quantity = mode === 'increase' ? item.quantity + 1 : item.quantity - 1;
      updateCartItem(id, item.quantity);

      if (item.quantity < 1) {
        removeFromCart(id);
      }
    }

    isLoading.value = false;
  }

  return {
    isLoading,
    products,
    selectedProduct,
    cart,
    wishlist,
    cartTotal,
    cartCount,
    fetchCart,
    addToCart,
    handleCartUpdate,
    removeFromCart,
  };
});

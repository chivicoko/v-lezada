import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { Product, CartItemProps } from '@/types';
import { useWishlistStore } from '@/stores/wishlist';
import { useToast } from 'vue-toast-notification';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const useCartStore = defineStore('cart', () => {
  const products = ref<Product[]>([]);
  const selectedProduct = ref<Product | null>(null);
  const cart = ref<CartItemProps[]>([]);
  const isLoading = ref(true);
  const isClearAll = ref(false);
  const isAddition = ref(false);

  const wishlistStore = useWishlistStore();
  const wishlist = computed(() => wishlistStore.wishlist);
  const { removeFromWishlist } = wishlistStore;

  const toast = useToast();

  const cartTotal = computed(() => {
    return cart.value.reduce((sum, item) => {
      return sum + ((parseFloat(item.product.price ?? '') || 0) * item.quantity);
    }, 0)
  })

  const cartCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );

  // const isInCart = computed(() => {
  //   return (productId: number) => {
  //     return cart.value.some(item => item.id === productId);
  //   };
  // });
  const isInCart = (productId: number) => {
    return cart.value.some(p => p.id === productId);
  }  

  async function fetchCart() {
    const url = `${API_BASE_URL}/cart`;
    
    const { data, error } = await withTryCatch(() =>
      sendApiRequest('get', url)
    );

    if (data && data.status === 'success') {
      cart.value = data.data;
    } else {
      // console.log("Failed to retrieve cart.");
      toast.error("Failed to retrieve cart.");
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }

    isLoading.value = false;
  }

  async function updateCartItem(itemId: number, newQuantity: number) {
    const url = `${API_BASE_URL}/cart/${itemId}`;
    
    const { data, error } = await withTryCatch(() =>
      sendApiRequest('put', url, { quantity: newQuantity })
    );

    if (data && data.status === 'success') {
      await fetchCart();
      if (!isAddition.value) toast.default(data.message)
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }

    isLoading.value = false;
  }

  async function addToCart(productId: number, quantity: number) {
    const url = `${API_BASE_URL}/cart/add`;
    isAddition.value = true;

    const item = cart.value.find((item) => item.product.id === productId);
    if (item !== undefined) {
      handleCartUpdate(item.id, 'increase');
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
  
    if (data && data.status === 'success') {
      toast.default(data.message)

      await fetchCart();
  
      if (wishlist.value && Array.isArray(wishlist.value)) {
        const wishlistItem = wishlist.value.find((item) => item.id === productId);
        if (wishlistItem) {
          await removeFromWishlist(productId);
        }
      }
    } else {
      toast.error("Failed to add product to cart.");
    }
  
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }
  
    isAddition.value = false;
    isLoading.value = false;
  }
  

  async function removeFromCart(itemId: number) {
    const url = `${API_BASE_URL}/cart/${itemId}`;
    
    const { data, error } = await withTryCatch(() =>
      sendApiRequest('delete', url)
    );

    if (data && data.status === 'success') {
      if (!isClearAll.value) toast.error(data.message);
      await fetchCart();
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
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

  function clearCart() {
    isClearAll.value = true;
    isLoading.value = true;
    cart.value.forEach(async item => 
      removeFromCart(item.id)
    )
    toast.error('Cart cleared! All cart items have been deleted.');
    isLoading.value = false;
  };

  return {
    isLoading,
    products,
    selectedProduct,
    cart,
    cartTotal,
    cartCount,
    isInCart,
    fetchCart,
    addToCart,
    handleCartUpdate,
    removeFromCart,
    clearCart
  };
});

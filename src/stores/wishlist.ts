import { defineStore } from 'pinia';
import { ref } from 'vue';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { Product, WishlistItemProps } from '@/types'
// import { useCartStore } from '@/stores/cart'
// import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toast-notification';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const useWishlistStore = defineStore('wishlist', () => {
  const products = ref<Product[]>([]);
  const selectedProduct = ref<Product | null>(null);
  const wishlist = ref<WishlistItemProps[]>([]);
  const isLoading = ref(true);
  const isClearAll = ref(false);
  
    // const cartStore = useCartStore()
    // const { cart } = storeToRefs(cartStore);
  
  const toast = useToast();

  // const isInWishlist = computed(() => {
  //   return (productId: number) => {
  //     return wishlist.value.some(item => item.id === productId);
  //   };
  // });
  const isInWishlist = (productId: number) => {
    return wishlist.value.some(p => p.id === productId);
  }  

  async function fetchWishlist() {
    const url = `${API_BASE_URL}/wishlist`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('get', url)
    );

    if (data && data.status === 'success') {
      wishlist.value = data.data;
    } else {
      toast.error("Failed to retrieve wishlist.");
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }

    isLoading.value = false;
  }

  async function addToWishlist(productId: number) {
    const url = `${API_BASE_URL}/wishlist/add`;

    const item = wishlist.value.find((item) => item.id === productId);
    // const cartItem = cart.value.find((item) => item.id === productId);

    if (item !== undefined) {
      await fetchWishlist();
      toast.warning("Item already exists in wishlist!")
      return;
    }

    // if (cartItem !== undefined) {
    //   await fetchWishlist();
    //   alert("Item already exists in cart!");
    //   return;
    // }

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('post', url, { product_id: productId })
    );

    if (data && data.status === 'success') {
      toast.default(data.message)
      await fetchWishlist();
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }

    isLoading.value = false;
  }

  async function removeFromWishlist(itemId: number) {
    const url = `${API_BASE_URL}/wishlist/${itemId}`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('delete', url)
    );

    if (data && data.status === 'success') {
      wishlist.value = wishlist.value.filter(item => item.id !== itemId);
      if (!isClearAll.value) toast.error(data.message);
      await fetchWishlist();
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }

    isLoading.value = false;
  }

  async function clearWishlist() {
    isClearAll.value = true;
    isLoading.value = true;
    wishlist.value.forEach(async item => 
      removeFromWishlist(item.id)
    )
    toast.error('Wishlist cleared! All wishlist items have been deleted.');
    isLoading.value = false;
  };


  return {
    isLoading,
    products,
    selectedProduct,
    isInWishlist,
    wishlist,
    addToWishlist,
    fetchWishlist,
    removeFromWishlist,
    clearWishlist
  };
});

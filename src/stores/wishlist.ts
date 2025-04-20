import { defineStore } from 'pinia';
import { ref } from 'vue';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { Product } from '@/types'

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;

export const useWishlistStore = defineStore('wishlist', () => {
  const products = ref<Product[]>([]);
  const selectedProduct = ref<Product | null>(null);
  const wishlist = ref<Product[]>([]);
  const isLoading = ref(true);

  async function fetchWishlist() {
    const url = `${API_BASE_URL}/wishlist`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('get', url)
    );

    if (data.status === 'success') {
      wishlist.value = data.data;
      // console.log(wishlist.value);
    } else {
      console.error("Failed to retrieve wishlist.");
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }

  async function addToWishlist(productId: number) {
    const url = `${API_BASE_URL}/wishlist/add`;

    const item = wishlist.value.find((item) => item.id === productId);
    // console.log(item);
    // console.log(wishlist.value);

    if (item !== undefined) {
      await fetchWishlist();
      alert("Item already exists in wishlist!");
      return;
    }

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('post', url, { product_id: productId })
    );
    // console.log(data);

    if (data.status === 'success') {
      await fetchWishlist();
      // console.log("Product added to wishlist:", data);
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }

  async function removeFromWishlist(itemId: number) {
    const url = `${API_BASE_URL}/wishlist/${itemId}`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('delete', url)
    );

    if (data.status === 'success') {
      wishlist.value = wishlist.value.filter(item => item.id !== itemId);
      await fetchWishlist();
      // console.log("Success!", data.message);
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }

  return {
    isLoading,
    products,
    selectedProduct,
    wishlist,
    addToWishlist,
    fetchWishlist,
    removeFromWishlist
  };
});

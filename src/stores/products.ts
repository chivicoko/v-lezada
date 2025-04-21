import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { Product } from '@/types'
import { useToast } from 'vue-toast-notification';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

export const useProductsStore = defineStore('products', () => {
  const selectedProduct = ref<Product | null>(null);
  // const reviews = ref<Review[]>([]);
  const products = ref<Product[]>([]);
  const isLoading = ref(true);
  const hasMore = ref(true)
  const nextPageUrl = ref<string>(``)
  const toast = useToast();
  const route = useRoute();

  let fetching = false;

  async function fetchProducts() {
    if (!hasMore.value || fetching) return;

    fetching = true;
    isLoading.value = true;

    try {
      const urlToFetch = nextPageUrl.value || API_BASE_URL;
      const { data } = await withTryCatch(() => sendApiRequest('get', urlToFetch));
      if (data !== undefined) {
        const newProducts = data.data.data;
        products.value.push(...newProducts);

        nextPageUrl.value = data.data.next_page_url;
        hasMore.value = !!nextPageUrl.value;
      }
    } catch (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    } finally {
      isLoading.value = false;
      fetching = false;
    }
  }

  
  async function fetchProductById(productId: number) {
    const url = `${API_BASE_URL}/${productId}`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('get', url)
    );

    if (data !== null && route.path === `/products/${productId}`) {
      selectedProduct.value = data.data;
    } else {
      selectedProduct.value = null;
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }

    isLoading.value = false;
  }

  return {
    isLoading,
    hasMore,
    products,
    selectedProduct,
    // reviews,
    fetchProducts,
    fetchProductById,
    // fetchReviews,
    // addReview,
  };
});

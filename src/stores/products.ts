import { defineStore } from 'pinia';
import { ref } from 'vue';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { Product } from '@/types'

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/products`;

export const useProductsStore = defineStore('products', () => {
  const selectedProduct = ref<Product | null>(null);
  // const reviews = ref<Review[]>([]);
  const products = ref<Product[]>([]);
  const isLoading = ref(true);
  const hasMore = ref(true)
  const nextPageUrl = ref<string>(``)

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

        // console.log('Products: ', products.value);
        // console.log('New Products: ', newProducts);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
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

    if (data !== null) {
      selectedProduct.value = data.data;
      // console.log("Product retrieved successfully:", selectedProduct.value);
    } else {
      console.error("Failed to retrieve product.");
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }

  // async function fetchReviews(productId: number) {
  //   try {
  //     const { data } = await axios.get<Review[]>(`${API_BASE_URL}products/${productId}/reviews`);
  //     reviews.value = data;
  //   } catch (error) {
  //     console.error(`Error fetching reviews for product ${productId}:`, error);
  //   }
  // }

  // async function addReview(productId: number, review: Omit<Review, 'id'>) {
  //   try {
  //     await axios.post(`${API_BASE_URL}products/${productId}/reviews`, review);
  //     await fetchReviews(productId);
  //   } catch (error) {
  //     console.error(`Error adding review for product ${productId}:`, error);
  //   }
  // }

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

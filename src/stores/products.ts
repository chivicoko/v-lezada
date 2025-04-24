import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { withTryCatch } from '@/utils/withTryCatch';
import { sendApiRequest } from '@/utils/api';
import type { Product } from '@/types';
import { useToast } from 'vue-toast-notification';

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/products`;

export const useProductsStore = defineStore('products', () => {
  const selectedProduct = ref<Product | null>(null);
  const products = ref<Product[]>([]);
  const isLoading = ref(true);
  const hasMore = ref(true);
  const totalCount = ref<number | null>(null);
  const nextPageUrl = ref<string | null>(null);
  const toast = useToast();
  const route = useRoute();

  let fetching = false;

  // Filters & Search
  const searchTerm = ref('');
  const selectedCategory = ref<string | null>('');
  const sortOption = ref<'default' | 'price_asc' | 'price_desc'>('default');

  const filteredProducts = computed(() => {
    let result = [...products.value];

    // Search
    if (searchTerm.value) {
      result = result.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.value.toLowerCase())
      );
    }

    // Category
    if (selectedCategory.value) {
      result = result.filter(product =>
        product.category?.toLowerCase() === selectedCategory.value?.toLowerCase()
      );
    }

    // Sorting
    if (sortOption.value === 'price_asc') {
      result.sort((a, b) => parseFloat(a.price ?? '') - parseFloat(b.price ?? ''));
    } else if (sortOption.value === 'price_desc') {
      result.sort((a, b) => parseFloat(b.price ?? '') - parseFloat(a.price ?? ''));
    }

    return result;
  });

  const showingCount = computed(() => filteredProducts.value.length);

  // Fetch products
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
        totalCount.value = data.data.total || products.value.length;
        
        // console.log(products.value);
      }
    } catch (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    } finally {
      isLoading.value = false;
      fetching = false;
    }
  }

  // Single product
  async function fetchProductById(productId: number) {
    const url = `${API_BASE_URL}/${productId}`;
    const { data, error } = await withTryCatch(() => sendApiRequest('get', url));

    if (data !== null && route.path === `/products/${productId}`) {
      selectedProduct.value = data.data;
    } else {
      selectedProduct.value = null;
    }

    if (error) {
      console.log(`Error: ${error || 'An unexpected error occurred'}`);
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }

    isLoading.value = false;
  }

  // Category filter
  function setCategory(category: string) {
    selectedCategory.value = category;
  }

  // Reset filters
  function resetFilters() {
    searchTerm.value = '';
    selectedCategory.value = null;
    sortOption.value = 'default';
  }

  return {
    isLoading,
    hasMore,
    products,
    selectedProduct,
    totalCount,
    nextPageUrl,

    searchTerm,
    selectedCategory,
    sortOption,
    filteredProducts,
    showingCount,

    fetchProducts,
    fetchProductById,
    setCategory,
    resetFilters,
  };
});

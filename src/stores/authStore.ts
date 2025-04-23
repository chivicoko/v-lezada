import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from "vue-router";
import { sendApiRequest } from '@/utils/api';
import { withTryCatch } from '@/utils/withTryCatch';
import { parseItemIntoArray } from '@/utils/formatters';
import type { LoginProps, RegisterProps, UserProps } from '@/types';
import { useToast } from 'vue-toast-notification';

export const useAuthStore = defineStore('auth', () => {
  const userProfile = ref<UserProps | null>(null);
  const isLoading = ref(true);
  const token = ref(localStorage.getItem('token') || '')
  const isAuthenticated = computed(() => !!userProfile.value && !!token.value)

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;
  
  const router = useRouter();
  const toast = useToast();

  const userNames = computed(() => {
    const nameArray = parseItemIntoArray(userProfile.value?.name ?? '', ' ');
  
    const first = nameArray?.[0] ?? '';
    const last = nameArray?.[1] ?? '';
  
    return {
      firstName: first,
      lastName: last
    }
  })

  async function loginUser(userData: LoginProps) {
    const url = `${API_BASE_URL}/login`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('post', url, userData)
    );
    
    if (data.message === "Login successful" && data && data.data && data.data.token) {
      const token = data.data.token;
      toast.default(data.message);
      
      localStorage.setItem('auth_token', token);
      router.push('/');
    } else {
      toast.error("Login failed. Token not received.");
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }

    isLoading.value = false;
  }

  async function registerUser(userData: RegisterProps) {
    const url = `${API_BASE_URL}/register`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('post', url, userData)
    );
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }
    
    toast.default(data.message);
    
    isLoading.value = false;
  }

  async function getUserProfile() {
    const url = `${API_BASE_URL}/user`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('get', url)
    );

    if (data !== null) {
      userProfile.value = data.data.user;
    } else {
      toast.error("Failed to retrieve profile.");
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }
    
    isLoading.value = false;
  }

  async function logoutUser() {
    const url = `${API_BASE_URL}/logout`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('post', url)
    );

    if (data.message === "Successfully logged out") {
      localStorage.removeItem('auth_token');
    } else {
      toast.error("Logout failed!");
    }
    
    if (error) {
      toast.error(`Error: ${error || 'An unexpected error occurred'}`);
    }
    
    isLoading.value = false;
  }

  return { isLoading, userProfile, userNames, token, isAuthenticated, loginUser, registerUser, logoutUser, getUserProfile }
})

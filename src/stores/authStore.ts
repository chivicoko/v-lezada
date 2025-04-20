import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from "vue-router";
import { sendApiRequest } from '@/utils/api';
import { withTryCatch } from '@/utils/withTryCatch';
import { parseItemIntoArray } from '@/utils/formatters';
import type { LoginProps, RegisterProps } from '@/types'

export const useAuthStore = defineStore('auth', () => {
  const userProfile = ref(null)
  const isLoading = ref(true);
  const token = ref(localStorage.getItem('token') || '')
  const isAuthenticated = computed(() => !!userProfile.value && !!token.value)

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}`;
  
  const router = useRouter();
  
  const userNames = computed(() => {
    const nameArray = parseItemIntoArray(userProfile.value?.name, ' ')
  
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
      
      localStorage.setItem('auth_token', token);

      router.push('/');

      // console.log("Login successful. Token saved:", token);
      // console.log("Login successful. Token saved:", data);
    } else {
      console.error("Login failed. Token not received.");
    }
    
    if (error) {
      console.log(error);
    }

    isLoading.value = false;
  }

  async function registerUser(userData: RegisterProps) {
    const url = `${API_BASE_URL}/register`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('post', url, userData)
    );
    // console.log(data);
    
    if (error) {
      console.log(error);
    }
    
    isLoading.value = false;
  }

  async function getUserProfile() {
    const url = `${API_BASE_URL}/user`;

    const { data, error } = await withTryCatch(() =>
      sendApiRequest('get', url)
    );

    if (data !== null) {
      userProfile.value = data.data.user;
      // console.log("Profile retrieved successfully:", userProfile.value);
    } else {
      console.error("Failed to retrieve profile.");
    }
    
    if (error) {
      console.log(error);
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
      // console.log("Logout successful.", data.message);
    } else {
      console.error("Logout failed.");
    }
    
    if (error) {
      console.log(error);
    }
    
    isLoading.value = false;
  }

  return { isLoading, userProfile, userNames, token, isAuthenticated, loginUser, registerUser, logoutUser, getUserProfile }
})

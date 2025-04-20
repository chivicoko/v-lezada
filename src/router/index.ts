import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// // Example of route guard in router/index.ts
// import { useAuthStore } from '@/stores/authStore'

// const routes = [
//   {
//     path: '/admin',
//     component: () => import('@/views/AdminDashboard.vue'),
//     beforeEnter: (to, from, next) => {
//       const auth = useAuthStore()
//       if (!auth.isAuthenticated || !auth.isAdmin) {
//         next('/login')
//       } else {
//         next()
//       }
//     }
//   }
// ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/blog-posts',
      name: 'blogPosts',
      component: () => import('../views/BlogPosts.vue'),
    },
    {
      path: '/products/:id',
      name: 'productDetails',
      component: () => import('../views/ProductView.vue'),
    },
    {
      path: '/blog-posts/:slug',
      name: 'blogPostDetails',
      component: () => import('../views/SingleBlogPost.vue'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('../views/CheckoutView.vue'),
    },
    {
      path: '/order-tracking',
      name: 'order-tracking',
      component: () => import('../views/OrderTracking.vue'),
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/WishlistView.vue'),
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('../views/CompareView.vue'),
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/FAQView.vue'),
    },
    {
      path: '/login-register',
      name: 'login-register',
      component: () => import('../views/LoginRegister.vue'),
    },
    {
      path: '/my-account',
      name: 'my-account',
      component: () => import('../views/MyAccount.vue'),
    },
    {
      path: '/coming-soon',
      name: 'coming-soon',
      component: () => import('../views/ComingSoon.vue'),
    },
    {
      path: '/error',
      name: 'error-page',
      component: () => import('../views/ErrorPageView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue')
    },
  ],
});

router.onError((error) => {
  console.error('Router error:', error);
  router.push('/error');
});

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Lendin from '../main_file/lendin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Lendin
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../main_file/AdminPanel.vue'),
      children: [
        {
          path: 'destinations',
          name: 'destinations',
          component: () => import('../views/Destinations.vue')
        },
        {
          path: 'main',
          name: 'main',
          component: () => import('../views/MyProfile.vue')
        },
        {
          path: 'accommodation',
          name: 'accommodation',
          component: () => import('../views/MyProfile.vue')
        },
        {
          path: 'transportation',
          name: 'transportation',
          component: () => import('../views/MyProfile.vue')
        },
        {
          path: 'visa',
          name: 'visa',
          component: () => import('../views/MyProfile.vue')
        },
        {
          path: 'cuisine',
          name: 'cuisine',
          component: () => import('../views/MyProfile.vue')
        },
        {
          path: 'culture',
          name: 'culture',
          component: () => import('../views/MyProfile.vue')
        },
        {
          path: 'weather',
          name: 'weather',
          component: () => import('../views/Wheither.vue')
        },
        {
          path: 'converter',
          name: 'converter',
          component: () => import('../views/Convertor.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === 'http://localhost:5173/' || to.fullPath == '/' || to.fullPath == '/#about' || to.fullPath == '/#services' || to.fullPath == '/#contact' ) {
    // If the next route is http://localhost:5173/, do not redirect to login
    next();
  } else {
    // Continue with the original navigation guard logic
    let isAuthenticated = localStorage.getItem('auth_users');
    if (to.name !== 'login' && !isAuthenticated && to.name !== '') {
      next({ name: 'login' });
    } else {
      next();
    }
  }
});
export default router

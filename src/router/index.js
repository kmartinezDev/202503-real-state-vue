import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { onAuthStateChanged } from 'firebase/auth';
import { useFirebaseAuth } from 'vuefire';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/admin/properties',
          name: 'admin-properties',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/new',
          name: 'new-property',
          component: () => import('../views/admin/NewPropertyView.vue')
        },
        {
          path: '/admin/edit/:id',
          name: 'edit-property',
          component: () => import('../views/admin/EditPropertyView.vue')
        }
      ]
    }
  ],
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)

  if(requiresAuth) {
    // Comprueba si el usuario está autenticado
    try {
      console.log('Checking user authentication...')
      await authenticateUser()
      next()
    } 
    catch (error) {
      console.error(error)
      next({ name: 'login' })
    }
  }
  else {
    // No necesita autenticación, mostrar la página
    next()
  }

});

const authenticateUser = () => {

  const auth = useFirebaseAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, user => {
  
      unsubscribe()
      if(user) {
        resolve(user)
      }
      else {
        reject('User not authenticated')
      }
    })
  })
}

export default router

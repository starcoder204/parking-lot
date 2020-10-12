/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
      // =============================================================================
      // Theme Routes
      // =============================================================================
        {
          path: '/',
          name: 'home',
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/overview',
          name: 'overview',
          component: () => import('./views/pages/Overview.vue'),
          meta: {
            breadcrumb: [
              { title: 'Overview', url: '/' },
              { title: 'Setups' },
              { title: 'Parking Lot', active: true }
            ],
            pageTitle: 'Parking Log',
            rule: 'editor'
          }
        },
        {
          path: '/unproofed',
          name: 'unproofed',
          component: () => import('./views/pages/Unproofed.vue'),
          meta: {
            breadcrumb: [
              { title: 'Unproofed', url: '/' },
              { title: 'Setups' },
              { title: 'Add Parking Lot', active: true }
            ],
            pageTitle: 'Add Parking Log',
            rule: 'editor'
          }
        },
        {
          path: '/commissionproof',
          name: 'commissionproof',
          component: () => import('./views/pages/CommissionProof.vue'),
          meta: {
            breadcrumb: [
              { title: 'Commission Proof', url: '/' },
              { title: 'Setups' },
              { title: 'Parking Lot', active: true }
            ],
            pageTitle: 'Parking Log',
            rule: 'editor'
          }
        }
      ]
    },
    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: '',
      component: () => import('@/layouts/full-page/FullPage.vue'),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================
        {
          path: '/pages/login',
          name: 'page-login',
          component: () => import('@/views/pages/Login.vue')
        },
        {
          path: '/pages/error-404',
          name: 'page-error-404',
          component: () => import('@/views/pages/Error404.vue')
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: '*',
      redirect: '/pages/error-404'
    }
  ]
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router

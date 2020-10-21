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
          path: '/lot/overview',
          name: 'lot-overview',
          component: () => import('./views/lot/Overview.vue'),
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
          path: '/lot/unproofed',
          name: 'lot-unproofed',
          component: () => import('./views/lot/Unproofed.vue'),
          meta: {
            breadcrumb: [
              { title: 'Unproofed', url: '/' },
              { title: 'Setups' },
              { title: 'Parking Lot', active: true }
            ],
            pageTitle: 'Unproofed',
            rule: 'editor'
          }
        },
        {
          path: '/lot/commissionproof',
          name: 'lot-commissionproof',
          component: () => import('./views/lot/CommissionProof.vue'),
          meta: {
            breadcrumb: [
              { title: 'Commission Proof', url: '/' },
              { title: 'Setups' },
              { title: 'Parking Lot', active: true }
            ],
            pageTitle: 'Commission Proof',
            rule: 'editor'
          }
        },
        {
          path: '/lot/addlot',
          name: 'addlot',
          component: () => import('./views/lot/AddLot.vue'),
          meta: {
            breadcrumb: [
              { title: 'Commission Proof', url: '/' },
              { title: 'Setups' },
              { title: 'Add Parking Lot', active: true }
            ],
            pageTitle: 'Add Parking Log',
            rule: 'editor'
          }
        },
        {
          path: '/lot/:lot_id',
          name: 'lot',
          component: () => import('./views/lot/ParkingLot.vue'),
          meta: {
            breadcrumb: [
              { title: 'Parking Lot', url: '/' },
              { title: 'Setups' },
              { title: 'Parking Lot', active: true }
            ],
            pageTitle: 'Parking Log',
            rule: 'editor'
          }
        },
        {
          path: '/user-list',
          name: 'user-list',
          component: () => import('./views/user/UserList.vue'),
          meta: {
            breadcrumb: [
              { title: 'User', url: '/' },
              { title: 'Setups' },
              { title: 'User', active: true }
            ],
            pageTitle: 'User',
            rule: 'editor'
          }
        },
        {
          path: '/user/:user_id',
          name: 'user',
          component: () => import('./views/user/User.vue'),
          meta: {
            breadcrumb: [
              { title: 'User', url: '/' },
              { title: 'Setups' },
              { title: 'User', active: true }
            ],
            pageTitle: 'User',
            rule: 'editor'
          }
        },
        {
          path: '/admin-list',
          name: 'admin-list',
          component: () => import('./views/user/AdminList.vue'),
          meta: {
            breadcrumb: [
              { title: 'Dashboard User', url: '/' },
              { title: 'Setups' },
              { title: 'Dashboard User', active: true }
            ],
            pageTitle: 'Dashboard User',
            rule: 'editor'
          }
        },
        {
          path: '/adduser',
          name: 'adduser',
          component: () => import('./views/user/AddUser.vue'),
          meta: {
            breadcrumb: [
              { title: 'New User', url: '/' },
              { title: 'Setups' },
              { title: 'New User', active: true }
            ],
            pageTitle: 'New User',
            rule: 'editor'
          }
        },
        {
          path: '/financial/overview',
          name: 'financial-overview',
          component: () => import('./views/financial/Overview.vue'),
          meta: {
            breadcrumb: [
              { title: 'Financial Overview', url: '/' },
              { title: 'Setups' },
              { title: 'Financial Overview', active: true }
            ],
            pageTitle: 'Financial Overview',
            rule: 'editor'
          }
        },
        {
          path: '/financial/payout',
          name: 'financial-payout',
          component: () => import('./views/financial/Payout.vue'),
          meta: {
            breadcrumb: [
              { title: 'Payout Overview', url: '/' },
              { title: 'Setups' },
              { title: 'Payout Overview', active: true }
            ],
            pageTitle: 'Payout Overview',
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
          path: '/login',
          name: 'page-login',
          component: () => import('@/views/Login.vue')
        },
        {
          path: '/error-404',
          name: 'page-error-404',
          component: () => import('@/views/Error404.vue')
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

/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


export default [
  {
    url: '/',
    name: 'Dashboard',
    slug: 'home',
    icon: 'HomeIcon'
  },
  {
    header: 'Lots',
    icon: 'PackageIcon',
    i18n: 'Lots',
    items: [
      {
        url: '/lot/overview',
        name: 'Overview',
        slug: 'email',
        icon: 'CheckSquareIcon',
        i18n: 'Email'
      },
      {
        url: '/lot/unproofed',
        name: 'Unproofed',
        slug: 'chat',
        icon: 'CheckSquareIcon',
        i18n: 'Chat'
      },
      {
        url: '/lot/commissionproof',
        name: 'Commision Proof',
        slug: 'todo',
        icon: 'CheckSquareIcon',
        i18n: 'Todo'
      }
    ]
  },
  {
    header: 'User',
    icon: 'PackageIcon',
    i18n: 'User',
    items: [
      {
        url: '/user-list',
        name: 'Users',
        slug: 'email',
        icon: 'CheckSquareIcon',
        i18n: 'Email'
      },
      {
        url: '/admin-list',
        name: 'Admins',
        slug: 'chat',
        icon: 'CheckSquareIcon',
        i18n: 'Chat'
      }
    ]
  },
  {
    header: 'Financial',
    icon: 'PackageIcon',
    i18n: 'Financial',
    items: [
      {
        url: '/financial/overview',
        name: 'Overview',
        slug: 'email',
        icon: 'CheckSquareIcon',
        i18n: 'Email'
      },
      {
        url: '/financial/payout',
        name: 'Payout',
        slug: 'chat',
        icon: 'CheckSquareIcon',
        i18n: 'Chat'
      }
    ]
  }
]

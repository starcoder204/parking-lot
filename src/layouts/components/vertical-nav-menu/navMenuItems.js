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
    url: "/",
    name: "Dashboard",
    slug: "home",
    icon: "HomeIcon",
  },
  {
    header: 'Lots',
    icon: 'PackageIcon',
    i18n: 'Lots',
    items: [
      {
        url: '/overview',
        name: 'Overview',
        slug: 'email',
        icon: 'CheckSquareIcon',
        i18n: 'Email'
      },
      {
        url: '/unproofed',
        name: 'Unproofed',
        slug: 'chat',
        icon: 'CheckSquareIcon',
        i18n: 'Chat'
      },
      {
        url: '/commissionproof',
        name: 'Commision Proof',
        slug: 'todo',
        icon: 'CheckSquareIcon',
        i18n: 'Todo'
      }
    ]
  }
]

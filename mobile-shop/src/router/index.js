import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  
scrollBehavior (to, from, savedPosition) {
    if(savedPosition){
        return savedPosition
    }
      else{
        return { top:0 }
      }
  },

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      
        path: "/category/:category",
        name: "CategoryView",
        component: () =>
          import("../views/CategoryView.vue")
      
    },
    { 
      path: "/detail-page/:theId",
      name: "detailView",
      component: () =>
        import("../views/detailView.vue")
  },
  { 
      path: "/card-page",
      name: "CartPage",
      component: () =>
        import("../views/CartPage.vue")
  },
  { 
      path: "/success-page",
      name: "SuccessPage",
      component: () =>
        import("../views/SuccessPage.vue")
  },
  { 
      path: "/search-page",
      name: "searchPage",
      component: () =>
        import("../views/searchView.vue")
  },
  { 
      path: "/admin-page",
      name: "AdminPage",
      component: () =>
        import("../views/adminView.vue"),
      meta: { requiresAdmin: true }
  },
  { 
      path: "/admin-login",
      name: "AdminLogin",
      component: () =>
        import("../views/adminLogin.vue")
  },
  { 
      path: "/admin-page/add-product",
      name: "AddPage",
      component: () =>
        import("../views/AddView.vue"),
      meta: { requiresAdmin: true }
  },
  { 
      path: "/admin-page/edit/:theId",
      name: "Edit Page",
      component: () =>
        import("../views/EditView.vue"),
      meta: { requiresAdmin: true }
  },

  ],

});

  router.beforeEach((to, from, next) => {

    const isAdmin = localStorage.getItem('isAdmin')

    if(to.meta.requiresAdmin && !isAdmin){

        next('/admin-login')

    } else {

        next()

    }

})

export default router

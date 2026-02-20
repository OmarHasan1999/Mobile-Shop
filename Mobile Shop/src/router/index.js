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
  
  ]
});

export default router

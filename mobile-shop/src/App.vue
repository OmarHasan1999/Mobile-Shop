
<template>
  <v-app>
    <div>
    <transition name="fade">
      <div v-show="isNavigating" class="page-overlay"></div>
    </transition>
  <RouterView/>

  <v-snackbar v-model="bar" location="bottom left" maxwidth="100" timeout="4000">
        {{ itemTitle }} has been add product successfully
        <template v-slot:actions>
          <v-icon @click="bar = false">mdi-close</v-icon>
        </template>
  </v-snackbar>

  <v-snackbar v-model="snackBar" location="bottom left" maxwidth="100" timeout="4000">
        Please remove some items to continue checkout
        <template v-slot:actions>
          <v-icon @click="snackBar = false">mdi-close</v-icon>
        </template>
  </v-snackbar>

    </div>
  </v-app>
</template>

<!-- composition -->

<script setup>
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import { ref, inject, onMounted } from "vue"

const isNavigating = ref(false);
const router = useRouter();
const bar = ref(false)
const snackBar = ref(false)
const itemTitle = ref("")

const emitter = inject("Emitter")


router.beforeEach((to, from, next) => {
  isNavigating.value = true;
  setTimeout(() => {
    next()
  }, 120);
});

// بعد الانتقال
router.afterEach(() => {
  setTimeout(() => {
    isNavigating.value = false;
  }, 300);
});

onMounted(() => {
  emitter.on("showMessage", (data) => {
      itemTitle.value = data
      bar.value = data
  }),
  emitter.on("removeItemsMessage", () => {
    snackBar.value = true
  })

})

</script>

<style>

html,body{
  overflow-x: hidden; 
  scroll-behavior:smooth;
  margin: 0%;
  padding: 0%;
  font-family:'Poppins', sans-serif; 
  box-sizing: border-box; 
  background-color: black !important;
}

.page-overlay {
  position: fixed;
  inset: 0;
  background-color: black;
  z-index: 9999;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
} 
*{
  scroll-behavior: smooth;
}

</style>

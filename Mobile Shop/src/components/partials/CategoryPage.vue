<template>
    
    <div class="category-page">

            <div class="sceneSection" ref="sceneSection" v-show="windowWidth > 800"></div>
            <div class="slide">
            <!-- swiper -->
            <swiper
                :pagination="{ el: '.swiper-pagination', clickable:true }"
                :modules="modules"
                :slides-per-view="1" 
                :speed="1500"
                :navigation="{ nextEl: '.nextPage', prevEl: '.prevPage' }"
                :autoplay="false"
                :allow-touch-move="false"
                :loop="true"
                @slideChange="onSlideChange"
                :key="$route.params.category" 
                >

            <swiper-slide v-for="(slide,index) in slidesData[$route.params.category]" :key="index">
              <div v-if="windowWidth <= 800" class="slideImg">
                <img v-if="slide.img" :src="slide.img" alt="product image when slide">
              </div>
            <p class="slidePar">
            <span class="main-text" v-html="slide.main"></span><br>
            <span class="sub-text">{{ slide.sub }}</span>
            </p>
            </swiper-slide>

            <div class="prevPage"></div>
            <div class="nextPage"></div>
            <div class="swiper-pagination"></div>
            </swiper>
            </div>

    <div class="samsungSection">

    <h3>{{ $route.params.category }}</h3>

    <div class="samsungProducts" v-if="productCategory.length">

        <div class="samsungBox" v-for="item in productCategory" :key="item.id">

                    <h1>{{ item.title }}</h1>
                    <p><span>Price</span> ${{ item.price }}</p>
                
                <div class="imgDiv">
                    <img :src="item.img" loading="lazy" alt="product image from Life Store">
                    <v-btn class="bg-white quickBtn" density="compact" variant="outlined" width="90" height="30"
                    style="position: absolute;font-size: 12px;transition: 0.3s ease;text-transform: none;
                    border-radius: 30px;margin-top: 3vh;margin-left: 15vh;transform: translate(-50%,-50%);opacity: 0;"
                    @click="openQuickView(item)"
                    >Quick View</v-btn>
                </div>

                <div class="buyNow">
                    <h5 @click="$router.push({ name:'detailView',params:{theId:item.id} })" aria-label="buy"
                    >Buy Now</h5>
                </div>
                
            </div>
    </div>
  </div>
  
  </div>
  

</template>

<!-- composition -->
<script setup>
import { products } from '../../store/store';
import { slidePhones } from "../../js/slideSection"
import { ref, inject, onMounted, watch, nextTick } from 'vue';
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router"

// swiper.js library
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import { Navigation,Pagination,Autoplay } from "swiper"

import iphoneImg_1 from "/assets/img/abhijeet-barak-g79dPAkB4wo-unsplash.webp"
import iphoneImg_2 from "/assets/img/v-a-tao-OxvlDO8RwKg-unsplash.webp"
import samsungImg_1 from "/assets/img/sanju-pandita-tWZAN03JPNc-unsplash.webp"
import samsungImg_2 from "/assets/img/anh-nhat-yqcloMb3Abw-unsplash.webp"
import huaweiImg_1 from "/assets/img/sajad-nori-szIDCDL7Y7o-unsplash.webp"
import huaweiImg_2 from "/assets/img/sajad-nori-OLufn5yRe3k-unsplash.webp"

// ScrollReveal.js library
import ScrollReveal from "scrollreveal"

const modules = [ Pagination,Navigation,Autoplay ]
const threeApi = ref(null)
const sceneSection = ref(null)
const slidesData = ref({
        Iphone: [
          {
            main: 'A dramatically <strong>more powerful</strong> camera system',
            sub: 'Capture life in breathtaking detail with the Pro camera system — delivering sharper images, richer colors, and stunning performance even in low light.',
            img: iphoneImg_1
          },
          {
            main: 'Powered by the blazing-fast <br><strong class="strongTwo">A16 Bionic chip</strong>',
            sub: 'Experience unmatched speed, incredible power efficiency, and next-level features designed to keep up with your most demanding tasks.',
            img: iphoneImg_2
          }
        ],
        Samsung: [
          {
            main: 'A stunning <strong>Dynamic AMOLED 2X</strong> display',
            sub: 'Enjoy ultra-vivid colors, smoother scrolling, and incredible clarity even under bright sunlight with Samsung’s best display technology.',
            img: samsungImg_1
          },
          {
            main: 'Powered by the ultra-fast <br><strong class="strongTwo">Snapdragon 8 Gen 2</strong>',
            sub: 'Experience flagship performance with lightning-fast processing, advanced AI features, and exceptional battery efficiency for all-day power.',
            img: samsungImg_2
          }
        ],
        Huawei: [
          {
            main: 'Revolutionary <strong>Ultra Vision Leica</strong> camera',
            sub: 'Capture every moment in rich detail with stunning clarity, even in extreme low-light conditions, thanks to Huawei’s camera innovation.',
            img: huaweiImg_2
          },
          {
            main: 'Powered by the intelligent <br><strong class="strongTwo">Kirin 9000</strong>',
            sub: 'Delivering top-tier speed, AI-powered performance, and exceptional power management for a seamless and efficient mobile experience.',
            img: huaweiImg_1
          }
        ]
      })

const theRoute = useRoute()
const theRouter = useRouter()
const theProducts = products()
const { productCategory } = storeToRefs(theProducts)
const { productsWithCat } = theProducts

const emitter = inject("Emitter")
const windowWidth = inject("windowWidth")

const openQuickView = (product) => {
  emitter.emit("openQuickView", product)
}

// using on mounted for load the page when navigate to it 
onMounted(async() => {
        // checks if there’s a category in the route. If not, it goes back (pre page).
        if(!theRoute.params.category){
            return theRouter.go(-1)
        }
        //  If yes, it loads the products for that category,
        await productsWithCat(theRoute.params.category)
        
        // Wait until the DOM updates
        await nextTick()

        // Initialize the 3D phone slider (Three.js) 
        // with the scene section element and the current category
        threeApi.value = slidePhones(sceneSection.value, theRoute.params.category)

        // ScrollReveal for products section
        ScrollReveal().reveal(".samsungSection",{
          duration:1300,
          distance:"50px",
          origin: "bottom",
          opacity:0,
          easing:"ease-in-out",
        })
})

// we use watch for the changes like the route (path) when we in same the page
// just change the route

// here we using Watch for changes in route category
// to fetch products and update the 3D model accordingly
watch(() => theRoute.params.category, async(newCat) => {
      if(theRoute.name == "CategoryView"){
          await productsWithCat(newCat)
                
          // load 3d model and change model with category name
          if (threeApi.value && threeApi.value.loadModel) {
          threeApi.value.loadModel(newCat);
            }
        }

})

// animation models with click on slides
const onSlideChange = (swiper) => {
        const realIndex = swiper.realIndex
        if (realIndex === 1 && threeApi.value && threeApi.value.playAnimation2) {
            threeApi.value.playAnimation2()
      }
        if (realIndex === 0 && threeApi.value && threeApi.value.reverseAnimation2) {
            threeApi.value.reverseAnimation2()
      }
    }
    
</script>
<style>
</style>
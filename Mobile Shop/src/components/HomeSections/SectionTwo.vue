<template>

    <div class="sectionTwo">

        <v-container fluid>
        <v-row>
        <v-col cols="12">
            <div class="compareImage">
                <ImgComparisonSlider>
                <img
                loading="lazy"
                slot="first"
                style="width: 100%;height: auto;"
                :src="imgOne"
                alt="Front view of the product"
                />

                <img
                    loading="lazy"
                    slot="second"
                    style="width: 100%;height: auto;"
                    :src="imgTwo"
                    alt="Back view of the product"
                />
                </ImgComparisonSlider>

            <p class="ImgP">
                These two photos showcase the exceptional clarity and
                stunning beauty captured by the <strong>Galaxy S22 Ultra</strong>
                camera. Every detail, color, and contrast is rendered with remarkable precision,
                turning each shot into a vibrant work of art.
            </p>
            </div>
        </v-col>
        </v-row>
        </v-container>
        
        <h3 class="featuredProductsHeading">Featured Products</h3>

    <v-lazy transition="fade-transition" :min-height="500" :options="{'threshold':0.3}">
        <div class="featured">
        <v-container fluid>
        <v-row>
        <v-col cols="12">
        <!-- Swiper -->
        <Swiper
                :pagination="{ el: '.swiper-pag', clickable:true }"
                :modules="modules"
                :slides-per-view="4" 
                :navigation="{ nextIcon: '.next', prevIcon: '.prev' }"
                :autoplay="{delay: 2500, pauseOnMouseEnter:true, disableOnInteraction:false}"
                :loop="true"
                :breakpoints="breakPoints"
                >
            <SwiperSlide v-for="item in theProps.products" :key="item.id">

            <div class="featuredBox">
                <h1>{{ item.title }}</h1>
                <p><span>Price</span> ${{ item.price }}</p>

                <div class="imgDivHome">
                    <img :src="item.img" loading="lazy" alt="product image from life store">
                    <v-btn class="bg-white quickBtn" density="compact" variant="outlined" width="60" height="30"
                    style="position: absolute;font-size: 12px;transition: 0.3s ease;text-transform: none;
                    border-radius: 30px;top: 50%;left: 50%;transform: translate(-50%,-50%);opacity: 0;"
                    @click="openQuickView(item)" aria-label="open quick view"
                    >Quick View</v-btn>
                </div>

                <div class="seeMore">
                    <h5 @click="$router.push({ name:'detailView',params:{theId:item.id} })" aria-label="buy now"
                    >Buy Now</h5>
                    <h6 @click="$router.push({name:'CategoryView', params:{category:item.category}})" aria-label="see more"
                    >See More</h6>
                </div>
            </div>
            </SwiperSlide>
            <div class="prev"></div>
            <div class="next"></div>
            <div class="swiper-pag"></div>
        </Swiper>

        </v-col>
        </v-row>
        </v-container>
        </div>
    </v-lazy>

    <div class="video">
        <div class="iphoneVideo">
            <video width="640" preload="metadata" muted loop controls>
                <source src="/assets/img/large.webm" type="video/webm">
            </video>
        </div>
    </div>
    
    </div>
</template>

<!-- composition  -->
<script setup>
import { ref, inject, onMounted} from "vue"

// image comparison slide library
import { ImgComparisonSlider } from '@img-comparison-slider/vue';

import img1 from "/assets/img/leftImg.webp"
import img2 from "/assets/img/right.webp"

// import Swiper
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import { Navigation,Pagination,Autoplay } from "swiper"

// ScrollReveal.js library
import ScrollReveal from "scrollreveal"

const modules = [ Pagination,Navigation,Autoplay ]
const imgOne = ref(img1)
const imgTwo = ref(img2)
const breakPoints = ref({
                1250:{
                    slidesPerView:4
                },
                960:{
                    slidesPerView:3
                },
                650:{
                    slidesPerView:2
                },
                0:{
                    slidesPerView:1
                },
            })

const theProps = defineProps({
    products:{
        type: Array
    }
})

const emitter = inject("Emitter")

const openQuickView = (product) => {
    emitter.emit("openQuickView", product)
}

onMounted(() => {
    // ScrollReveal for text compare image
        ScrollReveal().reveal(".ImgP",{
            duration:1800,
            distance:"80px",
            origin: "bottom",
            opacity:0,
            easing:"ease-in-out",
        })

        // Use IntersectionObserver to play video only when it visible on screen
        const video = document.querySelector("video")
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    video.play()
                }else{
                    video.pause()
                }
            })
        }, { threshold: 0.5 })
        observer.observe(video)
})
</script>
<style>

</style>
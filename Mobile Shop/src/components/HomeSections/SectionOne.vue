<template>
    <div class="sectionOne">

        
        <div class="firstContainer">
        <v-container fluid>
        <v-row class="v-rowFirstContainer">
        <v-col cols="6" class="v-colFirstContainer">
            <div class="one" :class="{start:load}">
                <p class="revealText selling">HELP WITH SELLING</p>
                <div style="display: flex;">
                <hr class="hrHome" :style="{borderColor: !load ? 'black' : 'palevioletred'}">
                <h3 class="revealText slideText">{{ title }}</h3>
                </div>
                <h4 class="revealText believe">BELIEVE IN SOMETHING BETTER</h4>
            </div>
        </v-col>
        
        <v-col cols="6" class="v-colFirstContainer" >
            <div class="two" ref="modelLoad"></div>
        </v-col>
        
        </v-row>
        </v-container>
        </div>

            <div class="iphoneModel">
                <v-container fluid>
                <v-row class="align-center iphoneModelRow">
                <v-col cols="3"></v-col>
                <v-col cols="3">
                <div class="leftSectionIphone">
                <div class="iphone" ref="iphoneModelRef">
                </div>

                <h3>IPHONE 15 Pro Max</h3>
                <div class="colors">
                    <div class="buttonsColor">
                    <button @click="changeColor('#ADD8E6')" style="background: #ADD8E6;" aria-label="change color">
                    </button>
                    <button @click="changeColor('#f5f5f0')" style="background: #f5f5f0;" aria-label="change color">
                    </button>
                    <button @click="changeColor('#d1d1d6')" style="background: #d1d1d6;" aria-label="change color">
                    </button>
                    <button @click="changeColor('#f9e6c8')" style="background: #f9e6c8;" aria-label="change color">
                    </button>
                    </div>
                </div>
                </div>
                </v-col>

                <v-col cols="6">
                <div class="rightSectionIphone">
                    <p class="neP">
                    The iPhone 15 Pro Max combines cutting-edge performance with elegant design.
                    Built with aerospace-grade titanium, it’s lighter and stronger than ever.
                    Powered by the A17 Pro chip, it delivers console-level gaming on mobile.
                    Its advanced camera system redefines photography with stunning detail.
                    </p>
                </div>
                </v-col>
                </v-row>
                </v-container>
            </div>
        
    </div>
</template>

<!-- composition -->
<script setup>
import {ref, onMounted, onBeforeUnmount, nextTick} from "vue"

// ScrollReveal.js library
import ScrollReveal from "scrollreveal"

const title = ref("NEW DEALS")
const titles = ref(["NEW DEALS","BEST PRICES","TOP BRANDS","LATEST TECH","LIMITED SALE"])
const currentIndex = ref(0)
const intervalId = ref(null)
const load = ref(false)
const modelLoad = ref(null)
const iphoneModelRef = ref(null)
const iphone = ref(null)

onMounted(async() => {
    await nextTick()
        // 3D models
        // IntersectionObserver for first model
        if(modelLoad.value){
            const observerModel = new IntersectionObserver(async(entries) => {
            const entry = entries[0]
            if (!entry.isIntersecting) return

            observerModel.disconnect()
            
            requestIdleCallback(async() => {
                const module = await import("../../js/firstScene")
                module.createModel(modelLoad.value)
            })
            }, { threshold: 0.1 })

            observerModel.observe(modelLoad.value)
        }
    
    // IntersectionObserver for second model
    if(iphoneModelRef.value){
        const observerIphone = new IntersectionObserver(async(entries) => {
        const entry = entries[0]
        if (!entry.isIntersecting) return
        observerIphone.disconnect()

        requestIdleCallback(async() => {
            const moduleIphone = await import("../../js/iphoneModel")
            iphone.value = moduleIphone.iphoneModel(iphoneModelRef.value)
        })
    }, { threshold: 0.1 })

        observerIphone.observe(iphoneModelRef.value)
    }

        // slide text
        const el = document.querySelector(".slideText");
        title.value = titles.value[currentIndex.value];

        el.addEventListener("animationiteration", () => {
        currentIndex.value = (currentIndex.value + 1) % titles.value.length;
        title.value = titles.value[currentIndex.value];
    });

        setTimeout(() => {
            load.value = true
        }, 3000);

        // ScrollReveal for text iphone model
        setTimeout(async () => {
        const { default: ScrollReveal } = await import("scrollreveal")
        ScrollReveal().reveal(".neP",{
            duration:2000,
            distance:"250px",
            origin: "right",
            opacity:0,
            easing:"ease-in-out",
        })
    },200)
})

onBeforeUnmount(() => {
    if(intervalId.value) clearInterval(intervalId.value);
})

// change color of the model
 const changeColor = (c) => {
            if(iphone.value && iphone.value.setIphoneColor){
                iphone.value.setIphoneColor(c)
            }
 }
</script>
<style>
</style>
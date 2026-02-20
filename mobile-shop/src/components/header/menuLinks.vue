<template>
    <div>
        <v-navigation-drawer 
        v-model="drawer" 
        temporary
        class="pr-1 myCart px-5 pt-0"
        color="black"
        :width="windowWidth.windowWidth <= 500 ? windowWidth.windowWidth / 0.5 : 300"
        aria-label="menu links drawer">
        
        <v-card class="px-2 py-7" elevation="0" color="black">
                <v-card-title class="px-0 d-flex justify-space-between align-center w-100" style="font-size: 17px;font-weight: 600;">
                    Menu
                    <v-icon @click="drawer= false" aria-label="close">mdi-close</v-icon>
                </v-card-title>

                <v-list-item class="px-0 py-4">
                <v-list-item-title class="menuLinks" @click="$router.push({name:'Home'})">HOME</v-list-item-title>

                <v-list aria-label="category list">
                <v-list-group class="listGroup">
                    <template v-slot:activator="{props}">
                        <v-list-item v-bind="props" class="px-0" aria-label="open products menu">
                            <v-list-item-title class="menuLinks">PRODUCTS</v-list-item-title>
                        </v-list-item>
                    </template>

                        <v-list-item>
                            <v-list-item-title class="menuLinks" aria-label="open category page"
                            v-for="link in categories" :key="link.route"
                            @click="openCategoryPage(link)">
                            {{ link.title }}
                            </v-list-item-title>
                        </v-list-item>
                </v-list-group>
                </v-list> 

                <v-list aria-label="contact list">
                <v-list-group class="listGroup">
                    <template v-slot:activator="{props}">
                        <v-list-item v-bind="props" class="px-0" aria-label="contact">
                            <v-list-item-title class="menuLinks">CONTACT</v-list-item-title>
                        </v-list-item>
                    </template>

                        <v-list-item>
                            <v-list-item-title class="menuLinks">+90 5876880122</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title class="menuLinks">lifestore@gmail.com</v-list-item-title>
                        </v-list-item>
                </v-list-group>
                </v-list> 
                <v-list-item-title class="menuLinks">ABOUT US</v-list-item-title>
                </v-list-item>
        
        </v-card>
        </v-navigation-drawer>
    </div>
</template>

<script setup>
import { products } from '../../store/store'
import { ref, inject, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from "pinia"

const theProducts = products()
const drawer = ref(false)
const theRouter = useRouter()
const emitter = inject("Emitter")

const { categories } = storeToRefs(theProducts)

const windowWidth = defineProps({
    windowWidth: {
        type:Number
    }
})

const openCategoryPage = (link) => {
    drawer.value = false
    setTimeout(() => {
        theRouter.push({name:'CategoryView', params:{category:link.title}})        
    }, 50);
}

onMounted(() => {
    emitter.on("openMenuLinks", () => {
        drawer.value = true
    })
})

// for cancel main scroll bar when open the drawer 
let scrollPosition = 0
watch(drawer, (val) => {
    const body = document.body
    if(val){
        scrollPosition = window.scrollY
        body.classList.add("no-scroll")
        body.style.position = "fixed"
        body.style.top = `-${scrollPosition}px`
        body.style.width = "100%"
    }else{
        body.classList.remove("no-scroll")
        body.style.position = ""
        body.style.top = ""
        body.style.width = ""
        window.scrollTo(0,scrollPosition)
    }
})

// remove menu links drawer with screens more than 1200
watch(() => windowWidth.windowWidth,(width) => {
    if(width > 1200){
        drawer.value = false
    }
})

</script>

<style lang="css">
    .menuLinks{
        margin-bottom: 20px;
    }
    .listGroup{
        margin-top: -1.6vh;
        margin-bottom: -1.2vh;
    }
    .no-scroll{
        overflow: hidden !important;
        height: 100% !important;
    }

    @media (max-width: 500px) {
        .menuLinks{
            font-size: 15px !important;
        }
    }
    
</style>
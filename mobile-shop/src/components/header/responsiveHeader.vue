<template>
    <div style="background-color: black;">
        <v-app-bar color="black" class="px-0 py-8" flat elevation="0" style="position: relative;">
            <v-container fluid>
                <div style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
                        <div style="display: flex;align-items: center;">
                        <v-app-bar-nav-icon @click="openMenuLinks" class="barIcon" aria-label="open menu links">
                        </v-app-bar-nav-icon>
                        </div>
                        <div style="display: flex;justify-content: center;">
                        <img :src="logoImg" class="responsiveImg" loading="lazy" aria-label="Home"
                        width="18%" @click="$router.push({name: 'Home'})" alt="Life Store Logo">
                        </div>
                        <div style="display: flex;align-items: center;" class="searchIcons">
                        <v-icon class="search " size="33" aria-label="search"
                        @click="$router.push({name:'searchPage'})">
                        mdi-magnify
                        </v-icon>
                        <v-icon size="30" @click="openSideCart" aria-label="open side cart"
                        :style="`pointerEvents: ${$route.name === 'CartPage' ? 'none' : 'unset'}`"
                        >mdi-cart-outline
                        </v-icon>
                        <v-badge 
                                color="pink"
                                offsetY= "-12"
                                offsetX= "10"
                                v-if="cartItems.length"
                                :content="cartItems.length"
                                location="right top"

                        ></v-badge>
                    </div>
                </div>
            </v-container>
            
        </v-app-bar>
    </div>
</template>

<script setup>
import { cart } from "../../store/cartStore"
import { storeToRefs } from "pinia"
import { inject } from 'vue';
import logoImg from "/assets/img/logoImg.webp"

const theCart = cart()
const { cartItems } = storeToRefs(theCart)

const emitter = inject("Emitter")
const openSideCart = () => {
  emitter.emit('openSideCart')
}

const openMenuLinks = () => {
    emitter.emit('openMenuLinks')
}
</script>

<style lang="css">
    .responsiveImg{
        cursor: pointer;
        width: 60%;
    }
    
    @media (max-width: 1000px){
    .responsiveImg{
        width:60%
    }
    }
    @media (max-width: 600px){
    .barIcon{
        transform: translateX(-7px);
    }
    }
    
    @media (max-width: 400px){
    .barIcon{
        transform: translateX(-13px);
    }
    .searchIcons{
        transform: translateX(6px);
    }
    }
</style>
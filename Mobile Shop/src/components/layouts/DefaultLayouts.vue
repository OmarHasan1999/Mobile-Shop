<template>
<div>
    <sideCart :windowWidth="windowWidth"/>
    <MenuLinks :windowWidth="windowWidth"/>
    <ResponsiveHeader v-if="windowWidth <= 1200" />
    <MainHeader :style="{ display: windowWidth <= 1200 ? 'none' : 'block' }"/>

    <v-main v-if="windowWidth <= 1200" style="padding-top: 3vh;background-color: black;border: 1px solid black;">
    </v-main>
    <slot>
    </slot>

    <QuickView style="display: none;"/>
    <MainFooters />
</div>
</template>

<script setup>
import MainHeader from '../header/MainHeader.vue';
import MainFooters from '../footers/MainFooters.vue';
import MenuLinks from '../header/menuLinks.vue';
import QuickView from '../partials/QuickView.vue';
import sideCart from "../partials/sideCart.vue"
import ResponsiveHeader from '../header/responsiveHeader.vue';

import { ref, provide } from 'vue';

const windowWidth = ref(0)

windowWidth.value = window.innerWidth

window.onresize = () => {
    windowWidth.value = window.innerWidth
}

provide("windowWidth", windowWidth)
</script>
<style lang="css">

</style>
<template>
    <div style="background-color: black;">
        <sectionOne/>
        <sectionTwo :products="featureProducts"/>
    </div>
    
</template>

<!-- composition -->
<script setup>
import { products } from "../../store/store"
import SectionOne from '../HomeSections/SectionOne.vue'
import SectionTwo from '../HomeSections/SectionTwo.vue';
import { storeToRefs } from "pinia"
import { onMounted } from "vue";

const theProducts = products()
const { featureProducts } = storeToRefs(theProducts)
const { getProducts } = theProducts

onMounted(async() => {
    await getProducts()
})
</script>

<style>

</style>
    
<template>
    <div class="detailSection">
       
        <v-container>
        <v-row>
        
        <div class="detailMain">
            
            <v-col cols="4">
            <div class="detailContainerTwo" v-show="!load"> 

            <img class="mainImg" :src="showImg[theDetails.title] ? showImg[theDetails.title] : theDetails.img" loading="lazy" alt="main Image of the product">
            <div class="imgGroups" ref="imgGroups" aria-label="images of the product"> 

            </div>
            </div>
            

        <v-skeleton-loader width="850" color="black" style="margin-left: 4vh;"
        class="skeletonLoaderDetail" v-if="load" type="card,card,card">
        </v-skeleton-loader></v-col>

        <v-col cols="1"></v-col>
        <v-col cols="7">
        <div class="detailContainerOne" v-show="!load">
            <p>{{ theDetails.category }} / {{ theDetails.title }}</p>
            <h3>{{ theDetails.title }}</h3>
            <span style="font-weight: 800;">
            $ {{ theDetails.price * quantity }}</span>

            <select name="Select Color" aria-label="Select Color">
                <option value="28GB">Select Color</option>
                <option value="28GB">Space Black</option>
                <option value="64GB">silver</option>
                <option value="128GB">Gold</option>
                <option value="128GB">Dark Violet</option>
            </select>

            <div class="quantity">
                <h4 @click="quantity > 1 ? quantity-- : false" aria-label="remove">-</h4>
                <h4>{{ quantity }}</h4>
                <h4 @click="quantity++" aria-label="add">+</h4>
            </div>

            <v-btn style="color:white;background-color: black;border: 1px solid blueviolet;" class="text-red"
            @click="openSideCart(theDetails)" :loading="loadBtn"
            >Add To Cart</v-btn>

            <div style="display: flex;align-items: center;flex-direction: row;gap: 2px;">
                <img src="/assets/img/greencircle.webp" alt="green circle image">
                <h5>Delivery in 5/10 working days</h5>
            </div>
           
            <p class="productDetailParagraph">{{ theDetails.productDetails }}</p>
        </div>
        </v-col>
       
    </div>
    </v-row>
    </v-container>
    </div>

    
</template>

<!-- composition  -->
<script setup>
import {products} from "../../store/store"
import { cart } from "../../store/cartStore"
import { createCube } from "../../js/cube"
import { ref, inject, onMounted, nextTick, watch } from 'vue'
import { storeToRefs } from "pinia"
import { useRoute } from "vue-router"

const theProducts = products()
const theCart = cart()
const emitter = inject("Emitter")
const theRoute = useRoute()

const showImg = ref({})
const quantity = ref(1)
const loadBtn = ref(false)
const load = ref(false)
const imgGroups = ref(null)

const { theDetails } = storeToRefs(theProducts)
const { showDetails } = theProducts
const { addItems } = theCart

onMounted(async() => {
        load.value=true
        await showDetails(theRoute.params.theId)
        setTimeout(async () => {
        load.value=false

        await nextTick();
        const cube = imgGroups.value;

        // for remove the latest cube when add new cube in same page
        cube.innerHTML = ""
        createCube(cube, theDetails.value.imgGroup, (selectImg) => {
            showImg.value[theDetails.value.title] = selectImg
        });
        }, 2000);  

})

watch(() => theRoute.params.theId, async() => {
            load.value=true
            await showDetails(theRoute.params.theId)
            setTimeout(async() => {
            load.value=false

            await nextTick();
            const cube = imgGroups.value;
            cube.innerHTML = ""
            createCube(cube, theDetails.value.imgGroup, (selectImg) => {
            showImg.value[theDetails.value.title] = selectImg
            });
            }, 1000);

        
        },)

const openSideCart = (item) => {
            item.quantity = quantity.value
            loadBtn.value = true
            setTimeout(() => {
                emitter.emit("openSideCart")
                addItems(item)
                loadBtn.value = false

                // show massage when adding product
                emitter.emit("showMessage", item.title)

            }, 1000);
        }

</script>
<style>

</style>
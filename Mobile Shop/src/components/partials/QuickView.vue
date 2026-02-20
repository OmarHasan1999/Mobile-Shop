<template>
    <div class="mt-16 pt-16">
    <v-dialog v-model="dialog" max-width="900" max-hight="600" aria-label="quick view dialog">

        <v-icon @click="dialog=false" class="closeQuick" style="color: black;background-color:white;
        font-size: 18px;padding: 10px;position: absolute;right: -0.7%;font-weight: 900;" aria-label="close">
        mdi-close</v-icon>

        <div class="quickPage">
        <div class="quickMain">
            
                    <div class="quickContainerTwo" v-if="!load"> 
        
                        <img class="mainImg" :src="showImg[product.title] ? showImg[product.title] : product.img" loading="lazy" alt="main Image of the product">
                        <div class="imgGroups" ref="imgGroups" aria-label="images of the product"> 
                        </div>

                        </div>

                    <v-skeleton-loader width="830" color="black" style="margin-bottom: 2vh;"
                    v-if="load" type="card,card,card" class="skeletonLoaderQuick">
                    </v-skeleton-loader>
                    
                    <div class="quickContainerOne" v-if="!load"> 
                        <p>{{ product.category }} / {{ product.title }}</p>
                        <h3>{{ product.title }}</h3>
                        <span>$ {{ product.price * quantity }}</span>

                        <select name="Select Color" aria-label="Select Color">
                        <option value="">Select Color</option>
                        <option value="space black">Space Black</option>
                        <option value="silver">silver</option>
                        <option value="gold">Gold</option>
                        <option value="dark-violet">Dark Violet</option>
                        </select>

                        <div class="quantity">
                            <h4 @click="quantity > 1 ? quantity-- : false" aria-label="remove">-</h4>
                            <h4>{{ quantity }}</h4>
                            <h4 @click="quantity++" aria-label="add">+</h4>
                        </div>

                        <v-btn style="color:white;background-color: black;border: 1px solid blueviolet;" class="text-red"
                        @click="openSideCart(product)" :loading="loadBtn"
                        >Add To Cart</v-btn>

                        <div style="display: flex;align-items: center;flex-direction: row;gap: 2px;">
                            <img src="/assets/img/greencircle.webp" alt="green circle image">
                            <h5>Delivery in 5/10 working days</h5>
                        </div>

                        <p class="quickDescription">{{ product.productDetails }}</p>
        </div>
        </div>
    </div>
    </v-dialog>
    </div>
</template>

<!-- composition -->
<script setup>
import { cart } from '../../store/cartStore'
import { VSkeletonLoader } from "vuetify/components/VSkeletonLoader"
import { createCube } from "../../js/cube"
import { ref, onMounted, inject, nextTick } from 'vue'

const dialog = ref(false)
const product = ref("")
const quantity = ref(1)
const loadBtn = ref(false)
const showImg = ref({})
const load = ref(false)
const imgGroups = ref(null)

const theCart = cart()
const { addItems } = theCart
const emitter = inject("Emitter")

onMounted(() => {
    emitter.on("openQuickView",(data) => {
            dialog.value = true
            load.value = true
            product.value = data
            // for set the quantity to 1 when open quick view
            quantity.value = 1
            
            setTimeout(async() => {
                // for set original image when open quick view
                showImg.value[product.value.title] = product.value.img
                load.value= false
                await nextTick();
                const cube = imgGroups.value;
                createCube(cube, product.value.imgGroup, (selectImg) => {
                showImg.value[product.value.title] = selectImg
        });
            }, 1500);
        })
})

const openSideCart = (item) => {
            item.quantity = quantity.value
            loadBtn.value = true
            setTimeout(() => {
                loadBtn.value = false
                emitter.emit("openSideCart")
                dialog.value = false
                addItems(item)

                // show massage when adding product
                emitter.emit("showMessage", item.title)

            }, 1000);
        }
</script>
<style lang="css">

    .quickPage{
    width: 100%;
    min-height: 100vh;
    background-color: black;
    overflow-y: scroll;
}
.quickMain{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 5vh 0vh;
}
.quickContainerOne{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 0 auto;
    padding-left: 5vh;
    padding-bottom: 2vh;
    gap: 2.6vh;
}
.quickContainerOne p{
    color: rgba(255, 255, 255, 0.421);
    font-size: 12px;
}
.quickContainerOne h3{
    color: white;
    font-size: 20px;
    font-weight: 500;
}
.quickContainerOne span{
    font-size: 16px;
    cursor:pointer;
    color: aliceblue;
}
.quickContainerOne select{
    width: 18vh;
    height: 5.5vh;
    border: 1px solid blueviolet;
    background-color: black;
    color: white;
    font-weight: 500;
    text-align: center;
    font-size: 13px;
    cursor:pointer
}
.buy{
    width: 8.5vh;
    height: 5.5vh;
    font-size: 13px;
    font-weight: 600;
    color: blueviolet;
    border: 1.8px solid blueviolet;
    background-color: black;
    cursor:pointer
}
.buy:hover{
    box-shadow: rgb(152, 118, 184) 0px 7px 29px 0px;
}
.addToCart:hover{
    box-shadow: rgb(152, 118, 184) 0px 7px 29px 0px;
}
.quantity{
    width: 8.5vh;
    height: 5.5vh;
    background-color: black;
    border: 1px solid white;
    color: white;
    cursor:pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2px;
    color: aliceblue;
    }
    .quantity h4{
        cursor: pointer;
        color: aliceblue;
        font-size: 13px;
        text-align: center;
    }
.quickContainerOne h5{
    color: white;
    font-size: 14px;
}
.quickContainerOne img{
    width: 2.9vh;
    height: 3.2vh;
}
.productDetails{
    color: white;
    font-size: 28px;
    font-weight: 400;
}
.quickDescription{
    width: 80%;
    text-align: left;
}
.quickContainerTwo{
    display: flex;
    flex-direction: column;
    align-items:center;
    padding-left: 13vh;
    padding-top: 5vh;
}
.quickContainerTwo img{
    width: 35vh;
    height: 47vh;
    cursor: pointer; 
} 
 .imgGroups{
    margin-top: 10vh;
    width: 67vh;
    height: 16vh;
    border: 1px solid white;
    display: flex;
    flex-direction: row;
    justify-content: center;
} 

.imgGroups img{
    width: 13vh;
    height: 12vh;
    margin-left: 2vh;
    margin-top: 2.2vh;
    cursor: pointer;
}
img.mainImg{
    cursor: pointer;
    width: 40vh;
    height: 45vh;
}

/* scroll bar in quick view */
    .quickPage::-webkit-scrollbar{
            width: 7px;
    }
        .quickPage::-webkit-scrollbar-thumb{
            background-color: rgb(150, 145, 145);
        }
        .quickPage::-webkit-scrollbar-track{
            background-color: rgb(200, 197, 197);
        }

/* media queries */
@media (max-width: 1250px){
    .quickDescription{
    width: 87% !important;
}
}
@media (max-width: 950px){
    .quickDescription{
    width: 91% !important;
}
}
@media (max-width: 900px){
    .quickDescription{
    width: 94% !important;
}
}
@media (max-width: 870px){
    .quickDescription{
    width: 94% !important;
}
.quickContainerOne{
    padding-left: 0vh !important;
}
}
@media (max-width: 850px){
    .quickDescription{
    width: 97% !important;
}
.quickContainerOne{
    margin-left: -2vh !important;
}
.quickContainerOne h3{
    font-size: 18px !important;
}
}
@media (max-width: 810px){
    .quickDescription{
    width: 95% !important;
}
.quickContainerOne{
    margin-left: -3vh !important;
}
.quickContainerOne h5{
    font-size: 13px !important;
}
}
@media (max-width: 790px){
    .quickDescription{
    width: 95% !important;
}
.quickContainerOne{
    margin-left: -7vh !important;
}
.quickContainerOne h5{
    font-size: 13px !important;
}
}
@media (max-width: 765px){
.quickMain{
    flex-direction: column !important;
}
.quickContainerTwo{
    padding-left: 2vh !important;
    padding-top: 2.6vh !important;
}
.quickContainerOne{
    display: flex;
    flex-direction: column !important;
    align-items: flex-start;
    margin-left: 0 auto !important;
    padding-left: 20vh !important;
    padding-bottom: 2vh;
    gap: 2vh !important;
}
.quickContainerOne h5{
    font-size: 14px !important;
}
.quickDescription{
    width: 85% !important;
}
.closeQuick{
    right: -1.2% !important;
}
.skeletonLoaderQuick{
    width: 90vh !important;
}
}
@media (max-width: 670px) {
.skeletonLoaderQuick{
    width: 85vh !important;
}
}
@media (max-width: 600px) {
.skeletonLoaderQuick{
    width: 80vh !important;
    margin-right: 3vh !important;
}
}
@media (max-width:550px) {
    .closeQuick{
    right: -1.9% !important;
}
.skeletonLoaderQuick{
    width: 70vh !important;
}
}
@media (max-width: 480px) {
.skeletonLoaderQuick{
    width: 60vh !important;
}
}
@media (max-width: 400px){
.quickContainerOne{
    padding-left: 14vh !important;
}
.quickContainerOne h5{
    font-size: 13px !important;
}
.quickContainerOne h3{
    font-size: 16px !important;
}
.closeQuick{
    right: -2.2% !important;
}
.skeletonLoaderQuick{
    width: 49vh !important;
}
}
@media (max-width:365px) {
.skeletonLoaderQuick{
    width: 43vh !important;
    margin-left: 2vh !important;
}
}
@media (max-width: 350px){
.quickContainerOne{
    padding-left: 12vh !important;
}
.quickContainerOne h5{
    font-size: 13px !important;
}
}
@media (max-width: 325px){
.quickContainerOne{
    padding-left: 10vh !important;
}
.quickContainerOne h5{
    font-size: 13px !important;
}
.closeQuick{
    right: -2.4% !important;
}
.skeletonLoaderQuick{
    width: 40vh !important;
}
}
</style>
<template>
    <div>
    <v-dialog class="successDialog" v-model="dialog" width="45%" persistent style="background-color: black;">
            <v-card class="text-center py-4" style="background-color: whitesmoke;">
                <div class="text-center mt-2">
                    <v-icon style="background-color: #096B68;font-size: 60px;border-radius: 50%;width: 100px;height: 100px;border: 1px solid #00b4d8;color: white;">
                        mdi-check</v-icon>
                </div>
                <v-card-title style="font-size: 30px;color: #096B68;font-weight: 700;margin-top: 1vh;margin-bottom: -5vh;" class="successTitle">
                    PAYMENT SUCCESSFUL!</v-card-title>
                <v-card-text style="font-size: 20px;color: #096B68;font-weight: 500;" class="successText"
                >THANK YOU! Your Payment is complete</v-card-text>

                <v-card-actions class="justify-center">
                    <v-btn variant="elevated" class="pa-2" style="text-align: left;" color="#096B68" @click="reset">Done</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        </div>
</template>

<!-- composition -->
<script setup>
import { cart } from '../store/cartStore';
import { useRouter } from "vue-router"
import { ref } from 'vue';

const router = useRouter()
const theCart = cart()
const { removeAllItems } = theCart

const dialog = ref(true)

const reset = () => {
    removeAllItems()
    setTimeout(() => {
        dialog.value = false
        router.push({name:'Home'})    
    }, 1200);
    
} 


</script>
<style lang="css">
@media (max-width: 1030px) {
.successText{
    font-size: 18px !important;
}
}
@media (max-width: 940px) {
.successText{
    font-size: 16px !important;
}
.successTitle{
    font-size: 27px !important;

}
}
@media (max-width: 840px) {
.successText{
    font-size: 15px !important;
}
.successTitle{
    font-size: 25px !important;

}
}
@media (max-width: 800px) {
.successText{
    font-size: 14px !important;
}
.successTitle{
    font-size: 23px !important;

}
}
@media (max-width: 750px) {
.successText{
    font-size: 14px !important;
    text-align: center;
    margin-top: 1vh;
}

}
@media (max-width: 750px) {
.successTitle{
    font-size: 20px !important;

}
}
@media (max-width: 620px) {
.successTitle{
    font-size: 18px !important;

}
}
@media (max-width: 560px) {
.successTitle{
    font-size: 15px !important;
    font-weight: 800 !important;
}
.successDialog{
    width: 120% ;
    margin-left: -8vh !important;
}
}
@media (max-width: 450px) {
.successDialog{
    width: 120% ;
    margin-left: -6vh !important;
}
}
@media (max-width: 420px) {
.successDialog{
    width: 130% ;
    margin-left: -8vh !important;
}
}
@media (max-width: 375px) {
.successDialog{
    width: 130% ;
    margin-left: -8vh !important;
}
.successTitle{
    font-size: 14px !important;
    font-weight: 800 !important;
}
}
@media (max-width: 355px) {
.successDialog{
    width: 140% ;
    margin-left: -10vh !important;
}
.successTitle{
    font-size: 14px !important;
    font-weight: 800 !important;
}
}
@media (max-width: 330px) {
.successDialog{
    width: 150% ;
    margin-left: -12vh !important;
}
.successTitle{
    font-size: 14px !important;
    font-weight: 800 !important;
}
}

</style>
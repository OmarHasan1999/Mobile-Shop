<template>
    <div style="width:100%;min-height: 100vh;background-color: black;padding-top: 5vh;">

        <!-- // when card is empty -->
        <div class="cardEmpty" v-if="!cartItems.length">
            <div style="display: flex;align-items: center;;flex-direction: column;margin-left: 0vh;gap: 3vh;" class="freeShipping">
            <h3 style="color: aliceblue;font-size: 30px;font-weight: 800;">Your Card</h3>
            <h5 style="color: aliceblue;font-size: 18px">Free Shipping For All Orders Over $10000.00!</h5>
            </div>
            <div style="color: aliceblue;display: flex;flex-direction: column;align-items: center;margin-top: 4vh;gap: 2vh;">
                <h5 style="font-size: 18px;font-weight: 600;">Your Card Is Empty!</h5>
                <v-btn @click="$router.push({name:'Home'})"
                style="border-radius: 30px;text-transform: none;border: 1px solid white;margin-top: 2vh;" 
                variant="outlined" class="px-12 freeShippingBtn" height="45"
                density="compact" >Continue Shopping</v-btn>
            </div>
        </div>


        <!-- when card has products -->
        <div v-if="cartItems.length">
            <div style="display: flex;flex-direction: column;margin-left: 10vh;gap: 2vh;color: aliceblue;">
            <h3 style="font-size: 30px;font-weight: 800;" class="yourCard">Your Card</h3>
            <span v-if="cartItems.length && 10000 - totalPrices > 0" style="font-size: 13px;" class="canShopping"
                >You can Shopping with ${{10000 - totalPrices}}</span>
            <span v-if="cartItems.length && 10000 - totalPrices <= 0" style="font-size: 14px;" class="canShopping"
            >Remove a few items to continue checkout ..</span>
            </div>

            <v-container fluid>

        <v-row class="d-flex">

        <v-col cols="10" md="12" lg="10" sm="12" class="px-10 pl-10 cardProductCols" v-if="cartItems.length">

                    <v-table class="w-100" style="background-color: black;color: aliceblue;">
                        <thead>
                            <tr>
                                <th style="font-size: 15px;font-weight: bold;" scope="col">PRODUCTS</th>
                                <th style="font-size: 15px;font-weight: bold;text-align: center;" scope="col">PRICE</th>
                                <th style="font-size: 15px;font-weight: bold;text-align: center;" scope="col">QUANTITY</th>
                                <th style="font-size: 15px;font-weight: bold;text-align: center;" scope="col">TOTAL</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="item in cartItems" :key="item.id" scope="row">
                                
                                <td style="width: 55%" class="detailCardPage">
                                    <v-row class="align-center mb-6">
                                    <v-col cols="6">
                                    <img :src="item.img" class="w-100 cardPageImg" style="margin-left: -5vh;" alt="The Image of the Product">
                                    </v-col>
                                    <v-col cols="6" class="title-cat">
                                    <v-card-title class="px-0 titleCardPage" style="white-space: pre-wrap;font-size: 14px;line-height: 1.2;font-family:Arial, Helvetica, sans-serif;">
                                    {{ item.title }}
                                    </v-card-title>
                                    <v-card-text style="color:#6f6f6f" class="px-0 pb-0 catCardPage">
                                    Category: {{ item.category }}
                                    </v-card-text>
                                    </v-col>
                                    </v-row>
                                </td>

                                <td style="width: 15%;text-align:center" class="priceCardPage"> 
                                    $ {{item.price}} 
                                </td>

                                <td style="width: 15%;text-align:center">
                                    <div class="quantityDetails" style="border-radius: 30px;padding: 10px 40px;gap: 8px;">
                                    <h4 style="text-align: center;color: aliceblue;" @click="item.quantity > 1 ? item.quantity-- : false" aria-label="remove">-</h4>
                                    <h4 style="text-align: center;color: aliceblue;font-size: 16px;" class="quantityCardPage">{{ item.quantity }}</h4>
                                    <h4 style="text-align: center;color: aliceblue;" @click="item.quantity++" aria-label="add">+</h4>
                                    </div>
                                </td>

                                <td style="width: 15%;text-align:center" class="allPricesCardPage">
                                    $ {{ item.price * item.quantity }}
                                </td>

                                <td style="width: 15%;text-align:center">
                                    <v-icon @click="deleteItems(item.id)" style="font-size: 25px;cursor: pointer;"
                                    aria-label="delete item">
                                    mdi-close
                                    </v-icon>
                                </td>
                        
                            </tr>

                        </tbody>
                        
                    </v-table>

                    <v-divider length="100%" color="white"></v-divider>
                    <v-divider length="100%" color="white"></v-divider>

                    <div class="orderSummery" style="margin-top: 5vh;">
                        <div style="display: flex;align-items: center;justify-content: space-between;margin-top: 4vh;color: white;">
                            <span class="calcCardPage">Calculator Shopping</span>
                            <p class="totalPrices">{{ totalPrices }}</p>
                        </div>

                    <v-container class="cardPageButtons">                    
                    <v-btn
                    variant="outlined"
                    density="compact"
                    style="border-radius: 0px;border-color: transparent;
                    background-color: blueviolet;text-transform: none;color:aliceblue"
                    height="45"
                    class="w-50 font-weight-bold"
                    @click="setCheckOut"
                    >Check Out</v-btn>
                    
                    <v-btn
                    @click="$router.push({name:'Home'})"
                    variant="elevated"
                    density="compact"
                    style="border:1px solid transparent;
                    border-radius: 0px;
                    background-color: white;text-transform: none;color:rgba(0, 0, 0, 0.644)"
                    height="45"
                    class="w-50 font-weight-bold continueCardPage"
                    >Continue Shopping</v-btn>
                    </v-container>

                    </div>

                    <v-card-text class="px-0 pt-10" style="color:#6f6f6f;display: flex;align-items: center;gap: 1vh;margin-left: 2vh;">
                    <span class="secureCardPage"><v-icon>mdi-shield-lock</v-icon> Secure Shopping Guarantee</span>
                    </v-card-text>

                </v-col>
                </v-row>
                </v-container>

        </div>
        
    </div>
</template>

<!-- composition -->
<script setup>
import { computed, watch, inject } from 'vue';
import { storeToRefs } from 'pinia';
import { loadStripe } from "@stripe/stripe-js";
import { cart } from '../../store/cartStore';

const theCart = cart()
const { cartItems } = storeToRefs(theCart)
const { deleteItems , setLocalStorage } = theCart
const emitter = inject("Emitter")

// calculator all prices
const totalPrices = computed(() => {
    let total = 0
    cartItems.value.forEach((el) => {
        total += el.price * el.quantity
    })
    return total
    }
)

const setCheckOut = async() => {
            if(cartItems.value.length && 10000 - totalPrices.value <= 0){
                emitter.emit("removeItemsMessage")
            }else{
            setLocalStorage()

            // loading stripe when click on the button
            const stripePromise = loadStripe(import.meta.env.VITE_PUBLISH_KEY)

            const stripe = await stripePromise
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/create-checkout-session`,{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ products: cartItems.value }),
                })
                const session = await response.json()
                const result = await stripe.redirectToCheckout({sessionId :session.id})
                if(result.error){
                alert(result.error.message)
                }
            }
        }
// for quantity number in view cart when refresh the page
watch(cartItems,() => {
    setLocalStorage()
    },
    { deep: true }
)
</script>
<style lang="css">
    @media (max-width:1200px) {
        .priceCardPage{
            font-size: 16px !important;
        }
        .quantityCardPage{
            font-size: 16px !important;
        }
        .allPricesCardPage{
            font-size: 16px !important;
        }
        .totalPrices{
            font-size: 16px !important;
        }
        .cardPageImg{
            margin-left: -2vh !important;
        }
    }
    @media (max-width:1110px) {
        .catCardPage{
            font-size: 12px !important;
        }
        .titleCardPage{
            font-size: 12px !important;
        }
        .detailCardPage{
            width: 50% !important;
        }
    }
    @media (max-width:750px) {
        .catCardPage, .titleCardPage{
            font-size: 12px !important;
            margin-left: -4vh !important;
        }
    }
    @media (max-width: 730px) {
        .catCardPage{
            font-size: 11px !important;
        }
    }
    @media (max-width:680px) {
        
        .catCardPage{
            width: 26vh !important;
            margin-left: -5vh !important;
        }
        .titleCardPage{
            width: 26vh !important;
            margin-left: -5vh !important;

        }
        .yourCard{
            font-size: 25px !important;
            margin-left: -2vh !important;
        }
        .canShopping{
            margin-top: -1vh !important;
            margin-bottom: 2vh !important;
            margin-left: -2vh !important;
        }
    }
    @media (max-width:650px) {
        .priceCardPage{
            font-size: 14px !important;
        }
        .quantityCardPage{
            font-size: 14px !important;
        }
        .allPricesCardPage{
            font-size: 13px !important;
        }
        .totalPrices{
            font-size: 14px !important;
        }
        .cardPageImg{
            margin-top: 1vh !important;
        }
    }
    @media (max-width:600px) {
        .cardPageImg{
            width: 130% !important;
            margin-left: -4vh !important;
        }
        .title-cat{
            padding-left: 3vh !important;
            margin-top: 0.5vh !important;
        }
        .catCardPage, .titleCardPage{
            font-size: 12px !important;
            padding-right: 5vh !important;
            margin-right: 1vh !important;
        }
        .catCardPage{
            font-size: 11px !important;
        }
        .cardProductCols{
            padding-right: 0vh !important;
            margin: 0% !important;
        }
        .cardPageButtons{
            width: 110% !important;
            margin-left: -3vh !important;
        }
    }
    @media (max-width: 530px) {
        .continueCardPage{
            font-size: 12px !important;
            font-weight: 900 !important;
        }
        .freeShipping h5{
            font-size: 16px !important;
        }
    }
    @media (max-width: 460px) {
        .continueCardPage{
            font-size: 11px !important;
            color: rgba(0, 0, 0, 0.832) !important;
        }
        .cardPageButtons{
            width: 160% !important;
            margin-left: -10vh !important;
        }
        .freeShipping h5{
            font-size: 18px !important;
            width: 80% !important;
            text-align: center !important;
        }
    }
    @media (max-width: 400px) {
        .calcCardPage{
            padding-right: 2vh !important;
            margin-left: -2vh !important;
            font-size: 14px !important;
        }
        .totalPrices{
            margin-right: -2vh !important;
        }
        .secureCardPage{
            margin-left: -5vh !important;
        }
        .freeShipping h5{
            font-size: 16px !important;
            width: 60% !important;
            text-align: center !important;
        }
        .freeShippingBtn{
            padding: 0 4vh !important;
        }
        .canShopping{
            font-size: 15px !important;
            width: 90% !important;
        }
    }
    @media (max-width: 340px) {
        .cardPageButtons{
            width: 170% !important;
        }
        .canShopping{
            width: 100% !important;
            font-size: 15px !important;
        }
    }
    @media (max-width: 325px) {
        .freeShipping h5{
            font-size: 16px !important;
            width: 65% !important;
            text-align: center !important;
        }
        .canShopping{
            width: 95% !important;
            font-size: 14px !important;
        }
    }
</style>
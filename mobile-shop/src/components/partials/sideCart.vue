<template>
    <div>
        <v-navigation-drawer
            v-model="drawer"
            location="right"
            temporary
            :width="windowWidth.windowWidth <= 500 ? windowWidth.windowWidth / 1 : 320"
            color="black"
            class="sideCardDrawer"
            aria-label="side card drawer"
    >
            <div class="cartEmpty">
                <div class="d-flex justify-space-between align-center">
                <h3>Shopping Cart </h3>
                <v-icon @click="drawer= false"  class="pr-10" aria-label="close drawer">mdi-close</v-icon>
                </div>
                <p>{{ cartItems.length }} Items</p>
                <span v-if="!cartItems.length">Free shopping for all orders over $10000.00</span>
                <span v-if="cartItems.length && 10000 - totalPrices > 0">You can Shopping with ${{10000 - totalPrices}}</span>
                <span v-if="cartItems.length && 10000 - totalPrices <= 0">Remove a few items to continue checkout ..</span>
                <p v-if="!cartItems.length">Your Cart is empty</p>
                <button v-if="!cartItems.length" @click="drawer=false" class="continue" aria-label="Continue Shopping">Continue Shopping</button>
            </div>

            <div class="cardItemsSection">
            <div class="cartItem" v-for="item in cartItems" :key="item.id">
                <div>
                    <img :src="item.img" alt="the Image of the product">
                </div>

                <div style="gap: 1vh;display: flex;flex-direction: column;flex: 1;">
                    <h4>{{ item.title }}</h4>
                    <strong>Category: {{ item.category }}</strong>
                    <p>$ {{ item.price * item.quantity }}</p>

                    <div class="quantityCart">
                        <div class="quantityDetails">
                        <h4 style="text-align: center;color: aliceblue;" @click="item.quantity > 1 ? item.quantity-- : false" aria-label="remove">-</h4>
                        <h4 style="text-align: center;color: aliceblue;">{{ item.quantity }}</h4>
                        <h4 style="text-align: center;color: aliceblue;" @click="item.quantity++" aria-label="add">+</h4>
                        </div>

                        <div class="close">
                        <v-icon @click="deleteItems(item.id)" aria-label="delete item"
                        >mdi-close</v-icon>
                        </div>
                    </div>

                </div>
            </div>
            </div>

            <div class="checkPage" v-if="cartItems.length">
                <v-btn style="color: aliceblue;background-color: blueviolet;width:100%;"
                @click="setCheckOut" accesskey="p">Check Out</v-btn>
                <v-btn style="color: black;background-color: white;width:100%;"
                @click="openViewCart" accesskey="v">View Cart</v-btn>
            </div>

        </v-navigation-drawer>
    </div>
    
</template>

<!-- composition -->
<script setup>
import { ref, inject, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { cart } from '../../store/cartStore'
import { storeToRefs } from "pinia"
import { loadStripe } from "@stripe/stripe-js";

const drawer = ref(false)
const router = useRouter()

const theCart = cart()
const emitter = inject("Emitter")

// from state ( store ) // variable
const { cartItems } = storeToRefs(theCart)
// from action ( store )  // method
const { getItems, deleteItems, setLocalStorage } = theCart

// calculator all prices
const totalPrices = computed(() => {
    let total = 0
    cartItems.value.forEach((el) => {
    total += el.price * el.quantity
    })
    return total
}) 

const setCheckOut = async() => {
            
            if(cartItems.value.length && 10000 - totalPrices.value <= 0){
                emitter.emit("removeItemsMessage")
            }else{
                setTimeout(() => {
                    drawer.value = false
                }, 300);
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

const openViewCart = () => {
    drawer.value = false
    setTimeout(() => {
        router.push({name:'CartPage'})    
    }, 50);
}

onMounted(() => {
    emitter.on("openSideCart",() => {
            drawer.value = true
        }),
        getItems()
})

// for quantity number in side cart when refresh the page
watch(cartItems,() => {
    setLocalStorage()
    },
    { deep: true }
    )

// for cancel main scroll bar when open the drawer 
let scrollPosition = 0
watch(drawer, (val) => {
    const body = document.body
    if(val){
        scrollPosition = windowWidth.scrollY
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

const windowWidth = defineProps({
    windowWidth:{
        type: Number
    }
})

</script>
<style lang="css">
    .sideCardDrawer{
        min-height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
    .cartEmpty{
        display: flex;
        flex-direction: column;
        gap: 2vh;
        padding-left: 2vh;
        padding-top: 5vh;
    }
    .cartEmpty h3{
        font-size: 17px;
        font-weight: 700;
        color: rgba(252, 250, 250, 0.981);
    }
    .cartEmpty p{
        font-size: 16px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.915);
    }
    .cartEmpty span{
        font-size: 14px;
        font-weight: 600;
        width: 85%;
        color: rgba(255, 254, 254, 0.937);
    }
    .continue{
        font-size: 14px;
        font-weight: 600;
        padding: 0.5vh 0vh;
        border: 1px solid transparent;
        color: rgb(254, 254, 254);
        background-color: #7b2cbf;
        border-radius: 7px;
        width: 95%;
        margin-top: 1vh;
        text-align: center;
    }

    .cardItemsSection{
        overflow-y: auto;
        max-height: 55vh;
        margin-top: 2vh;
    }
    .cartItem {
    overflow-y: auto;
    display: flex;
    align-items: center;
    overflow-y: auto;
    padding: 0px 30px;
    gap: 3vh;
    margin-top: 5vh;
    padding-bottom: 3vh;
    border-bottom: 2px solid rgb(196, 193, 193);
}
    .cartItem img{
        width: 90px;
        object-fit: cover;
    }
    .cartItem h4{
        font-size: 13px;
    }
    .cartItem strong{
        font-size: 13px;
    }
    
    .cardItemsSection::-webkit-scrollbar {
    width: 8px;
}

    .cardItemsSection::-webkit-scrollbar-thumb {
    background-color: rgb(245, 244, 244);
    border-radius: 20px;
}

    .cardItemsSection::-webkit-scrollbar-track {
    background-color: #222;
}
    /* Firefox ONLY */
@-moz-document url-prefix() {
  .cardItemsSection {
    scrollbar-width:5px;
    scrollbar-color: red #222;
  }
}
    .checkPage{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5vh;
    margin-top: 5vh;
    margin-bottom: 1vh;

}

    .quantityCart{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
    .quantityDetails{
    width: 8.5vh;
    height: 5.5vh;
    background-color: black;
    border: 1px solid blueviolet;
    cursor:pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2px;
    border-radius: 2px;
    }
    .quantityDetails h4{
        cursor: pointer;
        font-size: 13px;
        text-align: center;
    }

    .no-scroll{
        overflow: hidden !important;
        height: 100% !important;
    }
    
    @media (max-width:1300px) {
        .cartEmpty span{
        font-size: 13px;
        width: 90%;
        font-weight: 600;
        color: rgba(255, 254, 254, 0.937);
    }
    }
</style>
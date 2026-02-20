<template>
    
    <header class="main">

      <v-container fluid>
      <v-row class="align-center d-flex">
      
      <v-col cols="4">
      <a class="logo" style="margin-left: -5vh;">
      <img :src="logoImg" alt="Life Store Logo" loading="lazy">
      </a>
      </v-col>

      <v-col cols="6">
        <nav>
            <router-link class="nav" to="/" role="home link" accesskey="h">HOME</router-link>
            <a class="nav" id="product" @mouseover="showProductList" @mouseleave="notShowProductList" style="cursor: pointer;"
            aria-label="category list" aria-haspopup="true" aria-expanded="false">
            PRODUCTS
            <ul v-show="productList" aria-label="Products menu" role="menu">
                  <li role="menuitem" class="productsLinks" v-for="link in categories" :key="link.route"
                  @click="$router.push({ name: 'CategoryView', params: { category: link.title } })"
                  @keyup.enter="$router.push({ name: 'CategoryView', params: { category: link.title } })">
                  {{ link.title }}
                  </li>
            </ul>
            </a>
            
            <a class="nav" aria-label="about link">ABOUT US</a>
            <a class="nav" id="contact" @mouseover="showContactList" @mouseleave="notShowContactList"
            aria-label="contact" aria-haspopup="true" aria-expanded="false">
              CONTACT
              <ul v-show="contactList" aria-label="Contact menu" role="menu">
                <li  role="menuitem">+90 5876880122</li>
                <li role="menuitem" class="number">lifestore@gmail.com</li>
              </ul>
            </a>
        </nav>
        </v-col>
  
        <v-col cols="2">
        <div style="gap: 2vh;display: flex;align-items: center;padding-left: 24vh;">
          <div class="searchInput">
              <v-icon color="white" size="30" class="searchIcon" aria-label="search" accesskey="s"
              @click="$router.push({name:'searchPage'})">mdi-magnify
              </v-icon>
          </div>

          <v-icon @click="openSideCart" size="30" class="headerButton" aria-label="open side cart"
          :style="`color: white;pointer-events:${$route.name == 'CartPage' ? 'none' : 'unset'}`" accesskey="c"
          >mdi-cart-outline
          </v-icon>
          <v-badge 
          :content="cartItems.length"
          v-if="cartItems.length"
          color="pink"
          location="right top"
          offsetX= "-28"
          offsetY= "-14"
          >
          </v-badge>

        </div>
        </v-col>

        </v-row>
        </v-container>
    </header>
</template>

<!-- composition -->
<script setup>
import { products } from '../../store/store'
import { cart } from "../../store/cartStore"
import { ref, inject, onMounted } from 'vue';
import { storeToRefs } from "pinia"
import logoImg from "/assets/img/logoImg.webp"

const productList = ref(false)
const contactList = ref(false)

const showProductList = () => {
        productList.value = true
      }
const notShowProductList = () => {
        productList.value = false
      }
const showContactList = () => {
        contactList.value = true
      }
const notShowContactList = () => {
        contactList.value = false
      }

const emitter = inject("Emitter")
const openSideCart = () => {
  emitter.emit('openSideCart')
}

const theProducts = products()
const theCart = cart()

const { categories } = storeToRefs(theProducts)
const { cartItems } = storeToRefs(theCart)
const { getProducts } = theProducts

onMounted( async() => {
  await getProducts()
})

</script>
<style lang="css">
  
  .searchInput {
  display: flex;
  align-items: center;
}
 .searchInput input{
  border: 1px solid rgba(255, 255, 255, 0);
  border-radius: 15px;
  border-left-width: 2px;
  border-right-width: 2px;
  opacity: 0;
  width: 19vh;
  height: 5.5vh;
  text-align: left;
  font-size: 14px;
  color: aliceblue;
  padding: 2vh;
  margin-right: -5.5vh;
  outline: none;
  transition: border-color 0.3s, visibility 0.3s;
 }
 .searchInput input:focus{
    border-color: white;
    opacity: 1;
    outline: none;
  }
  .searchInput input:hover{
    border-color: white;
    opacity: 1;
    outline: none;
  }
  .theSearch{
    position:absolute;
    display: flex;
    flex-direction: column;
    gap: 1vh;
    padding-top: 10vh;
  }
  .searchResult{
    text-decoration: none;
    font-size: 12px;
    color: aliceblue;
    margin-top: 15vh;
  }
  .searchIcon:hover .searchInput{
        border-color: white;
        opacity: 1;
  }
 
</style>
    
    






    





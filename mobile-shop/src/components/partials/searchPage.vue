<template>
    <div class="search-page" ref="searchContainer" :style="{height : filterSearch.length > 8 ? '170vh' : '110vh'}">
        <div class="search-input">
            <input type="text" placeholder="Search Here" v-model="search" @focus="showList = true" aria-label="search products">
        </div>

            <div class="theSearch">
                <ul v-for="item in filterSearch" :key="item.id" v-show="showList">
                    
                    <li @click="$router.push({name:'detailView', params:{theId:item.id}})" aria-label="search result">
                    <div class="resultImg">
                        <img :src="item.img" alt="search result image">
                    </div>

                    <p>
                    {{ item.title }} 
                    </p>
                
                    </li>
                    
                </ul>
            </div>
    </div>
</template>

<!-- composition -->
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { storeToRefs } from 'pinia';
import { products } from '../../store/store'

const search = ref("")
const showList = ref(true)
const searchContainer = ref(null)

const theProducts = products()
const { allProducts } = storeToRefs(theProducts)
const { getProducts } = theProducts

const filterSearch = computed(() => {
        if(search.value && search.value.trim() !== ""){
            return allProducts.value.filter((item) => item.title.toLowerCase().includes(search.value.toLowerCase()))
        }
        else{
          return[]
        }
      })

const clickOutside = (event) => {
        const container = searchContainer.value
        if (container && !container.contains(event.target)) {
        showList.value = false
      }
    }

onMounted(() => {
  getProducts()

  document.addEventListener("click", clickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutside)
})
</script>

<style lang="css">
    .search-page{
        width: 100%;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 17vh;
    }
    .search-input{
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        align-items: center;
    }
    .search-input input{
        padding: 10px;
        color: rgba(240, 248, 255, 0.76);
        background-color: transparent;
        font-size: 18px;
        border-style: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.637);
        outline: none;
        text-align: center;
        width: 25%;

    }
    .search-input input:focus{
        border: none;
        outline: none;
        transition: 0.7s ease;

    }

    .theSearch{
    width: 100%;
    margin-top: 3vh;
    display: flex;
    align-items: center;
  }
   
  .theSearch ul{
    padding:0;
    margin: 0;
    list-style-type: none;
    width: 520px;
  }
  .theSearch ul li{
    color: rgba(240, 248, 255, 0.668);
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 20vh 7px 27vh;
    transition: background-color 0.2s ease;
    gap: 5px;
}
.theSearch ul li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
  .resultImg{
    border: 1px solid transparent;
    border-radius: 50%;
    padding: 4px;
    overflow: hidden;
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222;
  }
  .resultImg img{
    width: 100%;
    height: auto;
    object-fit: contain;
    display: block;
  }
  .theSearch p{
    display: flex;
    align-items: center;
    flex: 1;
  }

/* media queries */
@media (max-width: 540px) {
  .search-input input{
        padding: 10px;
        font-size: 20px;
        width: 35%;
    }
}
@media (max-width: 420px) {
  .search-input input{
        padding: 10px;
        font-size: 20px;
        width: 40%;
    }
}
@media (max-width: 370px) {
  .theSearch ul{
    padding:0;
    margin-right: 2vh;
    list-style-type: none;
    width: 530px;
  }
  .theSearch ul li{
    color: rgba(240, 248, 255, 0.668);
    font-size: 13px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 15vh 7px 27vh;
    transition: background-color 0.2s ease;
    gap: 5px;
}
}
@media (max-width: 355px) {
  .search-input input{
        padding: 10px;
        font-size: 20px;
        width: 45%;
    }
}
@media (max-width: 320px) {
  .search-input input{
        padding: 10px;
        font-size: 20px;
        width: 50%;
    }
}


</style>
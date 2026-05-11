<template>
  <section class="edit-page">
    <div class="container">

      <form @submit.prevent="handleSubmit" v-if="theDetails">

        <h1>Edit Product</h1>

        <!-- Product Title -->
        <div class="inputDiv">
          <label>Product Title</label>

          <input
            type="text"
            placeholder="Product Title"
            v-model="theDetails.title"
          />
        </div>

        <!-- Category -->
        <div class="inputDiv">
          <label>Category</label>

          <input
            type="text"
            placeholder="Product Category"
            v-model="theDetails.category"
          />
        </div>

        <!-- Price -->
        <div class="inputDiv">
          <label>Price</label>

          <input
            type="number"
            placeholder="Product Price"
            v-model="theDetails.price"
          />
        </div>

        <!-- Main Image -->
        <div class="inputDiv">
          <label>Main Image</label>

          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload"
          />
          <img v-if="theDetails.img" 
              :src="theDetails.img" style="width:100%; margin-top:10px; border-radius:5px;" 
          />
        </div>

        <!-- Product Details -->
        <div class="inputDiv">
          <label>Product Details</label>

          <textarea
            rows="6"
            placeholder="Product Details"
            v-model="theDetails.productDetails"
          ></textarea>
        </div>

        <!-- Accessories Images -->
        <h3>Accessories Images</h3>

        <div class="inputDiv" v-for="(img, index) in 4" :key="index">
          <label>Image {{ index + 1 }}</label>
          <input
              type="file"
              accept="image/*"
              @change="handleAccessoryUpload($event, index)"
          />
          <img v-if="theDetails.imgGroup[index]" 
              :src="theDetails.imgGroup[index]" 
          style="width:100%; margin-top:10px; border-radius:5px;" />
        </div>

        <!-- Button -->
        <button type="submit">
          Update Product
        </button>

      </form>

    </div>
  </section>
</template>

<script setup>
import {products} from "../store/store"
import { ref, onMounted, watch } from 'vue'
import { storeToRefs } from "pinia"
import { useRoute, useRouter } from "vue-router"
import { useToast } from 'vue-toastification'

const theProducts = products()
const theRoute = useRoute()
const router = useRouter()
const imgGroups = ref(null)
const { theDetails } = storeToRefs(theProducts)
const { showDetails, updateProduct } = theProducts
const toast = useToast()

onMounted(async() => {
        await showDetails(theRoute.params.theId)
})

watch(() => theRoute.params.theId, async() => {
        await showDetails(theRoute.params.theId)
        
        },)

const handleSubmit = async() => {
    await updateProduct(theRoute.params.theId, theDetails.value)
    toast.success('Product Updated Successfully!')
    router.push('/admin-page')
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => { theDetails.value.img = e.target.result }
  reader.readAsDataURL(file)
}

const handleAccessoryUpload = (event, index) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => { theDetails.value.imgGroup[index] = e.target.result }
  reader.readAsDataURL(file)
}

</script>

<style lang="css">
    .edit-page {
        background-color: black;
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: Arial, sans-serif;
    }
    .edit-page .container {
        width: 500px;
        background-color: white;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .edit-page h1 {
        text-align: center;
        margin-bottom: 20px;
        color: #333;
    }
    .edit-page h3 {
        margin-top: 20px;
        margin-bottom: 10px;
        color: #555;
    }
    .inputDiv {
        margin-bottom: 15px;
    }
    .inputDiv label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #333;
    }
    .inputDiv input,
    .inputDiv textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 14px;
        box-sizing: border-box;
    }
    .inputDiv input:focus,
    .inputDiv textarea:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
    .inputDiv textarea {
        resize: vertical;
        min-height: 100px;
    }
    button[type="submit"] {
        width: 100%;
        padding: 12px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    button[type="submit"]:hover {
        background-color: #0056b3;
    }
</style>
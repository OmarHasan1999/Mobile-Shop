<template>
    <div class="admin-page">
        <div class="nav-bar">
            <RouterLink to="/admin-page" class="admin-links">Products</RouterLink>
            <RouterLink to="/admin-page/add-product" class="admin-links">Add Product</RouterLink>
            <button @click="handleLogout" class="logoutButton">Logout</button>
        </div>

        <div class="samsungProducts" v-if="allProducts.length">

            <div class="samsungBox" v-for="item in allProducts" :key="item.id">

                    <h1>{{ item.title }}</h1>
                    <p><span>Price</span> ${{ item.price }}</p>
                
                <div class="imgDiv">
                    <img :src="item.img" loading="lazy" alt="product image from Life Store">
                </div>

                <div class="edit">
                    <h5 @click="$router.push({ name:'Edit Page',params:{theId:item.id} })" aria-label="buy"
                    >Edit</h5>
                    <h5 @click="deleteTheProduct(item.id)" aria-label="buy"
                    >Delete</h5>
                </div>
                    
                </div>
        </div>

    </div>
</template>

<script setup>
import { products } from "../store/store"
import { storeToRefs } from "pinia"
import { onMounted } from "vue";
import { useToast } from 'vue-toastification'
import { useRouter } from "vue-router";

const theProducts = products()
const { allProducts } = storeToRefs(theProducts)
const { getProducts, deleteProduct } = theProducts
const toast = useToast()
const router = useRouter()

onMounted(async() => {
    await getProducts()
})

const deleteTheProduct = async(id) => {
    try {
        await deleteProduct(id)
        await getProducts()
        toast.success('Product Deleted Successfully!')
    } catch (error) {
        toast.error("Error deleting product:")
    }
}

const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/admin-login')

}
</script>
<style lang="css">
    .admin-page {
        background-color: black;
        width: 100%;
        min-height: 100vh;
    }
    .admin-page .nav-bar {
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
    .admin-page .nav-bar .admin-links {
        color: white;
        font-size: 16px;
        text-decoration: none;
        padding: 5px 20px;
        border: 1px solid white;
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    .admin-page .nav-bar .logoutButton {
        color: white;
        font-size: 16px;
        text-decoration: none;
        padding: 5px 20px;
        border: 1px solid white;
        border-radius: 5px;
        transition: all 0.3s ease;
        background-color: transparent;
        cursor: pointer;
    }
    .edit {
        display: flex;
        flex-direction: row;
        gap: 25px;
        color: white;
        cursor: pointer;

    }
   :deep(.Vue-Toastification__toast) {
  width: 400px;
  min-height: 60px;
}
</style>
import axios from "axios";
import { defineStore } from "pinia";

export const products = defineStore("products", {
    state: () => ({
        featureProducts: [],
        allProducts:[],
        categories:[
            {
                title: "Iphone",
                route: "Iphone"
            },
            {
                title: "Samsung",
                route: "Samsung"
            },
            {
                title: "Huawei",
                route: "Huawei"
            }
        ],
        productCategory:[],
        theDetails:"",
    }),

    actions: {
        async getProducts(){
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
            .then((res) => {
                this.featureProducts = res.data.slice(2,10)
                this.allProducts = res.data
            })
        },

        // show products page with the name of the category
        async productsWithCat(cat){
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?category=${cat}`)
            .then((res) => this.productCategory = (res.data))
        },

        // show details page with ID of the product
        async showDetails(id){
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
            .then((res) => this.theDetails = (res.data))

        },
        // update the product with ID of the product
        async updateProduct(id, productData){
            try{
                await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, productData)
            } catch(error){
                console.error('Error updating product:', error)
            }
        },
        // add a new product
        async addProduct(productData){
            const response =await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`, productData)
            return response.data
        },
        // delete the product with ID of the product
        async deleteProduct(id){
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
        }
    }
})
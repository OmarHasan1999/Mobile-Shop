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
            await axios.get('http://localhost:3000/products')
            .then((res) => {
                this.featureProducts = res.data.slice(2,10)
                this.allProducts = res.data
            })
        },

        // show products page with the name of the category
        async productsWithCat(cat){
            await axios.get(`http://localhost:3000/products?category=${cat}`)
            .then((res) => this.productCategory = (res.data))
        },

        // show details page with ID of the product
        async showDetails(id){
            await axios.get(`http://localhost:3000/products/${id}`)
            .then((res) => this.theDetails = (res.data))

        }
    }
})
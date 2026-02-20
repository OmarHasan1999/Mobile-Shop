import { defineStore } from "pinia";

export const cart = defineStore("cart", {
    state:() => ({
        cartItems:[]
    }),
    actions:{
        addItems(item){
            // check if cart have same item
            let exists = false
            for (let i = 0; i < this.cartItems.length; i++) {
                // if have same item add quantity number
                if(this.cartItems[i].id == item.id){
                    this.cartItems[i].quantity += item.quantity
                    exists = true
                    break
                }
            }
                // or not we add item to the card
                if(!exists){
                    this.cartItems.push(JSON.parse(JSON.stringify(item)))
                }
                // when refresh the page storage the items
                localStorage.setItem("cart-items", JSON.stringify(this.cartItems))
        },

        // get items to cart page
        getItems(){
            const items = localStorage.getItem("cart-items")
            if(items){
                this.cartItems = JSON.parse(items)
            }
        },

        // delete an item from the card
        deleteItems(id){
            for (let i = 0; i < this.cartItems.length; i++) {
                if(this.cartItems[i].id == id ){
                    this.cartItems.splice(i,1)
                }
            }
            localStorage.setItem("cart-items", JSON.stringify(this.cartItems))
        },

         // set the quantity in local storage
        setLocalStorage(){
            localStorage.setItem("cart-items", JSON.stringify(this.cartItems))
        },

        // remove all items
        removeAllItems(){
            this.cartItems = []
            localStorage.removeItem("cart-items")
        }
    }
})
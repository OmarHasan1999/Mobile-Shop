const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const port = process.env.PORT || 4242

require("dotenv").config()
const stripe = require('stripe')(process.env.SECRET_KEY)
const app = express()
app.use(express.json())

//cors
app.use(cors({ origin: process.env.FRONTEND_URL }))

//CSP(content security policy)
app.use(
    helmet.contentSecurityPolicy({
        directives:{
            defaultSrc:["'self'"],
            scriptSrc:["'self'","https://js.stripe.com"],
            frameSrc:["'self'","https://js.stripe.com"],
            frameAncestors: ["'none'"],
            connectSrc:["'self'","https://api.stripe.com"],
            imgSrc:["'self'","data:","https://*.stripe.com"],
            styleSrc: ["'self'","'unsafe-inline'","https://fonts.googleapis.com"],
            fontSrc: ["'self'","https://fonts.gstatic.com"],
            requireTrustedTypesFor: ["'script'"]
        }
    })
)

// HSTS(HTTP Strict Transport Security)
app.use(
  helmet.hsts({
    maxAge: 15552000,
    includeSubDomains: true,
    preload: false
})
)

//COOP(Cross-Origin-Opener-Policy)
app.use(
  helmet.crossOriginOpenerPolicy({ policy: "same-origin" })
)

app.post('/create-checkout-session', async(req,res) => {

    const {products} = req.body

    const line_items= products.map(item => ({
                   // for custom the product from website
                    price_data:{
                        currency: 'usd',
                        product_data:{
                            name: item.title,
                            // images: [item.img],
                        },
                        unit_amount : item.price * 100, 
                    },
                    quantity: item.quantity
    })) 
    try{
        const domain = req.headers.origin
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode: 'payment',
            line_items,
            success_url: `${domain}/success-page`,
            cancel_url: `${domain}/card-page`,
    })
        res.json({id:session.id})
    }
    catch(error){
        console.error("stripe error:", error);
        res.status(500).send({error:error.message})
    }
})

app.listen(port,"0.0.0.0", () => console.log(`Server running at http://localhost:${port}`))

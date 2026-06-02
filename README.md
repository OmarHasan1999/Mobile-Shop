## 📱 Mobile Shop – Vue.js E-Commerce

## 🌐 [Live Demo](https://mobile-phones-shop.web.app)

> **API:** [omarh-dev99-mobile-shop-api.hf.space](https://omarh-dev99-mobile-shop-api.hf.space)

## 📄 Description
* Mobile Shop is an e-commerce web application built to practice modern frontend and backend web development.  

* The project demonstrates a **Vue 3 + Vuetify frontend**, a **Node.js backend**, and **Stripe payment integration in test mode**

---

## 🛠 Tech Stack
- **Frontend:** Vue 3, Vuetify, Three.js, GSAP, JavaScript, CSS 
- **Backend:** Node.js, Express  
- **Data:** JSON Server (merged with backend) 
- **Payments:** Stripe (Test Mode)


---

## 📁 Project Structure
* Front/ Vue 3 + Vuetify frontend
* Server/ Node.js backend (Stripe + JSON Server)


## 2️⃣ Environment Variables

> Create .env files using the provided examples :
* Front/.env → based on Front/.env.example
* Server/.env → based on Server/.env.example
* ⚠️ .env files are ignored by Git and should never be committed.

## 3️⃣ Run Backend (Node.js + JSON Server)
```js
cd Server
npm install
npm run dev
```
> API available at: http://localhost:4242/api/products

## 4️⃣ Run Frontend (Vue)
```js
cd Mobile Shop
npm install
npm run dev
```
> Frontend available at: http://localhost:5173

---

## Run with Docker

**If you prefer to run using Docker, follow these steps :**

- **Navigate to the main folder**

- **Build and start the containers**

```
docker compose up --build
```

> The application will be available at : http://localhost:5173

- **Stop containers**
```
docker compose down
```

---

## 💳 Stripe Test Mode
- Use these test card details:
```
Card Number : 4242 4242 4242 4242
Expiry Date : Any future date
CVC         : Any 3 digits
```

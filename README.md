# 📱 Mobile Shop – Vue.js E-Commerce

## 📄 Description
* Mobile Shop is an e-commerce web application built to practice modern frontend and backend web development.  

* The project demonstrates a **Vue 3 + Vuetify frontend**, a **Node.js backend**, and **Stripe payment integration in test mode**

---

## 🛠 Tech Stack
- **Frontend:** Vue 3, Vuetify, JavaScript, CSS  
- **Backend:** Node.js, Express  
- **Mock Database:** json-server  
- **Payments:** Stripe (Test Mode)


---

## 📁 Project Structure
* Front/ Vue 3 + Vuetify frontend
* Server/ Node.js backend (Stripe integration)
*  json-server/ Mock REST API for products


## 2️⃣ Environment Variables

> Create .env files using the provided examples :
* Front/.env → based on Front/.env.example
* Server/.env → based on Server/.env.example
* ⚠️ .env files are ignored by Git and should never be committed.

## 3️⃣ Run json-server
```js
cd json-server
npm install
npm run dev
```

## 4️⃣ Run Backend (Node.js)
```js
cd Server
npm install
npm run dev
```

## 5️⃣ Run Frontend (Vue)
```js
cd Mobile Shop
npm install
npm run dev
```

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

<template>
  <section class="admin-login">

    <form class="login-box" @submit.prevent="handleLogin">

      <h1>Admin Login</h1>

      <div class="inputDiv">
        <label>Email</label>

        <input
          type="email"
          placeholder="Enter admin email"
          v-model="email"
        />
      </div>

      <div class="inputDiv">
        <label>Password</label>

        <input
          type="password"
          placeholder="Enter password"
          v-model="password"
        />
      </div>

      <button type="submit">
        Login
      </button>

    </form>

  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const router = useRouter()
const email = ref('')
const password = ref('')
const toast = useToast()

const handleLogin = () => {

  if(email.value === 'admin@gmail.com' && password.value === '1234'){

    localStorage.setItem('isAdmin', true)

    toast.success('Login Successful!')
    router.push('/admin-page')
  } else {
    toast.error('Wrong Email Or Password')

  }

}
</script>

<style lang="css">

.admin-login{
    width: 100%;
    min-height: 100vh;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-box{
    width: 400px;
    background-color: #111;
    padding: 40px;
    border-radius: 10px;
    border: 1px solid #222;
}

.login-box h1{
    color: white;
    text-align: center;
    margin-bottom: 30px;
    font-size: 32px;
}

.inputDiv{
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.inputDiv label{
    color: white;
    margin-bottom: 8px;
    font-size: 15px;
}

.inputDiv input{
    width: 100%;
    padding: 12px;
    border: 1px solid #333;
    background-color: #1b1b1b;
    color: white;
    border-radius: 6px;
    outline: none;
    font-size: 15px;
}

.inputDiv input:focus{
    border-color: #0ea5e9;
}

button{
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 6px;
    background-color: #0ea5e9;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
}

button:hover{
    background-color: #0284c7;
}

</style>
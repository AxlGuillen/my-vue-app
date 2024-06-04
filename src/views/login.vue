<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Inicia Sesion</h1>
      <form @submit.prevent="login">
        <div class="parametros">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="parametros">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <button class="register-button" @click="goToRegister">Registrar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import apiClient from '../axios';

const email = ref('');
const password = ref('');

const router = useRouter();

const login = async () => {
  try {
    const response = await apiClient.login({ email: email.value, password: password.value });
    console.log('Login successful:', response.data);
    localStorage.setItem('token', response.data.token); // Guardar el token en localStorage
    router.push({ name: 'home' }); // Redirigir a la vista con el nombre "home"
  } catch (error) {
    console.error('Login error:', error);
  }
};

const goToRegister = () => {
  router.push({ name: 'register' }); // Redirigir a la vista con el nombre "register"
};
</script>

<style scoped>
/* Estilos del componente */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
}

input {
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.register-button {
    width: 300px;
  margin-top: 10px;
  background-color: #28a745;
}

.register-button:hover {
  background-color: #218838;
}

.parametros{
    display: flex;
    justify-content: space-between;
}
</style>

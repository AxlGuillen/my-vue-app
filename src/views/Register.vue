<template>
  <div class="register-page">
    <div class="register-container">
      <h1>Registrar</h1>
      <form @submit.prevent="register">
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <button type="submit">Registrar</button>
      </form>
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

const register = async () => {
  try {
    await apiClient.register({ email: email.value, password: password.value });
    console.log('Registro exitoso');
    router.push({ name: 'login' }); // Redirigir a la vista de login después del registro
  } catch (error) {
    console.error('Error en el registro:', error);
  }
};
</script>

<style scoped>
/* Estilos del componente */
.register-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: url('/path-to-your-background-image.jpg') no-repeat center center fixed;
  background-size: cover;
}

.register-container {
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
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
</style>

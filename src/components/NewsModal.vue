<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
        <div>
<span class="close" @click="closeModal">&times;</span>
      <h2>{{ isEditing ? 'Editar Noticia' : 'Agregar Noticia' }}</h2>
        </div>
      
      <form @submit.prevent="submitForm">
        <div class="parametros">
          <label for="title">Título:</label>
          <input type="text" id="title" v-model="newsData.title" required />
        </div>
        <div class="parametros">
          <label for="resume">Contenido:</label>
          <textarea id="resume" v-model="newsData.resume" required></textarea>
        </div>
        <div class="parametros">
          <label for="author">Autor:</label>
          <input type="text" id="author" v-model="newsData.author" required />
        </div>
        <button type="submit">{{ isEditing ? 'Guardar Cambios' : 'Agregar Noticia' }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  news: Object,
  isEditing: Boolean,
});

const emit = defineEmits(['close', 'submit']);

const newsData = ref({
  title: '',
  resume: '',
  author: ''
});

watch(props.news, (newNews) => {
  if (newNews) {
    newsData.value = { ...newNews };
  }
});

const closeModal = () => {
  emit('close');
};

const submitForm = () => {
  emit('submit', newsData.value);
  closeModal();
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
}

.close {
  float: right;
  font-size: 1.5rem;
  cursor: pointer;
}

.close:hover {
  color: red;
}

.parametros{
    display: flex;
    width: 300px;
    justify-content: space-between;
    margin: 10px auto;
}
</style>

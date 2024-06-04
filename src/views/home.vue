<template>
  <div>
    <h1>Bienvenido</h1>
    <button @click="openAddModal">Agregar Noticia</button>
    <div v-if="news.length" class="news-container">
      <div v-for="item in news" :key="item.id" class="news-card">
        <h2 @click="openEditModal(item)">{{ item.title }}</h2>
        <p @click="openEditModal(item)">{{ item.resume }}</p>
        <p @click="openEditModal(item)"><strong>Autor:</strong> {{ item.author }}</p>
        <button class="delete-button" @click="deleteNews(item.id)">Eliminar</button>
      </div>
    </div>
    <div v-else>
      <p>No hay noticias disponibles.</p>
    </div>
    <NewsModal
      :show="showModal"
      :news="currentNews"
      :isEditing="isEditing"
      @close="closeModal"
      @submit="handleModalSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../axios';
import NewsModal from '../components/NewsModal.vue';

const news = ref([]);
const showModal = ref(false);
const isEditing = ref(false);
const currentNews = ref(null);

const fetchNews = async () => {
  try {
    const response = await apiClient.getNews();
    news.value = response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
  }
};

const openAddModal = () => {
  isEditing.value = false;
  currentNews.value = { title: '', resume: '', author: '' };
  showModal.value = true;
};

const openEditModal = (newsItem) => {
  isEditing.value = true;
  currentNews.value = { ...newsItem };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const handleModalSubmit = async (newsData) => {
  try {
    if (isEditing.value) {
      await apiClient.updateNews(currentNews.value.id, newsData);
    } else {
      await apiClient.createNews(newsData);
    }
    fetchNews();
  } catch (error) {
    console.error('Error saving news:', error);
  }
};

const deleteNews = async (id) => {
  try {
    await apiClient.deleteNews(id);
    fetchNews(); // Vuelve a obtener las noticias después de eliminar una noticia
  } catch (error) {
    console.error('Error deleting news:', error);
  }
};

onMounted(fetchNews);
</script>

<style scoped>
.news-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.news-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 300px;
  cursor: pointer;
}

.news-card h2, .news-card p {
  cursor: pointer;
}

.news-card h2 {
  margin: 0 0 10px;
  font-size: 1.5em;
}

.news-card p {
  margin: 0 0 10px;
}

.news-card p strong {
  font-weight: bold;
}

button {
  margin-bottom: 20px;
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

.delete-button {
  background-color: #ff4d4d;
}

.delete-button:hover {
  background-color: #ff0000;
}
</style>

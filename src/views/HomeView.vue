<template>
  <div>
    <div class="hero-section text-center rounded-4 mb-5">
      <div class="container position-relative">
        <h1>Compu<span style="color: var(--cs-accent)">Store</span> CR</h1>
        <p class="lead mb-4">Los mejores componentes y equipos de computo en Costa Rica</p>
        <RouterLink to="/productos" class="btn btn-search btn-lg px-4">
          <i class="bi bi-grid me-2"></i>Ver todos los productos
        </RouterLink>
      </div>
    </div>

    <h2 class="section-title">Nuestras Categorias</h2>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else class="row">
      <div
        v-for="categoria in categorias"
        :key="categoria.id"
        class="col-md-6 col-lg-3 mb-4"
      >
        <RouterLink :to="`/categorias/${categoria.id}`" class="text-decoration-none">
          <div class="card category-card h-100 shadow-sm text-center p-4">
            <div class="cat-icon" :style="{ background: iconMap[categoria.nombre]?.[1] || '#f5f5f5', color: iconMap[categoria.nombre]?.[2] || '#424242' }">
              <i :class="`bi ${iconMap[categoria.nombre]?.[0] || 'bi-folder'}`"></i>
            </div>
            <h5 class="fw-bold text-dark mb-2">{{ categoria.nombre }}</h5>
            <p class="text-muted small mb-3">{{ categoria.descripcion }}</p>
            <span class="cat-count mx-auto">{{ categoria.articulos_count }} productos</span>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { getCategorias } from '../api.js'

const categorias = ref([])
const cargando = ref(true)

const iconMap = {
  'Laptops': ['bi-laptop', '#e3f2fd', '#1565c0'],
  'Computadoras de Escritorio': ['bi-pc-display', '#fce4ec', '#c62828'],
  'Monitores': ['bi-display', '#e8f5e9', '#2e7d32'],
  'Procesadores': ['bi-cpu', '#fff3e0', '#e65100'],
  'Tarjetas de Video': ['bi-gpu-card', '#f3e5f5', '#6a1b9a'],
  'Almacenamiento': ['bi-device-hdd', '#e0f7fa', '#00838f'],
  'Memorias RAM': ['bi-memory', '#fce4ec', '#ad1457'],
  'Perifericos': ['bi-keyboard', '#f1f8e9', '#558b2f'],
}

onMounted(async () => {
  try {
    const res = await getCategorias()
    categorias.value = res.data
  } finally {
    cargando.value = false
  }
})
</script>

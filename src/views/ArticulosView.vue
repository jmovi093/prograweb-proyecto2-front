<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/"><i class="bi bi-house-door"></i> Inicio</RouterLink></li>
        <li class="breadcrumb-item active">{{ query ? 'Busqueda' : 'Productos' }}</li>
      </ol>
    </nav>

    <div class="d-flex justify-content-between align-items-center mb-4">
      <div v-if="query">
        <h2 class="section-title mb-1">Resultados de busqueda</h2>
        <p class="text-muted">Mostrando resultados para: <strong>"{{ query }}"</strong></p>
      </div>
      <h2 v-else class="section-title">Todos los Productos</h2>
      <span v-if="meta" class="badge bg-dark rounded-pill fs-6 px-3 py-2">{{ meta.total }} productos</span>
    </div>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <template v-else>
      <div v-if="articulos.length === 0" class="text-center py-5">
        <i class="bi bi-search display-1 text-muted"></i>
        <h4 class="text-muted mt-3">No se encontraron productos</h4>
        <p class="text-muted">Intenta con otros terminos de busqueda</p>
        <RouterLink to="/productos" class="btn btn-search">Ver todos los productos</RouterLink>
      </div>
      <div v-else>
        <div class="row">
          <ProductoCard v-for="a in articulos" :key="a.id" :articulo="a" />
        </div>
        <Paginacion :meta="meta" @cambiar="cambiarPagina" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getArticulos, buscarArticulos } from '../api.js'
import ProductoCard from '../components/ProductoCard.vue'
import Paginacion from '../components/Paginacion.vue'

const route = useRoute()
const articulos = ref([])
const meta = ref(null)
const cargando = ref(true)
const query = ref('')

async function cargar(page = 1) {
  cargando.value = true
  try {
    query.value = route.query.q || ''
    const res = query.value
      ? await buscarArticulos(query.value, page)
      : await getArticulos(page)
    articulos.value = res.data.data
    meta.value = {
      current_page: res.data.current_page,
      last_page: res.data.last_page,
      total: res.data.total,
    }
  } finally {
    cargando.value = false
  }
}

function cambiarPagina(page) {
  cargar(page)
}

watch(() => route.query.q, () => cargar())
onMounted(() => cargar())
</script>

<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/"><i class="bi bi-house-door"></i> Inicio</RouterLink></li>
        <li class="breadcrumb-item active">{{ categoria?.nombre }}</li>
      </ol>
    </nav>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <template v-else>
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="section-title mb-1">{{ categoria?.nombre }}</h2>
          <p class="text-muted">{{ categoria?.descripcion }}</p>
        </div>
        <span v-if="meta" class="badge bg-dark rounded-pill fs-6 px-3 py-2">{{ meta.total }} productos</span>
      </div>

      <div v-if="articulos.length === 0" class="alert alert-info">
        <i class="bi bi-info-circle me-2"></i>No hay productos en esta categoria.
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
import { ref, onMounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getCategoria } from '../api.js'
import ProductoCard from '../components/ProductoCard.vue'
import Paginacion from '../components/Paginacion.vue'

const route = useRoute()
const categoria = ref(null)
const articulos = ref([])
const meta = ref(null)
const cargando = ref(true)

async function cargar(page = 1) {
  cargando.value = true
  try {
    const res = await getCategoria(route.params.id, page)
    categoria.value = res.data.categoria
    articulos.value = res.data.articulos.data
    meta.value = {
      current_page: res.data.articulos.current_page,
      last_page: res.data.articulos.last_page,
      total: res.data.articulos.total,
    }
  } finally {
    cargando.value = false
  }
}

function cambiarPagina(page) { cargar(page) }

watch(() => route.params.id, () => cargar())
onMounted(() => cargar())
</script>

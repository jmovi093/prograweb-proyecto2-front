<template>
  <div>
    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <template v-else-if="articulo">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><RouterLink to="/"><i class="bi bi-house-door"></i> Inicio</RouterLink></li>
          <li class="breadcrumb-item">
            <RouterLink :to="`/categorias/${articulo.categoria?.id}`">{{ articulo.categoria?.nombre }}</RouterLink>
          </li>
          <li class="breadcrumb-item active">{{ articulo.nombre }}</li>
        </ol>
      </nav>

      <div class="row g-4">
        <div class="col-lg-5">
          <div class="detail-image-container shadow-sm">
            <img
              :src="articulo.imagen_url || 'https://placehold.co/500x400/f0f2f5/999?text=Sin+Imagen'"
              class="img-fluid"
              :alt="articulo.nombre"
            >
          </div>
        </div>
        <div class="col-lg-7">
          <div class="detail-info">
            <span class="product-brand d-block mb-1" style="font-size:0.85rem;">{{ articulo.marca?.nombre }}</span>
            <h2 class="mb-3">{{ articulo.nombre }}</h2>

            <div class="detail-price mb-3">
              {{ articulo.moneda === 'Colones' ? '₡' : '$' }}{{ formatPrecio(articulo.precio) }}
              <small class="text-muted fs-6 fw-normal">{{ articulo.moneda }}</small>
            </div>

            <div class="mb-4">
              <span :class="['badge', 'me-1', 'px-3', 'py-2', articulo.estado === 'Nuevo' ? 'bg-primary' : 'bg-secondary']">
                {{ articulo.estado }}
              </span>
              <span v-if="articulo.stock > 5" class="badge bg-success px-3 py-2">
                <i class="bi bi-check-circle me-1"></i>En stock ({{ articulo.stock }})
              </span>
              <span v-else-if="articulo.stock > 0" class="badge bg-warning text-dark px-3 py-2">
                <i class="bi bi-exclamation-circle me-1"></i>Quedan {{ articulo.stock }}
              </span>
              <span v-else class="badge bg-danger px-3 py-2">
                <i class="bi bi-x-circle me-1"></i>Agotado
              </span>
            </div>

            <div v-if="articulo.etiquetas?.length" class="mb-4">
              <span
                v-for="etiqueta in articulo.etiquetas"
                :key="etiqueta.id"
                :class="['badge', 'me-1', 'px-3', 'py-2', badgeClass(etiqueta.nombre)]"
              >
                {{ etiqueta.nombre }}
              </span>
            </div>

            <div class="bg-white rounded-3 p-3 shadow-sm mb-4">
              <div class="spec-item">
                <i class="bi bi-folder2"></i>
                <span class="spec-label">Categoria</span>
                <RouterLink :to="`/categorias/${articulo.categoria?.id}`" class="spec-value text-decoration-none">
                  {{ articulo.categoria?.nombre }}
                </RouterLink>
              </div>
              <div class="spec-item">
                <i class="bi bi-building"></i>
                <span class="spec-label">Marca</span>
                <span class="spec-value">
                  {{ articulo.marca?.nombre }}
                  <a v-if="articulo.marca?.sitio_web" :href="articulo.marca.sitio_web" target="_blank" class="ms-1 text-muted">
                    <i class="bi bi-box-arrow-up-right"></i>
                  </a>
                </span>
              </div>
              <div class="spec-item">
                <i class="bi bi-cash-stack"></i>
                <span class="spec-label">Moneda</span>
                <span class="spec-value">{{ articulo.moneda }}</span>
              </div>
              <div class="spec-item border-0">
                <i class="bi bi-stars"></i>
                <span class="spec-label">Estado</span>
                <span class="spec-value">{{ articulo.estado }}</span>
              </div>
            </div>

            <div class="mb-4">
              <h5 class="fw-bold"><i class="bi bi-card-text me-2"></i>Descripcion</h5>
              <p class="text-muted">{{ articulo.descripcion || 'Sin descripcion disponible.' }}</p>
            </div>

            <div class="d-flex gap-2 flex-wrap">
              <RouterLink :to="`/productos/${articulo.id}/editar`" class="btn btn-warning px-4">
                <i class="bi bi-pencil me-1"></i>Editar
              </RouterLink>
              <button class="btn btn-danger px-4" @click="confirmarEliminar">
                <i class="bi bi-trash me-1"></i>Eliminar
              </button>
              <RouterLink to="/productos" class="btn btn-outline-secondary px-4">
                <i class="bi bi-arrow-left me-1"></i>Volver
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { getArticulo, eliminarArticulo } from '../api.js'

const emit = defineEmits(['flash'])
const route = useRoute()
const router = useRouter()
const articulo = ref(null)
const cargando = ref(true)

onMounted(async () => {
  try {
    const res = await getArticulo(route.params.id)
    articulo.value = res.data
  } finally {
    cargando.value = false
  }
})

async function confirmarEliminar() {
  if (!confirm('¿Esta seguro de eliminar este producto?')) return
  await eliminarArticulo(articulo.value.id)
  emit('flash', { message: 'Articulo eliminado exitosamente.', type: 'success' })
  router.push('/productos')
}

function formatPrecio(precio) {
  return Number(precio).toLocaleString('es-CR')
}

function badgeClass(nombre) {
  const map = {
    'Gamer': 'badge-gamer', 'Oficina': 'badge-oficina',
    'Profesional': 'badge-profesional', 'Estudiante': 'badge-estudiante',
    'Alto Rendimiento': 'badge-alto', 'Economico': 'badge-economico',
  }
  return map[nombre] || 'bg-dark'
}
</script>

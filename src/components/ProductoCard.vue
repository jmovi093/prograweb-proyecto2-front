<template>
  <div class="col-md-6 col-lg-3 mb-4">
    <div class="card product-card h-100 shadow-sm">
      <img
        :src="articulo.imagen_url || 'https://placehold.co/300x220/f0f2f5/999?text=Sin+Imagen'"
        class="card-img-top"
        :alt="articulo.nombre"
      >
      <div class="card-body d-flex flex-column">
        <p class="product-brand mb-1">{{ articulo.marca?.nombre }}</p>
        <p class="product-name mb-2">{{ articulo.nombre }}</p>
        <div class="mb-2">
          <span v-for="etiqueta in articulo.etiquetas" :key="etiqueta.id"
            :class="['badge', 'me-1', badgeClass(etiqueta.nombre)]">
            {{ etiqueta.nombre }}
          </span>
        </div>
        <div class="product-price mt-auto mb-2">
          {{ articulo.moneda === 'Colones' ? '₡' : '$' }}{{ formatPrecio(articulo.precio) }}
        </div>
        <RouterLink :to="`/productos/${articulo.id}`" class="btn-detail">
          Ver detalle
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({ articulo: Object })

function formatPrecio(precio) {
  return Number(precio).toLocaleString('es-CR')
}

function badgeClass(nombre) {
  const map = {
    'Gamer': 'badge-gamer',
    'Oficina': 'badge-oficina',
    'Profesional': 'badge-profesional',
    'Estudiante': 'badge-estudiante',
    'Alto Rendimiento': 'badge-alto',
    'Economico': 'badge-economico',
  }
  return map[nombre] || 'bg-dark'
}
</script>

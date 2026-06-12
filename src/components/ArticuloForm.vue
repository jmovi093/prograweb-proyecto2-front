<template>
  <form @submit.prevent="$emit('submit', form)">
    <div class="row">
      <div class="col-md-8">
        <div class="mb-3">
          <label class="form-label">Nombre</label>
          <input type="text" class="form-control" :class="{ 'is-invalid': errores.nombre }" v-model="form.nombre" required>
          <div v-if="errores.nombre" class="invalid-feedback">{{ errores.nombre[0] }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label">Descripcion</label>
          <textarea class="form-control" :class="{ 'is-invalid': errores.descripcion }" v-model="form.descripcion" rows="4"></textarea>
          <div v-if="errores.descripcion" class="invalid-feedback">{{ errores.descripcion[0] }}</div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label">Categoria</label>
            <select class="form-select" :class="{ 'is-invalid': errores.categoria_id }" v-model="form.categoria_id" required>
              <option value="">Seleccionar...</option>
              <option v-for="c in categorias" :key="c.id" :value="c.id">{{ c.nombre }}</option>
            </select>
            <div v-if="errores.categoria_id" class="invalid-feedback">{{ errores.categoria_id[0] }}</div>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label">Marca</label>
            <select class="form-select" :class="{ 'is-invalid': errores.marca_id }" v-model="form.marca_id" required>
              <option value="">Seleccionar...</option>
              <option v-for="m in marcas" :key="m.id" :value="m.id">{{ m.nombre }}</option>
            </select>
            <div v-if="errores.marca_id" class="invalid-feedback">{{ errores.marca_id[0] }}</div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">URL de Imagen</label>
          <input type="text" class="form-control" v-model="form.imagen_url" placeholder="https://ejemplo.com/imagen.jpg">
        </div>

        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label">Precio</label>
            <input type="number" step="0.01" class="form-control" :class="{ 'is-invalid': errores.precio }" v-model="form.precio" required>
            <div v-if="errores.precio" class="invalid-feedback">{{ errores.precio[0] }}</div>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Moneda</label>
            <select class="form-select" v-model="form.moneda" required>
              <option value="Colones">Colones</option>
              <option value="Dolares">Dolares</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label class="form-label">Estado</label>
            <select class="form-select" v-model="form.estado" required>
              <option value="Nuevo">Nuevo</option>
              <option value="Usado">Usado</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Stock</label>
          <input type="number" class="form-control" :class="{ 'is-invalid': errores.stock }" v-model="form.stock" min="0" required>
          <div v-if="errores.stock" class="invalid-feedback">{{ errores.stock[0] }}</div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="mb-3">
          <label class="form-label">Etiquetas</label>
          <div v-for="etiqueta in etiquetas" :key="etiqueta.id" class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              :id="`etiqueta_${etiqueta.id}`"
              :value="etiqueta.id"
              v-model="form.etiquetas"
            >
            <label class="form-check-label" :for="`etiqueta_${etiqueta.id}`">{{ etiqueta.nombre }}</label>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex gap-2">
      <button type="submit" class="btn btn-primary px-4" :disabled="enviando">
        <span v-if="enviando" class="spinner-border spinner-border-sm me-1"></span>
        {{ submitLabel }}
      </button>
      <RouterLink to="/productos" class="btn btn-outline-secondary px-4">Cancelar</RouterLink>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  inicial: { type: Object, default: () => ({}) },
  categorias: Array,
  marcas: Array,
  etiquetas: Array,
  errores: { type: Object, default: () => ({}) },
  enviando: Boolean,
  submitLabel: { type: String, default: 'Guardar' },
})

defineEmits(['submit'])

const form = ref({
  nombre: '',
  descripcion: '',
  categoria_id: '',
  marca_id: '',
  imagen_url: '',
  precio: '',
  moneda: 'Colones',
  estado: 'Nuevo',
  stock: 0,
  etiquetas: [],
})

watch(() => props.inicial, (val) => {
  if (val && val.id) {
    form.value = {
      nombre: val.nombre || '',
      descripcion: val.descripcion || '',
      categoria_id: val.categoria_id || '',
      marca_id: val.marca_id || '',
      imagen_url: val.imagen_url || '',
      precio: val.precio || '',
      moneda: val.moneda || 'Colones',
      estado: val.estado || 'Nuevo',
      stock: val.stock ?? 0,
      etiquetas: val.etiquetas?.map(e => e.id) || [],
    }
  }
}, { immediate: true })
</script>

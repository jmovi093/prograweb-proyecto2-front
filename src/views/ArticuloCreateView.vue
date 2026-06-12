<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/"><i class="bi bi-house-door"></i> Inicio</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/productos">Productos</RouterLink></li>
        <li class="breadcrumb-item active">Nuevo Producto</li>
      </ol>
    </nav>

    <div class="card border-0 shadow-sm p-4">
      <h2 class="section-title">Nuevo Producto</h2>
      <ArticuloForm
        :categorias="categorias"
        :marcas="marcas"
        :etiquetas="etiquetas"
        :errores="errores"
        :enviando="enviando"
        submit-label="Crear Producto"
        @submit="guardar"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { crearArticulo, getCategorias, getMarcas, getEtiquetas } from '../api.js'
import ArticuloForm from '../components/ArticuloForm.vue'

const emit = defineEmits(['flash'])
const router = useRouter()
const categorias = ref([])
const marcas = ref([])
const etiquetas = ref([])
const errores = ref({})
const enviando = ref(false)

onMounted(async () => {
  const [c, m, e] = await Promise.all([getCategorias(), getMarcas(), getEtiquetas()])
  categorias.value = c.data
  marcas.value = m.data
  etiquetas.value = e.data
})

async function guardar(form) {
  enviando.value = true
  errores.value = {}
  try {
    const res = await crearArticulo(form)
    emit('flash', { message: 'Articulo creado exitosamente.', type: 'success' })
    router.push(`/productos/${res.data.id}`)
  } catch (err) {
    if (err.response?.status === 422) {
      errores.value = err.response.data.errors
    } else {
      emit('flash', { message: 'Error al crear el articulo.', type: 'danger' })
    }
  } finally {
    enviando.value = false
  }
}
</script>

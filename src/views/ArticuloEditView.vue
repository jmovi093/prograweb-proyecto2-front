<template>
  <div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/"><i class="bi bi-house-door"></i> Inicio</RouterLink></li>
        <li class="breadcrumb-item"><RouterLink to="/productos">Productos</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink v-if="articulo" :to="`/productos/${articulo.id}`">{{ articulo.nombre }}</RouterLink>
        </li>
        <li class="breadcrumb-item active">Editar</li>
      </ol>
    </nav>

    <div v-if="cargando" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else class="card border-0 shadow-sm p-4">
      <h2 class="section-title">Editar Producto</h2>
      <ArticuloForm
        :inicial="articulo"
        :categorias="categorias"
        :marcas="marcas"
        :etiquetas="etiquetas"
        :errores="errores"
        :enviando="enviando"
        submit-label="Actualizar Producto"
        @submit="guardar"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { getArticulo, actualizarArticulo, getCategorias, getMarcas, getEtiquetas } from '../api.js'
import ArticuloForm from '../components/ArticuloForm.vue'

const emit = defineEmits(['flash'])
const route = useRoute()
const router = useRouter()
const articulo = ref(null)
const categorias = ref([])
const marcas = ref([])
const etiquetas = ref([])
const errores = ref({})
const enviando = ref(false)
const cargando = ref(true)

onMounted(async () => {
  const [a, c, m, e] = await Promise.all([
    getArticulo(route.params.id),
    getCategorias(),
    getMarcas(),
    getEtiquetas(),
  ])
  articulo.value = a.data
  categorias.value = c.data
  marcas.value = m.data
  etiquetas.value = e.data
  cargando.value = false
})

async function guardar(form) {
  enviando.value = true
  errores.value = {}
  try {
    await actualizarArticulo(articulo.value.id, form)
    emit('flash', { message: 'Articulo actualizado exitosamente.', type: 'success' })
    router.push(`/productos/${articulo.value.id}`)
  } catch (err) {
    if (err.response?.status === 422) {
      errores.value = err.response.data.errors
    } else {
      emit('flash', { message: 'Error al actualizar el articulo.', type: 'danger' })
    }
  } finally {
    enviando.value = false
  }
}
</script>

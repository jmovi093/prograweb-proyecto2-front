import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticulosView from '../views/ArticulosView.vue'
import ArticuloDetalleView from '../views/ArticuloDetalleView.vue'
import ArticuloCreateView from '../views/ArticuloCreateView.vue'
import ArticuloEditView from '../views/ArticuloEditView.vue'
import CategoriaView from '../views/CategoriaView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/productos', name: 'articulos.index', component: ArticulosView },
    { path: '/productos/crear', name: 'articulos.create', component: ArticuloCreateView },
    { path: '/productos/:id', name: 'articulos.show', component: ArticuloDetalleView },
    { path: '/productos/:id/editar', name: 'articulos.edit', component: ArticuloEditView },
    { path: '/categorias/:id', name: 'categorias.show', component: CategoriaView },
    { path: '/buscar', name: 'articulos.buscar', component: ArticulosView },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

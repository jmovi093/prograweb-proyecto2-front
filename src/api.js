import axios from 'axios'

const api = axios.create({
  baseURL: 'https://prograweb-proyecto2-back.josuemv.com/api',
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
})

export const getArticulos = (page = 1) => api.get(`/articulos?page=${page}`)
export const getArticulo = (id) => api.get(`/articulos/${id}`)
export const crearArticulo = (data) => api.post('/articulos', data)
export const actualizarArticulo = (id, data) => api.put(`/articulos/${id}`, data)
export const eliminarArticulo = (id) => api.delete(`/articulos/${id}`)
export const buscarArticulos = (q, page = 1) => api.get(`/articulos/buscar?q=${encodeURIComponent(q)}&page=${page}`)

export const getCategorias = () => api.get('/categorias')
export const getCategoria = (id, page = 1) => api.get(`/categorias/${id}?page=${page}`)

export const getMarcas = () => api.get('/marcas')
export const getEtiquetas = () => api.get('/etiquetas')

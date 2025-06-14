import { ref, computed, type Ref } from 'vue'
import { NotasService, type Nota, type NotaCrear } from '@/service/NotaService'

export function useNotas(grupoId: number, eventoIdRef?: Ref<number | null> | number | null) {
  const notas = ref<Nota[]>([])
  const cargando = ref(false)
  const guardando = ref(false)
  const busqueda = ref('')

  const notasFiltradas = computed(() => {
    let filtered = notas.value

    let evId: number | null = null
    if (eventoIdRef !== null && eventoIdRef !== undefined) {
      const raw = typeof eventoIdRef === 'object' ? eventoIdRef.value : eventoIdRef
      evId = raw === null ? null : Number(raw)
    }

    if (evId !== null) {
      filtered = filtered.filter(n => n.eventoId === evId)
    }

    const termino = busqueda.value.trim().toLowerCase()
    if (!termino) return filtered

    return filtered.filter(nota =>
      nota.titulo.toLowerCase().includes(termino) ||
      nota.contenido.toLowerCase().includes(termino)
    )
  })



  const cargarNotas = async () => {
    try {
      cargando.value = true
      const token = localStorage.getItem('token')
    if (!token) throw new Error('Token no encontrado')
        let evId: number | null = null
        if (eventoIdRef !== null && eventoIdRef !== undefined) {
          const raw = typeof eventoIdRef === 'object' ? eventoIdRef.value : eventoIdRef
          evId = raw === null ? null : Number(raw)
        }
        notas.value = await NotasService.obtenerNotasPorGrupo(grupoId, token, evId)
    } catch (error) {
      console.error('Error al cargar notas:', error)
      throw error
    } finally {
      cargando.value = false
    }
  }


  const actualizarNota = async (notaId: number, nota: NotaCrear) => {
    try {
      guardando.value = true
      const token = localStorage.getItem('token')
    if (!token) throw new Error('Token no encontrado')

      await NotasService.actualizarNota(notaId, nota, token)
      await cargarNotas()
    } catch (error) {
      console.error('Error al actualizar nota:', error)
      throw error
    } finally {
      guardando.value = false
    }
  }

  const eliminarNota = async (notaId: number) => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Token no encontrado')

    await NotasService.eliminarNota(notaId, token)
    await cargarNotas()
  } catch (error) {
    console.error('Error al eliminar nota:', error)
    throw error
  }
}


  return {
    notas,
    notasFiltradas,
    busqueda,
    cargando,
    guardando,
    cargarNotas,
    actualizarNota,
    eliminarNota
  }
}
export { Nota }


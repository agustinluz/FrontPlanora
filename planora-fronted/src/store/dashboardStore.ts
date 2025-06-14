// src/stores/dashboard.ts
import { defineStore } from 'pinia'
import { dashboardService } from '@/service/DashboardService'
import type {
  UsuarioGrupoDTO,
  EventoDTO,
  GrupoDTO,
  UsuarioStatsDTO
} from '@/service/DashboardService'

interface DashboardState {
  usuario: { id: string; role: 'admin' | 'member' } | null
  grupo: GrupoDTO | null
  participantes: UsuarioGrupoDTO[]
  eventos: EventoDTO[]
  userStats: UsuarioStatsDTO[]
  loading: boolean
  error: string | null
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    usuario: null,
    grupo: null,
    participantes: [],
    eventos: [],
     userStats: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAll(grupoId: string, usuarioId: string) {
      this.loading = true
      this.error = null
      try {
        const [grupo, evs, parts, stats] = await Promise.all([
          dashboardService.getGrupo(grupoId),
          dashboardService.getEventos(grupoId),
          dashboardService.getParticipantes(grupoId, usuarioId),
          dashboardService.getUsuarioStats(grupoId, usuarioId)   // <-- nuevo endpoint
        ])
        this.grupo = grupo
        this.eventos = evs
        this.participantes = parts
        this.userStats = stats
      } catch (e: any) {
        this.error = e.message || 'Error al cargar datos'
      } finally {
        this.loading = false
      }
    },

    async getEventoDetalle(id: string) {
      return dashboardService.getEventoDetalle(id)
    },

    async deleteEvento(id: string) {
      this.loading = true
      try {
        await dashboardService.deleteEvento(id)
        this.eventos = this.eventos.filter(e => String(e.id) !== String(id))
      } finally {
        this.loading = false
      }
    }
  }
})

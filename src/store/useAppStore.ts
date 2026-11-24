import { create } from 'zustand';
import { ConceptId, RouteId } from '../types/concepts';

function getInitialRoute(): RouteId {
  if (typeof window === 'undefined') return 'hub';
  const params = new URLSearchParams(window.location.search);
  const m = params.get('modul');
  if (m === 'bliscy' || m === 'auto' || m === 'prywatnosc') {
    return m;
  }
  return 'hub';
}

interface AppState {
  route: RouteId;
  viewMode: 'dual' | 'single';
  activeMobileSide: 'left' | 'right';
  activeScenarioByConcept: Record<ConceptId, string>;
  architectureModalOpen: boolean;
  setRoute: (route: RouteId) => void;
  setViewMode: (mode: 'dual' | 'single') => void;
  setActiveMobileSide: (side: 'left' | 'right') => void;
  setActiveScenario: (concept: ConceptId, scenarioId: string) => void;
  setArchitectureModalOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  route: getInitialRoute(),
  viewMode: 'dual',
  activeMobileSide: 'left',
  activeScenarioByConcept: {
    bliscy: 'wniosek-wspolny',
    auto: 'pelny-zakup',
    prywatnosc: 'selektywne-dane',
  },
  architectureModalOpen: false,

  setRoute: (route) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (route === 'hub') {
        url.searchParams.delete('modul');
      } else {
        url.searchParams.set('modul', route);
      }
      window.history.pushState({}, '', url.toString());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    set({ route });
  },

  setViewMode: (viewMode) => set({ viewMode }),
  setActiveMobileSide: (activeMobileSide) => set({ activeMobileSide }),

  setActiveScenario: (concept, scenarioId) =>
    set((state) => ({
      activeScenarioByConcept: {
        ...state.activeScenarioByConcept,
        [concept]: scenarioId,
      },
    })),

  setArchitectureModalOpen: (architectureModalOpen) => set({ architectureModalOpen }),
}));

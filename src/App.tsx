import React, { useEffect } from 'react';
import { ConceptHub } from './components/ConceptHub';
import { PrototypeWorkspace } from './components/PrototypeWorkspace';
import { ArchitectureModal } from './components/ArchitectureModal';
import { useAppStore } from './store/useAppStore';
import { getConceptById } from './data/concepts';

export const App: React.FC = () => {
  const { route, setRoute } = useAppStore();

  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const m = params.get('modul');
      if (m === 'bliscy' || m === 'auto' || m === 'prywatnosc') {
        setRoute(m);
      } else {
        setRoute('hub');
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [setRoute]);

  const activeConcept = route !== 'hub' ? getConceptById(route) : undefined;

  return (
    <div className="min-h-screen bg-[#F3F4F8] text-[#111318]">
      {activeConcept ? <PrototypeWorkspace concept={activeConcept} /> : <ConceptHub />}
      <ArchitectureModal />
    </div>
  );
};

export default App;

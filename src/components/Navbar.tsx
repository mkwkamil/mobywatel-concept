import React from 'react';
import { Cpu, LayoutGrid, Sparkles } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { CONCEPTS } from '../data/concepts';

export const Navbar: React.FC = () => {
  const { route, setRoute, setArchitectureModalOpen } = useAppStore();

  return (
    <header className="sticky top-0 z-40 px-4 pt-3 pb-2">
      <nav
        aria-label="Główna nawigacja koncepcji"
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-2xl border border-[#E6E8EF] bg-white/90 px-4 py-2.5 shadow-[0_8px_30px_rgb(17,19,24,0.05)] backdrop-blur-md"
      >
        {/* Autorski znak koncepcyjny (bez zastrzeżonego godła RP zgodnie z licencją) */}
        <button
          type="button"
          onClick={() => setRoute('hub')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-[#DC1B3F] text-white shadow-sm transition-transform group-hover:scale-105">
            <span className="h-3.5 w-5 rounded-[3px] border-2 border-white bg-gradient-to-b from-white from-50% to-transparent to-50%" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-extrabold tracking-tight text-[#111318]">
                mObywatel <span className="text-[#DC1B3F]">Next</span>
              </span>
              <span className="hidden rounded-full bg-[#FDECEE] px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#DC1B3F] uppercase sm:inline-block">
                Challenge 2026
              </span>
            </div>
            <p className="hidden text-[11px] font-medium text-[#5A6270] md:block">
              Trzy wyspecjalizowane prototypy punktowe
            </p>
          </div>
        </button>

        {/* Szybkie przełączanie pomiędzy Hubem a 3 prototypami */}
        <div className="hidden items-center gap-1 rounded-xl bg-[#F5F6F9] p-1 lg:flex">
          <button
            type="button"
            onClick={() => setRoute('hub')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              route === 'hub'
                ? 'bg-white text-[#111318] shadow-xs'
                : 'text-[#5A6270] hover:text-[#111318]'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5 text-[#DC1B3F]" />
            Wybór koncepcji
          </button>
          {CONCEPTS.map((concept) => {
            const active = route === concept.id;
            return (
              <button
                key={concept.id}
                type="button"
                onClick={() => setRoute(concept.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? 'bg-[#DC1B3F] text-white shadow-xs'
                    : 'text-[#5A6270] hover:text-[#111318]'
                }`}
              >
                <span
                  className={`text-[10px] font-bold ${
                    active ? 'text-white/80' : 'text-[#DC1B3F]'
                  }`}
                >
                  {concept.number}
                </span>
                {concept.shortTitle}
              </button>
            );
          })}
        </div>

        {/* Przycisk architektury polskiego AI dla Jury */}
        <div className="flex items-center gap-2">
          {route === 'hub' && (
            <a
              href="#uzasadnienie"
              className="hidden rounded-xl px-3 py-2 text-xs font-semibold text-[#5A6270] transition-colors hover:bg-[#F5F6F9] hover:text-[#111318] sm:inline-block"
            >
              Uzasadnienie wyboru
            </a>
          )}
          <button
            type="button"
            onClick={() => setArchitectureModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#111318] px-3.5 py-2 text-xs font-semibold text-white transition-all hover:bg-[#DC1B3F] active:scale-[0.99]"
          >
            <Cpu className="h-3.5 w-3.5 text-[#FF8FA3]" />
            <span>Polskie AI (Bielik / PLLuM)</span>
            <Sparkles className="hidden h-3 w-3 text-[#FF8FA3] sm:inline" />
          </button>
        </div>
      </nav>
    </header>
  );
};

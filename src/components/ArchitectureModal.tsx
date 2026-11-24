import React from 'react';
import { CheckCircle2, Cpu, Lock, Server, X } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const ArchitectureModal: React.FC = () => {
  const { architectureModalOpen, setArchitectureModalOpen } = useAppStore();

  if (!architectureModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="arch-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
      onClick={() => setArchitectureModalOpen(false)}
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[28px] border border-[#E6E8EF] bg-white p-6 shadow-2xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FDECEE] px-3 py-1 text-[11px] font-bold tracking-wider text-[#DC1B3F] uppercase">
              <Cpu className="h-3.5 w-3.5" />
              Karta Techniczna dla Jury
            </span>
            <h2 id="arch-title" className="mt-2 text-2xl font-extrabold text-[#111318]">
              Architektura Polskiego Stosu AI (PLLuM &amp; Bielik w COI)
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setArchitectureModalOpen(false)}
            aria-label="Zamknij okno architektury"
            className="rounded-xl bg-[#F5F6F9] p-2 text-[#5A6270] hover:text-[#111318]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-[#5A6270]">
          Zgodnie z zasadami konkursu nasz klikalny prototyp działa w 100% w przeglądarce bez
          logowania (odpowiedzi modeli są w nim zasymulowane deterministycznie, podobnie jak w
          publicznej wersji <code className="rounded bg-[#F5F6F9] px-1.5 py-0.5">mobywatel.ai</code>
          ). Poniżej przedstawiamy docelowy projekt integracji polskich modeli w infrastrukturze
          państwowej.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[#ECEEF4] bg-[#F8F9FC] p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#111318]">
              <Server className="h-4 w-4 text-[#DC1B3F]" />
              PLLuM-12B-nc-instruct / Bielik-11B-v2.3
            </div>
            <p className="text-xs leading-relaxed text-[#5A6270]">
              Modele open-weights wdrażane na klastrach vLLM w wydzielonej chmurze rządowej (COI /
              NASK). Żadne pismo z e-Doręczeń ani PESEL obywatela nie trafia do zagranicznych
              dostawców komercyjnych.
            </p>
          </div>

          <div className="rounded-2xl border border-[#ECEEF4] bg-[#F8F9FC] p-5">
            <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[#111318]">
              <Lock className="h-4 w-4 text-[#DC1B3F]" />
              Bezpieczna separacja: AI nie klika za obywatela
            </div>
            <p className="text-xs leading-relaxed text-[#5A6270]">
              W odróżnieniu od architektury, w której LLM wybiera spośród 80 narzędzi, u nas model
              pełni rolę <strong>tłumacza prostego języka i ekstraktora JSON</strong>. Operacje
              prawne wykonuje deterministyczna maszyna stanów po biometrii obywatela.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E6E8EF] p-5">
          <h3 className="mb-3 text-xs font-bold tracking-wider text-[#DC1B3F] uppercase">
            Polskie komponenty w poszczególnych modułach
          </h3>
          <ul className="space-y-2.5 text-xs text-[#2C323D]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#DC1B3F]" />
              <span>
                <strong>PLLuM-12B (NASK / OPI PIB / Politechnika Wrocławska):</strong> przekład pism
                administracyjnych (ZUS, KAS, gminy) na standard prostego języka dla seniorów w
                Module 01.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#DC1B3F]" />
              <span>
                <strong>Bielik-11B (SpeakLeash / ACK Cyfronet AGH):</strong> ustrukturyzowana
                ekstrakcja parametrów umowy kupna-sprzedaży pojazdu z mowy naturalnej w Module 02.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#DC1B3F]" />
              <span>
                <strong>OPI PIB mmlw-retrieval-roberta-base + CERT Polska:</strong> wyszukiwanie
                podstaw prawnych minimalizacji danych na oficjalnych kartach usług{' '}
                <code>gov.pl</code> oraz weryfikacja domen phishingowych w Module 03.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

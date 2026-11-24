import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Car,
  Check,
  Cpu,
  HeartHandshake,
  Layers,
  LockKeyhole,
  Scale,
  ShieldCheck,
  Smartphone,
  Users,
} from 'lucide-react';
import { CONCEPTS } from '../data/concepts';
import { ConceptId } from '../types/concepts';
import { useAppStore } from '../store/useAppStore';

const CONCEPT_ICONS: Record<ConceptId, React.ReactNode> = {
  bliscy: <HeartHandshake className="h-5 w-5" />,
  auto: <Car className="h-5 w-5" />,
  prywatnosc: <LockKeyhole className="h-5 w-5" />,
};

type InfoTab = 'dlaczego' | 'porownanie' | 'ai';

export const ConceptHub: React.FC = () => {
  const { setRoute } = useAppStore();
  const [activeTab, setActiveTab] = useState<InfoTab>('dlaczego');

  return (
    <main className="mx-auto max-w-[1200px] px-6 py-12">
      {/* Czysty, pewny nagłówek o stałej szerokości */}
      <header className="mb-10 flex flex-col justify-between gap-6 border-b border-[#E4E6EE] pb-8 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-bold tracking-wider text-[#DC1B3F] uppercase shadow-2xs ring-1 ring-[#E6E8EF]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#DC1B3F]" />
            mObywatel Challenge 2026
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#111318] sm:text-[38px] sm:leading-[1.15]">
            Trzy sprawy domknięte do końca.
          </h1>
          <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-[#5A6270]">
            Zamiast kolejnego ogólnego czatbota — trzy kompletne prototypy rozwiązujące największe
            bariery prototypu bazowego w oparciu o polskie modele <strong>PLLuM i Bielik</strong>.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-xs font-semibold text-[#5A6270]">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2 ring-1 ring-[#E6E8EF]">
            <Smartphone className="h-3.5 w-3.5 text-[#DC1B3F]" />
            Tryb Dual-Screen (2 ekrany na żywo)
          </span>
        </div>
      </header>

      {/* 3 GŁÓWNE PANELE KONCEPCJI — idealnie równa siatka i wysokości sekcji */}
      <section aria-label="Wybór prototypu" className="mb-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {CONCEPTS.map((concept, idx) => (
            <motion.article
              key={concept.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              onClick={() => setRoute(concept.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setRoute(concept.id);
                }
              }}
              className="group relative flex h-full cursor-pointer flex-col justify-between rounded-[24px] border border-[#E2E5EE] bg-white p-7 shadow-[0_10px_30px_rgb(17,19,24,0.04)] transition-all duration-200 hover:-translate-y-1 hover:border-[#DC1B3F] hover:shadow-[0_20px_45px_rgb(220,27,63,0.10)] focus:ring-2 focus:ring-[#DC1B3F] focus:outline-none"
            >
              <div>
                {/* Nagłówek karty: numer + kategoria */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDECEE] text-[#DC1B3F] transition-colors group-hover:bg-[#DC1B3F] group-hover:text-white">
                      {CONCEPT_ICONS[concept.id]}
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold tracking-wider text-[#DC1B3F] uppercase">
                        Koncepcja {concept.number}
                      </span>
                      <span className="text-xs font-semibold text-[#5A6270]">
                        {concept.categoryBadge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tytuł i zwięzły opis (stała wysokość minimalna dla idealnego wyrównania) */}
                <h2 className="mb-2.5 min-h-[56px] text-[21px] leading-snug font-extrabold tracking-tight text-[#111318] transition-colors group-hover:text-[#DC1B3F]">
                  {concept.title}
                </h2>
                <p className="mb-6 min-h-[84px] text-[13.5px] leading-relaxed text-[#5A6270]">
                  {concept.subtitle}
                </p>

                {/* 3 konkretne punkty o jednolitej strukturze */}
                <div className="mb-6 border-t border-[#EFF1F6] pt-5">
                  <p className="mb-3 text-[11px] font-bold tracking-wider text-[#8C93A4] uppercase">
                    Co zawiera prototyp ({concept.scenarios.length} scenariusze)
                  </p>
                  <ul className="space-y-2.5">
                    {concept.scenarios.map((scen) => (
                      <li
                        key={scen.id}
                        className="flex items-start gap-2.5 text-[12.5px] text-[#2C323D]"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#DC1B3F]" />
                        <span>
                          <strong className="font-semibold text-[#111318]">{scen.title}</strong>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Stopka karty — zawsze na tej samej linii */}
              <div>
                <div className="mb-4 flex items-center justify-between rounded-xl bg-[#F7F8FB] px-3.5 py-2.5 text-[11px]">
                  <span className="font-medium text-[#5A6270]">
                    {concept.dualScreenSetup.leftActor.split(' ')[0]} ↔{' '}
                    {concept.dualScreenSetup.rightActor.split(' ')[0]}
                  </span>
                  <span className="font-bold text-[#111318]">
                    {concept.polishAiRole.model.split('+')[0].trim()}
                  </span>
                </div>

                <div className="flex w-full items-center justify-between rounded-xl bg-[#111318] px-5 py-3.5 text-xs font-bold text-white transition-colors group-hover:bg-[#DC1B3F]">
                  <span>Otwórz prototyp</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* JEDNOLITY, UPORZĄDKOWANY PANEL METODOLOGII (zakładki zamiast przeładowanej ściany tekstu) */}
      <section
        aria-label="Opis wyboru koncepcji i architektura"
        className="rounded-[24px] border border-[#E2E5EE] bg-white p-7 shadow-[0_10px_30px_rgb(17,19,24,0.03)]"
      >
        <div className="mb-6 flex flex-col justify-between gap-4 border-b border-[#EFF1F6] pb-5 sm:flex-row sm:items-center">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-[#DC1B3F] uppercase">
              Dokumentacja Koncepcji
            </span>
            <h2 className="mt-0.5 text-lg font-extrabold text-[#111318]">
              Uzasadnienie projektowe i architektura polskiego AI
            </h2>
          </div>

          <div className="inline-flex rounded-xl bg-[#F3F4F8] p-1">
            {[
              { id: 'dlaczego', label: 'Dlaczego 3 moduły?' },
              { id: 'porownanie', label: 'Porównanie z bazowym' },
              { id: 'ai', label: 'Polskie AI (PLLuM / Bielik)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as InfoTab)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-[#111318] shadow-2xs'
                    : 'text-[#5A6270] hover:text-[#111318]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'dlaczego' && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-[#F8F9FC] p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDECEE] text-[#DC1B3F]">
                <Users className="h-4 w-4" />
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-[#111318]">
                1. Włączenie seniorów bez oddawania haseł
              </h3>
              <p className="text-xs leading-relaxed text-[#5A6270]">
                Sam czat wyklucza osoby 80+ i nie chroni przed manipulacją telefoniczną. Rozdzielamy
                techniczne przygotowanie wniosku przez bliskiego od prostego, osobistego podpisu
                seniora na jego telefonie.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F9FC] p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDECEE] text-[#DC1B3F]">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-[#111318]">
                2. Transakcje dwustronne zamiast PDF-ów
              </h3>
              <p className="text-xs leading-relaxed text-[#5A6270]">
                Prototyp bazowy przy zakupie auta generuje plik PDF i odsyła do urzędu. My łączymy
                telefony sprzedającego i kupującego, domykając umowę, PCC-3, zbycie i e-rejestrację z
                zachowaniem tablic w jednym procesie.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F9FC] p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#FDECEE] text-[#DC1B3F]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-[#111318]">
                3. Minimalizacja danych (eIDAS 2.0)
              </h3>
              <p className="text-xs leading-relaxed text-[#5A6270]">
                Zamiast pokazywać cały dowód lub odblokowywać PESEL dla całego kraju naraz, wdrażamy
                kryptograficzne potwierdzenie samego wieku „18+” (SD-JWT) oraz celowaną przepustkę
                PESEL dla 1 banku na 15 minut.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'porownanie' && (
          <div className="overflow-hidden rounded-xl border border-[#E6E8EF]">
            <div className="grid grid-cols-12 bg-[#F8F9FC] px-5 py-3 text-[11px] font-bold tracking-wider text-[#5A6270] uppercase">
              <div className="col-span-4">Obszar</div>
              <div className="col-span-4">Prototyp bazowy (mObywatel.ai)</div>
              <div className="col-span-4 text-[#DC1B3F]">Nasza koncepcja</div>
            </div>
            <div className="divide-y divide-[#EFF1F6] text-xs">
              {[
                [
                  'Architektura AI',
                  'Czatbot wybierający z ~80 narzędzi',
                  'Maszyna stanów + PLLuM/Bielik jako koprocesor prostego języka i JSON',
                ],
                [
                  'Seniorzy i bliscy',
                  'Brak trybu seniora, tylko podgląd recept IKP',
                  'Tryb AAA + współdzielony wniosek na 2 telefonach + tarcza przed oszustem',
                ],
                [
                  'Zakup pojazdu',
                  'Plik PDF umowy i odesłanie do wydziału komunikacji',
                  'CEPiK + umowa głosowa + PCC-3 BLIK + e-rejestracja z zachowaniem tablic',
                ],
                [
                  'Ochrona PESEL i danych',
                  'Globalne odblokowanie PESEL i logi w czacie',
                  'Selektywne atrybuty SD-JWT (18+) + przepustka PESEL dla 1 banku na 15 min',
                ],
              ].map(([area, base, ours]) => (
                <div key={area} className="grid grid-cols-12 items-center px-5 py-3.5">
                  <div className="col-span-4 font-bold text-[#111318]">{area}</div>
                  <div className="col-span-4 pr-3 text-[#5A6270]">{base}</div>
                  <div className="col-span-4 font-semibold text-[#111318]">{ours}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-[#F8F9FC] p-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-[#DC1B3F] uppercase">
                <Cpu className="h-4 w-4" />
                PLLuM-12B (NASK / OPI PIB)
              </div>
              <p className="text-xs leading-relaxed text-[#5A6270]">
                Tłumaczenie pism administracyjnych (ZUS, US) i formularzy do standardu prostego
                języka (B1) w Module 01 oraz ocena podstawy prawnej żądań danych w Module 03.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F9FC] p-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-[#DC1B3F] uppercase">
                <Cpu className="h-4 w-4" />
                Bielik-11B (SpeakLeash / AGH)
              </div>
              <p className="text-xs leading-relaxed text-[#5A6270]">
                Detekcja wzorców socjotechnicznych („na policjanta”) przy próbie odblokowania PESEL
                oraz ekstrakcja warunków umowy kupna auta z mowy do schematu JSON.
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8F9FC] p-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-[#111318] uppercase">
                <Scale className="h-4 w-4 text-[#DC1B3F]" />
                Suwerenność w chmurze COI
              </div>
              <p className="text-xs leading-relaxed text-[#5A6270]">
                Modele open-weights hostowane na infrastrukturze rządowej — żadne dane z rejestrów
                PESEL, CEPiK ani e-Doręczeń nie są wysyłane do komercyjnych API poza Polską.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

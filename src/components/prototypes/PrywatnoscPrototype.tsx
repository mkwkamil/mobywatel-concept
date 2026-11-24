import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Building2,
  CheckCircle2,
  Clock,
  EyeOff,
  FileCheck2,
  KeyRound,
  Lock,
  MessageSquareWarning,
  QrCode,
  Radar,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Store,
} from 'lucide-react';
import { AiStreamCard } from '../shared/AiStreamCard';
import { BiometricModal } from '../shared/BiometricModal';

export interface PrywatnoscSharedState {
  scenarioId: string;
  step: number;
  setStep: (step: number) => void;
  // Interaktywne opcje w Scenariuszu 1 (Sklep 18+ vs Recepcja Hotelu)
  verifierType: 'sklep18' | 'hotel';
  setVerifierType: (t: 'sklep18' | 'hotel') => void;
  minimalMode: boolean;
  setMinimalMode: (v: boolean) => void;
  // Interaktywne opcje w Scenariuszu 2 (Czas ważności przepustki PESEL)
  passDurationMin: 15 | 5;
  setPassDurationMin: (m: 15 | 5) => void;
  nextScenarioTitle: string | null;
  onNextScenario: () => void;
}

const NextScenarioCard: React.FC<{
  nextScenarioTitle: string | null;
  onNextScenario: () => void;
}> = ({ nextScenarioTitle, onNextScenario }) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl border border-[#DC1B3F]/25 bg-[#FDECEE]/60 p-3.5 text-[#111318]"
  >
    <p className="text-[10.5px] font-extrabold tracking-wide text-[#DC1B3F] uppercase">
      {nextScenarioTitle ? 'Scenariusz ukończony · Co dalej?' : 'Wszystkie 3 scenariusze ukończone'}
    </p>
    <p className="mt-0.5 text-xs font-bold text-[#111318]">
      {nextScenarioTitle ?? 'Poznałeś pełny moduł Tarczy Tożsamości i Selektywnych Danych.'}
    </p>
    <button
      type="button"
      onClick={onNextScenario}
      className="mt-2.5 flex w-full items-center justify-between rounded-xl bg-[#111318] px-3.5 py-2.5 text-xs font-extrabold text-white transition-colors hover:bg-[#DC1B3F]"
    >
      <span>
        {nextScenarioTitle ? 'Przejdź do kolejnego scenariusza' : 'Wróć do wyboru koncepcji'}
      </span>
      <ArrowRight className="h-4 w-4 shrink-0" />
    </button>
  </motion.div>
);

/* ============================================================================
   LEWY TELEFON: KACPER ZIELIŃSKI (20 L.) — OBYWATEL (TARCZA TOŻSAMOŚCI)
   ============================================================================ */
export const PrywatnoscCitizenScreen: React.FC<PrywatnoscSharedState> = ({
  scenarioId,
  step,
  setStep,
  verifierType,
  setVerifierType,
  minimalMode,
  setMinimalMode,
  passDurationMin,
  setPassDurationMin,
  nextScenarioTitle,
  onNextScenario,
}) => {
  const [biometricOpen, setBiometricOpen] = useState(false);

  return (
    <div className="relative min-h-full space-y-3 pt-0.5">
      {/* Czysty nagłówek obywatela */}
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#E2E5EE] bg-white px-3 py-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#DC1B3F] text-[11px] font-extrabold text-white">
            KZ
          </span>
          <p className="text-xs font-extrabold text-[#111318]">Kacper Zieliński</p>
        </div>
        <span className="shrink-0 rounded-md bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 ring-1 ring-emerald-200">
          Tarcza aktywna
        </span>
      </div>

      {/* ====================================================================
          SCENARIUSZ 1: POKAŻ TYLKO MINIMUM (SD-JWT / eIDAS 2.0)
          ==================================================================== */}
      {scenarioId === 'selektywne-dane' && (
        <>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-[#DC1B3F] bg-white p-4 shadow-xs">
                <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                  Tarcza Tożsamości · eIDAS 2.0
                </span>

                <h2 className="mt-2.5 text-base font-extrabold text-[#111318]">
                  Wybierz miejsce weryfikacji i zeskanuj kod QR:
                </h2>

                {/* Przełącznik kontekstu: Sklep 18+ vs Recepcja Hotelu */}
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVerifierType('sklep18')}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-extrabold transition-all ${
                      verifierType === 'sklep18'
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/45 text-[#DC1B3F]'
                        : 'border-[#E6E8EF] bg-[#F8F9FC] text-[#111318]'
                    }`}
                  >
                    <Store className="h-3.5 w-3.5" />
                    <span>Sklep (18+)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVerifierType('hotel')}
                    className={`flex items-center justify-center gap-1.5 rounded-xl border py-2.5 text-xs font-extrabold transition-all ${
                      verifierType === 'hotel'
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/45 text-[#DC1B3F]'
                        : 'border-[#E6E8EF] bg-[#F8F9FC] text-[#111318]'
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Recepcja hotelu</span>
                  </button>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-[#5A6270]">
                  {verifierType === 'sklep18'
                    ? 'Kasjer chce potwierdzić Twoją pełnoletność, ale terminal prosi o cały dowód wraz z PESEL-em.'
                    : 'Recepcja Hotelu Baltic prosi o skan mDowodu wraz z numerem PESEL i adresem zameldowania.'}
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <ScanLine className="h-4 w-4 shrink-0" />
                  <span>Zeskanuj żądanie terminala</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <AiStreamCard
                modelName="PLLuM-12B"
                taskLabel="Audyt podstawy prawnej żądania (RODO + OPI PIB)"
                text={
                  verifierType === 'sklep18'
                    ? 'Terminal kasy żąda 5 pól z Twojego mDowodu, choć do sprzedaży produktu 18+ wystarczy 1 bit informacji o ukończeniu 18 lat.'
                    : 'Terminal Hotelu Baltic żąda 5 pól (w tym numeru PESEL i adresu zameldowania). Hotel nie ma ustawowego prawa gromadzić numeru PESEL.'
                }
                bullets={[
                  {
                    label: 'Wykryte nadmiarowe dane (zablokowane domyślnie)',
                    value:
                      verifierType === 'sklep18'
                        ? 'Imię i nazwisko, numer PESEL, dokładna data urodzenia, adres zameldowania.'
                        : 'Numer PESEL, adres zameldowania, seria dowodu do kserokopii.',
                    tone: 'warn',
                  },
                  {
                    label: 'Zasada minimalizacji danych (Art. 5 ust. 1 lit. c RODO)',
                    value:
                      'Przekaż wyłącznie kryptograficzne potwierdzenie wymaganego atrybutu (SD-JWT).',
                    tone: 'good',
                  },
                ]}
                legalCitation="Rozporządzenie eIDAS 2.0 + Art. 5 RODO"
                jsonPayload={{
                  odbiorca: verifierType === 'sklep18' ? 'TERMINAL_KASA_18_PLUS' : 'HOTEL_BALTIC',
                  zadane_pola: 5,
                  uprawnione_pola: verifierType === 'sklep18' ? 1 : 2,
                  nadmiarowe_odciete: ['pesel', 'adres_zameldowania', 'seria_dowodu'],
                }}
              />

              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
              >
                <EyeOff className="h-4 w-4 shrink-0" />
                <span>Wybierz zakres przekazywanych danych</span>
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
                <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                  Filtr Atrybutów · SD-JWT
                </span>

                <h3 className="mt-2 text-sm font-extrabold text-[#111318]">
                  Zdecyduj, co zobaczy terminal odbiorcy:
                </h3>

                {/* Przełącznik Minimum vs Pełny zestaw */}
                <div className="mt-2.5 space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setMinimalMode(true)}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                      minimalMode
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/35'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#111318]">
                      ✓ Tylko wymagane minimum (Zalecane przez PLLuM)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#5A6270]">
                      {verifierType === 'sklep18'
                        ? 'Przekazuje wyłącznie: Ukończone 18 lat = TAK'
                        : 'Przekazuje wyłącznie: Imię, nazwisko i ważność dokumentu'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMinimalMode(false)}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                      !minimalMode
                        ? 'border-amber-400 bg-amber-50'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#111318]">
                      Pełny zestaw żądany przez terminal (Niezalecane)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#5A6270]">
                      Ujawnia również Twój numer PESEL i adres zameldowania
                    </div>
                  </button>
                </div>

                {/* Podgląd przekazywanych vs ukrytych pól (wynik pod nagłówkiem) */}
                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Atrybuty przekazywane odbiorcy
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      {verifierType === 'sklep18'
                        ? '✓ Ukończone 18 lat: TAK (Dowód Zero-Knowledge)'
                        : '✓ Imię i nazwisko: Kacper Zieliński · Dokument ważny'}
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Pola odcięte przez Tarczę Tożsamości
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#DC1B3F]">
                      {minimalMode
                        ? verifierType === 'sklep18'
                          ? '✕ Imię, nazwisko, PESEL, data urodzenia, adres (UKRYTE)'
                          : '✕ Numer PESEL, adres zameldowania, seria dowodu (UKRYTE)'
                        : 'Brak odcięcia (wybrano pełny zestaw)'}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <Lock className="h-4 w-4 shrink-0" />
                  <span>Przejdź do autoryzacji tokenu</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-[#111318] bg-white p-4 shadow-sm">
                <span className="inline-block rounded-lg bg-emerald-50 px-2.5 py-1 text-[10.5px] font-extrabold text-emerald-900 ring-1 ring-emerald-200 uppercase">
                  Gotowe do podpisu SD-JWT
                </span>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Potwierdź przekazanie minimalnego zakresu danych
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Standard kryptograficzny
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      SD-JWT (Selective Disclosure · ECDSA P-256)
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Ochrona numeru PESEL
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      ✓ PESEL pozostaje ukryty (hash kryptograficzny)
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBiometricOpen(true)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-800"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Autoryzuj i wyślij tylko minimum</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>WERYFIKACJA ZAKOŃCZONA BEZPIECZNIE</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Załatwiłeś sprawę bez ujawniania numeru PESEL!
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Co otrzymał terminal odbiorcy
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      {verifierType === 'sklep18'
                        ? 'Wyłącznie dowód: Ukończone 18 lat = TAK'
                        : 'Wyłącznie: Kacper Zieliński (tożsamość ważna)'}
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Dane ochronione przed skopiowaniem
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Numer PESEL (062321•••19), adres zameldowania, seria dowodu
                    </strong>
                  </div>
                </div>
              </div>

              <NextScenarioCard
                nextScenarioTitle={nextScenarioTitle}
                onNextScenario={onNextScenario}
              />
            </motion.div>
          )}
        </>
      )}

      {/* ====================================================================
          SCENARIUSZ 2: CELOWANA PRZEPUSTKA PESEL NA 15 MINUT
          ==================================================================== */}
      {scenarioId === 'przepustka-pesel' && (
        <>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-[#DC1B3F] bg-white p-4 shadow-xs">
                <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                  Rejestr Zastrzeżeń PESEL
                </span>

                <h2 className="mt-2.5 text-base font-extrabold text-[#111318]">
                  Bierzesz raty 0% w mBanku, a Twój PESEL jest zastrzeżony
                </h2>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Jak działa obecny mObywatel (luka bezpieczeństwa)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-amber-900">
                      Musisz odblokować PESEL dla całego kraju naraz — w tym oknie czasowym oszust
                      może wziąć pożyczkę w innej firmie!
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Nasze rozwiązanie: Celowana Przepustka PESEL
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      Odblokowujesz weryfikację wyłącznie dla 1 wskazanego banku na 15 minut.
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <KeyRound className="h-4 w-4 shrink-0" />
                  <span>Utwórz celowaną przepustkę PESEL</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
                <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                  Konfiguracja przepustki
                </span>

                <h3 className="mt-2 text-sm font-extrabold text-[#111318]">
                  Wskaż instytucję i czas ważności zgody:
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Uprawniona instytucja (zweryfikowana w KNF / KRS)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      mBank S.A. · KRS 0000025237 · NIP 5260212931
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Status PESEL dla wszystkich pozostałych firm
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      ✓ NADAL ZASTRZEŻONY (0 sekund globalnego odblokowania)
                    </strong>
                  </div>
                </div>

                {/* Wybór czasu ważności przepustki */}
                <div className="mt-3">
                  <span className="block text-[10.5px] font-bold text-[#5A6270] uppercase">
                    Limit czasu (wygasa od razu po 1 zapytaniu):
                  </span>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {[15, 5].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => setPassDurationMin(mins as 15 | 5)}
                        className={`rounded-xl border py-2 text-xs font-extrabold transition-all ${
                          passDurationMin === mins
                            ? 'border-[#DC1B3F] bg-[#FDECEE]/45 text-[#DC1B3F]'
                            : 'border-[#E6E8EF] bg-white text-[#111318]'
                        }`}
                      >
                        {mins} minut (1 użycie)
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>Zweryfikuj podmiot w KNF (PLLuM)</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <AiStreamCard
                modelName="PLLuM-12B"
                taskLabel="Weryfikacja podmiotu w rejestrze KNF i KRS"
                text={`Potwierdziłem tożsamość podmiotu mBank S.A. (KRS 0000025237). Przepustka będzie ważna przez ${passDurationMin} minut wyłącznie dla jednego zapytania z tego banku.`}
                bullets={[
                  {
                    label: 'Ochrona przed równoległym wyłudzeniem',
                    value:
                      'Każde zapytanie z innego banku, parabanku, telekomu lub kancelarii notarialnej w tym samym czasie otrzyma status: PESEL ZASTRZEŻONY.',
                    tone: 'good',
                  },
                ]}
                legalCitation="Ustawa o zastrzeganiu numerów PESEL + Rejestr KNF"
                jsonPayload={{
                  pesel: '062321•••19',
                  global_lock_active: true,
                  single_use_pass_krs: '0000025237',
                  ttl_minutes: passDurationMin,
                }}
              />

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-emerald-800"
              >
                <KeyRound className="h-4 w-4 shrink-0" />
                <span>Aktywuj przepustkę i przetestuj na żywo</span>
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-900 ring-1 ring-amber-200">
                    <Clock className="h-3.5 w-3.5 text-amber-700" />
                    PRZEPUSTKA AKTYWNA ({passDurationMin}:00)
                  </span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Spójrz na prawy ekran: symulacja 2 zapytań jednocześnie
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                  W tej samej minucie o Twój PESEL pyta uprawniony <strong>mBank S.A.</strong> oraz
                  nieuprawniony parabank <strong>SzybkaPożyczka24</strong>.
                </p>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111318] px-4 py-3 text-xs font-extrabold text-white hover:bg-[#DC1B3F]"
                >
                  <ShieldCheck className="h-4 w-4 shrink-0" />
                  <span>Zobacz podsumowanie po zużyciu przepustki</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>PRZEPUSTKA ZUŻYTA I ZAMKNIĘTA</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Raty w mBanku uruchomione, próba parabanku zablokowana!
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      1. Zapytanie mBank S.A. (KRS 0000025237)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      ✓ Zgoda jednorazowa udzielona (przepustka wygasła po 1 użyciu)
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      2. Równoległe zapytanie SzybkaPożyczka24 Sp. z o.o.
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#DC1B3F]">
                      ✕ ZABLOKOWANO — brak uprawnienia na przepustce
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Aktualny status Twojego numeru PESEL
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      100% ZASTRZEŻONY dla wszystkich podmiotów
                    </strong>
                  </div>
                </div>
              </div>

              <NextScenarioCard
                nextScenarioTitle={nextScenarioTitle}
                onNextScenario={onNextScenario}
              />
            </motion.div>
          )}
        </>
      )}

      {/* ====================================================================
          SCENARIUSZ 3: ŻYWY RADAR REJESTRÓW I TARCZA CERT POLSKA
          ==================================================================== */}
      {scenarioId === 'radar-danych' && (
        <>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                    <Radar className="h-3.5 w-3.5" />
                    Żywy Radar Rejestrów
                  </span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Kto i kiedy sprawdzał Twoje dane państwowe:
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#DC1B3F]">
                      DZIŚ, 12:41 · Nowy alert bezpieczeństwa
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Podejrzany SMS „GOV-DOPŁATA” o zaległości PIT 14,80 zł
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      01.10.2026, 16:05 · Rejestr Zastrzeżeń PESEL
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Revolut Bank UAB (wynik: niezastrzeżony)
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      15.10.2025, 09:12 · Rejestr PESEL (meldunek)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Urząd Miejski w Gdańsku (zameldowanie czasowe)
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <MessageSquareWarning className="h-4 w-4 shrink-0" />
                  <span>Sprawdź podejrzany SMS o dopłacie PIT</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
                <span className="inline-block rounded-lg bg-amber-100 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-950 uppercase">
                  Skaner Anty-Phishingowy · CERT Polska
                </span>
                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Prześwietl wiadomość z prawego ekranu w bazie NASK
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                  Na prawym ekranie widać treść SMS-a z linkiem{' '}
                  <code>mobywatel-rozliczenie-gov.pl/pit</code>. Uruchom analizę modelu{' '}
                  <strong>PLLuM-12B</strong> oraz Listy Ostrzeżeń CERT Polska.
                </p>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>Analizuj wiadomość (PLLuM + CERT)</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <AiStreamCard
                modelName="PLLuM-12B"
                taskLabel="Analiza phishingu + Lista Ostrzeżeń CERT Polska (NASK)"
                text="UWAGA! Ta wiadomość to fałszywy SMS (smishing) wyłudzający dane logowania do bankowości elektronicznej."
                bullets={[
                  {
                    label: '1. Fałszywa domena poza strefą rządową',
                    value:
                      'Adres mobywatel-rozliczenie-gov.pl NIE należy do państwa (prawdziwe serwisy kończą się wyłącznie na .gov.pl). Domena powstała 4h temu.',
                    tone: 'warn',
                  },
                  {
                    label: '2. Weryfikacja w Twoim e-Urzędzie Skarbowym',
                    value:
                      'Sprawdziłem Twoje konto podatkowe: masz 0,00 zł zaległości w podatku PIT. Urzędy nigdy nie wysyłają linków do dopłat przez SMS.',
                    tone: 'good',
                  },
                ]}
                legalCitation="Lista Ostrzeżeń CERT Polska (NASK) · Bramka 8080"
                jsonPayload={{
                  domain: 'mobywatel-rozliczenie-gov.pl',
                  official_gov_pl: false,
                  e_us_debt_pln: 0.0,
                  verdict: 'CRITICAL_PHISHING_SMISHING',
                }}
              />

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-red-700"
              >
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Zablokuj domenę i zgłoś do CERT (8080)</span>
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
                <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                  Natychmiastowe zgłoszenie do NASK
                </span>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Twoje zgłoszenie zablokuje tę stronę w całej Polsce
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Zgłaszana złośliwa domena
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-red-700">
                      mobywatel-rozliczenie-gov.pl/pit
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Odbiorca zgłoszenia ustawowego
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      CERT Polska (NASK) + automatyczny przekierunek na 8080
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-emerald-800"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Potwierdź wysyłkę zgłoszenia do CERT</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>DOMENA ZABLOKOWANA W CERT POLSKA</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Ochroniłeś siebie i innych użytkowników polskich sieci!
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Identyfikator incydentu NASK / CERT Polska
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      CERT-PL/SMS/2026/77104
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Status u polskich operatorów telekomunikacyjnych
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      ✓ Domena dopisana do Listy Ostrzeżeń (blokada DNS)
                    </strong>
                  </div>
                </div>
              </div>

              <NextScenarioCard
                nextScenarioTitle={nextScenarioTitle}
                onNextScenario={onNextScenario}
              />
            </motion.div>
          )}
        </>
      )}

      {/* Modal autoryzacji biometrycznej dla Kacpra */}
      <BiometricModal
        open={biometricOpen}
        actorName="Kacper Zieliński"
        actionTitle="Podpis selektywnego atrybutu SD-JWT"
        onSuccess={() => {
          setBiometricOpen(false);
          setStep(4);
        }}
        onCancel={() => setBiometricOpen(false)}
      />
    </div>
  );
};

/* ============================================================================
   PRAWY EKRAN: TERMINAL WERYFIKATORA (SKLEP 18+ / HOTEL / BANK / BRAMKA SMS)
   ============================================================================ */
export const PrywatnoscVerifierScreen: React.FC<PrywatnoscSharedState> = ({
  scenarioId,
  step,
  verifierType,
  minimalMode,
  passDurationMin,
}) => {
  return (
    <div className="space-y-3 pt-0.5">
      {/* Czysty nagłówek terminala odbiorcy */}
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#E2E5EE] bg-white px-3 py-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#111318] text-[11px] font-extrabold text-white">
            TW
          </span>
          <p className="text-xs font-extrabold text-[#111318]">Terminal Weryfikatora</p>
        </div>
        <span className="shrink-0 rounded-md bg-[#F3F4F8] px-2.5 py-0.5 text-[10px] font-bold text-[#5A6270]">
          {scenarioId === 'selektywne-dane'
            ? verifierType === 'sklep18'
              ? 'Kasa Sklepu 18+'
              : 'Recepcja Hotelu'
            : scenarioId === 'przepustka-pesel'
              ? 'Bramka Rejestru PESEL'
              : 'Podgląd SMS / NASK'}
        </span>
      </div>

      {/* ====================================================================
          SCENARIUSZ 1 NA TERMINALU: ŻĄDANIE DANYCH VS OTRZYMANY DOWÓD SD-JWT
          ==================================================================== */}
      {scenarioId === 'selektywne-dane' && (
        <>
          {step < 4 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-[#F3F4F8] px-2.5 py-1 text-[10px] font-extrabold text-[#111318] uppercase">
                  {verifierType === 'sklep18'
                    ? 'Terminal Kasy · Weryfikacja 18+'
                    : 'Terminal Recepcji · Hotel Baltic'}
                </span>
              </div>

              {/* Wyśrodkowany kod QR terminala */}
              <div className="my-3 flex flex-col items-center rounded-2xl border border-[#E6E8EF] bg-[#F8F9FC] px-4 py-3 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-[#111318] bg-white p-2 shadow-2xs">
                  <QrCode className="h-16 w-16 text-[#111318]" />
                </div>
                <p className="mt-2 text-xs font-extrabold text-[#111318]">
                  Domyślne żądanie terminala (5 pól)
                </p>
                <p className="mt-0.5 text-[11px] text-[#5A6270]">
                  Oczekiwanie na zeskanowanie i autoryzację w mObywatelu
                </p>
              </div>

              <div className="divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                <div className="pb-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Pola żądane domyślnie przez terminal
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-[#111318]">
                    Imię, nazwisko, PESEL, data urodzenia, adres zameldowania
                  </strong>
                </div>
                <div className="pt-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Status weryfikacji
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-amber-800">
                    {step === 0 && 'Oczekiwanie na zeskanowanie kodu QR...'}
                    {step === 1 && 'Obywatel weryfikuje podstawę prawną żądania (RODO)...'}
                    {step === 2 && 'Obywatel odcina nadmiarowe pola na swoim telefonie...'}
                    {step === 3 && 'Oczekiwanie na podpis kryptograficzny SD-JWT...'}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  <FileCheck2 className="h-3.5 w-3.5" />
                  <span>PODPIS KRYPTOGRAFICZNY MC: WAŻNY</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Widok na ekranie kasjera / recepcjonisty:
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Potwierdzony atrybut główny
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      {verifierType === 'sklep18'
                        ? '✓ UKOŃCZONE 18 LAT: TAK (Zweryfikowano)'
                        : '✓ TOŻSAMOŚĆ: KACPER ZIELIŃSKI (Dokument ważny)'}
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Numer PESEL oraz adres zameldowania
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#DC1B3F]">
                      {minimalMode
                        ? '🔒 [UKRYTE PRZEZ TARCZĘ M-OBYWATEL — BRAK PODSTAWY]'
                        : '06232141719 · ul. Ogólna 5, Elbląg'}
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Dowód kryptograficzny eIDAS 2.0 (SD-JWT)
                    </span>
                    <strong className="mt-0.5 block font-mono text-[11px] font-bold text-[#111318]">
                      eyJhbGciOiJFUzI1NiIsInR5cCI6InNk+jwt...
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ====================================================================
          SCENARIUSZ 2 NA TERMINALU: TEST RÓWNOLEGŁY BANK VS PARABANK
          ==================================================================== */}
      {scenarioId === 'przepustka-pesel' && (
        <>
          {step < 3 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <span className="inline-block rounded-lg bg-[#F3F4F8] px-2.5 py-1 text-[10.5px] font-extrabold text-[#111318] uppercase">
                Bramka Rejestru Zastrzeżeń PESEL
              </span>

              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Monitor zapytań instytucji finansowych
              </h3>

              <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                <div className="pb-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Aktualny stan globalny w rejestrze państwowym
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-emerald-800">
                    🔒 PESEL ZASTRZEŻONY (blokada kredytowa aktywna)
                  </strong>
                </div>
                <div className="pt-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Aktywne przepustki celowane
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-[#111318]">
                    {step === 0
                      ? 'Brak aktywnych przepustek'
                      : `Trwa wystawianie przepustki dla mBank S.A. (${passDurationMin} min)...`}
                  </strong>
                </div>
              </div>
            </div>
          )}

          {(step === 3 || step === 4) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              {/* Zapytanie 1: Uprawniony mBank -> ZGODA */}
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-3.5 shadow-2xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-0.5 text-[10px] font-extrabold text-white uppercase">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Zapytanie #1 (godz. 12:45:02) · ZGODA</span>
                </div>
                <div className="mt-2 divide-y divide-[#E6E8EF] rounded-xl border border-[#E2E5EE] bg-[#F8F9FC] p-2.5 text-xs">
                  <div className="pb-1.5">
                    <span className="block text-[10px] font-semibold text-[#5A6270]">
                      Podmiot pytający (zgodny z przepustką)
                    </span>
                    <strong className="block font-extrabold text-[#111318]">
                      mBank S.A. · KRS 0000025237
                    </strong>
                  </div>
                  <div className="pt-1.5">
                    <span className="block text-[10px] font-semibold text-[#5A6270]">
                      Odpowiedź Rejestru Zastrzeżeń PESEL
                    </span>
                    <strong className="block font-extrabold text-emerald-800">
                      ✓ ZGODA JEDNORAZOWA (Wniosek ratalny zatwierdzony)
                    </strong>
                  </div>
                </div>
              </div>

              {/* Zapytanie 2: Nieuprawniony Parabank w tej samej minucie -> BLOKADA */}
              <div className="rounded-3xl border-2 border-red-600 bg-white p-3.5 shadow-2xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-2.5 py-0.5 text-[10px] font-extrabold text-white uppercase">
                  <Ban className="h-3 w-3" />
                  <span>Zapytanie #2 (godz. 12:45:08) · ZABLOKOWANO</span>
                </div>
                <div className="mt-2 divide-y divide-red-200 rounded-xl border border-red-200 bg-red-50/70 p-2.5 text-xs">
                  <div className="pb-1.5">
                    <span className="block text-[10px] font-semibold text-red-900">
                      Podmiot pytający (spoza przepustki!)
                    </span>
                    <strong className="block font-extrabold text-red-950">
                      SzybkaPożyczka24 Sp. z o.o. (Parabank)
                    </strong>
                  </div>
                  <div className="pt-1.5">
                    <span className="block text-[10px] font-semibold text-red-900">
                      Odpowiedź Rejestru Zastrzeżeń PESEL
                    </span>
                    <strong className="block font-extrabold text-red-700">
                      ✕ ODMOWA: PESEL ZASTRZEŻONY (Wyłudzenie zatrzymane)
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ====================================================================
          SCENARIUSZ 3 NA TERMINALU: PODGLĄD FAŁSZYWEGO SMS-A I BLOKADY CERT
          ==================================================================== */}
      {scenarioId === 'radar-danych' && (
        <>
          {step < 4 && (
            <div className="rounded-3xl border border-amber-300 bg-white p-4 shadow-2xs">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-100 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-950 uppercase">
                <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
                <span>Odebrana wiadomość SMS · 12:41</span>
              </div>

              <div className="mt-3 rounded-2xl border border-[#E6E8EF] bg-[#F8F9FC] p-3.5 text-xs">
                <p className="text-[10.5px] font-bold text-[#5A6270] uppercase">
                  Nadawca: GOV-DOPŁATA
                </p>
                <p className="mt-1.5 leading-relaxed font-semibold text-[#111318]">
                  „mObywatel: Wykryto niedopłatę podatku PIT za 2025 r. w kwocie 14,80 zł. Opłać w
                  ciągu 2 godzin, aby uniknąć zajęcia rachunku bankowego:”
                </p>
                <p className="mt-2 rounded-lg bg-red-50 px-2.5 py-1.5 font-mono text-[10.5px] font-bold text-red-700 ring-1 ring-red-200">
                  mobywatel-rozliczenie-gov.pl/pit
                </p>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-[#5A6270]">
                {step === 0 && 'Kliknij na lewym telefonie „Sprawdź podejrzany SMS o dopłacie PIT”.'}
                {step === 1 && 'Uruchom na lewym telefonie skaner PLLuM-12B + CERT Polska.'}
                {step === 2 &&
                  'Model PLLuM-12B potwierdził próbę phishingu! Kliknij czerwony przycisk blokady.'}
                {step === 3 && 'Potwierdź na lewym telefonie wysyłkę incydentu do NASK / 8080.'}
              </p>
            </div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs"
            >
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>LISTA OSTRZEŻEŃ CERT POLSKA (NASK)</span>
              </div>

              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Złośliwa domena została zablokowana w sieciach RP
              </h3>

              <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                <div className="pb-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Zablokowana domena phishingowa
                  </span>
                  <strong className="mt-0.5 block font-mono text-[11.5px] font-extrabold text-red-700">
                    mobywatel-rozliczenie-gov.pl
                  </strong>
                </div>
                <div className="py-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Działanie ochronne u operatorów (Orange, Play, Plus, T-Mobile)
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-emerald-800">
                    ✓ Przekierowanie na stronę ostrzegawczą CERT Polska
                  </strong>
                </div>
                <div className="pt-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Powiązany numer nadawcy SMS
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-[#111318]">
                    Przekazano do blokady nadpisu (CLI Spoofing / Smishing 8080)
                  </strong>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

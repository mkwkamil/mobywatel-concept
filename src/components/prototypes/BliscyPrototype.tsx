import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BellRing,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  Contrast,
  FileCheck2,
  FileText,
  HeartHandshake,
  Home,
  Lock,
  PhoneCall,
  PhoneIncoming,
  PhoneOff,
  Pill,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Type,
  UserCheck,
  Volume2,
} from 'lucide-react';
import { AiStreamCard } from '../shared/AiStreamCard';
import { BiometricModal } from '../shared/BiometricModal';
import { polishSpeech } from '../../utils/speech';
import { ZUS_ORIGINAL_LEGAL_TEXT } from '../../data/bliscyScenariosData';

export interface BliscySharedState {
  scenarioId: string;
  step: number;
  setStep: (step: number) => void;
  extraLargeFont: boolean;
  setExtraLargeFont: (v: boolean) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  visitMode: 'dom' | 'urzad';
  setVisitMode: (m: 'dom' | 'urzad') => void;
  photoAttached: boolean;
  setPhotoAttached: (v: boolean) => void;
  notifyEwaSms: boolean;
  setNotifyEwaSms: (v: boolean) => void;
  letterTab: 'prosty' | 'oryginal';
  setLetterTab: (t: 'prosty' | 'oryginal') => void;
  nextScenarioTitle: string | null;
  onNextScenario: () => void;
}

/* Baner przejścia do następnego scenariusza wyświetlany po ukończeniu kroku 5 */
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
      {nextScenarioTitle ?? 'Poznałeś pełny moduł mObywatel Bliscy i Tarcza Seniora.'}
    </p>
    <button
      type="button"
      onClick={onNextScenario}
      className="mt-2.5 flex w-full items-center justify-between rounded-xl bg-[#111318] px-3.5 py-2.5 text-xs font-extrabold text-white transition-colors hover:bg-[#DC1B3F]"
    >
      <span>{nextScenarioTitle ? 'Przejdź do kolejnego scenariusza' : 'Wróć do wyboru koncepcji'}</span>
      <ArrowRight className="h-4 w-4 shrink-0" />
    </button>
  </motion.div>
);

/* ============================================================================
   LEWY TELEFON: PANI HALINA KAMIŃSKA (84 LATA, TRYB SENIOR WCAG 2.2 AAA)
   ============================================================================ */
export const BliscyHalinaScreen: React.FC<BliscySharedState> = ({
  scenarioId,
  step,
  setStep,
  extraLargeFont,
  setExtraLargeFont,
  highContrast,
  setHighContrast,
  visitMode,
  letterTab,
  setLetterTab,
  nextScenarioTitle,
  onNextScenario,
}) => {
  const [biometricOpen, setBiometricOpen] = useState(false);
  const [isSpeakingAlert, setIsSpeakingAlert] = useState(false);

  const hText = extraLargeFont ? 'text-[19px] leading-snug' : 'text-[17px] leading-snug';
  const pText = extraLargeFont ? 'text-[14.5px] leading-relaxed' : 'text-[13.5px] leading-relaxed';

  const cardBg = highContrast
    ? 'border-2 border-yellow-400 bg-black text-white'
    : 'border border-[#E2E5EE] bg-white text-[#111318] shadow-2xs';

  const primaryBtn = highContrast
    ? 'bg-yellow-400 text-black hover:bg-yellow-300 font-black'
    : 'bg-[#DC1B3F] text-white hover:bg-[#B81231] font-extrabold';

  const greenBtn = highContrast
    ? 'bg-emerald-400 text-black hover:bg-emerald-300 font-black'
    : 'bg-emerald-700 text-white hover:bg-emerald-800 font-extrabold';

  return (
    <div
      className={`relative min-h-full space-y-3 rounded-2xl p-0.5 transition-colors ${
        highContrast ? 'bg-zinc-950 text-white' : ''
      }`}
    >
      {/* Kompaktowy pasek dostępności AAA */}
      <div
        className={`flex items-center justify-between gap-2 rounded-2xl px-3 py-2 ${
          highContrast
            ? 'border border-yellow-400 bg-zinc-900 text-yellow-300'
            : 'border border-[#E2E5EE] bg-white text-[#111318] shadow-2xs'
        }`}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#DC1B3F] text-[11px] font-black text-white">
            HK
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-extrabold">Pani Halina · 84 l.</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => setExtraLargeFont(!extraLargeFont)}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-extrabold transition-colors ${
              extraLargeFont
                ? 'bg-[#DC1B3F] text-white'
                : highContrast
                  ? 'border border-yellow-400 text-yellow-300'
                  : 'bg-[#F3F4F8] text-[#111318] hover:bg-[#E6E8EF]'
            }`}
          >
            <Type className="h-3 w-3" />
            <span>{extraLargeFont ? 'A++' : 'A+'}</span>
          </button>

          <button
            type="button"
            onClick={() => setHighContrast(!highContrast)}
            className={`inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-extrabold transition-colors ${
              highContrast
                ? 'bg-yellow-400 text-black'
                : 'bg-[#F3F4F8] text-[#111318] hover:bg-[#E6E8EF]'
            }`}
          >
            <Contrast className="h-3 w-3" />
            <span>Kontrast</span>
          </button>
        </div>
      </div>

      {/* ====================================================================
          SCENARIUSZ 1: WYPEŁNIJ ZE MNĄ, NIE ZA MNIE
          ==================================================================== */}
      {scenarioId === 'wniosek-wspolny' && (
        <>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div
                className={`rounded-3xl p-4 ${
                  highContrast
                    ? 'border-2 border-yellow-400 bg-black'
                    : 'border-2 border-[#DC1B3F] bg-white shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex shrink-0 items-center rounded-lg px-2.5 py-1 text-[10.5px] font-extrabold uppercase ${
                      highContrast ? 'bg-yellow-400 text-black' : 'bg-[#FDECEE] text-[#DC1B3F]'
                    }`}
                  >
                    Pilny termin · Dowód
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      if (isSpeakingAlert) {
                        polishSpeech.stop();
                        setIsSpeakingAlert(false);
                      } else {
                        polishSpeech.speak(
                          'Pani Halino. Twój dowód osobisty traci ważność 5 grudnia. Kliknij czerwony przycisk, aby poprosić córkę Ewę o przygotowanie wniosku.',
                          setIsSpeakingAlert,
                        );
                      }
                    }}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white transition-colors ${
                      isSpeakingAlert ? 'bg-[#DC1B3F]' : 'bg-[#111318] hover:bg-[#DC1B3F]'
                    }`}
                  >
                    <Volume2 className="h-3.5 w-3.5 text-[#FF8FA3]" />
                    <span>{isSpeakingAlert ? 'Stop' : 'Czytaj'}</span>
                  </button>
                </div>

                <h2 className={`mt-3 font-extrabold ${hText}`}>
                  Twój dowód osobisty traci ważność 05.12.2026 r.
                </h2>
                <p className={`mt-1.5 opacity-90 ${pText}`}>
                  Nie musisz wpisywać danych na klawiaturze. Twoja córka <strong>Ewa Nowak</strong>{' '}
                  może wypełnić wniosek za Ciebie na swoim telefonie.
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm shadow-xs transition-transform active:scale-[0.99] ${primaryBtn}`}
                >
                  <HeartHandshake className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">Poproś córkę Ewę o wypełnienie</span>
                </button>
              </div>

              <div className="space-y-2">
                <div className={`flex items-center justify-between gap-2 rounded-2xl p-3.5 ${cardBg}`}>
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F8] text-emerald-700">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold">PESEL zastrzeżony</p>
                      <p className="text-[11px] opacity-75">Ochrona przed kredytem</p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                    AKTYWNY
                  </span>
                </div>

                <div className={`flex items-center justify-between gap-2 rounded-2xl p-3.5 ${cardBg}`}>
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F8] text-[#111318]">
                      <PhoneCall className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-extrabold">Bliska osoba: Ewa Nowak</p>
                      <p className="truncate text-[11px] opacity-75">
                        Córka · połączona w mObywatelu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {(step === 1 || step === 2) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className={`rounded-3xl p-4 ${cardBg}`}>
                <div className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-extrabold text-amber-900">
                  <Clock className="h-3.5 w-3.5 shrink-0 text-amber-700" />
                  <span>CZEKAMY NA CÓRKĘ EWĘ</span>
                </div>

                <h2 className={`mt-3 font-extrabold ${hText}`}>
                  {step === 1
                    ? 'Wysłaliśmy prośbę na telefon córki Ewy.'
                    : 'Córka Ewa wypełnia teraz Twój wniosek na swoim telefonie.'}
                </h2>
                <p className={`mt-1.5 opacity-85 ${pText}`}>
                  Spójrz na prawy telefon obok. Ewa uzupełnia za Ciebie urzędowe rubryki, ale{' '}
                  <strong>nie może nic wysłać bez Twojej zgody</strong>.
                </p>

                <div
                  className={`mt-4 flex items-center gap-2 rounded-xl border p-3 text-xs font-bold ${
                    highContrast
                      ? 'border-yellow-400 bg-zinc-900 text-yellow-200'
                      : 'border-[#E2E5EE] bg-[#F4F5F8] text-[#111318]'
                  }`}
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Twoje hasło i PIN są tylko w Twoim telefonie.</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div
                className={`rounded-3xl p-4 ${
                  highContrast
                    ? 'border-2 border-yellow-400 bg-black'
                    : 'border-2 border-[#111318] bg-white shadow-sm'
                }`}
              >
                <div className="mb-1">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-[10.5px] font-extrabold text-emerald-900 ring-1 ring-emerald-200">
                    <Check className="h-3 w-3 text-emerald-700" />
                    GOTOWE DO TWOJEJ ZGODY
                  </span>
                  <p className="mt-1.5 text-[11px] font-semibold opacity-75">
                    Przygotowała: Ewa Nowak (Córka)
                  </p>
                </div>

                <h2 className={`mb-3 font-extrabold ${hText}`}>
                  Sprawdź w 3 zdaniach, co przygotowała córka Ewa:
                </h2>

                <AiStreamCard
                  modelName="PLLuM-12B"
                  taskLabel="Streszczenie wniosku w prostym języku"
                  seniorScale={extraLargeFont}
                  highContrast={highContrast}
                  text="Córka Ewa wypełniła dla Ciebie bezpłatny wniosek o nowy dowód osobisty w Urzędzie Miasta Lublin."
                  bullets={[
                    {
                      label: '1. Jak złożysz odciski palców i odbierzesz dowód',
                      value:
                        visitMode === 'dom'
                          ? 'Bezpłatnie w Twoim domu — urzędnik przyjedzie na ul. Narutowicza 18 m. 3 (art. 26 ustawy).'
                          : 'W Urzędzie Miasta Lublin (ul. Wieniawska 14) — wspólna wizyta z Ewą bez kolejki.',
                      tone: 'good',
                    },
                    {
                      label: '2. Ile to kosztuje',
                      value: '0 zł (wydanie nowego dowodu osobistego jest bezpłatne).',
                      tone: 'good',
                    },
                    {
                      label: '3. Twoje bezpieczeństwo',
                      value: 'Wniosek wyśle się dopiero po Twoim osobistym potwierdzeniu.',
                    },
                  ]}
                  legalCitation="Art. 26 ustawy o dowodach osobistych"
                  jsonPayload={{
                    wnioskodawca: 'Halina Kamińska (PESEL: 420119•••08)',
                    asystent_techniczny: 'Ewa Nowak (córka)',
                    tryb_obslugi:
                      visitMode === 'dom' ? 'MOBILNA_STACJA_W_DOMU_ART_26' : 'WIZYTA_W_URZEDZIE',
                    oplata_pln: 0,
                  }}
                />

                <div className="mt-3.5 space-y-2">
                  <button
                    type="button"
                    onClick={() => setBiometricOpen(true)}
                    className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-sm shadow-xs transition-transform active:scale-[0.99] ${greenBtn}`}
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">Tak, zgadzam się i podpisuję</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={`w-full rounded-xl px-4 py-2 text-xs font-bold ${
                      highContrast
                        ? 'border border-yellow-400 text-yellow-300'
                        : 'bg-[#F3F4F8] text-[#5A6270] hover:text-[#111318]'
                    }`}
                  >
                    Poproś Ewę o zmianę sposobu odbioru
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div
                className={`rounded-3xl p-4 ${
                  highContrast
                    ? 'border-2 border-yellow-400 bg-black'
                    : 'border-2 border-emerald-600 bg-white shadow-sm'
                }`}
              >
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[11px] font-extrabold text-white">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  <span>WNIOSEK WYSŁANY · UPO</span>
                </div>

                <h2 className={`mt-3 font-extrabold ${hText}`}>
                  Gotowe, Pani Halino! Wniosek jest już w Urzędzie Miasta Lublin.
                </h2>
                <p className={`mt-1.5 opacity-85 ${pText}`}>
                  {visitMode === 'dom'
                    ? 'Urzędnik zadzwoni do Ciebie i do córki Ewy, aby umówić dzień wizyty u Ciebie w domu przy ul. Narutowicza 18.'
                    : 'Córka Ewa otrzymała w swoim telefonie termin Waszej wspólnej wizyty w urzędzie.'}
                </p>

                <div
                  className={`mt-4 divide-y rounded-2xl border p-3 ${
                    highContrast
                      ? 'divide-yellow-400/30 border-yellow-400 bg-zinc-900 text-white'
                      : 'divide-[#E6E8EF] border-[#E2E5EE] bg-[#F8F9FC] text-[#111318]'
                  }`}
                >
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Numer urzędowy sprawy
                    </span>
                    <strong className="mt-0.5 block text-xs font-extrabold">
                      DO/LUB/2026/88412
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Podpisano osobiście
                    </span>
                    <strong className="mt-0.5 block text-xs font-extrabold">
                      Halina Kamińska (PIN / Biometria)
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Asysta techniczna
                    </span>
                    <strong className="mt-0.5 block text-xs font-extrabold">
                      Ewa Nowak (córka)
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
          SCENARIUSZ 2: TARCZA ANTY-SOCJOTECHNICZNA („NA POLICJANTA / BANK”)
          ==================================================================== */}
      {scenarioId === 'tarcza-oszust' && (
        <>
          {step < 4 && (
            <div className="rounded-2xl border border-red-500/80 bg-[#1A0D10] p-3 text-white shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 animate-pulse items-center justify-center rounded-full bg-red-600">
                    <PhoneIncoming className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-red-300 uppercase">
                      Rozmowa trwa (01:42)
                    </p>
                    <p className="truncate text-xs font-extrabold">+48 22 100 49 12</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-md bg-red-600/30 px-2 py-0.5 text-[10px] font-bold text-red-200">
                  Spoza kontaktów
                </span>
              </div>
              <p className="mt-2 rounded-xl bg-black/40 p-2.5 text-[11.5px] leading-snug italic text-red-100">
                „Pani Halino, tu komisarz Nowak z Policji! Złodzieje biorą na Panią kredyt! Proszę
                wejść w mObywatela i natychmiast kliknąć ODBLOKUJ PESEL!”
              </p>
            </div>
          )}

          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className={`rounded-3xl p-4 ${cardBg}`}>
                <h2 className={`font-extrabold ${hText}`}>
                  Ktoś przez telefon każe Ci odblokować numer PESEL?
                </h2>
                <p className={`mt-1.5 opacity-85 ${pText}`}>
                  Zobacz, co zrobi Tarcza Seniora, gdy podczas rozmowy telefonicznej spróbujesz
                  wyłączyć ochronę PESEL:
                </p>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-xs shadow-xs ${primaryBtn}`}
                >
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">Klikam „Cofnij zastrzeżenie PESEL”</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-red-600 bg-red-950 p-4 text-white shadow-md">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-lg bg-yellow-400 px-2.5 py-1 text-[10.5px] font-black text-black uppercase">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  <span>TARCZA SENIORA · STOP!</span>
                </div>

                <h2 className={`font-black text-yellow-300 ${hText}`}>
                  UWAGA! To próba oszustwa!
                </h2>

                <div className="mt-3">
                  <AiStreamCard
                    modelName="Bielik-11B"
                    taskLabel="Detekcja socjotechniki + Rejestr Połączeń"
                    seniorScale={extraLargeFont}
                    highContrast={true}
                    text="Wykryto próbę odblokowania PESEL w trakcie rozmowy z niezweryfikowanym numerem +48 22 100 49 12."
                    bullets={[
                      {
                        label: 'Weryfikacja w Rejestrze Urzędowym',
                        value:
                          'Żaden policjant, pracownik ZUS ani banku NIE DZWONI teraz do Ciebie.',
                        tone: 'warn',
                      },
                      {
                        label: 'Złota zasada bezpieczeństwa',
                        value:
                          'Policja i banki NIGDY nie proszą o odblokowanie PESEL przez telefon!',
                        tone: 'warn',
                      },
                    ]}
                    jsonPayload={{
                      caller_number: '+48221004912',
                      gov_registry_match: false,
                      scam_pattern: 'VISHING_FAKE_POLICE_PESEL_UNLOCK',
                      risk_score: 0.994,
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-3.5 w-full rounded-2xl bg-yellow-400 px-4 py-3 text-xs font-black text-black shadow-xs hover:bg-yellow-300"
                >
                  Włącz Bezpiecznik i powiadom córkę Ewę
                </button>
              </div>
            </motion.div>
          )}

          {(step === 2 || step === 3) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className={`rounded-3xl p-4 ${cardBg}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-950">
                    <Clock className="h-3.5 w-3.5 text-amber-700" />
                    BEZPIECZNIK 60 MINUT
                  </span>
                  <span className="font-mono text-xs font-black text-[#DC1B3F]">59:48</span>
                </div>

                <h2 className={`mt-2.5 font-extrabold ${hText}`}>
                  Twój PESEL nadal jest ZABLOKOWANY. Oszust nie weźmie kredytu.
                </h2>
                <p className={`mt-1.5 opacity-85 ${pText}`}>
                  Odblokowanie numeru PESEL zostało wstrzymane na 60 minut. Wysłaliśmy już pilny
                  alarm na telefon Twojej córki Ewy.
                </p>

                <div className="mt-3 rounded-xl border border-[#E2E5EE] bg-[#F4F5F8] p-3 text-xs font-semibold text-[#111318]">
                  Spójrz na prawy telefon córki Ewy — może jednym przyciskiem zablokować oszusta i
                  zgłosić numer do CERT Polska.
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 text-[#111318] shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[11px] font-extrabold text-white">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>JESTEŚ W 100% BEZPIECZNA</span>
                </div>
                <h2 className={`mt-2.5 font-extrabold ${hText}`}>
                  Fałszywe połączenie przerwane. Twój PESEL jest chroniony.
                </h2>
                <p className={`mt-1.5 text-[#2C323D] ${pText}`}>
                  Twoja córka <strong>Ewa Nowak</strong> potwierdziła blokadę ze swojego telefonu i
                  zgłosiła numer oszusta do <strong>CERT Polska</strong>.
                </p>

                <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs font-extrabold text-[#111318]">
                  <PhoneCall className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span>Córka Ewa Nowak dzwoni teraz do Ciebie.</span>
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
          SCENARIUSZ 3: PISMO URZĘDOWE PO LUDZKU + WSPÓLNA APTEKA (E-RECEPTY)
          ==================================================================== */}
      {scenarioId === 'pismo-po-ludzku' && (
        <>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className={`rounded-3xl p-4 ${cardBg}`}>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                    Nowe pismo z ZUS · e-Doręczenia
                  </span>
                  <FileText className="h-4 w-4 shrink-0 text-[#DC1B3F]" />
                </div>

                <h2 className={`mt-2.5 font-extrabold ${hText}`}>
                  Decyzja ZUS znak: ENP/04/02918442/2026
                </h2>

                <div
                  className={`mt-2.5 rounded-2xl border p-3 text-xs leading-relaxed ${
                    highContrast
                      ? 'border-yellow-400/50 bg-zinc-900 text-zinc-200'
                      : 'border-[#ECEEF4] bg-[#F8F9FC] text-[#5A6270]'
                  }`}
                >
                  {ZUS_ORIGINAL_LEGAL_TEXT}
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-xs shadow-xs ${primaryBtn}`}
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">Wyjaśnij prostym językiem</span>
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
              <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-black/5 p-1">
                <button
                  type="button"
                  onClick={() => setLetterTab('prosty')}
                  className={`rounded-lg py-1.5 text-xs font-extrabold ${
                    letterTab === 'prosty'
                      ? 'bg-[#DC1B3F] text-white shadow-2xs'
                      : 'text-[#5A6270] hover:text-[#111318]'
                  }`}
                >
                  Prosty język
                </button>
                <button
                  type="button"
                  onClick={() => setLetterTab('oryginal')}
                  className={`rounded-lg py-1.5 text-xs font-extrabold ${
                    letterTab === 'oryginal'
                      ? 'bg-[#111318] text-white shadow-2xs'
                      : 'text-[#5A6270] hover:text-[#111318]'
                  }`}
                >
                  Oryginał z ZUS
                </button>
              </div>

              {letterTab === 'oryginal' ? (
                <div className={`rounded-2xl p-4 text-xs leading-relaxed ${cardBg}`}>
                  {ZUS_ORIGINAL_LEGAL_TEXT}
                </div>
              ) : (
                <AiStreamCard
                  modelName="PLLuM-12B"
                  taskLabel="Standard Jasnopisu B1 · e-Doręczenia"
                  seniorScale={extraLargeFont}
                  highContrast={highContrast}
                  text="Spokojnie, to dobra wiadomość z ZUS. Nie musisz nic płacić ani nigdzie chodzić."
                  bullets={[
                    {
                      label: 'O co chodzi w tym piśmie',
                      value:
                        'ZUS przyznał Ci dodatek pielęgnacyjny: +348,22 zł więcej co miesiąc (po ukończeniu 75 lat).',
                      tone: 'good',
                    },
                    {
                      label: 'Czy musisz składać wniosek lub płacić',
                      value: 'NIE. Dodatek przyznano automatycznie z urzędu, bez podatku.',
                      tone: 'good',
                    },
                    {
                      label: 'Kiedy dostaniesz wyższą kwotę',
                      value: '10 listopada 2026 r. — razem ze zwykłą emeryturą.',
                    },
                  ]}
                  legalCitation="Art. 75 ust. 1 ustawy o FUS"
                  jsonPayload={{
                    typ_pisma: 'DECYZJA_ZUS_DODATEK_PIELEGNACYJNY',
                    wymagana_akcja_obywatela: 'BRAK',
                    kwota_dodatku_netto_pln: 348.22,
                    termin_wyplaty: '2026-11-10',
                  }}
                />
              )}

              <button
                type="button"
                onClick={() => setStep(2)}
                className={`flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-xs shadow-xs ${primaryBtn}`}
              >
                <Pill className="h-4 w-4 shrink-0" />
                <span className="whitespace-nowrap">Przejdź do Moich Leków (2 e-Recepty)</span>
              </button>
            </motion.div>
          )}

          {(step === 2 || step === 3) && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className={`rounded-3xl p-4 ${cardBg}`}>
                <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                  Moje leki (IKP) · ważne do 02.11.2026
                </span>
                <h2 className={`mt-2 font-extrabold ${hText}`}>
                  Masz 2 leki do wykupienia w aptece (Bezpłatne 65+)
                </h2>

                <div className="mt-3 space-y-2">
                  <div className="rounded-2xl border border-[#E6E8EF] bg-[#F8F9FC] p-3 text-[#111318]">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-xs font-extrabold">Polpril 5 mg (kapsułki)</strong>
                      <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                        0,00 zł (65+ S)
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#5A6270]">
                      2 opakowania po 28 szt. · Kod: 9182
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E6E8EF] bg-[#F8F9FC] p-3 text-[#111318]">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-xs font-extrabold">Atoris 20 mg (tabletki)</strong>
                      <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                        0,00 zł (65+ S)
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#5A6270]">
                      1 opakowanie 30 szt. · Kod: 9182
                    </p>
                  </div>
                </div>

                {step === 2 ? (
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3.5 text-xs shadow-xs ${primaryBtn}`}
                  >
                    <Send className="h-4 w-4 shrink-0" />
                    <span className="whitespace-nowrap">Poproś córkę Ewę o wykupienie</span>
                  </button>
                ) : (
                  <div className="mt-4 rounded-xl border border-[#E2E5EE] bg-[#F4F5F8] p-3 text-xs font-bold text-[#111318]">
                    ✓ Kod kreskowy e-Recepty (9182) został wysłany na telefon córki Ewy.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 text-[#111318] shadow-xs">
                <span className="inline-block rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  Leki wykupione · Ewa przywiezie o 17:00
                </span>
                <h2 className={`mt-2.5 font-extrabold ${hText}`}>
                  Jak przyjmować Twoje leki:
                </h2>

                <div className="mt-3 space-y-2">
                  <div className="rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3">
                    <span className="block text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                      Rano · przed śniadaniem (godz. 8:00)
                    </span>
                    <strong className="mt-0.5 block text-sm font-extrabold text-[#111318]">
                      Polpril 5 mg — 1 kapsułka
                    </strong>
                    <span className="text-[11px] text-[#5A6270]">Na ciśnienie tętnicze</span>
                  </div>

                  <div className="rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3">
                    <span className="block text-[10.5px] font-extrabold text-[#111318] uppercase">
                      Wieczorem · po kolacji (godz. 20:00)
                    </span>
                    <strong className="mt-0.5 block text-sm font-extrabold text-[#111318]">
                      Atoris 20 mg — 1 tabletka
                    </strong>
                    <span className="text-[11px] text-[#5A6270]">Na cholesterol</span>
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

      {/* Modal osobistego podpisu biometrycznego / PIN-u Pani Haliny */}
      <BiometricModal
        open={biometricOpen}
        actorName="Halina Kamińska"
        actionTitle="Osobiste zatwierdzenie wniosku o dowód"
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
   PRAWY TELEFON: EWA NOWAK (57 LAT, CÓRKA — ASYSTENT BLISKIEJ OSOBY)
   ============================================================================ */
export const BliscyEwaScreen: React.FC<BliscySharedState> = ({
  scenarioId,
  step,
  setStep,
  visitMode,
  setVisitMode,
  photoAttached,
  setPhotoAttached,
  notifyEwaSms,
  setNotifyEwaSms,
}) => {
  return (
    <div className="space-y-3 pt-0.5">
      {/* Kompaktowy nagłówek konta córki Ewy */}
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#E2E5EE] bg-white px-3 py-2 shadow-2xs">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FDECEE] text-[11px] font-extrabold text-[#DC1B3F]">
            EN
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-extrabold text-[#111318]">Ewa Nowak · Córka</p>
          </div>
        </div>
        <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 ring-1 ring-emerald-200">
          Bliscy: Halina
        </span>
      </div>

      {/* ====================================================================
          SCENARIUSZ 1 U EWY: PRZYGOTOWANIE WNIOSKU DLA MAMY
          ==================================================================== */}
      {scenarioId === 'wniosek-wspolny' && (
        <>
          {step === 0 && (
            <div className="rounded-2xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] font-bold text-[#5A6270] uppercase">
                  Panel opieki rodzinnej
                </span>
                <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Tarcza aktywna
                </span>
              </div>
              <h3 className="mt-2 text-sm font-extrabold text-[#111318]">
                Halina Kamińska (84 l., Mama)
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#5A6270]">
                Widzisz tu tylko sprawy, które mama sama udostępni Ci do wypełnienia. Kliknij na
                lewym telefonie mamy <strong>„Poproś córkę Ewę o wypełnienie”</strong>.
              </p>
            </div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-[#DC1B3F] bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FDECEE] text-[#DC1B3F]">
                    <BellRing className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-extrabold text-[#DC1B3F] uppercase">
                      Nowa prośba o asystę
                    </p>
                    <p className="truncate text-xs font-extrabold text-[#111318]">
                      Od: Halina Kamińska (Mama)
                    </p>
                  </div>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-[#2C323D]">
                  Sprawa: <strong>Wniosek o nowy dowód osobisty</strong> (dotychczasowy dowód AXK
                  114209 wygasa 05.12.2026 r.).
                </p>

                <div className="mt-3 rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] p-3 text-[11px] leading-relaxed text-[#5A6270]">
                  <strong className="text-[#111318]">Tryb Asysty:</strong> Wypełniasz formularz na
                  swoim telefonie, ale podpis pod wnioskiem składa osobiście mama na swoim ekranie.
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-3.5 w-full rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  Otwórz roboczy formularz dla mamy
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
              <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="rounded-md bg-[#FDECEE] px-2 py-0.5 text-[10px] font-extrabold text-[#DC1B3F] uppercase">
                    Szkic wniosku · Mama
                  </span>
                  <span className="text-[10.5px] font-semibold text-[#5A6270]">
                    PESEL: 420119•••08
                  </span>
                </div>

                <h3 className="text-[13.5px] font-extrabold text-[#111318]">
                  Skonfiguruj parametry wniosku dla mamy:
                </h3>

                <div className="mt-2.5 space-y-2">
                  <p className="text-[11px] font-bold text-[#5A6270]">
                    1. Odciski palców i odbiór dowodu:
                  </p>

                  <button
                    type="button"
                    onClick={() => setVisitMode('dom')}
                    className={`flex w-full items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                      visitMode === 'dom'
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/35'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <Home className="mt-0.5 h-4 w-4 shrink-0 text-[#DC1B3F]" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-extrabold text-[#111318]">
                        Bezpłatna wizyta urzędnika w domu (Art. 26)
                      </div>
                      <div className="mt-0.5 text-[11px] leading-snug text-[#5A6270]">
                        Mobilna stacja UM Lublin przyjedzie na ul. Narutowicza 18 m. 3.
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisitMode('urzad')}
                    className={`flex w-full items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                      visitMode === 'urzad'
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/35'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#DC1B3F]" />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-extrabold text-[#111318]">
                        Wspólna wizyta w UM Lublin (ul. Wieniawska 14)
                      </div>
                      <div className="mt-0.5 text-[11px] leading-snug text-[#5A6270]">
                        Rezerwacja okienka priorytetowego dla osób 80+ bez kolejki.
                      </div>
                    </div>
                  </button>
                </div>

                <div className="mt-3 space-y-2 border-t border-[#EFF1F6] pt-2.5">
                  <button
                    type="button"
                    onClick={() => setPhotoAttached(!photoAttached)}
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] px-3 py-2 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Camera className="h-3.5 w-3.5 shrink-0 text-[#DC1B3F]" />
                      <span className="text-[11.5px] font-semibold text-[#111318]">
                        Zdjęcie do dowodu mamy
                      </span>
                    </div>
                    <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-extrabold whitespace-nowrap text-emerald-800 ring-1 ring-emerald-200">
                      {photoAttached ? '✓ Załączono' : 'Dodaj'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNotifyEwaSms(!notifyEwaSms)}
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] px-3 py-2 text-left"
                  >
                    <span className="text-[11.5px] font-semibold text-[#111318]">
                      Powiadomienia SMS dla mnie
                    </span>
                    <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-[10.5px] font-extrabold whitespace-nowrap text-[#DC1B3F] ring-1 ring-[#E2E5EE]">
                      {notifyEwaSms ? 'Włączone' : 'Wyłączone'}
                    </span>
                  </button>
                </div>

                <div className="mt-2.5 rounded-xl border border-dashed border-[#D0D5E0] bg-[#F4F5F8] p-2.5 text-left text-[11px] text-[#5A6270]">
                  <div className="flex items-center gap-1.5 font-bold text-[#111318]">
                    <Lock className="h-3.5 w-3.5 shrink-0 text-[#DC1B3F]" />
                    <span>Samodzielne wysłanie: ZABLOKOWANE</span>
                  </div>
                  <p className="mt-0.5 leading-snug">
                    Jako asystent przygotowujesz szkic. Wniosek podpisze mama na swoim ekranie.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <Send className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Wyślij wniosek na telefon mamy</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-extrabold text-emerald-800 ring-1 ring-emerald-200">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Szkic wysłany na telefon mamy</span>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#5A6270]">
                Polski model <strong>PLLuM-12B</strong> wyświetla teraz mamie na lewym telefonie
                3-zdaniowe podsumowanie Twojego formularza. Kliknij zielony przycisk zgody na
                telefonie mamy.
              </p>
            </div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs"
            >
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-[10.5px] font-extrabold text-emerald-900 ring-1 ring-emerald-200">
                <FileCheck2 className="h-3.5 w-3.5 text-emerald-700" />
                <span>KOPIA UPO DLA ASYSTENTA</span>
              </div>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Mama podpisała wniosek osobiście
              </h3>

              <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                <div className="pb-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Numer urzędowy sprawy
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-[#111318]">
                    DO/LUB/2026/88412
                  </strong>
                </div>
                <div className="pt-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Sposób obsługi w UM Lublin
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-[#111318]">
                    {visitMode === 'dom'
                      ? 'Mobilny urzędnik w domu (ul. Narutowicza 18)'
                      : 'Wizyta priorytetowa (ul. Wieniawska 14)'}
                  </strong>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ====================================================================
          SCENARIUSZ 2 U EWY: CICHY ALARM ANTY-OSZUSTWOWY I ZGŁOSZENIE CERT
          ==================================================================== */}
      {scenarioId === 'tarcza-oszust' && (
        <>
          {(step === 0 || step === 1) && (
            <div className="rounded-2xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10.5px] font-bold text-[#5A6270] uppercase">
                  Monitoring Tarczy Seniora
                </span>
                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                  Czuwanie 24/7
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#5A6270]">
                Gdy mama odbierze podejrzany telefon i spróbuje pod dyktando oszusta zdjąć blokadę
                PESEL, natychmiast otrzymasz tu cichy alarm bezpieczeństwa.
              </p>
            </div>
          )}

          {(step === 2 || step === 3) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-red-600 bg-white p-4 shadow-md">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>PILNY ALARM TARCZY SENIORA</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Mama (Halina Kamińska) próbuje odblokować PESEL podczas rozmowy z nieznanym
                  numerem!
                </h3>

                <div className="mt-3 divide-y divide-red-200/70 rounded-2xl border border-red-200 bg-red-50/70 p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-red-900/80">
                      Połączenie przychodzące u mamy
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-red-950">
                      +48 22 100 49 12 (spoza kontaktów)
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-red-900/80">
                      Weryfikacja w Rejestrze Urzędowym
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-red-700">
                      BRAK — podejrzenie spoofingu „na policjanta”
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-red-900/80">
                      Status numeru PESEL mamy
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      ZABLOKOWANY (Bezpiecznik 60 min)
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-extrabold text-white shadow-xs hover:bg-red-700"
                >
                  <PhoneOff className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">Zablokuj i zgłoś numer do CERT Polska</span>
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
                <span className="inline-block rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  Atak zablokowany · Zgłoszono do CERT
                </span>
                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  PESEL mamy pozostaje zastrzeżony.
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Numer zgłoszenia NASK / CERT Polska
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      CERT-PL/2026/99412
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Zgłoszony numer spoofujący
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      +48 22 100 49 12 (podszywanie pod CBŚP)
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Podstawa prawna blokady
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Ustawa o zwalczaniu nadużyć w komunikacji elektronicznej
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ====================================================================
          SCENARIUSZ 3 U EWY: ODBIÓR E-RECEPT MAMY Z KODEM KRESKOWYM W APTECE
          ==================================================================== */}
      {scenarioId === 'pismo-po-ludzku' && (
        <>
          {step < 3 && (
            <div className="rounded-2xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <div className="flex items-center gap-2 text-xs font-bold text-[#111318]">
                <UserCheck className="h-4 w-4 shrink-0 text-[#DC1B3F]" />
                <span>Upoważnienie IKP: Halina Kamińska</span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                Na lewym telefonie mama przegląda decyzję z ZUS przetłumaczoną przez{' '}
                <strong>PLLuM-12B</strong>, a za chwilę przekaże Ci swoje e-Recepty do wykupienia w
                aptece.
              </p>
            </div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-[#DC1B3F] bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="shrink-0 rounded-md bg-[#FDECEE] px-2.5 py-1 text-[10px] font-extrabold whitespace-nowrap text-[#DC1B3F] uppercase">
                    e-Recepta Bliskiego
                  </span>
                  <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 text-[10.5px] font-extrabold whitespace-nowrap text-emerald-800 ring-1 ring-emerald-200">
                    65+ S (0,00 zł)
                  </span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Pacjentka: Halina Kamińska
                </h3>
                <p className="text-xs font-semibold text-[#5A6270]">PESEL: 42011907708</p>

                <div className="my-3 rounded-2xl border border-[#E6E8EF] bg-[#F8F9FC] p-3 text-center">
                  <div
                    aria-hidden="true"
                    className="mx-auto flex h-11 w-48 items-stretch justify-between gap-[2px]"
                  >
                    {[3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 2, 4, 2, 1, 3, 2, 1, 4, 2, 3].map(
                      (w, idx) => (
                        <span
                          key={idx}
                          className="bg-[#111318]"
                          style={{ width: `${w * 2}px` }}
                        />
                      ),
                    )}
                  </div>
                  <p className="mt-2 font-mono text-base font-black tracking-widest text-[#111318]">
                    KOD: 9182
                  </p>
                </div>

                <div className="divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Lek 1 · Nadciśnienie
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Polpril 5 mg (2 op. × 28 kaps.) — 0,00 zł
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Lek 2 · Cholesterol
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Atoris 20 mg (1 op. × 30 tabl.) — 0,00 zł
                    </strong>
                  </div>
                </div>

                {/* Przycisk z odpowiednim paddingiem px-4 i dopasowanym tekstem */}
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3.5 text-xs font-extrabold text-white shadow-2xs transition-colors hover:bg-emerald-800"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span className="whitespace-nowrap">Potwierdź wykupienie i wyślij rozpiskę</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs"
            >
              <span className="inline-block rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                Zrealizowano w aptece
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Wysłano mamie powiadomienie i dużą kartę dawkowania
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#5A6270]">
                Na ekranie mamy wyświetla się teraz czytelna ściągawka Rano / Wieczór dużym drukiem
                AAA oraz informacja, że przywieziesz leki o 17:00.
              </p>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Car,
  Check,
  CheckCircle2,
  CreditCard,
  FileCheck2,
  Mic,
  QrCode,
  ReceiptText,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  UserX,
} from 'lucide-react';
import { AiStreamCard } from '../shared/AiStreamCard';
import { BiometricModal } from '../shared/BiometricModal';

export interface AutoSharedState {
  scenarioId: string;
  step: number;
  setStep: (step: number) => void;
  agreedPrice: number;
  setAgreedPrice: (p: number) => void;
  keepPlates: boolean;
  setKeepPlates: (v: boolean) => void;
  pccVariant: 'standard' | 'niepelnosprawnosc' | 'faktura';
  setPccVariant: (v: 'standard' | 'niepelnosprawnosc' | 'faktura') => void;
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
      {nextScenarioTitle ?? 'Poznałeś pełny moduł Kupna i E-Rejestracji Auta w 3 Minuty.'}
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
   LEWY TELEFON: PIOTR MAZUR (39 L.) — SPRZEDAJĄCY (WŁAŚCICIEL W CEPIK)
   ============================================================================ */
export const AutoSellerScreen: React.FC<AutoSharedState> = ({
  scenarioId,
  step,
  setStep,
  agreedPrice,
  setAgreedPrice,
  pccVariant,
}) => {
  const pccAmount = pccVariant === 'standard' ? Math.round(agreedPrice * 0.02) : 0;

  return (
    <div className="space-y-3 pt-0.5">
      {/* Czysty, nieucinający nazwiska nagłówek sprzedającego */}
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#E2E5EE] bg-white px-3 py-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#111318] text-[11px] font-extrabold text-white">
            PM
          </span>
          <p className="text-xs font-extrabold text-[#111318]">Piotr Mazur</p>
        </div>
        <span className="shrink-0 rounded-md bg-[#F3F4F8] px-2.5 py-0.5 text-[10px] font-bold text-[#5A6270]">
          Sprzedający
        </span>
      </div>

      {/* ====================================================================
          SCENARIUSZ 1 U SPRZEDAJĄCEGO: TRANSAKCJA PRZY MASCE OD A DO Z
          ==================================================================== */}
      {scenarioId === 'pelny-zakup' && (
        <>
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-[#DC1B3F] bg-white p-4 shadow-xs">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                    Moje pojazdy · CEPiK
                  </span>
                  <span className="rounded-md bg-[#111318] px-2 py-0.5 font-mono text-[10.5px] font-bold text-white">
                    WX 4521K
                  </span>
                </div>

                <h2 className="mt-2.5 text-base font-extrabold text-[#111318]">
                  Toyota Corolla 1.8 Hybrid (2021)
                </h2>
                <p className="text-xs text-[#5A6270]">VIN: SB1Z93BE10E215501 · 100% własności</p>

                {/* Wyśrodkowany kod QR i wyśrodkowane oba podpisy pod nim */}
                <div className="my-3 flex flex-col items-center rounded-2xl border border-[#E6E8EF] bg-[#F8F9FC] px-4 py-3.5 text-center">
                  <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-2 border-[#111318] bg-white p-2 shadow-2xs">
                    <QrCode className="h-20 w-20 text-[#111318]" />
                  </div>
                  <p className="mt-2.5 text-xs font-extrabold text-[#111318]">
                    Kod transakcyjny mObywatel
                  </p>
                  <p className="mt-0.5 text-[11px] leading-snug text-[#5A6270]">
                    Pokaż ekran kupującej, aby przekazać dane z CEPiK
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <ScanLine className="h-4 w-4 shrink-0" />
                  <span>Połącz z telefonem kupującej</span>
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
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-[10.5px] font-extrabold text-emerald-900 ring-1 ring-emerald-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                  POŁĄCZONO Z KUPUJĄCĄ
                </span>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Kupująca weryfikuje teraz Twój pojazd w CEPiK i UFG
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Tożsamość kupującej (mDowód)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Marta Kowalska (PESEL potwierdzony)
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Udostępniony zakres danych
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      Raport CEPiK, historia SKP oraz status OC Warta
                    </strong>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[#5A6270]">
                  Spójrz na prawy telefon kupującej — widzi pełny raport z rejestrów państwowych.
                </p>
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
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-[#FDECEE] px-2.5 py-1 text-[10px] font-extrabold text-[#DC1B3F] uppercase">
                    Warunki umowy · Głos
                  </span>
                  <Mic className="h-4 w-4 text-[#DC1B3F]" />
                </div>

                <h3 className="mt-2 text-sm font-extrabold text-[#111318]">
                  Wybierz uzgodnioną kwotę sprzedaży:
                </h3>

                <div className="mt-2.5 rounded-xl bg-[#F8F9FC] p-2.5 text-[11.5px] italic text-[#2C323D]">
                  „Sprzedajemy Toyotę Corollę za {agreedPrice.toLocaleString('pl-PL')} zł, przebieg
                  58 420 km, dwa komplety kluczyków.”
                </div>

                <div className="mt-3">
                  <span className="block text-[10.5px] font-bold text-[#5A6270] uppercase">
                    Cena w umowie:
                  </span>
                  <div className="mt-1.5 grid grid-cols-2 gap-2">
                    {[46000, 48500].map((price) => (
                      <button
                        key={price}
                        type="button"
                        onClick={() => setAgreedPrice(price)}
                        className={`rounded-xl border py-2 text-xs font-extrabold transition-all ${
                          agreedPrice === price
                            ? 'border-[#DC1B3F] bg-[#FDECEE]/45 text-[#DC1B3F]'
                            : 'border-[#E6E8EF] bg-white text-[#111318]'
                        }`}
                      >
                        {price.toLocaleString('pl-PL')} zł
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Stan drogomierza przy przekazaniu
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      58 420 km (+210 km od badania SKP)
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Twój obowiązek urzędowy
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      Automatyczne zgłoszenie zbycia w CEPiK
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Zatwierdź warunki umowy</span>
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-[10.5px] font-extrabold text-emerald-900 ring-1 ring-emerald-200">
                <Check className="h-3.5 w-3.5 text-emerald-700" />
                PODPISANO PRZEZ SPRZEDAJĄCEGO
              </div>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Czekamy na podpis i opłatę PCC-3 przez kupującą
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                Złożyłeś podpis osobisty pod umową na kwotę{' '}
                <strong>{agreedPrice.toLocaleString('pl-PL')} zł</strong>. Kliknij zielony przycisk
                na prawym telefonie Marty, aby sfinalizować transakcję.
              </p>
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
                  <span>ZBYCIE ZGŁOSZONE AUTOMATYCZNIE</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Nie musisz iść do urzędu ani pisać do ubezpieczyciela.
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      1. Zgłoszenie zbycia pojazdu w CEPiK (UPO)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      ZBY/WAW/2026/44109 (obowiązek 30 dni wykonany)
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      2. Powiadomienie ubezpieczyciela OC (Warta S.A.)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      Wysłano automatycznie — polisa przepisana na nabywcę
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      3. Podpisana umowa kupna-sprzedaży PDF
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      W Twojej skrzynce e-Doręczeń ({agreedPrice.toLocaleString('pl-PL')} zł)
                    </strong>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}

      {/* ====================================================================
          SCENARIUSZ 2 U SPRZEDAJĄCEGO: OFERTA Z UKRYTYMI WADAMI
          ==================================================================== */}
      {scenarioId === 'czerwona-flaga' && (
        <>
          {step === 0 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-[#F3F4F8] px-2 py-0.5 text-[10px] font-bold text-[#5A6270] uppercase">
                  Oferta z ogłoszenia
                </span>
                <span className="rounded-md bg-[#111318] px-2 py-0.5 font-mono text-[10.5px] font-bold text-white">
                  KR 9A412
                </span>
              </div>

              <h3 className="mt-2 text-sm font-extrabold text-[#111318]">
                Audi A4 2.0 TFSI (2019) · 68 000 zł
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#5A6270]">
                Sprzedający zapewnia ustnie:{' '}
                <em>
                  „Auto w 100% bezwypadkowe, przebieg 134 000 km, jestem jedynym właścicielem”
                </em>
                .
              </p>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
              >
                <QrCode className="h-4 w-4 shrink-0" />
                <span>Udostępnij kod QR pojazdu</span>
              </button>
            </div>
          )}

          {step >= 1 && step < 4 && (
            <div className="rounded-3xl border border-amber-300 bg-white p-4 shadow-2xs">
              <span className="inline-block rounded-lg bg-amber-100 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-950 uppercase">
                Weryfikacja rejestrów przez kupującą
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                mObywatel ujawnił kupującej pełne dane z CEPiK i UFG
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                W transakcji mObywatel sprzedający nie może ukryć wpisów ze stacji kontroli
                pojazdów, kontroli drogowych Policji ani obecności współwłaściciela.
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <span className="inline-block rounded-lg bg-red-100 px-2.5 py-1 text-[10.5px] font-extrabold text-red-900 uppercase">
                Transakcja odrzucona
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Umowa nie została zawarta
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                Kupująca odrzuciła ofertę po wykryciu w CEPiK nieobecnego współwłaściciela oraz
                rozbieżności stanu licznika o 84 900 km.
              </p>
            </div>
          )}
        </>
      )}

      {/* ====================================================================
          SCENARIUSZ 3 U SPRZEDAJĄCEGO: ZANIŻENIE CENY A PODATEK PCC-3
          ==================================================================== */}
      {scenarioId === 'zwolnienie-pcc' && (
        <>
          {step === 0 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <span className="inline-block rounded-lg bg-amber-100 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-950 uppercase">
                Propozycja niższej kwoty
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                „Wpiszmy na umowie 22 000 zł zamiast 46 000 zł, to zapłaci Pani niższy podatek...”
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                Zobacz, jak model <strong>Bielik-11B</strong> chroni obie strony przed wezwaniem z
                Urzędu Skarbowego i utratą rękojmi:
              </p>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
              >
                <Sparkles className="h-4 w-4 shrink-0" />
                <span>Wyślij projekt z ceną 22 000 zł</span>
              </button>
            </div>
          )}

          {step >= 1 && step < 4 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                Korekta podatkowa · e-US
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Dlaczego zaniżenie ceny szkodzi także sprzedającemu?
              </h3>
              <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                <div className="pb-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Wartość rynkowa modelu (Eurotax / KAS)
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-[#111318]">
                    44 000 zł – 51 000 zł (Toyota Corolla 2021)
                  </strong>
                </div>
                <div className="pt-2">
                  <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                    Skutek w systemie KAS
                  </span>
                  <strong className="mt-0.5 block font-extrabold text-amber-900">
                    Automatyczna weryfikacja widełek cenowych przy składaniu PCC-3
                  </strong>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs">
              <span className="inline-block rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                Umowa zgodna z rynkiem
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Transakcja zatwierdzona bez ryzyka kontroli KAS
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                Kwota w umowie odpowiada rzeczywistej cenie rynkowej, a deklaracja PCC-3 kupującej
                została przyjęta przez e-Urząd Skarbowy ({pccAmount} zł podatku).
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* ============================================================================
   PRAWY TELEFON: MARTA KOWALSKA (35 L.) — KUPUJĄCA
   ============================================================================ */
export const AutoBuyerScreen: React.FC<AutoSharedState> = ({
  scenarioId,
  step,
  setStep,
  agreedPrice,
  keepPlates,
  setKeepPlates,
  pccVariant,
  setPccVariant,
  nextScenarioTitle,
  onNextScenario,
}) => {
  const [biometricOpen, setBiometricOpen] = useState(false);

  const pccTax = Math.round(agreedPrice * 0.02);
  const regFee = keepPlates ? 66.5 : 160.0;
  const totalPay = pccTax + regFee;
  const fmtPln = (n: number) => `${n.toFixed(2).replace('.', ',')} zł`;

  return (
    <div className="relative min-h-full space-y-3 pt-0.5">
      {/* Czysty, nieucinający nazwiska nagłówek kupującej */}
      <div className="flex items-center justify-between gap-2 rounded-2xl border border-[#E2E5EE] bg-white px-3 py-2 shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#DC1B3F] text-[11px] font-extrabold text-white">
            MK
          </span>
          <p className="text-xs font-extrabold text-[#111318]">Marta Kowalska</p>
        </div>
        <span className="shrink-0 rounded-md bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 ring-1 ring-emerald-200">
          Kupująca
        </span>
      </div>

      {/* ====================================================================
          SCENARIUSZ 1 U KUPUJĄCEJ: AUDYT CEPIK + UMOWA + PCC-3 + E-REJESTRACJA
          ==================================================================== */}
      {scenarioId === 'pelny-zakup' && (
        <>
          {step === 0 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                Zakup pojazdu · Krok 1
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Zeskanuj kod QR z telefonu sprzedającego
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                Zamiast przepisywać numer VIN z dowodu rejestracyjnego i wierzyć na słowo — połącz
                telefony, aby pobrać dane prosto z <strong>CEPiK i UFG</strong>.
              </p>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111318] px-4 py-3 text-xs font-extrabold text-white transition-colors hover:bg-[#DC1B3F]"
              >
                <ScanLine className="h-4 w-4 shrink-0" />
                <span>Zeskanuj kod sprzedającego</span>
              </button>
            </div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>AUDYT CEPIK I UFG: POJAZD CZYSTY</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Toyota Corolla 1.8 Hybrid · WX 4521K
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Własność w rejestrze CEPiK i zastawy
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      ✓ Piotr Mazur (100% własności · brak zastawu)
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Ostatni urzędowy odczyt licznika (SKP 12.04.2026)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      ✓ 58 210 km (spójna historia od nowości)
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Historia szkód istotnych (CEPiK / UFG)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      ✓ Brak szkód istotnych i wpisów o kradzieży
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Ubezpieczenie OC i badanie techniczne
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      ✓ OC Warta do 29.10.2026 · Badanie do 12.04.2027
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>Przejdź do warunków umowy</span>
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
                modelName="Bielik-11B"
                taskLabel="Ekstrakcja umowy + pakiet PCC-3 i e-Rejestracja"
                text={`Przygotowałem umowę kupna-sprzedaży na kwotę ${agreedPrice.toLocaleString('pl-PL')} zł oraz wniosek o przerejestrowanie pojazdu w Urzędzie m.st. Warszawy.`}
                bullets={[
                  {
                    label: 'Weryfikacja ceny rynkowej (PCC-3 · 2%)',
                    value: `Kwota ${agreedPrice.toLocaleString('pl-PL')} zł mieści się w widełkach rynkowych. Podatek PCC-3 wynosi ${pccTax} zł.`,
                    tone: 'good',
                  },
                  {
                    label: 'Rejestracja bez wizyty w urzędzie (od 2022 r.)',
                    value:
                      'Możesz zachować obecne tablice WX 4521K — oszczędzasz 93,50 zł i nie musisz iść po nowe tablice.',
                    tone: 'good',
                  },
                ]}
                legalCitation="Art. 73aa PoRD + deklaracja PCC-3"
                jsonPayload={{
                  pojazd_vin: 'SB1Z93BE10E215501',
                  nr_rejestracyjny: 'WX 4521K',
                  cena_pln: agreedPrice,
                  podatek_pcc3_pln: pccTax,
                  zachowanie_tablic: keepPlates,
                  oplata_rejestracyjna_pln: regFee,
                }}
              />

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Przejdź do wyboru tablic i podpisu</span>
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-[#111318] bg-white p-4 shadow-sm">
                <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                  1 podpis · 5 spraw urzędowych
                </span>

                <h3 className="mt-2 text-sm font-extrabold text-[#111318]">
                  Wybierz tryb rejestracji i zatwierdź pakiet:
                </h3>

                <div className="mt-2.5 space-y-1.5">
                  <button
                    type="button"
                    onClick={() => setKeepPlates(true)}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                      keepPlates
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/35'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#111318]">
                      ✓ Zachowuję tablice WX 4521K (66,50 zł)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#5A6270]">
                      0 wizyt w wydziale komunikacji · tymczasowy mDowód od ręki
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setKeepPlates(false)}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                      !keepPlates
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/35'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#111318]">
                      Zamawiam nowe tablice (160,00 zł)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#5A6270]">
                      Wniosek online, odbiór tablic w Urzędzie Dzielnicy Mokotów
                    </div>
                  </button>
                </div>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Podatek PCC-3 (2% do e-Urzędu Skarbowego)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      {fmtPln(pccTax)}
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Opłata komunikacyjna (Urząd m.st. Warszawy)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      {fmtPln(regFee)}
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#DC1B3F]">
                      Łącznie do opłacenia jednym BLIK-iem
                    </span>
                    <strong className="mt-0.5 block text-sm font-extrabold text-[#111318]">
                      {fmtPln(totalPay)}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setBiometricOpen(true)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-extrabold text-white shadow-xs hover:bg-emerald-800"
                >
                  <CreditCard className="h-4 w-4 shrink-0" />
                  <span>Podpisz i opłać pakiet (BLIK)</span>
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
                  <Car className="h-3.5 w-3.5" />
                  <span>POJAZD W TWOIM M-OBYWATELU</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Wszystkie 5 obowiązków załatwione przy masce auta!
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      1. Tymczasowy mDowód Rejestracyjny
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      ✓ Aktywny w portfelu (Toyota Corolla · WX 4521K)
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      2. E-Wniosek o rejestrację (art. 73aa PoRD — 30 dni)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      ✓ Złożony w Urzędzie m.st. Warszawy (REJ/WAW/2026/71204)
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      3. Deklaracja PCC-3 i podatek 2% (e-Urząd Skarbowy)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      ✓ Opłacono {fmtPln(pccTax)} (UPO: PCC3/2026/918204)
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      4. Polisa OC zbywcy (Warta S.A.)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-amber-900">
                      ✓ Ważna do 29.10.2026 — przypomnienie o braku auto-przedłużenia
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
          SCENARIUSZ 2 U KUPUJĄCEJ: WYKRYCIE 2 CZERWONYCH FLAG W CEPIK
          ==================================================================== */}
      {scenarioId === 'czerwona-flaga' && (
        <>
          {step === 0 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                Ochrona przed nieuczciwą ofertą
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Sprawdź Audi A4 (KR 9A412) przed wypłatą 68 000 zł
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                Kliknij na telefonie sprzedającego udostępnienie kodu QR, aby zweryfikować jego
                ustne zapewnienia z bazą CEPiK, UFG i Policji.
              </p>
            </div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-red-600 bg-white p-4 shadow-md">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>ALERT CEPIK: 2 CZERWONE FLAGI</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Dane z rejestrów przeczą deklaracji sprzedającego!
                </h3>

                <div className="mt-3 divide-y divide-red-200 rounded-2xl border border-red-200 bg-red-50/70 p-3 text-xs">
                  <div className="pb-2.5">
                    <span className="block text-[10.5px] font-bold text-red-900 uppercase">
                      Flaga 1 · Cofnięty licznik i szkoda istotna
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-red-950">
                      Kontrola Policji (02.2026): 218 900 km (deklarowane 134 000 km — różnica
                      -84 900 km!). W UFG szkoda istotna układu nośnego (11.2024).
                    </strong>
                  </div>
                  <div className="pt-2.5">
                    <span className="block text-[10.5px] font-bold text-red-900 uppercase">
                      Flaga 2 · Brakujący współwłaściciel pojazdu
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-red-950">
                      W CEPiK widnieje współwłaściciel (50%): Tomasz Mazur. Sam Piotr Mazur nie może
                      skutecznie sprzedać auta!
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#111318] px-4 py-3 text-xs font-extrabold text-white hover:bg-[#DC1B3F]"
                >
                  <Sparkles className="h-4 w-4 shrink-0" />
                  <span>Analiza prawna Bielik-11B</span>
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
                modelName="Bielik-11B"
                taskLabel="Ochrona prawna kupującego (Kodeks cywilny i PoRD)"
                text="Zablokowałem możliwość podpisania jednostronnej umowy. Zakup tego pojazdu bez podpisu współwłaściciela uniemożliwi jego rejestrację."
                bullets={[
                  {
                    label: 'Brak podpisu współwłaściciela (Art. 199 KC)',
                    value:
                      'Sprzedaż auta będącego współwłasnością wymaga zgody wszystkich współwłaścicieli. Wydział komunikacji odrzuci wniosek o rejestrację.',
                    tone: 'warn',
                  },
                  {
                    label: 'Podejrzenie ingerencji w drogomierz (Art. 306c KK)',
                    value:
                      'Odczyt na liczniku jest o 84 900 km niższy niż podczas ostatniej kontroli drogowej Policji.',
                    tone: 'warn',
                  },
                ]}
                legalCitation="Art. 199 Kodeksu cywilnego + Rejestr CEPiK"
                jsonPayload={{
                  vin_check: 'ALERT_ODOMETER_ROLLBACK_84900KM',
                  ufg_structural_damage: true,
                  co_owner_present: false,
                  contract_locked: true,
                }}
              />

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
              >
                <ShieldAlert className="h-4 w-4 shrink-0" />
                <span>Przejdź do decyzji ochronnej</span>
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
                  Decyzja przed wypłatą gotówki
                </span>
                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Jak chcesz postąpić z tą ofertą?
                </h3>

                <div className="mt-3 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-xs font-extrabold text-white shadow-xs hover:bg-red-700"
                  >
                    <Ban className="h-4 w-4 shrink-0" />
                    <span>Odrzuć zakup i zapisz raport</span>
                  </button>

                  <div className="rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] p-3 text-left text-[11px] text-[#5A6270]">
                    <div className="flex items-center gap-1.5 font-bold text-[#111318]">
                      <UserX className="h-3.5 w-3.5 shrink-0 text-[#DC1B3F]" />
                      <span>Zdalny podpis współwłaściciela:</span>
                    </div>
                    <p className="mt-1 leading-relaxed">
                      Gdyby problemem był tylko brak drugiego właściciela na miejscu, mObywatel
                      pozwala wysłać mu prośbę o zdalny podpis na jego telefon.
                    </p>
                  </div>
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
              <div className="rounded-3xl border-2 border-emerald-600 bg-white p-4 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-700 px-2.5 py-1 text-[10.5px] font-extrabold text-white uppercase">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>OCHRONA KUPUJĄCEJ ZADZIAŁAŁA</span>
                </div>
                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Ochroniłaś 68 000 zł przed wadliwym zakupem.
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                  Papierowa umowa spisana na masce nie ostrzegłaby Cię o drugim współwłaścicielu ani
                  o szkodzie istotnej. W mObywatelu weryfikacja rejestrów następuje przed podpisem.
                </p>
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
          SCENARIUSZ 3 U KUPUJĄCEJ: INTELIGENTNE REGUŁY PODATKOWE PCC-3
          ==================================================================== */}
      {scenarioId === 'zwolnienie-pcc' && (
        <>
          {step === 0 && (
            <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
              <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                Doradca podatkowy PCC-3
              </span>
              <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                Oczekiwanie na projekt umowy od sprzedającego
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
                Kliknij przycisk na lewym telefonie sprzedającego, aby przesłać projekt umowy z
                zaniżoną ceną <strong>22 000 zł</strong> i zobaczyć reakcję modelu{' '}
                <strong>Bielik-11B</strong>.
              </p>
            </div>
          )}

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="rounded-3xl border-2 border-amber-400 bg-white p-4 shadow-xs">
                <div className="inline-flex items-center gap-1.5 rounded-lg bg-amber-100 px-2.5 py-1 text-[10.5px] font-extrabold text-amber-950 uppercase">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-amber-700" />
                  <span>ALERT PODATKOWY · ZANIŻENIE 52%</span>
                </div>

                <div className="mt-2.5">
                  <AiStreamCard
                    modelName="Bielik-11B"
                    taskLabel="Weryfikacja wartości rynkowej PCC-3 (e-US)"
                    text="Wpisana w umowie kwota 22 000 zł jest o ponad połowę niższa od średniej wartości rynkowej tego rocznika (44 000 – 51 000 zł)."
                    bullets={[
                      {
                        label: 'Art. 6 ust. 1 pkt 1 i ust. 3 ustawy o PCC',
                        value:
                          'Podstawę opodatkowania stanowi wartość rynkowa, a nie cena z umowy. Urząd Skarbowy wezwie do dopłaty z odsetkami.',
                        tone: 'warn',
                      },
                      {
                        label: 'Ryzyko utraty rękojmi przez kupującego',
                        value:
                          'W razie awarii auta odzyskasz z tytułu odstąpienia od umowy tylko tyle, ile wpisano na umowie (22 000 zł zamiast 46 000 zł!).',
                        tone: 'warn',
                      },
                    ]}
                    legalCitation="Art. 6 ustawy o PCC"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#DC1B3F] px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-[#B81231]"
                >
                  <ReceiptText className="h-4 w-4 shrink-0" />
                  <span>Sprawdź zwolnienia i popraw cenę</span>
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
              <div className="rounded-3xl border border-[#E2E5EE] bg-white p-4 shadow-2xs">
                <span className="inline-block rounded-lg bg-[#FDECEE] px-2.5 py-1 text-[10.5px] font-extrabold text-[#DC1B3F] uppercase">
                  Kalkulator PCC-3 · e-Urząd Skarbowy
                </span>
                <h3 className="mt-2 text-sm font-extrabold text-[#111318]">
                  Przywrócono cenę rynkową 46 000 zł. Wybierz swój status:
                </h3>

                <div className="mt-2.5 space-y-2">
                  <button
                    type="button"
                    onClick={() => setPccVariant('standard')}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                      pccVariant === 'standard'
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/35'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#111318]">
                      1. Zakup od osoby prywatnej (PCC-3: 920 zł)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#5A6270]">
                      Stawka 2% od wartości rynkowej 46 000 zł · wysyłka do e-US
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPccVariant('niepelnosprawnosc')}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                      pccVariant === 'niepelnosprawnosc'
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/35'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#111318]">
                      2. Zakup przez osobę z niepełnosprawnością (0 zł)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#5A6270]">
                      Zwolnienie ustawowe z art. 8 pkt 6 ustawy o PCC
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPccVariant('faktura')}
                    className={`w-full rounded-xl border p-2.5 text-left transition-all ${
                      pccVariant === 'faktura'
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/35'
                        : 'border-[#E6E8EF] bg-[#F8F9FC]'
                    }`}
                  >
                    <div className="text-xs font-extrabold text-[#111318]">
                      3. Zakup na fakturę VAT lub do 1 000 zł (0 zł)
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#5A6270]">
                      Brak obowiązku podatku PCC-3 (art. 2 pkt 4 / art. 9 pkt 6)
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-xs font-extrabold text-white shadow-2xs hover:bg-emerald-800"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Zatwierdź deklarację PCC-3</span>
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
                  <FileCheck2 className="h-3.5 w-3.5" />
                  <span>UPO E-URZĄD SKARBOWY · PCC-3</span>
                </div>

                <h3 className="mt-2.5 text-sm font-extrabold text-[#111318]">
                  Obowiązek podatkowy rozliczony bezbłędnie
                </h3>

                <div className="mt-3 divide-y divide-[#E6E8EF] rounded-2xl border border-[#E2E5EE] bg-[#F8F9FC] p-3 text-xs">
                  <div className="pb-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Kwota na umowie (pełna ochrona rękojmi)
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      46 000,00 zł (zgodna z wartością rynkową)
                    </strong>
                  </div>
                  <div className="py-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Zastosowana reguła podatkowa PCC-3
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-emerald-800">
                      {pccVariant === 'standard' && 'Stawka 2% — opłacono 920,00 zł BLIK-iem'}
                      {pccVariant === 'niepelnosprawnosc' &&
                        '0,00 zł — zwolnienie ustawowe (art. 8 pkt 6 ustawy o PCC)'}
                      {pccVariant === 'faktura' &&
                        '0,00 zł — brak obowiązku PCC przy fakturze VAT / kwocie do 1000 zł'}
                    </strong>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10.5px] font-semibold text-[#5A6270]">
                      Urząd Skarbowy właściwy dla kupującej
                    </span>
                    <strong className="mt-0.5 block font-extrabold text-[#111318]">
                      Urząd Skarbowy Warszawa-Mokotów (termin 14 dni dotrzymany)
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

      {/* Modal autoryzacji biometrycznej dla Marty Kowalskiej */}
      <BiometricModal
        open={biometricOpen}
        actorName="Marta Kowalska"
        actionTitle={`Podpis umowy i opłata ${fmtPln(totalPay)}`}
        onSuccess={() => {
          setBiometricOpen(false);
          setStep(4);
        }}
        onCancel={() => setBiometricOpen(false)}
      />
    </div>
  );
};

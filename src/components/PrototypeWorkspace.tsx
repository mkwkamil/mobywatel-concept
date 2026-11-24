import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu,
  RotateCcw,
  Scale,
  Sparkles,
} from 'lucide-react';
import { ConceptSpec } from '../types/concepts';
import { useAppStore } from '../store/useAppStore';
import { PhoneFrame } from './PhoneFrame';
import { BLISCY_STEPS_BY_SCENARIO, StepMeta } from '../data/bliscyScenariosData';
import { AUTO_STEPS_BY_SCENARIO } from '../data/autoScenariosData';
import { PRYWATNOSC_STEPS_BY_SCENARIO } from '../data/prywatnoscScenariosData';
import {
  BliscyEwaScreen,
  BliscyHalinaScreen,
  BliscySharedState,
} from './prototypes/BliscyPrototype';
import {
  AutoBuyerScreen,
  AutoSellerScreen,
  AutoSharedState,
} from './prototypes/AutoPrototype';
import {
  PrywatnoscCitizenScreen,
  PrywatnoscSharedState,
  PrywatnoscVerifierScreen,
} from './prototypes/PrywatnoscPrototype';
import { polishSpeech } from '../utils/speech';

interface PrototypeWorkspaceProps {
  concept: ConceptSpec;
}

type SideInfoTab = 'ai' | 'metryki' | 'prawo';

export const PrototypeWorkspace: React.FC<PrototypeWorkspaceProps> = ({ concept }) => {
  const { setRoute, activeScenarioByConcept, setActiveScenario } = useAppStore();

  const [syncStep, setSyncStep] = useState<number>(0);
  const [infoTab, setInfoTab] = useState<SideInfoTab>('ai');

  // Stan szczegółowy dla Modułu 01 (Bliscy)
  const [extraLargeFont, setExtraLargeFont] = useState<boolean>(false);
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [visitMode, setVisitMode] = useState<'dom' | 'urzad'>('dom');
  const [photoAttached, setPhotoAttached] = useState<boolean>(true);
  const [notifyEwaSms, setNotifyEwaSms] = useState<boolean>(true);
  const [letterTab, setLetterTab] = useState<'prosty' | 'oryginal'>('prosty');

  // Stan szczegółowy dla Modułu 02 (Auto w 3 minuty)
  const [agreedPrice, setAgreedPrice] = useState<number>(46000);
  const [keepPlates, setKeepPlates] = useState<boolean>(true);
  const [pccVariant, setPccVariant] = useState<'standard' | 'niepelnosprawnosc' | 'faktura'>(
    'standard',
  );

  // Stan szczegółowy dla Modułu 03 (Tarcza Tożsamości)
  const [verifierType, setVerifierType] = useState<'sklep18' | 'hotel'>('sklep18');
  const [minimalMode, setMinimalMode] = useState<boolean>(true);
  const [passDurationMin, setPassDurationMin] = useState<15 | 5>(15);

  const activeScenarioId = activeScenarioByConcept[concept.id];
  const activeScenarioIndex = Math.max(
    0,
    concept.scenarios.findIndex((s) => s.id === activeScenarioId),
  );
  const activeScenario = concept.scenarios[activeScenarioIndex] ?? concept.scenarios[0];
  const nextScenario =
    activeScenarioIndex + 1 < concept.scenarios.length
      ? concept.scenarios[activeScenarioIndex + 1]
      : null;

  const activeSteps: StepMeta[] =
    concept.id === 'bliscy'
      ? (BLISCY_STEPS_BY_SCENARIO[activeScenario.id] ?? BLISCY_STEPS_BY_SCENARIO['wniosek-wspolny'])
      : concept.id === 'auto'
        ? (AUTO_STEPS_BY_SCENARIO[activeScenario.id] ?? AUTO_STEPS_BY_SCENARIO['pelny-zakup'])
        : (PRYWATNOSC_STEPS_BY_SCENARIO[activeScenario.id] ??
          PRYWATNOSC_STEPS_BY_SCENARIO['selektywne-dane']);

  const maxStep = activeSteps.length > 0 ? activeSteps.length - 1 : 4;
  const isFinalStep = syncStep >= maxStep;

  const handleSetStep = (nextStep: number) => {
    polishSpeech.stop();
    const clamped = Math.max(0, Math.min(nextStep, maxStep));
    setSyncStep(clamped);
  };

  const handleReset = () => {
    polishSpeech.stop();
    setSyncStep(0);
  };

  const handleGoToNextScenario = () => {
    polishSpeech.stop();
    if (nextScenario) {
      setActiveScenario(concept.id, nextScenario.id);
      setSyncStep(0);
    } else {
      setRoute('hub');
    }
  };

  const nextScenarioTitle = nextScenario
    ? `Scenariusz ${nextScenario.number}: ${nextScenario.title}`
    : null;

  const bliscySharedProps: BliscySharedState = {
    scenarioId: activeScenario.id,
    step: syncStep,
    setStep: handleSetStep,
    extraLargeFont,
    setExtraLargeFont,
    highContrast,
    setHighContrast,
    visitMode,
    setVisitMode,
    photoAttached,
    setPhotoAttached,
    notifyEwaSms,
    setNotifyEwaSms,
    letterTab,
    setLetterTab,
    nextScenarioTitle,
    onNextScenario: handleGoToNextScenario,
  };

  const autoSharedProps: AutoSharedState = {
    scenarioId: activeScenario.id,
    step: syncStep,
    setStep: handleSetStep,
    agreedPrice,
    setAgreedPrice,
    keepPlates,
    setKeepPlates,
    pccVariant,
    setPccVariant,
    nextScenarioTitle,
    onNextScenario: handleGoToNextScenario,
  };

  const prywatnoscSharedProps: PrywatnoscSharedState = {
    scenarioId: activeScenario.id,
    step: syncStep,
    setStep: handleSetStep,
    verifierType,
    setVerifierType,
    minimalMode,
    setMinimalMode,
    passDurationMin,
    setPassDurationMin,
    nextScenarioTitle,
    onNextScenario: handleGoToNextScenario,
  };

  return (
    <div className="flex min-h-screen flex-col xl:h-screen xl:flex-row xl:overflow-hidden">
      {/* ====================================================================
          LEWY PANEL BOCZNY (300px przy skali 92%): Powrót, Tytuł, Scenariusze + Od początku na dole
          ==================================================================== */}
      <aside className="flex w-full shrink-0 flex-col justify-between border-b border-[#E2E5EE] bg-white p-5 xl:h-full xl:w-[300px] xl:overflow-y-auto xl:border-r xl:border-b-0">
        <div className="space-y-5">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                polishSpeech.stop();
                setRoute('hub');
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#F3F4F8] px-4 py-2.5 text-[13px] font-bold text-[#111318] transition-colors hover:bg-[#E6E8EF]"
            >
              <ArrowLeft className="h-4 w-4" />
              Wróć do koncepcji
            </button>
          </div>

          <div className="border-b border-[#EFF1F6] pb-4">
            <span className="text-[11px] font-bold tracking-wider text-[#DC1B3F] uppercase">
              Moduł {concept.number} · {concept.categoryBadge}
            </span>
            <h1 className="mt-1 text-lg leading-snug font-extrabold text-[#111318]">
              {concept.title}
            </h1>
          </div>

          <div>
            <p className="mb-2.5 text-xs font-bold tracking-wider text-[#8C93A4] uppercase">
              Wybierz scenariusz
            </p>
            <div className="space-y-2.5">
              {concept.scenarios.map((scen) => {
                const isActive = scen.id === activeScenario.id;
                return (
                  <button
                    key={scen.id}
                    type="button"
                    onClick={() => {
                      polishSpeech.stop();
                      setActiveScenario(concept.id, scen.id);
                      setSyncStep(0);
                    }}
                    className={`w-full rounded-xl border p-3.5 text-left transition-all ${
                      isActive
                        ? 'border-[#DC1B3F] bg-[#FDECEE]/40 shadow-2xs'
                        : 'border-[#E6E8EF] bg-[#F9FAFC] hover:border-[#C5CAD8] hover:bg-white'
                    }`}
                  >
                    <span
                      className={`block text-[13.5px] font-extrabold ${
                        isActive ? 'text-[#DC1B3F]' : 'text-[#111318]'
                      }`}
                    >
                      {scen.number}. {scen.title}
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-[#5A6270]">{scen.subtitle}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dolna sekcja lewego panelu: Reset scenariusza + przejście do kolejnego */}
        <div className="mt-6 space-y-2.5 border-t border-[#EFF1F6] pt-4">
          {isFinalStep && (
            <button
              type="button"
              onClick={handleGoToNextScenario}
              className="flex w-full items-center justify-between rounded-xl bg-[#DC1B3F] px-4 py-3 text-left text-xs font-extrabold text-white shadow-2xs transition-colors hover:bg-[#B81231]"
            >
              <span>
                {nextScenario
                  ? `Następny: Scenariusz ${nextScenario.number}`
                  : 'Wróć do wyboru koncepcji'}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
          )}

          <button
            type="button"
            onClick={handleReset}
            disabled={syncStep === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#E6E8EF] bg-[#F8F9FC] px-4 py-2.5 text-xs font-bold text-[#5A6270] transition-colors hover:border-[#C5CAD8] hover:bg-white hover:text-[#111318] disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Rozpocznij scenariusz od początku</span>
          </button>
        </div>
      </aside>

      {/* ====================================================================
          ŚRODKOWA SCENA:
          1. U góry: wysepka wychodząca od górnej krawędzi (zaokrąglone dolne rogi)
          2. Niżej: 2 wyśrodkowane telefony
          ==================================================================== */}
      <main className="flex flex-1 flex-col items-center overflow-y-auto px-5">
        {/* Wysepka idąca od samej góry z zaokrąglonymi dolnymi rogami (szerokość 676px dopasowana do 2 telefonów w skali 92%) */}
        {activeSteps.length > 0 && (
          <div className="w-full max-w-[676px] shrink-0 rounded-b-[26px] border-x border-b border-[#E2E5EE] bg-white px-6 pt-3.5 pb-14 shadow-[0_10px_30px_rgb(17,19,24,0.04)]">
            <div className="flex w-full items-center justify-between gap-6">
              {/* Przycisk Wstecz */}
              <button
                type="button"
                disabled={syncStep === 0}
                onClick={() => handleSetStep(syncStep - 1)}
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-[#E2E5EE] bg-[#F8F9FC] px-4 text-xs font-bold text-[#111318] transition-colors hover:bg-[#ECEEF5] disabled:opacity-35"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Wstecz</span>
              </button>

              {/* Kropki numerowane połączone linią */}
              <div className="mx-auto flex max-w-[460px] flex-1 items-center">
                {activeSteps.map((st, idx) => {
                  const isCurrent = st.index === syncStep;
                  const isDone = st.index < syncStep;
                  const isLast = idx === activeSteps.length - 1;

                  return (
                    <React.Fragment key={st.index}>
                      <div className="relative flex flex-col items-center">
                        <button
                          type="button"
                          onClick={() => handleSetStep(st.index)}
                          title={`${st.index + 1}. ${st.shortTitle}`}
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold transition-all ${
                            isCurrent
                              ? 'scale-110 bg-[#111318] text-white shadow-sm ring-4 ring-[#111318]/10'
                              : isDone
                                ? 'bg-[#DC1B3F] text-white hover:bg-[#B81231]'
                                : 'border-2 border-[#D5D9E4] bg-white text-[#5A6270] hover:border-[#111318] hover:text-[#111318]'
                          }`}
                        >
                          {isDone ? <Check className="h-4 w-4 stroke-[2.5]" /> : st.index + 1}
                        </button>

                        {/* Wyśrodkowany napis bezpośrednio pod aktywną kropką (bez duplikowania numeru) */}
                        {isCurrent && (
                          <div className="absolute top-11 left-1/2 -translate-x-1/2 whitespace-nowrap">
                            <span className="inline-block rounded-lg bg-[#111318] px-3 py-1 text-xs font-bold text-white shadow-2xs">
                              {st.shortTitle}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Linia łącząca kropki */}
                      {!isLast && (
                        <div className="mx-2 h-[2px] flex-1 rounded-full bg-[#DCE0EC]">
                          <div
                            className={`h-full rounded-full bg-[#DC1B3F] transition-all duration-300 ${
                              isDone ? 'w-full' : 'w-0'
                            }`}
                          />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Przycisk Dalej — w kroku 5/5 przechodzi do następnego scenariusza */}
              <button
                type="button"
                onClick={() => {
                  if (!isFinalStep) {
                    handleSetStep(syncStep + 1);
                  } else {
                    handleGoToNextScenario();
                  }
                }}
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl bg-[#DC1B3F] px-4 text-xs font-bold text-white shadow-2xs transition-colors hover:bg-[#B81231]"
              >
                <span>Dalej</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Obszar z 2 wyśrodkowanymi telefonami (mieszczą się w całości w pionie i poziomie przy domyślnym 100%) */}
        <div className="flex flex-1 items-center justify-center pt-5 pb-6">
          <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-9">
            <PhoneFrame
              actorName={concept.dualScreenSetup.leftActor}
              actorRole={concept.dualScreenSetup.leftRole}
              modeBadge={
                concept.id === 'bliscy' ? 'Tryb Senior AAA' : concept.dualScreenSetup.leftModeLabel
              }
              variant={concept.id === 'bliscy' ? 'senior' : 'standard'}
            >
              {concept.id === 'bliscy' ? (
                <BliscyHalinaScreen {...bliscySharedProps} />
              ) : concept.id === 'auto' ? (
                <AutoSellerScreen {...autoSharedProps} />
              ) : (
                <PrywatnoscCitizenScreen {...prywatnoscSharedProps} />
              )}
            </PhoneFrame>

            <PhoneFrame
              actorName={concept.dualScreenSetup.rightActor}
              actorRole={concept.dualScreenSetup.rightRole}
              modeBadge={
                concept.id === 'bliscy'
                  ? 'Widok standardowy'
                  : concept.dualScreenSetup.rightModeLabel
              }
              variant="standard"
            >
              {concept.id === 'bliscy' ? (
                <BliscyEwaScreen {...bliscySharedProps} />
              ) : concept.id === 'auto' ? (
                <AutoBuyerScreen {...autoSharedProps} />
              ) : (
                <PrywatnoscVerifierScreen {...prywatnoscSharedProps} />
              )}
            </PhoneFrame>
          </div>
        </div>
      </main>

      {/* ====================================================================
          PRAWY PANEL BOCZNY (280px przy skali 92%)
          ==================================================================== */}
      <aside className="flex w-full shrink-0 flex-col border-t border-[#E2E5EE] bg-[#F8F9FC] p-5 xl:h-full xl:w-[280px] xl:overflow-y-auto xl:border-t-0 xl:border-l">
        <div className="mb-5">
          <p className="mb-2.5 text-xs font-bold tracking-wider text-[#8C93A4] uppercase">
            Kontekst koncepcji
          </p>
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-[#EAECEF] p-1">
            {[
              { id: 'ai', label: 'AI i Krok' },
              { id: 'metryki', label: 'Przewaga' },
              { id: 'prawo', label: 'Prawo' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setInfoTab(t.id as SideInfoTab)}
                className={`rounded-lg py-2 text-xs font-bold transition-all ${
                  infoTab === t.id
                    ? 'bg-white text-[#111318] shadow-2xs'
                    : 'text-[#5A6270] hover:text-[#111318]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {infoTab === 'ai' && (
          <div className="space-y-3.5 text-[13px]">
            {activeSteps[syncStep] && (
              <div className="rounded-xl border border-[#E6E8EF] bg-white p-4">
                <div className="mb-1.5 text-[11px] font-bold text-[#8C93A4] uppercase">
                  Co dzieje się w tym kroku
                </div>
                <p className="leading-relaxed font-medium text-[#2C323D]">
                  {activeSteps[syncStep].description}
                </p>
              </div>
            )}

            <div className="rounded-xl border border-[#E6E8EF] bg-white p-4">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold text-[#111318]">
                <Cpu className="h-4 w-4 shrink-0 text-[#5A6270]" />
                <span>{concept.polishAiRole.model}</span>
              </div>
              <p className="leading-relaxed text-[#5A6270]">{concept.polishAiRole.task}</p>
              <div className="mt-3 border-t border-[#EFF1F6] pt-3 text-xs leading-relaxed text-[#5A6270]">
                <strong className="text-[#111318]">Chmura COI:</strong>{' '}
                {concept.polishAiRole.whySovereign}
              </div>
            </div>
          </div>
        )}

        {infoTab === 'metryki' && (
          <div className="space-y-3 text-[13px]">
            {concept.metrics.map((m) => (
              <div key={m.label} className="rounded-xl border border-[#E6E8EF] bg-white p-4">
                <div className="mb-2 flex items-center gap-1.5 font-bold text-[#111318]">
                  <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#5A6270]" />
                  <span>{m.label}</span>
                </div>
                <div className="space-y-2 border-t border-[#EFF1F6] pt-2.5 text-xs">
                  <div>
                    <span className="block text-[10.5px] font-semibold text-[#8C93A4] uppercase">
                      Prototyp bazowy
                    </span>
                    <span className="mt-0.5 block font-medium text-[#5A6270]">{m.baseline}</span>
                  </div>
                  <div className="pt-1">
                    <span className="block text-[10.5px] font-semibold text-[#DC1B3F] uppercase">
                      Nasza wersja
                    </span>
                    <span className="mt-0.5 block font-bold text-[#111318]">{m.ours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {infoTab === 'prawo' && (
          <div className="rounded-xl border border-[#E6E8EF] bg-white p-4 text-[13px]">
            <div className="mb-3 flex items-center gap-2 font-bold text-[#111318]">
              <Scale className="h-4 w-4 text-[#5A6270]" />
              <span>Podstawa prawna</span>
            </div>
            <ul className="space-y-3">
              {concept.legalBasis.map((law) => (
                <li
                  key={law}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-[#5A6270]"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#111318]" />
                  <span>{law}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Code2, Cpu, ShieldCheck, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { polishSpeech } from '../../utils/speech';

interface AiStreamCardProps {
  modelName: string;
  taskLabel: string;
  text: string;
  bullets?: { label: string; value: string; tone?: 'normal' | 'good' | 'warn' }[];
  legalCitation?: string;
  jsonPayload?: Record<string, unknown>;
  seniorScale?: boolean;
  highContrast?: boolean;
}

export const AiStreamCard: React.FC<AiStreamCardProps> = ({
  modelName,
  taskLabel,
  text,
  bullets,
  legalCitation,
  jsonPayload,
  seniorScale = false,
  highContrast = false,
}) => {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showJson, setShowJson] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    setVisibleChars(0);
    const step = Math.max(3, Math.ceil(text.length / 26));
    const interval = window.setInterval(() => {
      setVisibleChars((prev) => {
        if (prev + step >= text.length) {
          window.clearInterval(interval);
          return text.length;
        }
        return prev + step;
      });
    }, 22);
    return () => window.clearInterval(interval);
  }, [text]);

  useEffect(() => {
    return () => polishSpeech.stop();
  }, []);

  const isStreaming = visibleChars < text.length;

  const handleToggleSpeech = () => {
    if (isSpeaking) {
      polishSpeech.stop();
      setIsSpeaking(false);
    } else {
      const fullSpeechText = [
        text,
        ...(bullets?.map((b) => `${b.label}: ${b.value}`) ?? []),
      ].join('. ');
      polishSpeech.speak(fullSpeechText, setIsSpeaking);
    }
  };

  return (
    <div
      className={`rounded-2xl border p-3.5 transition-all ${
        highContrast
          ? 'border-2 border-yellow-400 bg-black text-yellow-200'
          : 'border-[#E2E5EE] bg-[#F9FAFC] text-[#111318]'
      }`}
    >
      {/* Górny wiersz: tylko krótki badge modelu po lewej i przycisk głosu po prawej (zero nachodzenia) */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-extrabold tracking-wide uppercase ${
            highContrast ? 'bg-yellow-400 text-black' : 'bg-[#DC1B3F] text-white'
          }`}
        >
          <Cpu className="h-3 w-3" />
          {modelName}
        </span>

        <button
          type="button"
          onClick={handleToggleSpeech}
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors ${
            isSpeaking
              ? 'bg-[#DC1B3F] text-white'
              : highContrast
                ? 'border border-yellow-400 bg-zinc-900 text-yellow-300'
                : 'bg-[#111318] text-white hover:bg-[#DC1B3F]'
          }`}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="h-3.5 w-3.5 animate-pulse" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Volume2 className="h-3.5 w-3.5 text-[#FF8FA3]" />
              <span>Czytaj na głos</span>
            </>
          )}
        </button>
      </div>

      {/* Opis zadania w osobnej linii pod spodem */}
      <p
        className={`mt-1.5 mb-2 text-[11px] font-semibold ${
          highContrast ? 'text-yellow-300' : 'text-[#5A6270]'
        }`}
      >
        {taskLabel}
      </p>

      {/* Strumieniowana treść główna */}
      <p
        className={`leading-relaxed font-bold ${
          seniorScale ? 'text-[16px]' : 'text-[13.5px]'
        } ${highContrast ? 'text-white' : 'text-[#111318]'}`}
      >
        {text.slice(0, visibleChars)}
        {isStreaming && (
          <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse rounded-xs bg-[#DC1B3F]" />
        )}
      </p>

      {/* Wypunktowane fakty: nagłówek u góry, wynik pod spodem */}
      {bullets && bullets.length > 0 && !isStreaming && (
        <div className="mt-3 space-y-2">
          {bullets.map((b) => (
            <div
              key={b.label}
              className={`rounded-xl border p-2.5 text-left ${
                highContrast
                  ? 'border-yellow-400/60 bg-zinc-900'
                  : b.tone === 'warn'
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-[#E6E8EF] bg-white'
              }`}
            >
              <div
                className={`text-[10.5px] font-bold ${
                  highContrast
                    ? 'text-yellow-300'
                    : b.tone === 'good'
                      ? 'text-emerald-700'
                      : b.tone === 'warn'
                        ? 'text-amber-900'
                        : 'text-[#5A6270]'
                }`}
              >
                {b.label}
              </div>
              <div
                className={`mt-0.5 font-extrabold ${
                  seniorScale ? 'text-[14.5px]' : 'text-[12.5px]'
                } ${highContrast ? 'text-white' : 'text-[#111318]'}`}
              >
                {b.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dolny pasek: źródło gov.pl + podgląd JSON (bez ucinania źródła prawnego) */}
      <div className="mt-3 flex items-start justify-between gap-2 border-t border-black/10 pt-2 text-[10px]">
        {legalCitation ? (
          <span
            className={`inline-flex items-start gap-1 leading-snug font-medium ${
              highContrast ? 'text-yellow-300' : 'text-[#5A6270]'
            }`}
          >
            <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-emerald-600" />
            <span>{legalCitation}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[#5A6270]">
            <Sparkles className="h-3 w-3 text-[#DC1B3F]" />
            Chmura rządowa COI
          </span>
        )}

        {jsonPayload && (
          <button
            type="button"
            onClick={() => setShowJson((s) => !s)}
            className={`inline-flex shrink-0 items-center gap-1 font-bold underline ${
              highContrast ? 'text-yellow-300' : 'text-[#DC1B3F]'
            }`}
          >
            <Code2 className="h-3 w-3" />
            {showJson ? 'Ukryj JSON' : 'JSON'}
          </button>
        )}
      </div>

      {showJson && jsonPayload && (
        <pre className="mt-2 overflow-x-auto rounded-xl bg-[#111318] p-2.5 text-[10px] leading-relaxed text-emerald-300">
          {JSON.stringify(jsonPayload, null, 2)}
        </pre>
      )}
    </div>
  );
};

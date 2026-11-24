import React from 'react';
import { BatteryCharging, Signal, Wifi } from 'lucide-react';

interface PhoneFrameProps {
  actorName: string;
  actorRole: string;
  modeBadge: string;
  variant?: 'standard' | 'senior' | 'terminal';
  children: React.ReactNode;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({
  actorName,
  actorRole,
  modeBadge,
  variant = 'standard',
  children,
}) => {
  const isSenior = variant === 'senior';
  const isTerminal = variant === 'terminal';

  return (
    <div className="flex w-[348px] shrink-0 flex-col items-center">
      {/* Czytelna, nieucinająca tekstu etykieta nad telefonem */}
      <div className="mb-3 flex w-full items-center justify-between gap-2 px-1">
        <div>
          <p className="text-[13px] font-extrabold text-[#111318]">{actorName}</p>
          <p className="text-[11px] font-medium text-[#5A6270]">{actorRole}</p>
        </div>
        <span
          className={`shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold ${
            isSenior
              ? 'bg-amber-100/90 text-amber-950 ring-1 ring-amber-300/60'
              : isTerminal
                ? 'bg-slate-800 text-white'
                : 'bg-white text-[#373E4C] ring-1 ring-[#E2E5EE]'
          }`}
        >
          {modeBadge}
        </span>
      </div>

      {/* Obudowa smartfona o stałej szerokości 348px i wysokości 706px */}
      <div
        className={`relative flex h-[706px] w-[348px] shrink-0 flex-col overflow-hidden rounded-[44px] border-[8px] shadow-[0_24px_60px_rgb(17,19,24,0.12)] ${
          isTerminal
            ? 'border-[#1E2430] bg-[#0F141D] text-white'
            : 'border-[#1A1D24] bg-[#F4F5F8] text-[#111318]'
        }`}
      >
        {/* Dynamic Island + pasek stanu */}
        <div
          className={`relative flex h-10 shrink-0 items-center justify-between px-7 pt-2 text-[11px] font-semibold ${
            isTerminal ? 'text-white/80' : 'text-[#111318]'
          }`}
        >
          <span>12:45</span>
          <div className="h-5 w-24 rounded-full bg-black" />
          <div className="flex items-center gap-1.5">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <BatteryCharging className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Wnętrze ekranu z wewnętrznym przewijaniem */}
        <div className="phone-scroll flex-1 overflow-y-auto px-3.5 pt-2 pb-5">{children}</div>

        {/* Dolny wskaźnik gestów */}
        <div className="flex h-6 shrink-0 items-center justify-center">
          <div
            className={`h-1 w-28 rounded-full ${isTerminal ? 'bg-white/25' : 'bg-black/20'}`}
          />
        </div>
      </div>
    </div>
  );
};

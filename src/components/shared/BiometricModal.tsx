import React, { useEffect, useState } from 'react';
import { CheckCircle2, Fingerprint, Lock } from 'lucide-react';

interface BiometricModalProps {
  open: boolean;
  actorName: string;
  actionTitle: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const BiometricModal: React.FC<BiometricModalProps> = ({
  open,
  actorName,
  actionTitle,
  onSuccess,
  onCancel,
}) => {
  const [stage, setStage] = useState<'scanning' | 'verified'>('scanning');

  useEffect(() => {
    if (!open) {
      setStage('scanning');
      return;
    }
    const t1 = window.setTimeout(() => {
      setStage('verified');
    }, 950);
    const t2 = window.setTimeout(() => {
      onSuccess();
    }, 1650);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [open, onSuccess]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#111318]/60 p-4 backdrop-blur-xs">
      <div className="w-full max-w-[300px] rounded-[28px] border border-[#E2E5EE] bg-white p-5 text-[#111318] shadow-2xl">
        {/* Górna część: ikona biometrii i status */}
        <div className="flex flex-col items-center text-center">
          <div
            className={`mb-3.5 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors ${
              stage === 'scanning'
                ? 'bg-[#FDECEE] text-[#DC1B3F] ring-4 ring-[#FDECEE]/60'
                : 'bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50'
            }`}
          >
            {stage === 'scanning' ? (
              <Fingerprint className="h-8 w-8 animate-pulse" />
            ) : (
              <CheckCircle2 className="h-8 w-8" />
            )}
          </div>

          <span className="rounded-md bg-[#F3F4F8] px-2.5 py-0.5 text-[10px] font-extrabold tracking-wider text-[#5A6270] uppercase">
            Autoryzacja · {actorName}
          </span>

          <h3 className="mt-2 text-[15px] leading-snug font-extrabold text-[#111318]">
            {actionTitle}
          </h3>

          <p className="mt-1.5 text-xs leading-relaxed text-[#5A6270]">
            {stage === 'scanning'
              ? 'Trwa weryfikacja biometryczna Face ID / PIN...'
              : 'Tożsamość potwierdzona. Składanie podpisu...'}
          </p>
        </div>

        {/* Dolny pasek: kłódka po lewej i przycisk Anuluj po prawej — idealnie w jednej linii */}
        <div className="mt-5 flex items-center justify-between gap-2 border-t border-[#EFF1F6] pt-3.5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#5A6270]">
            <Lock className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
            <span>Klucz w telefonie</span>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="shrink-0 rounded-lg bg-[#F3F4F8] px-3 py-1.5 text-xs font-bold text-[#111318] transition-colors hover:bg-[#E6E8EF]"
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

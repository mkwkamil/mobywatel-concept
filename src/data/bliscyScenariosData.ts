export interface StepMeta {
  index: number;
  shortTitle: string;
  actorFocus: 'halina' | 'ewa' | 'both';
  description: string;
}

export const BLISCY_STEPS_BY_SCENARIO: Record<string, StepMeta[]> = {
  'wniosek-wspolny': [
    {
      index: 0,
      shortTitle: 'Alert u seniorki',
      actorFocus: 'halina',
      description: 'Pani Halina widzi na prostym pulpicie AAA informację o dowodzie i jednym przyciskiem prosi córkę Ewę o pomoc.',
    },
    {
      index: 1,
      shortTitle: 'Powiadomienie u córki',
      actorFocus: 'ewa',
      description: 'Ewa odbiera w swoim mObywatelu prośbę o asystę bez dostępu do haseł i podpisu mamy.',
    },
    {
      index: 2,
      shortTitle: 'Ewa wypełnia formularz',
      actorFocus: 'ewa',
      description: 'Ewa konfiguruje urzędowe opcje (w tym bezpłatny dojazd urzędnika do domu seniora wg art. 26 ustawy) i odsyła szkic.',
    },
    {
      index: 3,
      shortTitle: 'Podsumowanie i zgoda',
      actorFocus: 'halina',
      description: 'PLLuM-12B tłumaczy formularz na 3 proste zdania z polskim lektorem. Pani Halina osobiście podejmuje decyzję.',
    },
    {
      index: 4,
      shortTitle: 'Podpis i wspólne UPO',
      actorFocus: 'both',
      description: 'Po osobistej autoryzacji Pani Haliny wniosek trafia do Urzędu Miasta Lublin, a obie strony widzą oficjalne UPO.',
    },
  ],
  'tarcza-oszust': [
    {
      index: 0,
      shortTitle: 'Telefon od oszusta',
      actorFocus: 'halina',
      description: 'Oszust podszywa się pod policjanta/bank (+48 22 100 49 12) i wywiera presję, by natychmiast odblokować PESEL.',
    },
    {
      index: 1,
      shortTitle: 'Przechwycenie przez Tarczę',
      actorFocus: 'halina',
      description: 'Przy próbie zdjęcia blokady PESEL podczas rozmowy Bielik-11B weryfikuje rejestr połączeń urzędowych i wyświetla ostrzeżenie.',
    },
    {
      index: 2,
      shortTitle: 'Bezpiecznik 60 min + Alarm',
      actorFocus: 'both',
      description: 'System nakłada 60-minutowy bufor chłodzenia na odblokowanie PESEL i w tej samej sekundzie wysyła cichy alarm do córki Ewy.',
    },
    {
      index: 3,
      shortTitle: 'Interwencja Ewy i CERT',
      actorFocus: 'ewa',
      description: 'Córka Ewa ze swojego telefonu blokuje próbę wyłudzenia, dzwoni do mamy i jednym kliknięciem zgłasza spoofing do CERT Polska.',
    },
    {
      index: 4,
      shortTitle: 'Pełna ochrona PESEL',
      actorFocus: 'both',
      description: 'PESEL Pani Haliny pozostaje zastrzeżony, a fałszywy numer trafia do bazy incydentów NASK / CERT Polska.',
    },
  ],
  'pismo-po-ludzku': [
    {
      index: 0,
      shortTitle: 'Trudna decyzja z ZUS',
      actorFocus: 'halina',
      description: 'Do skrzynki e-Doręczeń wpływa wielozdaniowa decyzja ZUS pełna podstaw prawnych i odniesień ustawowych.',
    },
    {
      index: 1,
      shortTitle: 'Wyjaśnienie prostym językiem',
      actorFocus: 'halina',
      description: 'PLLuM-12B przekłada urzędowy żargon na 3 czytelne karty (Co to znaczy / Czy trzeba płacić / Kiedy przelew) i czyta je na głos.',
    },
    {
      index: 2,
      shortTitle: 'Przekazanie e-Recept córce',
      actorFocus: 'halina',
      description: 'Pani Halina widzi przypomnienie o lekach (Polpril, Atoris) i jednym kliknięciem prosi córkę Ewę o ich wykupienie.',
    },
    {
      index: 3,
      shortTitle: 'Kod kreskowy u Ewy w aptece',
      actorFocus: 'ewa',
      description: 'Ewa otrzymuje gotową kartę apteczną z kodem kreskowym 9182 i uprawnieniem 65+ (S — 0,00 zł) do okazania farmaceucie.',
    },
    {
      index: 4,
      shortTitle: 'Rozpiska dawkowania',
      actorFocus: 'both',
      description: 'Po wykupieniu leków Pani Halina widzi na swoim ekranie prostą kartę dawkowania Rano / Wieczór dużym drukiem.',
    },
  ],
};

export const ZUS_ORIGINAL_LEGAL_TEXT =
  'DECYZJA ZNAK: ENP/04/02918442/2026. Zakład Ubezpieczeń Społecznych Oddział w Lublinie, działając z urzędu na podstawie art. 75 ust. 1, art. 85 ust. 2 oraz art. 118 ust. 1a ustawy z dnia 17 grudnia 1998 r. o emeryturach i rentach z Funduszu Ubezpieczeń Społecznych (Dz.U. z 2025 r. poz. 1120 ze zm.), po ustaleniu spełnienia przesłanki wieku określonej w art. 75 ust. 1 in fine, przyznaje ubezpieczonej Halinie Kamińskiej (PESEL 42011907708) dodatek pielęgnacyjny w kwocie 348,22 zł miesięcznie. Świadczenie podlega wypłacie łącznie ze świadczeniem emerytalnym w terminie płatności przypadającym na 10. dzień każdego miesiąca, bez potrąceń zaliczki na podatek dochodowy zgodnie z art. 21 ust. 1 pkt 8 ustawy o PIT.';

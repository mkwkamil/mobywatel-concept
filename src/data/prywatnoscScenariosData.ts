import { StepMeta } from './bliscyScenariosData';

export const PRYWATNOSC_STEPS_BY_SCENARIO: Record<string, StepMeta[]> = {
  'selektywne-dane': [
    {
      index: 0,
      shortTitle: 'Żądanie danych z terminala',
      actorFocus: 'both',
      description:
        'Terminal w recepcji hotelu lub przy kasie sklepowej (18+) wyświetla kod QR i domyślnie prosi o pełny zestaw danych z mDowodu wraz z numerem PESEL.',
    },
    {
      index: 1,
      shortTitle: 'Audyt podstawy prawnej (PLLuM)',
      actorFocus: 'halina',
      description:
        'PLLuM-12B oraz wyszukiwarka OPI PIB oceniają podstawę prawną żądania wg RODO i ustawy o dowodach osobistych, wykrywając 3 nadmiarowe pola.',
    },
    {
      index: 2,
      shortTitle: 'Odcięcie nadmiarowych pól',
      actorFocus: 'halina',
      description:
        'Obywatel jednym przełącznikiem wybiera tryb „Tylko wymagane minimum” — odcinając numer PESEL, adres zameldowania i datę urodzenia.',
    },
    {
      index: 3,
      shortTitle: 'Podpis kryptograficzny SD-JWT',
      actorFocus: 'halina',
      description:
        'Telefon podpisuje jednorazowy dowód selektywnego ujawnienia atrybutu (SD-JWT zgodny z eIDAS 2.0 / EUDI Wallet) bez przekazywania dokumentu.',
    },
    {
      index: 4,
      shortTitle: 'Potwierdzenie bez ujawniania PESEL',
      actorFocus: 'both',
      description:
        'Terminal weryfikatora otrzymuje kryptograficzne potwierdzenie („Ukończone 18 lat: TAK” lub samą tożsamość), a PESEL i adres pozostają ukryte.',
    },
  ],
  'przepustka-pesel': [
    {
      index: 0,
      shortTitle: 'Wniosek o raty przy blokadzie PESEL',
      actorFocus: 'both',
      description:
        'Obywatel ma stale zastrzeżony PESEL, a składa wniosek ratalny w mBanku. Dziś musiałby odblokować PESEL globalnie dla całego kraju.',
    },
    {
      index: 1,
      shortTitle: 'Celowana przepustka dla 1 banku',
      actorFocus: 'halina',
      description:
        'Zamiast zdejmować ochronę globalnie, obywatel wystawia jednorazową przepustkę ważną tylko 15 minut i wyłącznie dla mBank S.A. (po numerze KRS).',
    },
    {
      index: 2,
      shortTitle: 'Weryfikacja podmiotu w KNF/KRS',
      actorFocus: 'halina',
      description:
        'PLLuM-12B potwierdza tożsamość instytucji finansowej w rejestrze KNF i aktywuje celowane okno weryfikacyjne.',
    },
    {
      index: 3,
      shortTitle: 'Test: Bank vs Parabank na żywo',
      actorFocus: 'ewa',
      description:
        'W tej samej minucie mBank otrzymuje jednorazową zgodę, natomiast równoległe zapytanie z parabanku zostaje automatycznie odrzucone.',
    },
    {
      index: 4,
      shortTitle: 'Automatyczne zamknięcie przepustki',
      actorFocus: 'both',
      description:
        'Natychmiast po jednym odpytaniu przez mBank przepustka wygasa przed czasem — 0 sekund globalnej luki bezpieczeństwa.',
    },
  ],
  'radar-danych': [
    {
      index: 0,
      shortTitle: 'Żywy Radar Rejestrów',
      actorFocus: 'halina',
      description:
        'Obywatel przegląda pełną oś czasu zapytań do swoich danych w rejestrach państwowych i zauważa podejrzaną aktywność oraz nowy SMS.',
    },
    {
      index: 1,
      shortTitle: 'Podejrzany SMS o dopłacie PIT',
      actorFocus: 'ewa',
      description:
        'Na telefon przychodzi wiadomość SMS podszywająca się pod mObywatela / Urząd Skarbowy z linkiem do rzekomej dopłaty 14,80 zł.',
    },
    {
      index: 2,
      shortTitle: 'Skaner PLLuM + CERT Polska',
      actorFocus: 'halina',
      description:
        'PLLuM-12B analizuje treść wiadomości i krzyżuje domenę z bazą NASK / CERT Polska, wykrywając świeżo zarejestrowany phishing.',
    },
    {
      index: 3,
      shortTitle: 'Blokada domeny i zgłoszenie 8080',
      actorFocus: 'halina',
      description:
        'Obywatel jednym kliknięciem przekazuje złośliwą domenę oraz treść SMS-a bezpośrednio do systemu CERT Polska (NASK).',
    },
    {
      index: 4,
      shortTitle: 'Ochrona w całej sieci RP',
      actorFocus: 'both',
      description:
        'Fałszywa domena trafia na ogólnopolską Listę Ostrzeżeń CERT Polska, blokując atak dla wszystkich obywateli w kraju.',
    },
  ],
};

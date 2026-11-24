import { ConceptSpec } from '../types/concepts';

export const CONCEPTS: ConceptSpec[] = [
  {
    id: 'bliscy',
    number: '01',
    categoryBadge: 'Dla seniorów i dostępność',
    shortTitle: 'Bliscy i Tarcza Seniora',
    title: 'mObywatel Bliscy i Tarcza Seniora',
    subtitle:
      'Współdzielona asysta rodzinna „Wypełnij ze mną, nie za mnie”, radykalnie prosty interfejs AAA oraz ochrona przed oszustwem metodą „na wnuczka i policjanta”.',
    heroPromise: 'Zero oddawania haseł na kartce. Pełna podmiotowość seniora i spokój bliskich.',
    targetAudience: '9,8 mln osób 60+ w Polsce oraz ich dorosłe dzieci i opiekunowie',
    baselineGap:
      'W prototypie bazowym seniorka (p. Halina, 84 l.) nie ma własnego widoku aplikacji — istnieje jedynie jako statyczny wpis upoważnienia IKP na koncie córki. Brakuje trybu seniora, współdzielonego wypełniania wniosków i ochrony przed socjotechniką.',
    ourBreakthrough:
      'Dwa zsynchronizowane telefony: bliska osoba przygotowuje trudny formularz urzędowy zdalnie ze swojego konta, ale nie może go wysłać. Senior otrzymuje 3-zdaniowe podsumowanie prostym językiem z lektorem i zatwierdza je jednym przyciskiem na własnym ekranie.',
    polishAiRole: {
      model: 'PLLuM-12B / Bielik-11B + Polski TTS',
      task: 'Tłumaczenie zawiłych pism z ZUS/US do standardu prostego języka (B1) oraz detekcja wzorców socjotechnicznych przy próbie nagłego odblokowania PESEL.',
      whySovereign:
        'Treść pism urzędowych i danych zdrowotnych nigdy nie opuszcza polskiej jurysdykcji (serwery COI). Polskie modele najlepiej rozumieją krajową terminologię administracyjną.',
    },
    legalBasis: [
      'Ustawa o dostępności cyfrowej (WCAG 2.2 AAA)',
      'Osobiste złożenie oświadczenia woli przez seniora (brak konieczności pełnomocnictwa szczególnego)',
      'Ustawa z 7 lipca 2023 r. o zmianie niektórych ustaw w celu ograniczania skutków kradzieży tożsamości (PESEL)',
    ],
    dualScreenSetup: {
      leftActor: 'Halina Kamińska (84 l.)',
      leftRole: 'Seniorka · Lublin',
      leftModeLabel: 'Tryb Senior AAA · Duży druk + Głos',
      rightActor: 'Ewa Nowak (57 l.)',
      rightRole: 'Córka · Asystent bliskiego',
      rightModeLabel: 'Widok standardowy mObywatel',
    },
    metrics: [
      {
        label: 'Przekazywanie haseł i loginów',
        baseline: 'Powszechne (niebezpieczne)',
        ours: '0 — osobna autoryzacja seniora',
      },
      {
        label: 'Elementy na ekranie seniora',
        baseline: '22+ ikony, stos kart i czat',
        ours: 'Maksymalnie 3 wielkie akcje (AAA)',
      },
      {
        label: 'Ochrona przy telefonie oszusta',
        baseline: 'Natychmiastowe zdjęcie blokady PESEL',
        ours: 'Weryfikacja połączenia + bufor 60 min + alert',
      },
    ],
    scenarios: [
      {
        id: 'wniosek-wspolny',
        number: '1',
        title: 'Wypełnij ze mną, nie za mnie',
        subtitle: 'Córka przygotowuje wniosek o nowy dowód / sprawę z ZUS, mama zatwierdza jednym przyciskiem',
        durationLabel: '35 sek.',
        stepsCount: '3 kroki seniora',
      },
      {
        id: 'tarcza-oszust',
        number: '2',
        title: 'Tarcza anty-socjotechniczna („na policjanta”)',
        subtitle: 'Weryfikacja rzekomego telefonu z urzędu i bezpieczna blokada odblokowania PESEL z alertem do córki',
        durationLabel: '25 sek.',
        stepsCount: 'Ochrona w czasie rzeczywistym',
      },
      {
        id: 'pismo-po-ludzku',
        number: '3',
        title: 'Pismo urzędowe prostym językiem',
        subtitle: 'Automatyczne streszczenie decyzji administracyjnej w 3 jasnych punktach z odsłuchem głosowym i obsługą e-Recept',
        durationLabel: '20 sek.',
        stepsCount: '1 stuknięcie',
      },
    ],
    keyFeatures: [
      'Tryb Seniora WCAG 2.2 AAA (kontrast >7:1, powiększona typografia, odsłuch głosowy)',
      'Zdalne przygotowanie roboczego wniosku przez bliską osobę bez dostępu do podpisu seniora',
      'Weryfikator „Czy dzwoni do mnie prawdziwy urzędnik / policjant?” w czasie rzeczywistym',
      'Bezpieczny bezpiecznik czasowy przy cofaniu zastrzeżenia numeru PESEL przez seniora',
    ],
  },
  {
    id: 'auto',
    number: '02',
    categoryBadge: 'Jedna sprawa od początku do końca',
    shortTitle: 'Auto w 3 minuty przy masce',
    title: 'Kupno i E-Rejestracja Auta w 3 Minuty',
    subtitle:
      'Od zeskanowania kodu QR przy samochodzie, przez weryfikację CEPiK/UFG i cyfrową umowę, po automatyczny PCC-3 i rejestrację z zachowaniem tablic — zero papieru i zero wizyt w urzędzie.',
    heroPromise: '5 urzędowych obowiązków załatwionych jednym obustronnym podpisem przy masce auta.',
    targetAudience: '2,5 mln kupujących i sprzedających używane samochody rocznie w Polsce',
    baselineGap:
      'Prototyp bazowy przy zakupie auta generuje jedynie plik PDF umowy do podpisu i wprost informuje, że rejestracji pojazdu nie załatwisz w aplikacji — odsyłając obywatela do wydziału komunikacji.',
    ourBreakthrough:
      'Domykamy proces w 100% cyfrowo: wykorzystujemy obowiązujące od 2022 r. prawo zachowania dotychczasowych tablic rejestracyjnych oraz obowiązek rejestracji w 30 dni (od 2024 r.), łącząc CEPiK, e-Urząd Skarbowy (PCC-3), UFG i wydział komunikacji w jedną transakcję.',
    polishAiRole: {
      model: 'Bielik-11B-v2.3-Instruct',
      task: 'Ekstrakcja ceny, stanu licznika i oświadczeń o stanie technicznym z naturalnej wypowiedzi głosowej do ustrukturyzowanej umowy + kontrola widełek rynkowych PCC-3.',
      whySovereign:
        'Znajomość specyfiki polskiego prawa podatkowego (zwolnienia z PCC-3 poniżej 1000 zł, faktura VAT-marża, ulga dla osób z niepełnosprawnością) i słownika CEPiK.',
    },
    legalBasis: [
      'Art. 73aa Prawa o ruchu drogowym (obowiązek wniosku o rejestrację w 30 dni od 01.01.2024 r.)',
      'Możliwość zachowania dotychczasowych tablic rejestracyjnych niezależnie od powiatu (od 31.01.2022 r.)',
      'Ustawa o podatku od czynności cywilnoprawnych — automatyczna deklaracja PCC-3 (2% w 14 dni)',
    ],
    dualScreenSetup: {
      leftActor: 'Piotr Mazur (39 l.)',
      leftRole: 'Sprzedający · właściciel w CEPiK',
      leftModeLabel: 'Telefon Sprzedającego',
      rightActor: 'Marta Kowalska (35 l.)',
      rightRole: 'Kupująca · Warszawa',
      rightModeLabel: 'Telefon Kupującej',
    },
    metrics: [
      {
        label: 'Liczba osobnych formularzy i urzędów',
        baseline: '4 (umowa PDF + e-US + zbycie + urząd)',
        ours: '1 zintegrowany przepływ przy aucie',
      },
      {
        label: 'Wizyty w wydziale komunikacji',
        baseline: 'Minimum 1–2 wizyty fizyczne',
        ours: '0 wizyt (przy zachowaniu tablic)',
      },
      {
        label: 'Ryzyko kary za spóźnienie (PCC-3 / 30 dni)',
        baseline: 'Wysokie — obywatel sam pilnuje dat',
        ours: '0% — wysyłka w sekundzie podpisu',
      },
    ],
    scenarios: [
      {
        id: 'pelny-zakup',
        number: '1',
        title: 'Transakcja przy masce od A do Z',
        subtitle: 'QR → audyt CEPiK/UFG → głosowe ustalenie kwoty z Bielikiem → obustronny podpis → PCC-3 + e-Rejestracja',
        durationLabel: '45 sek.',
        stepsCount: '5 urzędów w 1 kroku',
      },
      {
        id: 'czerwona-flaga',
        number: '2',
        title: 'Wykrycie rozbieżności przebiegu / współwłaściciela',
        subtitle: 'Automatyczna blokada niepełnej umowy, gdy w CEPiK widnieje współmałżonek lub szkoda całkowita',
        durationLabel: '20 sek.',
        stepsCount: 'Ochrona kupującego',
      },
      {
        id: 'zwolnienie-pcc',
        number: '3',
        title: 'Inteligentne reguły podatkowe PCC-3',
        subtitle: 'Automatyczne wyliczenie 2%, ostrzeżenie o zaniżeniu ceny rynkowej oraz obsługa zwolnień ustawowych',
        durationLabel: '20 sek.',
        stepsCount: 'Zero błędów w e-US',
      },
    ],
    keyFeatures: [
      'Natychmiastowy skan wiarygodności pojazdu i właściciela (CEPiK + UFG + brak zastawu)',
      'Wypełnienie umowy głosem (Bielik zamienia kwotę i przebieg w gotowy dokument prawny)',
      'Jednoczesne zgłoszenie zbycia (sprzedający) oraz e-wniosek o rejestrację z zachowaniem tablic (kupujący)',
      'Natychmiastowa opłata PCC-3 BLIK-iem i wydanie tymczasowego mDowodu rejestracyjnego w portfelu',
    ],
  },
  {
    id: 'prywatnosc',
    number: '03',
    categoryBadge: 'Prywatność i kontrola danych',
    shortTitle: 'Tarcza Tożsamości (Minimum Danych)',
    title: 'Tarcza Tożsamości i Selektywne Dane',
    subtitle:
      'Przekazuj dokładnie to, co niezbędne (np. samo „18+” bez imienia i PESEL-u zgodnie z eIDAS 2.0), odblokowuj PESEL celowanie dla jednego banku na 15 minut i kontroluj każdy odczyt z rejestrów.',
    heroPromise: 'Koniec z kserowaniem dowodu i odblokowywaniem PESEL-u dla całego kraju naraz.',
    targetAudience: 'Każdy użytkownik mObywatela dbający o prywatność i ochronę przed kradzieżą tożsamości',
    baselineGap:
      'W prototypie bazowym prywatność sprowadza się do odczytania historii PESEL w czacie, a odblokowanie PESEL zdejmuje ochronę globalnie dla wszystkich instytucji w kraju jednocześnie.',
    ourBreakthrough:
      'Wprowadzamy architekturę selektywnego ujawniania atrybutów (SD-JWT / eIDAS 2.0 EUDI Wallet), celowaną przepustkę PESEL przypisaną do konkretnego podmiotu na 15 minut oraz audytora nadmiarowych żądań danych.',
    polishAiRole: {
      model: 'PLLuM-12B + OPI PIB mmlw-roberta',
      task: 'Błyskawiczna ocena prawna żądania: czy dany podmiot (hotel, wypożyczalnia, sklep, telekom) ma ustawowe prawo żądać numeru PESEL lub adresu zameldowania.',
      whySovereign:
        'Analiza oparta ściśle na polskim RODO, ustawie o dowodach osobistych, Prawie bankowym oraz aktualnej Liście Ostrzeżeń CERT Polska (NASK).',
    },
    legalBasis: [
      'Rozporządzenie UE 2024/1183 (eIDAS 2.0 — Europejski Portfel Tożsamości Cyfrowej, selektywne atrybuty)',
      'Art. 5 ust. 1 lit. c RODO — zasada minimalizacji danych przy weryfikacji tożsamości',
      'Rejestr Zastrzeżeń Numerów PESEL + integracja z Listą Ostrzeżeń CERT Polska (NASK)',
    ],
    dualScreenSetup: {
      leftActor: 'Kacper Zieliński (20 l.)',
      leftRole: 'Obywatel · właściciel danych',
      leftModeLabel: 'Portfel z Tarczą Tożsamości',
      rightActor: 'Terminal Weryfikatora',
      rightRole: 'Sklep / Recepcja Hotelu / Bank',
      rightModeLabel: 'Ekran odbiorcy atrybutu',
    },
    metrics: [
      {
        label: 'Dane ujawniane przy potwierdzeniu wieku 18+',
        baseline: 'Pełny ekran mDowodu lub wizerunek',
        ours: '1 bit kryptograficzny: Ukończone 18 lat = TAK',
      },
      {
        label: 'Odblokowanie PESEL przy wniosku o raty',
        baseline: 'Globalnie dla całego kraju (okno dla oszustów)',
        ours: 'Celowana przepustka: 1 wybrany bank na 15 min',
      },
      {
        label: 'Reakcja na nadmiarowe żądanie danych (np. hotel)',
        baseline: 'Brak ostrzeżenia — przekazanie kompletu',
        ours: 'AI blokuje nadmiarowe pola (bez PESEL i adresu)',
      },
    ],
    scenarios: [
      {
        id: 'selektywne-dane',
        number: '1',
        title: 'Pokaż tylko minimum (Sklep 18+ / Recepcja hotelu)',
        subtitle: 'Odcięcie nadmiarowych pól żądanych przez terminal i kryptograficzny dowód wieku bez ujawniania tożsamości',
        durationLabel: '25 sek.',
        stepsCount: 'Zero-Knowledge (SD-JWT)',
      },
      {
        id: 'przepustka-pesel',
        number: '2',
        title: 'Celowana przepustka PESEL na 15 minut',
        subtitle: 'Jednorazowa zgoda na weryfikację kredytową wyłącznie dla wskazanego banku — reszta rynku widzi blokadę',
        durationLabel: '20 sek.',
        stepsCount: '0 sekund luki globalnej',
      },
      {
        id: 'radar-danych',
        number: '3',
        title: 'Żywy Radar Rejestrów i Anty-Phishing CERT',
        subtitle: 'Powiadomienie push w sekundzie odpytania rejestru + natychmiastowa blokada nieautoryzowanego zapytania',
        durationLabel: '25 sek.',
        stepsCount: 'Kontrola w czasie rzeczywistym',
      },
    ],
    keyFeatures: [
      'Przełącznik „Tylko wymagane prawem minimum” przed każdym przekazaniem danych kodem QR',
      'Podgląd kryptograficznego tokenu SD-JWT (eIDAS 2.0) potwierdzającego sam atrybut (np. 18+, kat. B)',
      'Jednorazowe przepustki PESEL ograniczone czasowo (15 min) i podmiotowo (konkretny NIP/KRS banku)',
      'Oś czasu zapytań do rejestrów państwowych z przyciskiem natychmiastowego zgłoszenia incydentu do CERT Polska',
    ],
  },
];

export const getConceptById = (id: string): ConceptSpec | undefined =>
  CONCEPTS.find((c) => c.id === id);

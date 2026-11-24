# mObywatel 3.0 — Trzy Koncepcje Punktowe (`mObywatel Challenge 2026`)

Klikalny prototyp koncepcyjny przygotowany na konkurs **mObywatel Challenge 2026** (pod patronatem honorowym Wicemarszałka Sejmu RP).

Zamiast budować kolejny ogólny czatbot do wszystkiego, przeanalizowaliśmy kod oraz ścieżki prototypu bazowego **mObywatel.ai** i zaprojektowaliśmy **trzy wyspecjalizowane, domknięte od początku do końca moduły**, które rozwiązują jego najważniejsze bariery wdrożeniowe w oparciu o polskie modele językowe (**PLLuM-12B** oraz **Bielik-11B**).

---

## Dlaczego 3 wyspecjalizowane moduły w układzie Dual-Screen (2 ekrany na żywo)?

Większość kluczowych spraw obywatelskich nie dzieje się w próżni na jednym ekranie — ma **drugą stronę transakcji**:
- **Senior (84 l.) ↔ Bliska osoba (Córka)** pomagająca wypełnić trudny wniosek bez przejmowania hasła i PIN-u,
- **Sprzedający ↔ Kupujący** stojący przy masce samochodu,
- **Obywatel ↔ Terminal Weryfikatora** (sklep 18+, recepcja hotelu, bank odpytujący rejestr PESEL).

Dlatego każdy z trzech modułów działa w zsynchronizowanym widoku **dwóch ekranów obok siebie w czasie rzeczywistym** (łącznie **9 scenariuszy × 5 kroków = 45 interaktywnych etapów**).

---

## Trzy Moduły Koncepcyjne

### Moduł 01: `mObywatel Bliscy i Tarcza Seniora` (`?modul=bliscy`)
*Kategoria: Dla seniorów, dostępność i bezpieczeństwo*

- **Problem w prototypie bazowym:** Seniorka (p. Halina, 84 l.) nie posiada własnego interfejsu aplikacji — występuje wyłącznie jako statyczny wpis upoważnienia IKP na koncie córki. W praktyce miliony seniorów w Polsce albo są wykluczone cyfrowo, albo przekazują rodzinie hasła na kartce, a jednocześnie są narażone na oszustwa metodą „na wnuczka / na policjanta”.
- **Nasze rozwiązanie:**
  1. **Scenariusz 1 — „Wypełnij ze mną, nie za mnie”:** Współdzielony przepływ wniosku o dowód osobisty. Córka Ewa przygotowuje technicznie formularz na swoim telefonie (w tym zamawia bezpłatną wizytę urzędnika z mobilną stacją w domu seniora zgodnie z **art. 26 ustawy o dowodach osobistych**), ale **nie może go podpisać**. Polski model **PLLuM-12B** streszcza wniosek na telefonie mamy w 3 prostych zdaniach z polskim lektorem głosowym, a seniorka osobiście zatwierdza go jednym przyciskiem.
  2. **Scenariusz 2 — „Tarcza Anty-Socjotechniczna”:** Gdy podczas rozmowy telefonicznej z nieznanym numerem (`+48 22 100 49 12`) zmanipulowany senior próbuje zdjąć blokadę PESEL, **Bielik-11B** weryfikuje Rejestr Połączeń Urzędowych, blokuje operację **60-minutowym bezpiecznikiem czasowym** i wysyła cichy alarm na telefon córki Ewy z opcją natychmiastowego zgłoszenia spoofingu do **CERT Polska (NASK)**.
  3. **Scenariusz 3 — „Pismo urzędowe prostym językiem i wspólna apteka”:** Automatyczny przekład wielozdaniowej decyzji ZUS o dodatku pielęgnacyjnym (art. 75 ustawy o FUS) do standardu prostego języka (B1) z odsłuchem głosowym oraz przekazanie jednym kliknięciem kodu kreskowego e-Recept (`65+ S — 0,00 zł`) na telefon córki wraz z dużą kartą dawkowania **Rano / Wieczór**.

---

### Moduł 02: `Kupno i E-Rejestracja Auta w 3 Minuty` (`?modul=auto`)
*Kategoria: Jedna sprawa od początku do końca — zero druków i zero wizyt w urzędzie*

- **Problem w prototypie bazowym:** Przy zakupie auta prototyp bazowy generuje jedynie plik PDF umowy i odsyła obywatela do stacjonarnego wydziału komunikacji.
- **Nasze rozwiązanie:**
  1. **Scenariusz 1 — Transakcja przy masce od A do Z (5 urzędów w 1 kroku):** Po zeskanowaniu kodu QR między telefonem sprzedającego i kupującej następuje automatyczny audyt pojazdu w **CEPiK, UFG i Rejestrze Zastawów**, ekstrakcja warunków umowy przez **Bielik-11B** oraz obustronny podpis biometryczny z płatnością BLIK, który jednocześnie realizuje:
     - cyfrową umowę kupna-sprzedaży w e-Doręczeniach obu stron,
     - automatyczne **zgłoszenie zbycia pojazdu** u sprzedającego + powiadomienie ubezpieczyciela OC,
     - deklarację i opłatę podatku **PCC-3 (2%)** w e-Urzędzie Skarbowym u kupującej,
     - **e-wniosek o rejestrację pojazdu (art. 73aa PoRD)** z zachowaniem dotychczasowych tablic rejestracyjnych (obowiązujące od 2022 r. przepisy pozwalają pominąć wizytę w urzędzie i zaoszczędzić 93,50 zł),
     - natychmiastowe wydanie **Tymczasowego mDowodu Rejestracyjnego** w portfelu mObywatel.
  2. **Scenariusz 2 — Wykrycie 2 czerwonych flag w CEPiK (Ochrona kupującego):** Automatyczna blokada wadliwej umowy przed przekazaniem gotówki po wykryciu nieobecnego współwłaściciela (art. 199 Kodeksu cywilnego) oraz cofniętego licznika o 84 900 km i szkody istotnej układu nośnego w UFG.
  3. **Scenariusz 3 — Inteligentne reguły podatkowe PCC-3:** Ostrzeżenie **Bielika-11B** przy próbie sztucznego zaniżenia ceny na umowie (art. 6 ustawy o PCC + ryzyko utraty rękojmi) oraz kalkulator zwolnień ustawowych (2% standard, 0 zł dla osoby z orzeczeniem o niepełnosprawności wg art. 8 pkt 6, 0 zł przy fakturze VAT lub kwocie do 1 000 zł).

---

### Moduł 03: `Tarcza Tożsamości i Selektywne Dane` (`?modul=prywatnosc`)
*Kategoria: Prywatność, kontrola danych i standard eIDAS 2.0 (EUDI Wallet)*

- **Problem w prototypie bazowym:** Kontrola danych ogranicza się do odczytania historii PESEL w oknie czatu, a zdjęcie blokady PESEL przy wniosku o raty otwiera ochronę globalnie dla wszystkich instytucji w kraju jednocześnie.
- **Nasze rozwiązanie:**
  1. **Scenariusz 1 — „Pokaż tylko minimum” (SD-JWT / eIDAS 2.0):** Przed przekazaniem danych terminalowi w sklepie (18+) lub recepcji hotelu **PLLuM-12B + wyszukiwarka OPI PIB** oceniają podstawę prawną żądania (art. 5 RODO) i odcinają nadmiarowe pola. Sklep otrzymuje wyłącznie kryptograficzny dowód `Ukończone 18 lat: TAK`, a hotel potwierdzenie tożsamości — podczas gdy numer PESEL i adres zameldowania pozostają ukryte (`SD-JWT`).
  2. **Scenariusz 2 — Celowana przepustka PESEL na 15 minut:** Jednorazowa zgoda na weryfikację PESEL ograniczona czasowo (`15 min` lub `5 min`) i podmiotowo (**wyłącznie dla wskazanego banku po numerze KRS/NIP**, np. `mBank S.A.`). Symulacja na żywo pokazuje, że równoległe zapytanie z parabanku w tej samej minucie zostaje automatycznie odrzucone (`ODMOWA: PESEL ZASTRZEŻONY`).
  3. **Scenariusz 3 — Żywy Radar Rejestrów i Anty-Phishing CERT Polska:** Oś czasu odczytów z rejestrów państwowych połączona ze skanerem podejrzanych wiadomości SMS (`PLLuM-12B` + weryfikacja braku zaległości w e-US) oraz 1-klikowym zgłoszeniem złośliwej domeny na **Listę Ostrzeżeń CERT Polska (NASK) / 8080**.

---

## Porównanie z prototypem bazowym (`mobywatel.ai`)

| Obszar | Prototyp bazowy (`mobywatel.ai`) | Nasza koncepcja (`mObywatel 3.0`) |
|---|---|---|
| **Architektura AI** | LLM prowadzi otwarty czat i wybiera spośród ~80 narzędzi | Deterministyczna maszyna stanów + polskie modele (**PLLuM-12B / Bielik-11B**) jako bezpieczny koprocesor języka i ekstrakcji JSON |
| **Seniorzy i wsparcie bliskich** | Brak trybu seniora; statyczny podgląd e-recept przez IKP | Tryb Senior WCAG 2.2 AAA + współdzielony wniosek na 2 telefonach + tarcza przed oszustwem „na policjanta” |
| **Zakup i rejestracja pojazdu** | Wygenerowanie PDF umowy i odesłanie do urzędu stacjonarnego | 100% cyfrowy proces przy masce: CEPiK/UFG + umowa + PCC-3 BLIK + zbycie + e-rejestracja z zachowaniem tablic |
| **Prywatność i ochrona PESEL** | Globalne odblokowanie PESEL dla całego kraju; logi w czacie | Selektywne atrybuty **SD-JWT (eIDAS 2.0)** + celowana przepustka PESEL dla 1 banku na 15 minut |
| **Suwerenność technologiczna** | Domyślnie komercyjne API zagraniczne (OpenAI / Anthropic) | Architektura zaprojektowana pod polskie modele open-weights (**PLLuM, Bielik, OPI PIB**) w chmurze rządowej **COI** |

---

## Stos technologiczny

- **Frontend:** `React 19`, `TypeScript`, `Vite 6`, `Tailwind CSS v4`, `Framer Motion`, `Zustand`, `Lucide Icons`
- **Polski syntezator mowy:** Natywne `Web Speech API (pl-PL)` z bezpiecznym fallbackiem wizualnym
- **Architektura docelowa AI (opisana i zamockowana deterministycznie w prototypie):**
  - **PLLuM-12B-nc-instruct** (konsorcjum NASK / OPI PIB / Politechnika Wrocławska) — prosty język urzędowy (standard Jasnopisu B1) i analiza RODO/phishingu
  - **Bielik-11B-v2.3-Instruct** (SpeakLeash / ACK Cyfronet AGH) — ekstrakcja parametrów transakcji do JSON i detekcja wzorców socjotechnicznych
  - **OPI PIB `sdadas/mmlw-retrieval-roberta-base`** — wyszukiwanie podstaw prawnych na kartach usług `gov.pl`

---

## Uruchomienie lokalne

Wymagany `Node.js 18+` (zalecany `20+` lub `24+`):

```bash
npm install
npm run dev
```

Aplikacja uruchomi się pod adresem `http://localhost:5173/`.

Bezpośrednie linki do poszczególnych modułów:
- Ekran główny (Hub 3 koncepcji): `/`
- Moduł 01 (Bliscy i Tarcza Seniora): `/?modul=bliscy`
- Moduł 02 (Auto w 3 minuty): `/?modul=auto`
- Moduł 03 (Tarcza Tożsamości): `/?modul=prywatnosc`

---

## Budowanie i wdrożenie na Cloudflare Pages (SPA)

```bash
npm run build
```

Konfiguracja w panelu **Cloudflare Pages**:
- **Framework preset:** `Vite`
- **Build command:** `npm run build`
- **Build output directory:** `dist`

W katalogu `public/_redirects` znajduje się reguła `/* /index.html 200`, która automatycznie zapewnia poprawne działanie routingu SPA na Cloudflare Pages.

---

## Informacja prawna

Projekt stanowi niezależną koncepcję konkursową przygotowaną w ramach **mObywatel Challenge 2026** i nie jest oficjalną usługą administracji publicznej. Wszystkie prezentowane osoby, numery PESEL, numery dokumentów, pojazdy oraz sprawy urzędowe są całkowicie fikcyjne. W projekcie nie wykorzystano zastrzeżonego godła Rzeczypospolitej Polskiej ani zastrzeżonych znaków towarowych aplikacji mObywatel.

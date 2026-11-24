# mObywatel 3.0 — Trzy Koncepcje Punktowe (mObywatel Challenge 2026)

Ten projekt to klikalny prototyp aplikacji na konkurs **mObywatel Challenge 2026**. Prototyp działa w przeglądarce i nie wymaga logowania.

Przeanalizowałem kod oraz ścieżki użytkownika w prototypie bazowym (`mobywatel.ai`). Zamiast ogólnego czatbota zbudowałem **trzy kompletne moduły**. Każdy moduł rozwiązuje konkretny problem wdrożeniowy prototypu bazowego i wykorzystuje polskie modele językowe (**PLLuM-12B** oraz **Bielik-11B**).

---

## Układ dwóch ekranów (Dual-Screen)

Większość spraw urzędowych i życiowych wymaga udziału dwóch stron:
- **Senior (84 lata) ↔ Bliska osoba (Córka)** — córka wypełnia formularz, a senior sam go zatwierdza.
- **Sprzedający ↔ Kupujący** — obie strony podpisują umowę i przerejestrowują pojazd przy masce auta.
- **Obywatel ↔ Terminal weryfikatora** — obywatel potwierdza wiek 18+ w sklepie, tożsamość w hotelu lub zdolność kredytową w banku.

Dlatego w każdym module umieściłem **dwa zsynchronizowane ekrany obok siebie**. Cały prototyp obejmuje **3 moduły, 9 scenariuszy i 45 interaktywnych kroków**.

---

## Opis modułów

### Moduł 01: `mObywatel Bliscy i Tarcza Seniora` (`?modul=bliscy`)
*Kategoria: Dla seniorów i dostępność*

- **Problem w prototypie bazowym:** Seniorka (Halina, 84 lata) nie ma własnego widoku aplikacji. Jej dane są widoczne tylko jako statyczny wpis IKP na koncie córki. W rzeczywistości seniorzy często rezygnują z usług cyfrowych albo oddają hasła rodzinie na kartce. Są też narażeni na oszustwa telefoniczne („na policjanta” lub „na pracownika banku”).
- **Moje rozwiązanie:**
  1. **Scenariusz 1 — „Wypełnij ze mną, nie za mnie”:** Seniorka prosi córkę o pomoc jednym przyciskiem. Córka wypełnia formularz wniosku o dowód na swoim telefonie. Wybiera bezpłatną wizytę urzędnika w domu seniora (**art. 26 ustawy o dowodach osobistych**). Córka nie może sama wysłać wniosku. Model **PLLuM-12B** tworzy dla seniorki podsumowanie w 3 prostych zdaniach i odczytuje je głosem. Seniorka zatwierdza wniosek osobiście na swoim ekranie.
  2. **Scenariusz 2 — „Tarcza anty-socjotechniczna”:** Oszust dzwoni z nieznanego numeru (`+48 22 100 49 12`) i nakazuje seniorce odblokować numer PESEL. Model **Bielik-11B** sprawdza Rejestr Połączeń Urzędowych i wykrywa próbę wyłudzenia. System blokuje zmianę statusu PESEL na **60 minut** i wysyła alarm na telefon córki. Córka jednym kliknięciem blokuje operację i zgłasza numer do **CERT Polska (NASK)**.
  3. **Scenariusz 3 — „Pismo urzędowe prostym językiem”:** Model **PLLuM-12B** tłumaczy decyzję ZUS o dodatku pielęgnacyjnym (**art. 75 ustawy o FUS**) na prosty język (poziom B1). Seniorka jednym przyciskiem przekazuje córce kod kreskowy e-Recept (`65+ S — 0,00 zł`). Po wykupieniu leków w aptece seniorka otrzymuje na swój ekran czytelną kartę dawkowania (Rano / Wieczór).

---

### Moduł 02: `Kupno i E-Rejestracja Auta w 3 Minuty` (`?modul=auto`)
*Kategoria: Jedna sprawa od początku do końca*

- **Problem w prototypie bazowym:** Prototyp bazowy generuje tylko plik PDF z umową kupna-sprzedaży. Po rejestrację pojazdu aplikacja odsyła użytkownika do stacjonarnego wydziału komunikacji.
- **Moje rozwiązanie:**
  1. **Scenariusz 1 — Transakcja przy masce od A do Z:** Sprzedający wyświetla kod QR pojazdu, a kupująca skanuje go swoim telefonem. Aplikacja pobiera dane z rejestrów **CEPiK, UFG oraz Rejestru Zastawów**. Model **Bielik-11B** zamienia podyktowaną cenę i przebieg na cyfrową umowę. Obie strony podpisują dokument biometrycznie, a kupująca opłaca pakiet kodem BLIK. Jeden podpis wykonuje jednocześnie **5 operacji**:
     - zapisuje podpisaną umowę w skrzynkach e-Doręczeń obu stron,
     - wysyła automatyczne **zgłoszenie zbycia pojazdu** do CEPiK oraz informuje ubezpieczyciela OC,
     - składa deklarację i opłaca podatek **PCC-3 (2%)** w e-Urzędzie Skarbowym,
     - wysyła **e-wniosek o rejestrację pojazdu (art. 73aa PoRD)** z zachowaniem dotychczasowych tablic rejestracyjnych (0 wizyt w urzędzie, opłata 66,50 zł zamiast 160,00 zł),
     - wydaje kupującej **Tymczasowy mDowód Rejestracyjny** w aplikacji.
  2. **Scenariusz 2 — Wykrycie 2 czerwonych flag w CEPiK:** Podczas weryfikacji auta aplikacja wykrywa cofnięty licznik (-84 900 km względem kontroli Policji), szkodę istotną w UFG oraz nieobecnego współwłaściciela. Model **Bielik-11B** blokuje podpisanie wadliwej umowy (**art. 199 Kodeksu cywilnego**) i chroni kupującą przed utratą pieniędzy.
  3. **Scenariusz 3 — Reguły podatkowe PCC-3:** Sprzedający proponuje wpisanie na umowie zaniżonej ceny (`22 000 zł` zamiast `46 000 zł`). Model **Bielik-11B** porównuje kwotę z wartością rynkową i ostrzega o konsekwencjach podatkowych (**art. 6 ustawy o PCC**) oraz utracie rękojmi. Wbudowany kalkulator obsługuje również zwolnienia ustawowe: 0 zł dla osób z orzeczeniem o niepełnosprawności (**art. 8 pkt 6**) oraz 0 zł przy fakturze VAT lub kwocie do 1 000 zł.

---

### Moduł 03: `Tarcza Tożsamości i Selektywne Dane` (`?modul=prywatnosc`)
*Kategoria: Prywatność i kontrola danych*

- **Problem w prototypie bazowym:** Użytkownik może sprawdzić historię PESEL wyłącznie w czacie. Ponadto przy wniosku o raty użytkownik musi odblokować PESEL globalnie dla całego kraju. Tworzy to lukę czasową, którą mogą wykorzystać oszuści w innych instytucjach.
- **Moje rozwiązanie:**
  1. **Scenariusz 1 — „Pokaż tylko minimum” (SD-JWT / eIDAS 2.0):** Terminal w sklepie (18+) lub w recepcji hotelu żąda 5 pól z dowodu osobistego. Model **PLLuM-12B** oraz wyszukiwarka **OPI PIB** sprawdzają podstawę prawną żądania (**art. 5 RODO**) i odcinają nadmiarowe dane. Sklep otrzymuje tylko kryptograficzne potwierdzenie `Ukończone 18 lat: TAK`, a hotel potwierdzenie samej tożsamości. Numer PESEL i adres zameldowania pozostają ukryte.
  2. **Scenariusz 2 — Celowana przepustka PESEL na 15 minut:** Obywatel wystawia jednorazową zgodę na weryfikację PESEL. Zgoda działa przez 15 minut i jest przypisana wyłącznie do jednego banku po numerze KRS (`mBank S.A.`). W teście na żywo mBank otrzymuje zgodę, a równoległe zapytanie z parabanku w tej samej minucie zostaje odrzucone (`ODMOWA: PESEL ZASTRZEŻONY`).
  3. **Scenariusz 3 — Żywy Radar Rejestrów i Anty-Phishing CERT Polska:** Obywatel widzi pełną historię zapytań do swoich rejestrów państwowych. Gdy otrzymuje podejrzany SMS o dopłacie podatku PIT (`14,80 zł`), model **PLLuM-12B** weryfikuje brak zaległości w e-Urzędzie Skarbowym i sprawdza link w bazie **CERT Polska (NASK)**. Jednym kliknięciem obywatel zgłasza złośliwą domenę na Listę Ostrzeżeń (bramka 8080).

---

## Porównanie z prototypem bazowym (`mobywatel.ai`)

| Obszar | Prototyp bazowy (`mobywatel.ai`) | Moja koncepcja (`mObywatel 3.0`) |
|---|---|---|
| **Rola modelu AI** | Model LLM prowadzi rozmowę i wybiera spośród ~80 narzędzi. | Maszyna stanów wykonuje operacje. Polskie modele (**PLLuM-12B / Bielik-11B**) tłumaczą tekst na prosty język i zwracają dane w formacie JSON. |
| **Seniorzy i bliscy** | Brak trybu seniora. Podgląd e-recept tylko przez IKP. | Tryb Senior WCAG 2.2 AAA, wspólne wypełnianie wniosków na 2 telefonach oraz blokada oszustw telefonicznych. |
| **Zakup pojazdu** | Aplikacja tworzy plik PDF umowy i odsyła do urzędu. | Pełny proces przy aucie: audyt CEPiK/UFG, umowa, podatek PCC-3 BLIK, zgłoszenie zbycia i e-rejestracja z zachowaniem tablic. |
| **Prywatność i PESEL** | Globalne odblokowanie PESEL. Historia dostępna w czacie. | Selektywne atrybuty **SD-JWT (eIDAS 2.0)** oraz celowana przepustka PESEL dla 1 banku na 15 minut. |
| **Modele językowe** | Domyślnie modele zagraniczne (OpenAI / Anthropic). | Architektura, którą zaprojektowałem pod polskie modele (**PLLuM, Bielik, OPI PIB**) w chmurze rządowej **COI**. |

---

## Stos technologiczny

- **Interfejs użytkownika:** `React 19`, `TypeScript`, `Vite 6`, `Tailwind CSS v4`, `Framer Motion`, `Zustand`, `Lucide Icons`.
- **Synteza mowy:** Natywne `Web Speech API (pl-PL)` w przeglądarce.
- **Polskie modele AI (odpowiedzi w prototypie zasymulowałem deterministycznie, aby aplikacja działała niezawodnie bez kluczy API):**
  - **PLLuM-12B-nc-instruct** (NASK / OPI PIB / Politechnika Wrocławska) — przekład pism urzędowych na prosty język (poziom B1) oraz analiza RODO i phishingu.
  - **Bielik-11B-v2.3-Instruct** (SpeakLeash / ACK Cyfronet AGH) — ekstrakcja parametrów umowy do formatu JSON oraz detekcja socjotechniki.
  - **OPI PIB `sdadas/mmlw-retrieval-roberta-base`** — wyszukiwanie podstaw prawnych w kartach usług `gov.pl`.

---

## Instrukcja uruchomienia lokalnego

Wymagania: `Node.js` w wersji `18` lub nowszej.

1. Zainstaluj zależności projektu:
   ```bash
   npm install
   ```
2. Uruchom lokalny serwer deweloperski:
   ```bash
   npm run dev
   ```
3. Otwórz adres `http://localhost:5173/` w przeglądarce.

Bezpośrednie adresy modułów:
- Ekran główny (wybór koncepcji): `/`
- Moduł 01 (Bliscy i Tarcza Seniora): `/?modul=bliscy`
- Moduł 02 (Auto w 3 minuty): `/?modul=auto`
- Moduł 03 (Tarcza Tożsamości): `/?modul=prywatnosc`

---

## Informacja prawna

Ten projekt to niezależny prototyp konkursowy (**mObywatel Challenge 2026**), który wykonałem w celach demonstracyjnych. Aplikacja nie jest usługą administracji publicznej i nie łączy się z państwowymi rejestrami. Wszystkie dane osobowe, numery PESEL, dokumenty oraz pojazdy są fikcyjne. W projekcie nie wykorzystałem zastrzeżonego godła Rzeczypospolitej Polskiej ani znaków towarowych aplikacji mObywatel.

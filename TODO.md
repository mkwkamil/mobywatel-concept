# mObywatel Next — Master TODO (mObywatel Challenge 2026)

## Faza 0: Fundament i Hub 3 Koncepcji (ZROBIONE)
- [x] Inicjalizacja projektu (`React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Zustand`).
- [x] System kolorystyczny w stylistyce mObywatela (`#DC1B3F`, `#FDECEE`, `#F5F6F9`, `#111318`) z autorskim znakiem koncepcyjnym (bez zastrzeżonego godła RP).
- [x] Główny Hub z **3 dominującymi panelami** prowadzącymi do niezależnych prototypów (`?modul=bliscy`, `?modul=auto`, `?modul=prywatnosc`).
- [x] Sekcja metodologiczna z profesjonalnym uzasadnieniem wyboru koncepcji i tabelą przewag nad prototypem bazowym `mobywatel.ai`.
- [x] Karta techniczna architektury polskiego AI (**PLLuM-12B**, **Bielik-11B**, **OPI PIB mmlw-roberta**, wdrożenie w chmurze COI).
- [x] Wspólna scena prezentacyjna **Dual-Phone (2 zsynchronizowane ekrany obok siebie)** + przełącznik na pojedynczy ekran + boczny panel analityczny dla Jury.

---

## Moduł 01: mObywatel Bliscy i Tarcza Seniora (`?modul=bliscy`) (ZROBIONE)
- [x] **System UI „Tryb Seniora AAA”** (kontrast >7:1 + przełącznik czarno-żółty AAA i powiększenie A++, maksymalnie 3 akcje na ekranie, integracja z `Web Speech API` do czytania komunikatów na głos po polsku).
- [x] **Scenariusz 1 — „Wypełnij ze mną, nie za mnie” (Asysta Rodzinna):**
  - [x] Ekran Pani Haliny (84 l.) z powiadomieniem o wygasającym dowodzie i przyciskiem *„Poproś córkę Ewę o wypełnienie”*.
  - [x] Zsynchronizowany ekran córki Ewy: odbiór prośby na żywo, wypełnienie szczegółów urzędowych (wybór wizyty domowej urzędnika wg art. 26 ustawy lub wizyty w UM Lublin, zdjęcie biometryczne, powiadomienia), blokada samodzielnej wysyłki przez asystenta.
  - [x] Powrót na ekran Pani Haliny: animacja streszczenia przez **PLLuM-12B** w 3 prostych zdaniach + głosowy odczyt + podgląd JSON modelu + zatwierdzenie z autoryzacją biometryczną/PIN i wygenerowanie UPO po obu stronach.
- [x] **Scenariusz 2 — „Tarcza Anty-Socjotechniczna” (ochrona przed oszustwem „na policjanta / pracownika banku”):**
  - [x] Symulacja próby nagłego cofnięcia zastrzeżenia PESEL przez seniorkę podczas rozmowy telefonicznej z rzekomym policjantem (`+48 22 100 49 12`).
  - [x] Ekran Czerwonej Tarczy mObywatela (*„Żaden policjant ani urzędnik nie dzwoni do Ciebie w tej chwili”*) + detekcja wzorca spoofingu/vishingu przez **Bielik-11B**.
  - [x] Włączenie 60-minutowego bezpiecznika czasowego („chłodzenie decyzji”) oraz natychmiastowy cichy alert bezpieczeństwa na telefonie córki Ewy z 1-klikowym zgłoszeniem numeru do **CERT Polska (NASK)**.
- [x] **Scenariusz 3 — „Pismo urzędowe po ludzku i wspólna apteka (e-Recepty)”:**
  - [x] Widok decyzji z ZUS pełnej paragrafów (`ENP/04/02918442/2026`).
  - [x] Animacja strumieniowego przekładu przez **PLLuM-12B** na prostą polszczyznę (O co chodzi / Czy trzeba płacić / Kiedy przelew) z przełącznikiem *Prosty język ↔ Oryginał z ZUS* i polskim lektorem.
  - [x] Przekazanie jednym kliknięciem pakietu e-Recept (`Polpril 5 mg`, `Atoris 20 mg`, kod `9182`, bezpłatne `65+ S`) na telefon córki Ewy z kodem kreskowym dla farmaceuty oraz wygenerowanie dużej ściągawki dawkowania Rano / Wieczór dla Pani Haliny.

---

## Moduł 02: Kupno i E-Rejestracja Auta w 3 Minuty (`?modul=auto`) (ZROBIONE)
- [x] **Scenariusz 1 — Pełna transakcja przy masce od A do Z (Sprzedający ↔ Kupująca):**
  - [x] Krok 1: Wyświetlenie i zeskanowanie kodu QR mObywatela między telefonem Piotra (sprzedającego) a Marty (kupującej).
  - [x] Krok 2: Automatyczna karta weryfikacji pojazdu na żywo z **CEPiK + UFG + Rejestru Zastawów** (potwierdzenie właściciela, przebieg z SKP, aktywne OC, brak kradzieży).
  - [x] Krok 3: Dyktowanie warunków i wybór ceny (`46 000 zł` / `48 500 zł`) → ekstrakcja JSON i wygenerowanie umowy przez **Bielik-11B**.
  - [x] Krok 4: Wybór trybu rejestracji (zachowanie tablic `WX 4521K` za `66,50 zł` lub nowe tablice za `160 zł`) i obustronny podpis biometryczny + BLIK.
  - [x] Krok 5: Automatyczna egzekucja **5 obowiązków naraz**:
    1. Podpisana umowa PDF w obu skrzynkach e-Doręczeń,
    2. Automatyczne *zgłoszenie zbycia pojazdu* w CEPiK u sprzedającego (`ZBY/WAW/2026/44109`) + powiadomienie Warta OC,
    3. Wyliczenie i opłacenie podatku **PCC-3 (2%)** BLIK-iem w e-Urzędzie Skarbowym u kupującej (`PCC3/2026/918204`),
    4. Złożenie **e-wniosku o rejestrację z zachowaniem tablic** (0 wizyt w urzędzie) + natychmiastowe dodanie tymczasowego mDowodu rejestracyjnego do portfela,
    5. Przepisanie polisy OC zbywcy z wyraźnym przypomnieniem o dacie jej wygaśnięcia (brak automatycznego przedłużenia przy kupnie!).
- [x] **Scenariusz 2 — Czerwona flaga z rejestrów (ochrona kupującego):**
  - [x] Wykrycie nieobecnego współwłaściciela w CEPiK (wymagany drugi podpis wg art. 199 KC) oraz cofniętego licznika o 84 900 km i szkody istotnej układu nośnego w UFG — zablokowanie wadliwej umowy przez **Bielik-11B** przed zapłatą.
- [x] **Scenariusz 3 — Inteligentny doradca podatkowy PCC-3:**
  - [x] Ostrzeżenie **Bielika-11B** przy wpisaniu zaniżonej ceny (`22 000 zł`) względem wartości rynkowej Eurotax/Info-Ekspert (`44 000 – 51 000 zł`) oraz interaktywny kalkulator zwolnień ustawowych (2% standard / 0 zł dla osoby z niepełnosprawnością wg art. 8 pkt 6 / 0 zł faktura VAT lub do 1000 zł).

---

## Moduł 03: Tarcza Tożsamości i Selektywne Dane (`?modul=prywatnosc`) (ZROBIONE)
- [x] **Scenariusz 1 — Selektywne ujawnianie danych (Sklep 18+ / Recepcja Hotelu — standard eIDAS 2.0):**
  - [x] Symulator terminala odbiorcy (po prawej) z przełącznikiem *Kasa Sklepu 18+* vs *Recepcja Hotelu Baltic* żądającego 5 pól z dowodu.
  - [x] Analiza podstawy prawnej przez **PLLuM-12B + OPI PIB** na telefonie obywatela (*„Hotel ani sklep nie mają prawa żądać ani kopiować numeru PESEL”*) + przełącznik **„Tylko wymagane minimum”**.
  - [x] Tryb „Sklep 18+” i „Hotel”: przekazanie wyłącznie kryptograficznego dowodu (`Ukończone 18 lat: TAK` lub samej tożsamości) bez numeru PESEL i adresu zameldowania + podgląd tokenu **SD-JWT**.
- [x] **Scenariusz 2 — Celowana przepustka PESEL na 15 minut:**
  - [x] Wniosek ratalny / kredytowy: zamiast globalnego odblokowania numeru PESEL w całym kraju, wydanie jednorazowej zgody ważnej **tylko 15 minut (lub 5 minut) i wyłącznie dla wybranego banku (mBank S.A. · KRS 0000025237)**.
  - [x] Symulacja na żywo: mBank otrzymuje status `ZGODA JEDNORAZOWA`, a równoległe zapytanie z parabanku (`SzybkaPożyczka24`) w tej samej minucie zostaje **zablokowane** (`ODMOWA: PESEL ZASTRZEŻONY`).
- [x] **Scenariusz 3 — Żywy Radar Rejestrów i Tarcza Anty-Phishingowa CERT Polska:**
  - [x] Interaktywna oś czasu zapytań do rejestrów państwowych (kto, kiedy, podstawa prawna).
  - [x] Skaner podejrzanego SMS-a (`GOV-DOPŁATA` z fałszywą domeną `mobywatel-rozliczenie-gov.pl/pit`) weryfikujący domenę w **PLLuM-12B + CERT Polska (NASK)** oraz blokujący domenę na ogólnopolskiej Liście Ostrzeżeń (`CERT-PL/SMS/2026/77104`).

---

## Faza Końcowa: Dopieszczenie Konkursowe, Dostępność i Wysyłka
- [ ] Wspólne mikrokomponenty klasy premium: animacja **Face ID**, realistyczny skaner **QR / NFC**, animacja strumieniowania odpowiedzi **Bielik / PLLuM** z widocznym oznaczeniem modelu.
- [ ] Pełna responsywność mobilna (wygodne przeklikanie również na fizycznym smartfonie jurora) oraz obsługa z klawiatury i czytników ekranu (**cel: 100/100 Lighthouse Accessibility**).
- [ ] Sprawdzenie wszystkich kwot, terminów i podstaw prawnych względem oficjalnych kart usług `gov.pl`.
- [ ] Wdrożenie na szybki publiczny hosting statyczny (Cloudflare Pages / Vercel) działający bez logowania w oknie prywatnym.
- [ ] Przygotowanie finalnego opisu zgłoszenia (do 4000 znaków), opisu polskich technologii oraz opcjonalnego 90-sekundowego wideo pokazowego (plus możliwość zgłoszenia każdego z 3 linków także osobno zgodnie z regulaminem!).

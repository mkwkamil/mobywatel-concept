import { StepMeta } from './bliscyScenariosData';

export const AUTO_STEPS_BY_SCENARIO: Record<string, StepMeta[]> = {
  'pelny-zakup': [
    {
      index: 0,
      shortTitle: 'Kod QR przy masce auta',
      actorFocus: 'both',
      description:
        'Sprzedający Piotr generuje w mObywatelu kod transakcyjny dla swojej Toyoty Corolli, a kupująca Marta skanuje go swoim telefonem.',
    },
    {
      index: 1,
      shortTitle: 'Audyt CEPiK, UFG i zastawów',
      actorFocus: 'ewa',
      description:
        'mObywatel automatycznie weryfikuje w rejestrach państwowych własność pojazdu, historię przebiegu ze stacji kontroli (SKP), ważne OC i brak kradzieży.',
    },
    {
      index: 2,
      shortTitle: 'Umowa z modelem Bielik-11B',
      actorFocus: 'both',
      description:
        'Strony ustalają uzgodnioną cenę oraz przebieg (58 420 km). Bielik-11B sporządza cyfrową umowę oraz przygotowuje pakiet PCC-3 i e-Rejestracji z zachowaniem tablic.',
    },
    {
      index: 3,
      shortTitle: 'Obustronny podpis i opłata BLIK',
      actorFocus: 'both',
      description:
        'Obie strony podpisują umowę biometrycznie. Kupująca jednym zatwierdzeniem opłaca podatek PCC-3 (920 zł) i e-rejestrację bez wymiany tablic (66,50 zł).',
    },
    {
      index: 4,
      shortTitle: '5 urzędów załatwionych naraz',
      actorFocus: 'both',
      description:
        'W 1 sekundę: zgłoszenie zbycia u sprzedającego, opłacony PCC-3 w e-US, e-wniosek o rejestrację (art. 73aa PoRD), tymczasowy mDowód rejestracyjny i przepisanie OC.',
    },
  ],
  'czerwona-flaga': [
    {
      index: 0,
      shortTitle: 'Oferta sprzedającego',
      actorFocus: 'halina',
      description:
        'Sprzedający udostępnia dane pojazdu Audi A4 (KR 9A412), deklarując ustnie bezwypadkowość, przebieg 134 000 km oraz wyłączną własność.',
    },
    {
      index: 1,
      shortTitle: 'Wykrycie 2 czerwonych flag',
      actorFocus: 'ewa',
      description:
        'Krzyżowa weryfikacja w CEPiK i UFG ujawnia szkodę istotną układu nośnego, cofnięty licznik o 84 900 km oraz nieobecnego współwłaściciela.',
    },
    {
      index: 2,
      shortTitle: 'Blokada wadliwej umowy (Bielik)',
      actorFocus: 'ewa',
      description:
        'Bielik-11B blokuje podpisanie jednostronnej umowy — sprzedaż bez zgody współwłaściciela (art. 199 KC) uniemożliwi przerejestrowanie pojazdu.',
    },
    {
      index: 3,
      shortTitle: 'Decyzja ochronna kupującej',
      actorFocus: 'ewa',
      description:
        'Kupująca ma pełną jasność przed przekazaniem pieniędzy: może odrzucić ryzykowny zakup albo zażądać zdalnego dopisania współwłaściciela w mObywatelu.',
    },
    {
      index: 4,
      shortTitle: 'Odrzucenie transakcji i raport',
      actorFocus: 'both',
      description:
        'Transakcja zostaje bezpiecznie anulowana bez utraty gotówki, a w historii zostaje zapisany raport ostrzegawczy z CEPiK.',
    },
  ],
  'zwolnienie-pcc': [
    {
      index: 0,
      shortTitle: 'Próba zaniżenia ceny na umowie',
      actorFocus: 'halina',
      description:
        'Sprzedający wpisuje w projekcie umowy zaniżoną kwotę 22 000 zł (zamiast rynkowych 46 000 zł), aby obniżyć podatek PCC-3.',
    },
    {
      index: 1,
      shortTitle: 'Ostrzeżenie rynkowe Bielik-11B',
      actorFocus: 'ewa',
      description:
        'Bielik-11B porównuje cenę z tabelą Eurotax/Info-Ekspert i ostrzega, że podstawą PCC-3 jest wartość rynkowa (art. 6 ustawy o PCC), a nie kwota z umowy.',
    },
    {
      index: 2,
      shortTitle: 'Dobór legalnych zwolnień PCC-3',
      actorFocus: 'ewa',
      description:
        'Kupująca sprawdza w kalkulatorze legalne reguły podatkowe: standardowe 2% (920 zł), zwolnienie 0 zł dla osoby z niepełnosprawnością lub fakturę VAT.',
    },
    {
      index: 3,
      shortTitle: 'Korekta kwoty i zatwierdzenie',
      actorFocus: 'both',
      description:
        'Strony przywracają rzeczywistą kwotę transakcji (lub wybierają uprawnione zwolnienie ustawowe) i zatwierdzają deklarację.',
    },
    {
      index: 4,
      shortTitle: 'UPO z e-Urzędu Skarbowego',
      actorFocus: 'both',
      description:
        'Deklaracja PCC-3 trafia automatycznie do e-Urzędu Skarbowego z gwarancją zgodności rynkowej i zerowym ryzykiem wezwania do dopłaty.',
    },
  ],
};

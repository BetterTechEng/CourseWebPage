/* Language switch (EN default, PL on demand).
 *
 * English lives in index.html. Every translatable element carries data-i18n="key" (its innerHTML is replaced)
 * and/or data-i18n-attr="attribute:key;…" (attribute values). Polish lives in PL below, under the same keys.
 * Elements marked data-i18n-skip are left alone. A missing Polish key falls back to the English text.
 * To change a text: edit the English in index.html, then update the key here (i18n.missing() lists gaps).
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'lang';

  var PL = {
    // ---- page <head>
    'meta.title': 'AI-Driven QA Engineering | 8-tygodniowa edycja online dla specjalistów IT',
    'meta.description': 'Ośmiotygodniowa edycja online dla osób z doświadczeniem w projektach IT. Dołącz do Lumeo, szybko rosnącego sklepu internetowego, jako inżynier jakości i od podstaw zbuduj proces jakości oparty na AI, zanim platforma wystartuje.',
    'meta.ogTitle': 'AI-Driven QA Engineering — 8-tygodniowa edycja online',
    'meta.ogDescription': 'Nie ucz się tylko narzędzi AI. Naucz się inaczej myśleć i pracować. Jedna premiera, osiem etapów i AI na każdym kroku procesu jakości.',

    // ---- strings set from script
    'js.menu.open': 'Menu',
    'js.menu.close': 'Zamknij',
    'js.inquiry.seat': 'Zarezerwuj miejsce',
    'js.inquiry.question': 'Wyślij pytanie',
    'js.form.sending': 'Wysyłanie…',
    'js.form.unavailable': 'Usługa formularza nie jest jeszcze dostępna. Twoje dane nie zostały wysłane. Spróbuj ponownie, gdy będzie dostępna.',
    'js.form.success': 'Dziękujemy — zgłoszenie zostało wysłane. Odezwiemy się ze szczegółami edycji.',
    'js.form.timeout': 'Nie udało się potwierdzić dostarczenia w odpowiednim czasie. Twoje dane nadal są w formularzu. Zanim wyślesz ponownie, sprawdź, czy nie przyszła odpowiedź.',
    'js.form.error': 'Nie udało się potwierdzić dostarczenia. Twoje dane nadal są w formularzu. Spróbuj ponownie, gdy połączenie będzie dostępne.',

    // ---- skip link, header
    'skip.01': 'Przejdź do treści',
    'nav.01': 'AI-Driven QA Engineering<small>Otwarta edycja online · 8 tygodni</small>',
    'nav.02': 'Lumeo',
    'nav.03': 'Podróż',
    'nav.04': 'Tematy AI',
    'nav.05': 'Dla kogo',
    'nav.06': 'Edycja',
    'nav.07': 'FAQ',
    'nav.08': 'Zarezerwuj miejsce',
    'nav.09': 'Język',
    'nav.10': 'Menu główne',

    // ---- hero
    'hero.01': 'Otwarta edycja · Online',
    'hero.02': 'Dla osób z IT: testerów, analityków systemowych i analityków wymagań',
    'hero.03': 'Zostań inżynierem jakości, który wie, kiedy zaufać AI',
    'hero.04': 'Ośmiotygodniowa edycja online: jedna premiera, osiem etapów, AI na każdym kroku — a decyzje podejmujesz Ty.',
    'hero.05': 'Dołączasz do Lumeo, szybko rosnącego sklepu internetowego, jako inżynier jakości. Za osiem tygodni jego nowa platforma sprzedażowa wystartuje, a Ty od podstaw projektujesz proces jakości oparty na AI i uruchamiasz go w systemach Lumeo przed dniem premiery.',
    'hero.06': 'AI przygotowuje szkic. Ty weryfikujesz, decydujesz i dokumentujesz.',
    'hero.07': 'Zarezerwuj miejsce',
    'hero.08': 'Zobacz podróż',
    'hero.09': 'Format',
    'hero.10': '8 tygodni online · 2 spotkania na żywo w tygodniu',
    'hero.11': 'Dla kogo',
    'hero.12': 'Doświadczenie w projektach IT, bez wymogu programowania',
    'hero.13': 'Najbliższa edycja',
    'hero.14': '1 lut – 26 mar 2027',
    'hero.15': 'Lumeo · premiera platformy',
    'hero.16': 'Jesteś inżynierem jakości',
    'hero.17': 'Modele AI poznane',
    'hero.18': 'Który model jest do czego',
    'hero.19': 'Dzień 0',
    'hero.20': 'Proces jakości zmapowany',
    'hero.21': 'Decydujesz, gdzie działa model, a gdzie kod',
    'hero.22': 'Tydz. 1',
    'hero.23': 'Wymagania zweryfikowane',
    'hero.24': 'AI znajduje luki · Ty ustalasz kryteria akceptacji',
    'hero.25': 'Tydz. 2',
    'hero.26': 'Ryzyka przeanalizowane, testy zaprojektowane',
    'hero.27': 'AI proponuje przypadki · Ty szeregujesz ryzyka',
    'hero.28': 'Tydz. 3',
    'hero.29': 'Dane testowe wygenerowane',
    'hero.30': 'Realistyczne, bez danych klientów',
    'hero.31': 'Tydz. 4',
    'hero.32': 'Regresja zautomatyzowana',
    'hero.33': 'AI pisze testy · Ty dowodzisz, że wykrywają błędy',
    'hero.34': 'Tydz. 5',
    'hero.35': 'Powtarzalne narzędzie AI gotowe',
    'hero.36': 'Za każdym razem ten sam wynik',
    'hero.37': 'Tydz. 6',
    'hero.38': 'Jeden zintegrowany proces',
    'hero.39': 'Punkty kontroli między etapami',
    'hero.40': 'Tydz. 7',
    'hero.41': 'Dzień premiery za Tobą',
    'hero.42': 'Twój proces spotyka prawdziwe wydanie',
    'hero.43': 'Tydz. 8',
    'hero.44': 'AI wykonuje żmudną pracę. Ty pozostajesz sędzią jakości.',
    'hero.45': 'Twoje osiem tygodni w programie: jedna premiera, osiem etapów, dwa spotkania na żywo w tygodniu.',

    // ---- 01 why now
    'why.01': '01 / Dlaczego teraz',
    'why.02': 'AI buduje oprogramowanie szybciej.<br>Twoje kompetencje jakościowe muszą dotrzymać kroku.',
    'why.03': '<strong>SDLC — Software Development Lifecycle (cykl życia oprogramowania):</strong> ludzie planują, budują i testują etapami.',
    'why.04': '<strong>ADLC — AI Development Lifecycle:</strong> agentowa AI buduje, testuje i naprawia kod w ciągłej pętli, a ludzie wyznaczają kierunek, recenzują i decydują.',
    'why.05': 'Więcej generowanego kodu to więcej decyzji o zaufaniu. <strong>Jakość nie jest już ostatnim punktem kontrolnym. Ciągła jakość sprawia, że tempo AI da się wykorzystać biznesowo.</strong>',
    'why.06': 'Nowy Model Cyklu Wytwarzania Oprogramowania',
    'why.10': 'Porównanie SDLC i ADLC',
    'why.07': 'Tempo AI w tworzeniu oprogramowania wymaga tempa AI w jakości — i specjalistów, którzy wiedzą, kiedy nie ufać AI.',
    'why.08': 'Porównanie SDLC, hybrydowego SDLC i ADLC',
    'lc.01': 'SDLC vs. ADLC',
    'lc.02': 'Porównanie tradycyjnego cyklu wytwarzania oprogramowania, modelu hybrydowego z agentami AI oraz cyklu tworzenia rozwiązań zorientowanego na AI w inżynierii jakości (QA)',
    'lc.03': 'SDLC',
    'lc.04': 'Cykl wytwarzania oprogramowania',
    'lc.s1.t': 'Wymagania',
    'lc.s1.s': 'Zbieranie wymagań, analiza',
    'lc.s1.d': 'Wymaga szerokiego zaangażowania interesariuszy, wielu analityków oraz product managerów.',
    'lc.s1.c': '1 osoba',
    'lc.s2.t': 'Projektowanie',
    'lc.s2.s': 'Architektura systemu, bazy danych, UI',
    'lc.s2.d': 'Angażuje architektów, głównych deweloperów oraz projektantów interfejsu i UX/UI.',
    'lc.s2.c': '1 osoba',
    'lc.s3.t': 'Implementacja',
    'lc.s3.s': 'Programowanie, tworzenie oprogramowania',
    'lc.s3.d': 'Kluczowy zespół programistów front-end, back-end i full-stack.',
    'lc.s3.c': '4 osoby',
    'lc.s4.t': 'Testowanie',
    'lc.s4.s': 'QA, testy manualne, automatyzacja',
    'lc.s4.d': 'Dedykowani inżynierowie QA oraz specjaliści ds. automatyzacji testów.',
    'lc.s4.c': '3 osoby',
    'lc.s5.t': 'Wdrożenie',
    'lc.s5.s': 'Wydanie, konfiguracja środowiska',
    'lc.s5.d': 'Zespoły DevOps oraz menedżerowie wydań (release managerzy).',
    'lc.s5.c': '2 osoby',
    'lc.s6.t': 'Utrzymanie',
    'lc.s6.s': 'Wsparcie, aktualizacje, poprawki',
    'lc.s6.d': 'Ciągłe wsparcie zespołu oraz deweloperzy zajmujący się poprawkami.',
    'lc.s6.c': '2 osoby',
    'lc.05': 'Hybrydowy SDLC',
    'lc.06': 'Ekspertyza człowieka + realizacja przez AI',
    'lc.h1.t': 'Agentowe wymagania',
    'lc.h1.s': 'Określenie celów agentów, zabezpieczeń (guardrails) i kontekstu',
    'lc.h1.r': 'Właściciel produktu',
    'lc.h1.c': '1 osoba + 1 agent AI',
    'lc.h1.d': 'Człowiek kieruje agentami AI w procesie odkrywania i walidacji wymagań.',
    'lc.h2.t': 'Agentowe projektowanie',
    'lc.h2.s': 'Określenie narzędzi agentów, pamięci i przepływów pracy',
    'lc.h2.r': 'Architekt oprogramowania',
    'lc.h2.c': '1 osoba + 1 agent AI',
    'lc.h2.d': 'Człowiek definiuje strukturę systemu, architekturę i ograniczenia.',
    'lc.h3.t': 'Agentowa implementacja',
    'lc.h3.s': 'Promptowanie, dostrajanie (fine-tuning), integracja',
    'lc.h3.r': 'Deweloper oprogramowania',
    'lc.h3.c': '2 osoby + 1 agent AI',
    'lc.h3.d': 'Ludzie konfigurują i promptują agentów, integrują komponenty, a agenci AI piszą kod i samodzielnie go korygują.',
    'lc.h4.t': 'Agentowa jakość i testowanie',
    'lc.h4.s': 'Benchmarking, jakość, zgodność (alignment)',
    'lc.h4.r': 'Inżynier QA',
    'lc.h4.c': '1 osoba + 1 agent AI',
    'lc.h4.d': 'Człowiek definiuje metryki testów. Agenci AI prowadzą szeroko zakrojone, równoległe ewaluacje, dostarczają raporty i analizują wąskie gardła systemu.',
    'lc.h5.t': 'Agentowe wdrożenie',
    'lc.h5.s': 'Orkiestracja, skalowanie, zarządzanie',
    'lc.h5.r': 'DevOps',
    'lc.h5.c': '1 osoba + 1 agent AI',
    'lc.h5.d': 'Człowiek zarządza potokiem wdrożeniowym, a agenci AI skalują i optymalizują infrastrukturę.',
    'lc.h6.t': 'Agentowe utrzymanie',
    'lc.h6.s': 'Monitorowanie, uczenie się, adaptacja',
    'lc.h6.r': 'Wsparcie IT',
    'lc.h6.c': '1 osoba + 1 agent AI',
    'lc.h6.d': 'Człowiek ustala cele wydajnościowe, a agenci AI monitorują system, uczą się i dynamicznie dostosowują swoje działanie.',
    'lc.07': 'ADLC',
    'lc.08': 'Cykl tworzenia rozwiązań zorientowany na AI',
    'lc.a1.t': 'Architekt biznesowy',
    'lc.a1.s': 'Określenie celów agentów, zabezpieczeń (guardrails) i kontekstu',
    'lc.a1.c': '1 osoba + 2 agentów AI',
    'lc.a1.d': 'Człowiek kieruje agentami AI w procesie odkrywania, walidacji wymagań oraz zapewnienia zgodności biznesowej.',
    'lc.a2.t': 'Inżynier AI',
    'lc.a2.s': 'Twórca oprogramowania',
    'lc.a2.c': '2 osoby + 4 agentów AI',
    'lc.a2.d': 'Człowiek pełni rolę głównego orkiestratora w zakresie projektowania, tworzenia, testowania i wdrażania oprogramowania z wykorzystaniem dedykowanych agentów AI.',
    'lc.a3.t': 'Architekt systemowy',
    'lc.a3.s': 'Architektura agentowa, protokoły kontekstu i izolacja bezpieczeństwa (sandboxing)',
    'lc.a3.c': '1 osoba + 2 agentów AI',
    'lc.a3.d': 'Człowiek definiuje pełną architekturę rozwiązania, przepływ danych, technologie systemowe oraz strategię działania agentów.',
    'lc.09': 'Dostawa sekwencyjna',
    'lc.10': 'Hybrydowy SDLC',
    'lc.11': 'Ciągła jakość',
    'lc.12': 'Legenda',
    'lc.13': 'Człowiek',
    'lc.14': 'Agent AI',

    // ---- 02 mindset
    'mindset.01': '02 / Zmiana sposobu myślenia',
    'mindset.02': 'Nauka narzędzi AI to łatwa część.<br>Liczy się zmiana sposobu pracy.',
    'mindset.03': 'AI staje się częścią codziennej pracy nad oprogramowaniem i jakością, a nie okazjonalnym dodatkiem. To wymaga nowego sposobu myślenia, nie tylko nowych umiejętności.',
    'mindset.04': 'Od tradycyjnego QA do QA wspieranego przez AI',
    'mindset.05': 'Wymiar',
    'mindset.06': 'Tradycyjne QA',
    'mindset.07': 'QA wspierane przez AI',
    'mindset.08': 'Rola',
    'mindset.09': 'Wykonuje przypadki testowe i zgłasza defekty',
    'mindset.10': '<strong>Quality Orchestration</strong> — kieruje agentami AI w całym cyklu',
    'mindset.11': 'Czas',
    'mindset.12': 'Testy na końcu, przed wydaniem',
    'mindset.13': '<strong>Continuous Quality</strong> — informacja zwrotna na każdym kroku ADLC',
    'mindset.14': 'Fokus',
    'mindset.15': 'Próbuje pokryć wszystko po równo',
    'mindset.16': '<strong>Risk-Based Testing</strong> — wysiłek podąża za wpływem na biznes',
    'mindset.17': 'Wynik AI',
    'mindset.18': 'Zaufany albo ignorowany',
    'mindset.19': '<strong>Human-in-the-Loop &amp; Critical Thinking</strong> — sprawdzany w <strong>AI Verification Loop</strong>',
    'mindset.20': 'Automatyzacja',
    'mindset.21': 'Skrypty pisane i naprawiane ręcznie',
    'mindset.22': '<strong>AI-Assisted Automation</strong> — AI pisze szkice testów, QA je recenzuje i dowodzi, że wykrywają defekty',
    'mindset.23': 'Odpowiedzialność',
    'mindset.24': 'QA to bramka należąca do jednego zespołu',
    'mindset.25': '<strong>Quality Ownership</strong> — zdefiniowana i dzielona między role',
    'mindset.26': 'Przewijane porównanie tradycyjnego QA i QA wspieranego przez AI',

    // ---- 03 quality ownership
    'role.01': '03 / Odpowiedzialność za jakość',
    'role.02': 'Granice QA się zacierają.<br>Odpowiedzialność za jakość — nie.',
    'role.03': 'QA, programowanie i analiza biznesowa coraz bardziej się nakładają. Ktoś wciąż musi odpowiadać na pytanie „czy możemy to wypuścić?”',
    'role.04': 'Dzięki AI programiści generują testy, analitycy walidują wymagania, a inżynierowie QA piszą kod z agentami. Ta edycja przygotowuje Cię do podejmowania tych decyzji — popartych dowodami — niezależnie od tego, co jeszcze obejmuje Twoja rola w zespole.',
    'role.05': 'Ewolucja roli',
    'role.06': 'Ekspertyza zostaje · Zakres rośnie',
    'role.07': 'Nakładające się obowiązki.',
    'role.08': 'Inżynierowie QA piszą kod z agentami AI',
    'role.09': 'Programiści generują testy z AI',
    'role.10': 'Analitycy biznesowi walidują wymagania z AI',
    'role.11': 'DevOps automatyzuje bramki jakości',
    'role.12': 'Wszyscy używają AI codziennie',
    'role.13': 'AI Development Lifecycle',
    'role.14': 'Agentowa AI.',
    'role.15': 'Analizuje wymagania',
    'role.16': 'Generuje kod i testy',
    'role.17': 'Wykonuje i samonaprawia',
    'role.18': 'Segreguje awarie',
    'role.19': 'Agenci przyspieszają pracę.<br>Ludzie zachowują osąd.',
    'role.20': 'Właściciel jakości',
    'role.21': 'Inżynier QA<br> wspierany przez AI',
    'role.22': 'Orkiestruje AI w całym cyklu i odpowiada za dowody stojące za każdą decyzją o wydaniu.',
    'role.23': 'Orkiestruj agentów.',
    'role.24': 'Oceniaj wyniki.',
    'role.25': 'Odpowiadaj za jakość.',
    'role.26': 'Gdy obowiązki QA, programowania i analizy biznesowej się zbliżają, inżynier QA wspierany przez AI utrzymuje jasną odpowiedzialność za jakość w całym AI Development Lifecycle.',

    // ---- 04 learning outcomes
    'outcomes.01': '04 / Efekty uczenia się',
    'outcomes.02': 'Co będziesz potrafić.',
    'outcomes.03': 'Osiem działających rozwiązań, a każde oceniane na podstawie tego, co wytworzysz — nie quizu. W każdym z nich: AI Verification Loop, dzięki któremu wyłapujesz błędy AI, zanim trafią do wydania.',
    'outcomes.04': 'Kwestionować wymagania z pomocą AI.',
    'outcomes.05': 'Znajdziesz luki i sprzeczności w specyfikacji, odrzucisz zmyślone wymagania i zamienisz to, co zostanie, w zweryfikowane wymagania z kryteriami akceptacji.',
    'outcomes.06': 'Zaprojektować proces jakości AI-first.',
    'outcomes.07': 'Zmapujesz proces i zdecydujesz, gdzie powinien działać model, a gdzie kod.',
    'outcomes.08': 'Analizować ryzyko i projektować testy.',
    'outcomes.09': 'Uszeregujesz to, co może pójść źle przy premierze, zamienisz ryzyka w przypadki testowe i wychwycisz luki w pokryciu zestawu wygenerowanego przez AI.',
    'outcomes.10': 'Pracować z chronionymi danymi.',
    'outcomes.11': 'Zbudujesz generator realistycznych danych testowych, gdy nie wolno użyć prawdziwych danych klientów.',
    'outcomes.12': 'Automatyzować regresję.',
    'outcomes.13': 'Zrecenzujesz kod testów wygenerowany przez AI, zbudujesz zautomatyzowany zestaw i pokażesz, że zawodzi, gdy produkt jest zepsuty.',
    'outcomes.14': 'Uczynić AI powtarzalną i odpowiadać za wydanie.',
    'outcomes.15': 'Zbudujesz narzędzie o powtarzalnym wyniku, połączysz wszystko w jeden proces z punktami kontroli i uruchomisz go w dniu premiery.',

    // ---- 05 the case
    'lumeo.01': '05 / Studium przypadku',
    'lumeo.02': 'Ćwicz na prawdziwej aplikacji,<br>nie na slajdach.',
    'lumeo.03': 'Lumeo to szybko rosnący sklep internetowy zbudowany na potrzeby tego programu. Działa na Twoim laptopie i zachowuje się jak prawdziwy produkt — z defektami, które masz znaleźć.',
    'lumeo.04': 'Scenariusz',
    'lumeo.05': 'Lumeo za osiem tygodni uruchamia nową platformę sprzedażową, a dotychczasowy sposób dbania o jakość nie nadąża za tempem zmian. <strong>Dołączasz jako inżynier jakości. Twoja misja: zaprojektować od podstaw proces jakości oparty na AI i uruchomić go w systemach Lumeo przed dniem premiery.</strong>',
    'lumeo.06': 'UI',
    'lumeo.07': 'Sklep internetowy',
    'lumeo.08': 'Katalog, strona produktu, koszyk, kasa i historia zamówień. Stabilne identyfikatory testowe do automatyzacji.',
    'lumeo.09': 'API',
    'lumeo.10': 'REST API',
    'lumeo.11': 'Dokumentacja OpenAPI pod adresem <code>/api/docs</code>, logowanie tokenem, kody błędów i nagłówek <code>X-Request-Id</code> w każdej odpowiedzi do śledzenia.',
    'lumeo.12': 'DB',
    'lumeo.13': 'Baza SQLite',
    'lumeo.14': 'Odpytuj zamówienia, stany magazynowe i płatności bezpośrednio — na przykład w DB Browser for SQLite — i sprawdzaj to, czego nie pokazuje interfejs.',
    'lumeo.15': 'Co będziesz testować',
    'lumeo.16': 'Logowanie fikcyjnych użytkowników: standardowego, VIP i zablokowanego',
    'lumeo.17': 'Wyszukiwanie w katalogu, filtry, sortowanie i stany magazynowe',
    'lumeo.18': 'Warianty produktów i limity ilości',
    'lumeo.19': 'Sumy w koszyku i VAT',
    'lumeo.20': 'Kody rabatowe procentowe i kwotowe wraz z ich regułami',
    'lumeo.21': 'Darmowa dostawa powyżej progu',
    'lumeo.22': 'Kasa z walidacją adresu i metodami dostawy',
    'lumeo.23': 'Płatności testowe: sukces, odrzucenie i przekroczenie czasu',
    'lumeo.24': 'Co dostajesz w zestawie',
    'lumeo.25': 'Dokument wymagań dla nowego koszyka i płatności, z historyjkami użytkownika i kryteriami akceptacji — oraz lukami, jakie mają prawdziwe wymagania',
    'lumeo.26': 'Wersja 1 i wersja 2 wraz z notą wydania nowej wersji',
    'lumeo.27': 'Start jedną komendą: <code>npm install &amp;&amp; npm start</code>',
    'lumeo.28': 'GitHub Codespaces jako gotowe środowisko zapasowe',
    'lumeo.29': 'Wyłącznie fikcyjne dane: użytkownicy, produkty i karty testowe',

    // ---- 06 journey
    'journey.01': '06 / AI-Driven QA Journey',
    'journey.02': 'Jedna premiera. Osiem etapów.<br>Osiem tygodni.',
    'journey.03': 'Śledzisz premierę nowej platformy Lumeo od pierwszego dnia do dnia wydania. Każdy etap zaczyna się od wydarzenia w Lumeo, a nie od tematu do przerobienia, i kończy działającym rozwiązaniem, które po sobie zostawiasz.',
    'journey.04': 'AI-Driven QA Journey — Dzień zero i osiem etapów',
    'journey.05': 'Etap',
    'journey.06': 'Termin',
    'journey.07': 'Co się dzieje w Lumeo',
    'journey.08': 'Co zostawiasz w Lumeo',
    'journey.09': 'Dzień zero',
    'journey.10': 'Luty',
    'journey.11': 'Nauka modeli AI. Który model jest do czego?',
    'journey.12': 'Przewodnik: który model jest do czego',
    'journey.13': 'Pierwszy dzień',
    'journey.14': '1–5 lut.',
    'journey.15': 'Poznajesz systemy, zespół i skalę problemu. Decydujesz, gdzie będzie działał model, a gdzie kod.',
    'journey.16': 'Mapa procesu jakości AI-first',
    'journey.17': 'Wymagania, których nikt nie doczytał',
    'journey.18': '8–12 lut.',
    'journey.19': 'Dostajesz specyfikację nowego koszyka i płatności, pełną luk i sprzeczności.',
    'journey.20': 'Zweryfikowane wymagania z kryteriami akceptacji',
    'journey.21': 'Co może pójść źle',
    'journey.22': '15–19 lut.',
    'journey.23': 'Zarząd pyta, co grozi premierze. Musisz to wiedzieć, zanim powstanie pierwszy test.',
    'journey.24': 'Analiza ryzyka i zestaw przypadków testowych',
    'journey.25': 'Dane, których nie wolno użyć',
    'journey.26': '22–26 lut.',
    'journey.27': 'Dane klientów są chronione, a testy potrzebują realistycznych danych.',
    'journey.28': 'Generator danych testowych',
    'journey.29': 'Regresja przed każdym wydaniem',
    'journey.30': '1–5 mar.',
    'journey.31': 'Wydania przyspieszają i ręczne sprawdzanie przestaje wystarczać.',
    'journey.32': 'Działający zestaw testów automatycznych',
    'journey.33': 'Ten sam wynik za każdym razem',
    'journey.34': '8–12 mar.',
    'journey.35': 'Model raz odpowiada tak, raz inaczej, a w tym miejscu procesu to niedopuszczalne.',
    'journey.36': 'Własne narzędzie o powtarzalnym wyniku',
    'journey.37': 'Jeden ciąg',
    'journey.38': '15–19 mar.',
    'journey.39': 'Pojedyncze rozwiązania muszą zacząć działać jako całość, z punktami kontroli.',
    'journey.40': 'Zintegrowany proces jakości',
    'journey.41': 'Dzień premiery',
    'journey.42': '22–26 mar.',
    'journey.43': 'Nowa platforma rusza. Twój proces przechodzi sprawdzian na prawdziwym wydaniu.',
    'journey.44': 'Wdrożony proces i jego opis, gotowy do zastosowania w dowolnym projekcie',
    'journey.45': 'Jak to działa · 1',
    'journey.46': 'Jedno universum od początku do końca',
    'journey.47': 'Każdy etap zaczyna się od wydarzenia w Lumeo, a nie od tematu do przerobienia.',
    'journey.48': 'Jak to działa · 2',
    'journey.49': 'Zwroty akcji',
    'journey.50': 'W trakcie podróży sytuacja się zmienia: wymaganie zostaje przepisane, termin wydania przesunięty. Twój proces musi to wytrzymać.',
    'journey.51': 'Jak to działa · 3',
    'journey.52': 'Rezultaty zamiast zaliczeń',
    'journey.53': 'Po ośmiu etapach masz osiem działających rozwiązań, które razem tworzą kompletny proces i są dowodem Twoich kompetencji, niezależnie od branży i stanowiska.',
    'journey.54': 'Jak to działa · 4',
    'journey.55': 'Rytm',
    'journey.56': 'Dwa spotkania na żywo w tygodniu i samodzielne działanie w systemach Lumeo, łącznie 4–6 godzin tygodniowo.',
    'journey.57': 'Przez cały czas prowadzisz dziennik AI: każdy wynik AI wraz z Twoją decyzją.',
    'journey.58': 'Zarezerwuj miejsce',
    'journey.59': 'Przewijane etapy AI-Driven QA Journey',

    // ---- 07 AI topics
    'topics.01': '07 / Tematy AI',
    'topics.02': 'Umiejętności AI, uczone dokładnie<br>tam, gdzie ich potrzebujesz.',
    'topics.03': 'Szesnaście tematów specyficznych dla AI, każdy wprowadzany w samą porę w krótkim „Theory in Brief” i ćwiczony na wynikach AI zawierających celowe błędy.',
    'topics.04': 'AI Verification Loop',
    'topics.05': 'Kontekst',
    'topics.06': 'Prompt',
    'topics.07': 'Wynik AI',
    'topics.08': 'Weryfikacja',
    'topics.09': 'Decyzja człowieka',
    'topics.10': 'Udokumentowanie',
    'topics.11': '<strong>AI przygotowuje szkic, Ty decydujesz.</strong> Odpowiedzialność za jakość zostaje przy Tobie.',
    'topics.12': '<strong>Każde twierdzenie AI wymaga dowodu:</strong> linijki wymagań, odpowiedzi API, logu lub wyniku testu.',
    'topics.13': 'Nie wklejaj niczego, czego nie opublikowałbyś na publicznym forum.',
    'topics.14': 'Etapy 0–2',
    'topics.15': 'Modele, proces i wymagania',
    'topics.16': '<strong>Human-in-the-loop</strong> i odpowiedzialność',
    'topics.17': '<strong>Prompting dla QA:</strong> rola, kontekst, zadanie, format wyniku, ograniczenia',
    'topics.18': '<strong>Kontekst:</strong> co i ile przekazać modelowi',
    'topics.19': '<strong>Halucynacje:</strong> wymagania, endpointy i API, które nie istnieją',
    'topics.20': 'Nadmierna pewność i przytakiwanie',
    'topics.21': 'Etapy 3–4',
    'topics.22': 'Ryzyka, testy i dane',
    'topics.23': '<strong>Iluzja pokrycia</strong> w testach generowanych przez AI',
    'topics.24': '<strong>Problem wyroczni</strong> i błędy arytmetyczne AI',
    'topics.25': '<strong>Dane testowe z AI</strong>, które tylko wyglądają na poprawne',
    'topics.26': '<strong>Bezpieczeństwo, poufność</strong> i prompt injection',
    'topics.27': 'Etapy 5–6',
    'topics.28': 'Automatyzacja i powtarzalność',
    'topics.29': '<strong>Kod testów generowany przez AI:</strong> słabe asercje, stałe oczekiwania, kruche lokatory',
    'topics.30': '<strong>Agenci AI w IDE:</strong> poziomy autonomii i przegląd każdego diffa',
    'topics.31': '<strong>Niedeterminizm:</strong> dlaczego odpowiedzi się różnią i jak uzyskać powtarzalny wynik',
    'topics.32': 'Etapy 7–8',
    'topics.33': 'Proces i premiera',
    'topics.34': '<strong>Raporty błędów pisane przez AI:</strong> zmyślone kroki i domysły podane jako fakty',
    'topics.35': '<strong>Analiza przyczyn źródłowych z AI:</strong> hipotezy sprawdzane na dowodach',
    'topics.36': '<strong>Raportowanie i decyzje o wydaniu</strong> bez zmyślonych metryk',
    'topics.37': '<strong>Ocena wyników AI</strong> za pomocą rubryk i mini-ewaluacji',
    'topics.38': 'Wspierane przez narzędzia, ale od nich niezależne.',
    'topics.39': 'Każde wyzwanie da się wykonać w dowolnym z tych asystentów. Wystarczy darmowy plan; płatny jest zalecany.',
    'topics.40': 'GitHub Copilot',
    'topics.41': 'Generuj i recenzuj kod testów w VS Code. Sprawdzaj, co zmienia agent, zanim to zaakceptujesz.',
    'topics.42': 'W programie: zamień zrecenzowany scenariusz w test automatyczny.',
    'topics.43': 'Claude',
    'topics.44': 'Analizuj wymagania i przygotowuj ryzyka, przypadki brzegowe i pytania do Product Ownera.',
    'topics.45': 'W programie: zbuduj rejestr ryzyk na podstawie wymagań.',
    'topics.46': 'Gemini',
    'topics.47': 'Oglądaj razem zrzuty ekranu i dokumentację i wskaż stany, które trzeba sprawdzić.',
    'topics.48': 'W programie: zaplanuj sesję eksploracyjną nowego koszyka i płatności.',
    'topics.49': 'ChatGPT',
    'topics.50': 'Kwestionuj strategię testów, proponuj dane testowe i przygotuj szkic raportu z podanych przez Ciebie faktów.',
    'topics.51': 'W programie: zamień ryzyka w plan testów gotowy do recenzji.',
    'topics.52': 'Nazwy i znaki należą do ich właścicieli. Ich użycie nie oznacza poparcia.',
    'topics.53': 'Kroki AI Verification Loop',
    'topics.54': 'Logo GitHub Copilot',
    'topics.55': 'Logo Claude',
    'topics.56': 'Logo Google Gemini',
    'topics.57': 'Logo OpenAI dla ChatGPT',

    // ---- 08 recognition
    'recognition.01': '08 / Potwierdzenie kompetencji',
    'recognition.02': 'Dowód kompetencji,<br>a nie certyfikat uczestnictwa.',
    'recognition.03': 'Nie ma certyfikatu. Wychodzisz z ośmioma działającymi rozwiązaniami i opisanym procesem — dowodem Twoich kompetencji, niezależnie od branży i stanowiska.',
    'recognition.04': 'Twoje portfolio to osiem rozwiązań zbudowanych w Lumeo, przechowywanych we własnym repozytorium, oraz opis procesu jakości, który możesz zastosować w dowolnym projekcie.',
    'recognition.05': 'Mapa procesu jakości AI-first',
    'recognition.06': 'Zweryfikowane wymagania z kryteriami akceptacji',
    'recognition.07': 'Analiza ryzyka i zestaw przypadków testowych',
    'recognition.08': 'Generator danych testowych',
    'recognition.09': 'Działający zestaw testów automatycznych',
    'recognition.10': 'Narzędzie o powtarzalnym wyniku',
    'recognition.11': 'Zintegrowany proces jakości',
    'recognition.12': 'Wdrożony proces i jego opis',
    'recognition.13': 'W cenie',
    'recognition.14': 'Portfolio działających rozwiązań',
    'recognition.15': 'Osiem etapów, a każdy kończy się rozwiązaniem działającym w systemach Lumeo.',
    'recognition.16': 'W cenie',
    'recognition.17': 'Informacja zwrotna do efektów uczenia się',
    'recognition.18': 'Twoje rozwiązania są oceniane według przejrzystych rubryk, odniesionych do efektów uczenia się.',
    'recognition.19': 'W cenie',
    'recognition.20': 'Samoocena przed i po',
    'recognition.21': 'Te same stwierdzenia i krótki test scenariuszowy przed programem i po nim, aby Twój postęp był widoczny.',
    'recognition.22': 'Planowane',
    'recognition.23': 'Mikropoświadczenia',
    'recognition.24': 'Rozważane dla kolejnych edycji. Nie są częścią obecnej oferty.',

    // ---- 09 who it's for
    'fit.01': '09 / Dla kogo',
    'fit.02': 'Czy ta edycja jest dla Ciebie?',
    'fit.03': 'To dobre dopasowanie, jeśli…',
    'fit.04': 'Masz doświadczenie w projektach IT, na przykład w testowaniu, analizie systemowej lub analizie wymagań.',
    'fit.05': 'Chcesz zbudować uniwersalne kompetencje jakości oparte na AI, które zastosujesz w dowolnym projekcie.',
    'fit.06': 'Nie musisz umieć programować ani zajmować się obecnie jakością — nic z tego nie jest wymagane.',
    'fit.07': 'Możesz poświęcić na aktywną pracę 4–6 godzin tygodniowo, na spotkaniach na żywo i samodzielnie.',
    'fit.08': 'To nie jest dobre dopasowanie, jeśli…',
    'fit.09': 'Nie masz jeszcze doświadczenia w projektach IT.',
    'fit.10': 'Szukasz certyfikatu lub przygotowania do egzaminu.',
    'fit.11': 'Chcesz tylko listy promptów lub przeglądu narzędzi AI.',
    'fit.12': 'Oczekujesz, że AI zastąpi ludzki osąd i recenzję.',
    'fit.13': 'Czego potrzebujesz',
    'fit.14': 'Konto w co najmniej jednym asystencie AI: ChatGPT, Claude, Gemini lub Copilot. <strong>Wystarczy darmowy plan</strong>; płatny jest zalecany.',
    'fit.15': 'Laptop, na którym możesz instalować oprogramowanie: Chrome lub Edge, VS Code, Node.js LTS i Git. Dostajesz przewodnik instalacji. Alternatywa: GitHub Codespaces.',
    'fit.16': 'Czego od Ciebie oczekujemy',
    'fit.17': 'Zgody pracodawcy na używanie AI. W programie pracujesz <strong>wyłącznie na fikcyjnych danych</strong>.',
    'fit.18': 'Otwartości na zmianę sposobu pracy i czasu na 4–6 godzin tygodniowo przez osiem tygodni.',

    // ---- 10 trainer
    'trainer.01': '10 / Twój trener',
    'trainer.02': 'Zdjęcie trenera<br>Wkrótce',
    'trainer.03': 'Szczegóły wkrótce',
    'trainer.04': 'Twój trener.',
    'trainer.05': 'Imię i nazwisko trenera, doświadczenie i tło zawodowe zostaną opublikowane razem z terminami edycji.',
    'trainer.06': 'Profil będzie skupiony na inżynierii jakości, automatyzacji testów i wykorzystaniu AI w codziennej pracy testowej.',
    'trainer.07': 'Zdjęcie trenera nie zostało jeszcze dostarczone',

    // ---- 11 the cohort
    'cohort.01': '11 / Edycja',
    'cohort.02': 'Najbliższa edycja:<br>1 lut – 26 mar 2027.',
    'cohort.03': 'Osiem tygodni, online, w małej grupie. Osobne edycje prowadzimy po angielsku i po polsku.',
    'cohort.04': 'Czas trwania',
    'cohort.05': '8 tygodni + Dzień zero',
    'cohort.06': 'Spotkania na żywo',
    'cohort.07': '2 w tygodniu',
    'cohort.08': 'Nakład pracy tygodniowo',
    'cohort.09': 'Łącznie 4–6 godz.',
    'cohort.10': 'Wielkość grupy',
    'cohort.11': '8–16 uczestników',
    'cohort.12': 'Cena',
    'cohort.13': 'Wkrótce',
    'cohort.14': 'Dzień zero · luty',
    'cohort.15': 'Nauka modeli AI',
    'cohort.16': 'Który model jest do czego? Pakiet powitalny i przewodnik instalacji. Uruchom Lumeo na swoim laptopie i potwierdź to zrzutem ekranu. Samoocena „przed”.',
    'cohort.17': 'Tygodnie 1–4 · 1–26 lut.',
    'cohort.18': 'Etapy 1–4',
    'cohort.19': 'Zmapuj proces jakości, zweryfikuj wymagania, przeanalizuj ryzyka i zaprojektuj przypadki testowe, wygeneruj dane testowe.',
    'cohort.20': 'Tygodnie 5–8 · 1–26 mar.',
    'cohort.21': 'Etapy 5–8',
    'cohort.22': 'Zautomatyzuj regresję, zbuduj narzędzie o powtarzalnym wyniku, połącz wszystko w jeden proces i uruchom go w dniu premiery. Samoocena „po”.',
    'cohort.23': 'Po edycji',
    'cohort.24': '30 dni wsparcia',
    'cohort.25': 'Końcowy Workbook, Twoje portfolio, nagrania i kanał społeczności. Krótka ankieta po 30 dniach: co udało się zastosować w praktyce?',
    'cohort.26': 'W cenie',
    'cohort.27': 'Dwa spotkania na żywo w tygodniu z trenerem',
    'cohort.28': 'Samodzielna praca w systemach Lumeo między spotkaniami',
    'cohort.29': 'Aplikacja Lumeo, jej dokument wymagań i gotowe repozytorium testów',
    'cohort.30': 'Karty wyzwań, bank promptów i checklisty weryfikacji AI',
    'cohort.31': 'Checklisty do raportów błędów, recenzji kodu testów AI i raportów z testów',
    'cohort.32': 'Workbook po każdym etapie z rozwiązaniami wzorcowymi i kryteriami oceny',
    'cohort.33': 'Informacja zwrotna do Twoich rozwiązań względem efektów uczenia się',
    'cohort.34': 'Kanał społeczności edycji',
    'cohort.35': 'Dostęp po zakończeniu edycji',
    'cohort.36': '<strong>Na stałe:</strong> repozytorium Lumeo i Workbook',
    'cohort.37': '<strong>Na stałe:</strong> Twoje własne repozytorium z portfolio',
    'cohort.38': '<strong>30 dni:</strong> nagrania spotkań (nagrywane za zgodą uczestników)',
    'cohort.39': '<strong>30 dni:</strong> kanał społeczności',
    'cohort.40': 'Cena zostanie podana przed otwarciem rezerwacji. Zapłacić możesz Ty lub Twój pracodawca. Rezerwacja miejsca jest bezpłatna i do niczego Cię nie zobowiązuje.',
    'cohort.41': 'Zarezerwuj miejsce',
    'cohort.42': 'Harmonogram edycji',

    // ---- 12 results
    'results.01': '12 / Wyniki',
    'results.02': 'Opinie uczestników.',
    'results.03': 'Pierwsza edycja to pilotaż.',
    'results.04': 'Opinie uczestników i wyniki opublikujemy po jej zakończeniu. Mierzymy zadowolenie po każdym etapie, postępy w efektach uczenia się oraz to, co uczestnicy stosują w praktyce 30 dni później.',

    // ---- 13 FAQ
    'faq.01': '13 / Pytania',
    'faq.02': 'FAQ',
    'faq.03': 'Czy potrzebuję płatnej subskrypcji AI?',
    'faq.04': 'Nie. Darmowy plan ChatGPT, Claude, Gemini lub GitHub Copilot wystarczy do każdego wyzwania. Płatny plan jest zalecany, bo daje dłuższe rozmowy i mniej limitów.',
    'faq.05': 'Jakiego sprzętu i oprogramowania potrzebuję?',
    'faq.06': 'Laptopa, na którym możesz instalować oprogramowanie, z Chrome lub Edge, VS Code, Node.js LTS i Git. Przewodnik instalacji przeprowadzi Cię przez ten proces, a w Dniu zero sprawdzasz, czy Lumeo działa, zanim zacznie się pierwszy etap. Jeśli lokalna instalacja nie jest możliwa, możesz użyć GitHub Codespaces w przeglądarce.',
    'faq.07': 'Czy muszę umieć programować?',
    'faq.08': 'Nie. Nie musisz umieć programować ani zajmować się obecnie jakością. Potrzebujesz za to doświadczenia w projektach IT — na przykład w testowaniu, analizie systemowej lub analizie wymagań. AI pomaga w częściach technicznych, a Ty weryfikujesz efekty.',
    'faq.09': 'Ile to zajmuje czasu?',
    'faq.10': 'Osiem tygodni z dwoma spotkaniami na żywo w tygodniu i samodzielną pracą w systemach Lumeo — łącznie 4–6 godzin tygodniowo, plus krótki onboarding w Dniu zero. Dni i godziny spotkań podamy razem z terminami.',
    'faq.11': 'Czy dostanę certyfikat?',
    'faq.12': 'Nie. Dostajesz osiem działających rozwiązań i opisany proces jako dowód swoich kompetencji, a do tego informację zwrotną do swojej pracy. Mikropoświadczenia mogą pojawić się w kolejnych edycjach, ale nie są częścią obecnej oferty.',
    'faq.13': 'Czy będę używać danych lub kodu mojej firmy?',
    'faq.14': 'Nie. Wszystko dzieje się w Lumeo na fikcyjnych użytkownikach, produktach i danych płatniczych. Zgodę pracodawcy na używanie narzędzi AI warto jednak mieć.',
    'faq.15': 'Co, jeśli opuszczę spotkanie?',
    'faq.16': 'Spotkania są nagrywane za zgodą uczestników, a nagrania pozostają dostępne przez 30 dni. Workbook po każdym etapie zawiera rozwiązania wzorcowe, więc możesz nadrobić zaległości.',
    'faq.17': 'W jakim języku jest edycja?',
    'faq.18': 'Edycje po angielsku i po polsku prowadzimy osobno. Aplikacja Lumeo i jej dokument wymagań są dla wszystkich po angielsku.',
    'faq.19': 'Czy może zapłacić mój pracodawca?',
    'faq.20': 'Tak. Edycja jest dla indywidualnych uczestników, a zapłacić możesz Ty lub Twój pracodawca. Szczegóły płatności podamy razem z ceną.',

    // ---- closing
    'closing.01': 'Nie ucz się tylko narzędzi AI. Naucz się inaczej myśleć i pracować.',
    'closing.02': 'Osiem tygodni, jedna prawdziwa premiera i sposób pracy z AI, który zabierzesz do każdego projektu.',
    'closing.03': 'Zarezerwuj miejsce',
    'closing.04': 'Zobacz podróż',

    // ---- 14 contact form
    'contact.01': '14 / Następny krok',
    'contact.02': 'Zarezerwuj miejsce<br>w najbliższej edycji.',
    'contact.03': 'Edycja jest planowana na 1 lutego – 26 marca 2027. Cena nie jest jeszcze ostateczna. Zarezerwuj miejsce, a cenę poznasz, zanim ją ogłosimy — wtedy zdecydujesz.',
    'contact.04': 'Poznaj cenę i warunki, zanim zostaną opublikowane.',
    'contact.05': 'Zabezpiecz miejsce w edycji startującej 1 lutego 2027.',
    'contact.06': 'Rezerwacja miejsca nie jest zakupem i nie tworzy zobowiązania. Potwierdzimy terminy, cenę i warunki, zanim zapłacisz.',
    'contact.07': 'Chcę <span aria-hidden="true">*</span>',
    'contact.08': 'zarezerwować miejsce w najbliższej edycji',
    'contact.09': 'zadać pytanie',
    'contact.10': 'Imię i nazwisko <span aria-hidden="true">*</span>',
    'contact.11': 'E-mail <span aria-hidden="true">*</span>',
    'contact.12': 'Język edycji (opcjonalnie)',
    'contact.13': 'Wybierz',
    'contact.14': 'Angielski',
    'contact.15': 'Polski',
    'contact.16': 'Obojętnie',
    'contact.17': 'Doświadczenie w IT (opcjonalnie)',
    'contact.18': 'Wybierz',
    'contact.19': 'Testowanie',
    'contact.20': 'Analiza systemowa',
    'contact.21': 'Analiza wymagań',
    'contact.22': 'Inna rola w IT',
    'contact.23': 'Firma (opcjonalnie)',
    'contact.24': 'Coś jeszcze, co powinniśmy wiedzieć? (opcjonalnie)',
    'contact.25': 'Wyrażam zgodę na kontakt w sprawie tego zgłoszenia. Znam <a href="#privacy-details" id="privacy-open">informację o prywatności</a>.',
    'contact.26': 'Bez spamu. Twoje dane posłużą wyłącznie do odpowiedzi na zgłoszenie. Pola oznaczone * są wymagane.',
    'contact.27': 'Włącz JavaScript, aby korzystać z formularza na tej stronie.',
    'contact.28': 'Informacja o prywatności',
    'contact.29': 'Imię i nazwisko, e-mail oraz wszelkie opcjonalne dane (język, doświadczenie, firma lub wiadomość) służą do odpowiedzi na Twoje zgłoszenie i kontaktu w sprawie edycji, o którą pytasz. Nie podawaj haseł ani poufnych danych.',
    'contact.30': 'Po wysłaniu formularza Web3Forms przetwarza go w celu dostarczenia. Zobacz <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">politykę prywatności Web3Forms</a>. Możesz poprosić odbiorcę odpowiedzi o zaprzestanie dalszego kontaktu.',
    'contact.31': 'Na przykład: Twoje doświadczenie w projektach IT, jak obecnie używasz AI albo pytanie o edycję.',

    // ---- footer
    'footer.01': 'AI-Driven QA Engineering',
    'footer.02': 'Zarezerwuj miejsce',
    'footer.03': 'Informacja o prywatności',

    // ---- SDLC / ADLC illustration (SVG text lines)
  };

  var nodes = [];   // {el, key, en}
  var attrs = [];   // {el, attr, key, en}
  var meta = [];    // {get, set, key, en}
  var current = 'en';

  function readStored() {
    try {
      var q = new URLSearchParams(window.location.search).get('lang');
      if (q === 'pl' || q === 'en') return q;
      var v = window.localStorage.getItem(STORAGE_KEY);
      return v === 'pl' || v === 'en' ? v : 'en';
    } catch (e) { return 'en'; }
  }

  function store(lang) {
    try { window.localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* private mode */ }
  }

  function collect() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      nodes.push({ el: el, key: el.getAttribute('data-i18n'), en: el.innerHTML });
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n-attr]'), function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var i = pair.indexOf(':');
        var attr = pair.slice(0, i);
        attrs.push({ el: el, attr: attr, key: pair.slice(i + 1), en: el.getAttribute(attr) });
      });
    });
    var d = document.querySelector('meta[name="description"]');
    var ot = document.querySelector('meta[property="og:title"]');
    var od = document.querySelector('meta[property="og:description"]');
    meta.push({ key: 'meta.title', en: document.title, set: function (v) { document.title = v; } });
    [[d, 'meta.description'], [ot, 'meta.ogTitle'], [od, 'meta.ogDescription']].forEach(function (p) {
      if (p[0]) meta.push({ key: p[1], en: p[0].getAttribute('content'), set: function (v) { p[0].setAttribute('content', v); } });
    });
  }

  function pick(key, en, lang) {
    return lang === 'pl' && PL[key] != null ? PL[key] : en;
  }

  function apply(lang) {
    current = lang;
    document.documentElement.lang = lang;
    nodes.forEach(function (n) {
      var v = pick(n.key, n.en, lang);
      if (n.el.innerHTML !== v) n.el.innerHTML = v;
    });
    attrs.forEach(function (a) { a.el.setAttribute(a.attr, pick(a.key, a.en, lang)); });
    meta.forEach(function (m) { m.set(pick(m.key, m.en, lang)); });
    Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  function setLang(lang, persist) {
    if (lang !== 'en' && lang !== 'pl') return;
    apply(lang);
    if (persist) store(lang);
    document.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: lang } }));
  }

  window.i18n = {
    t: function (key, fallback) { return pick(key, fallback, current); },
    set: function (lang) { setLang(lang, true); },
    get lang() { return current; },
    missing: function () {
      return nodes.map(function (n) { return n.key; })
        .concat(attrs.map(function (a) { return a.key; }))
        .filter(function (k) { return PL[k] == null; });
    },
    unused: function () {
      var used = {};
      nodes.forEach(function (n) { used[n.key] = 1; });
      attrs.forEach(function (a) { used[a.key] = 1; });
      meta.forEach(function (m) { used[m.key] = 1; });
      return Object.keys(PL).filter(function (k) { return !used[k] && k.indexOf('js.') !== 0; });
    }
  };

  collect();
  Array.prototype.forEach.call(document.querySelectorAll('[data-lang]'), function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang'), true); });
  });
  var initial = readStored();
  if (initial !== 'en') apply(initial);
  else document.documentElement.lang = 'en';
  current = initial;
})();

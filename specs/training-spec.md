# AI-Driven QA Engineering – specyfikacja szkolenia i plan realizacji (v1.1)

> Dokument powstał na bazie `specs/todo.md`. Część A to walidacja planu, część B to specyfikacja (co budujemy), część C to plan pracy krok po kroku (w jakiej kolejności budujemy).
> Miejsca oznaczone **[DECYZJA]** zawierają rekomendację. Zaakceptuj je lub zmień przed rozpoczęciem Fazy 1, bo od nich zależy reszta pracy.
>
> **Dokumenty powiązane:**
> - [`learning-outcomes.md`](learning-outcomes.md) – mierzalne efekty i zadania
> - [`ai-topics.md`](ai-topics.md) – tematy AI i typowe błędy AI
> - [`shoplite-requirements.md`](shoplite-requirements.md) – PRD aplikacji dla uczestników
> - [`shoplite-tech-spec.md`](shoplite-tech-spec.md) – architektura i specyfikacja techniczna
> - [`trainer/defect-catalog.md`](trainer/defect-catalog.md) – kontrolowane defekty i klucze odpowiedzi (poufne)

---

## Część A – Walidacja planu

### A1. Co jest dobre i zostaje bez zmian

- Jasna wizja: zmiana sposobu pracy, nie kurs jednego narzędzia ani przygotowanie do certyfikatu.
- Jeden spójny case e-commerce przez cały program, czyli „Mini QA Journey” end-to-end.
- Metodyka oparta na praktyce: challenge-based, just-in-time, krótka teoria, active recall, peer learning. Do tego trafne zastrzeżenie wobec „stożka uczenia się”.
- Struktura „przed, w trakcie, po” i Workbook po każdej sesji.
- Darmowe narzędzia i aplikacja uruchamiana lokalnie.
- Słuszna kolejność z ostatniego akapitu: najpierw Journey, potem case, wyzwania, materiały i harmonogram.

### A2. Luki i niespójności

| # | Problem | Dlaczego to ważne | Rozwiązanie w tym dokumencie |
|---|---------|-------------------|------------------------------|
| 1 | **Brak zdefiniowanego uczestnika** (poziom, manual czy automation, doświadczenie). | Od tego zależy poziom wyzwań, szczególnie automatyzacji. | B1 – persona i wymagania wejściowe |
| 2 | **Brak mierzalnych efektów uczenia się** (learning outcomes). | Bez nich nie da się zaprojektować wyzwań ani ocenić skuteczności. | B2 |
| 3 | **Niespójność z landing page** (`index.html`). Strona sprzedaje B2B „transformację zespołu QA” (assessment, 5 kroków, dopasowanie do firmy) i **EU micro-credentials**. Plan opisuje otwartą kohortę z uczestnikami z różnych firm, bez certyfikacji, a mikropoświadczenia odkłada na później. | Klient kupi coś innego niż dostanie. | **[DECYZJA] B0** |
| 4 | **Etap „Analiza wymagań i ryzyk” nie występuje w Minimum QA Flow**, choć tekst mówi, że AI wspiera „od analizy wymagań”. | To najmocniejszy obszar AI w QA i punkt startowy całego Journey. | Dodany jako Etap 0 (B3) |
| 5 | **W tabeli „Zakres prac” (pkt 3) brakuje Automatyzacji**, a we Flow jest. | Niespójny zakres. | B4 – wyzwania obejmują wszystkie etapy |
| 6 | **„Prosta aplikacja HTML” nie wystarczy do troubleshootingu i automatyzacji**, jeśli nie ma w niej celowo wprowadzonych błędów, logów, API i wersji. | Bez kontrolowanych defektów nie ma czego szukać, a debriefy nie mają klucza odpowiedzi. | B5 – specyfikacja aplikacji z katalogiem błędów |
| 7 | **Brak dokumentu wymagań dla aplikacji** (user stories, kryteria akceptacji). | Test design wymaga wejścia. Celowe niejasności w wymaganiach to świetne ćwiczenie z AI. | B5.3 |
| 8 | **Kolejność w „Zakresie prac”**: aplikacja (prio 2) jest przed wyzwaniami (prio 3). | Aplikacja musi powstać *z* wyzwań, bo błędy są projektowane pod konkretne zadania. | Część C – zmieniona kolejność |
| 9 | **Brak tematów specyficznych dla AI**: weryfikacja odpowiedzi AI, halucynacje, human-in-the-loop, wzorce promptów, niedeterminizm, poufność danych. | To rdzeń „mindset shift”. Bez tego zostaje zwykły kurs QA z ChatGPT. | B3 – wątek przekrojowy „AI Verification Loop” |
| 10 | **Niedeterminizm AI a „rozwiązania” w Workbooku.** | Uczestnicy dostaną inne odpowiedzi niż wzorcowe. | Workbook zawiera *rozwiązania referencyjne + kryteria oceny*, a nie jedną poprawną odpowiedź |
| 11 | **Wymóg płatnej subskrypcji AI** to bariera wejścia. | Zmniejsza konwersję. | B1 – wystarczą darmowe plany, płatny jest zalecany |
| 12 | **Materiały „bezpośrednio przed szkoleniem”** to ryzyko, że środowisko nie zadziała na pierwszej sesji. | Pierwsza sesja przepada na instalacje. | Dzień 0: onboarding i smoke test na 5–7 dni przed startem |
| 13 | **Brak przewodnika trenera** (facilitator guide), banku promptów, rubryk oceny i FAQ technicznego. | Bez nich nie da się prowadzić powtarzalnie ani w dwóch językach. | B7 – lista materiałów |
| 14 | **Brak logistyki**: wielkość grupy, platforma, nagrania, RODO, cena, zapisy, regulamin. | Blokuje sprzedaż i uruchomienie. | B8 |
| 15 | **Brak pilotażu.** | Pierwsza edycja bez testu to ryzyko dla marki. | Faza 6 – pilot |
| 16 | **Dwujęzyczność niedookreślona** (osobne grupy? mieszane? który język jest pierwszy?). | Podwaja pracę, jeśli nie ma strategii. | **[DECYZJA] B8** |
| 17 | Literówka: „Automatyzacha”. | – | poprawione |

**Rozstrzygnięcia (2026-10-22):**

| # | Decyzja | Gdzie |
|---|---|---|
| 1 | Uczestnik: tester manualny **i** automatyzujący, minimum junior. Dwie ścieżki: M i A. | B1 |
| 2 | 12 mierzalnych efektów z progami, mierzonych na artefaktach względem kluczy odpowiedzi. | B2, `learning-outcomes.md` |
| 3 | Produkt to **wyłącznie otwarta kohorta** zgodna z tym planem. Landing page zostanie dostosowany do planu. | B0 |
| 4 | „Analiza wymagań i ryzyk” to Etap 0 w Minimum QA Flow. | B3 |
| 5 | Automatyzacja jest w tabeli „Zakres prac”. | B10 |
| 6 | 25 kontrolowanych defektów produktu + usterki środowiska + defekty testów + presety. | B5.4, `trainer/defect-catalog.md` |
| 7 | Typowy dokument wymagań (PRD) z 12 celowymi niejasnościami. | B5.3, `shoplite-requirements.md` |
| 8 | 16 tematów AI z typowymi błędami AI i 8 próbkami AI do ćwiczeń. | B11, `ai-topics.md` |

### A3. Rekomendacje dla otwartych kwestii z sekcji 7

| Pytanie | Rekomendacja **[DECYZJA]** |
|---------|----------------------------|
| Ile sesji i jak długich? | **4 sesje live po 3 h** (wt/czw przez 2 tygodnie) + **~2 h pracy asynchronicznej** między sesjami + Dzień 0 (onboarding). Łącznie ok. 18–20 h nauki. |
| Rola webinaru? | **Promocyjno-otwierająca**: darmowy webinar 60 min ok. 2–3 tygodnie przed kohortą (problem, demo jednego mini-wyzwania, zapisy). Nie jest częścią płatnego programu. Webinar powstaje **po** szkoleniu, z jego fragmentów. |
| Praca indywidualna czy zespołowa? | **Model mieszany**: wykonanie indywidualne (każdy ma własną aplikację i własne AI), porównanie w parach lub trójkach w breakout rooms, debrief z całą grupą. |
| Dostęp po szkoleniu? | Repo aplikacji i Workbook **na stałe** (to też marketing). Nagrania i kanał społeczności **przez 30 dni**. Ewentualne płatne „alumni” to temat na później. |
| Ocena skuteczności bez certyfikatu? | Model Kirkpatricka, poziomy 1–3: ankieta po każdej sesji, **samoocena przed i po** (te same 12 stwierdzeń, po jednym na LO) + mini-test scenariuszowy przed i po, **portfolio artefaktów** oceniane rubryką, ankieta po 30 dniach („co wdrożyłeś w pracy?”). |

---

## Część B – Specyfikacja szkolenia

### B0. Pozycjonowanie produktu (ustalone)

**Produkt: otwarta, dwutygodniowa kohorta online dla specjalistów QA z różnych firm, w pełni zgodna z tym dokumentem.**

| Element | Ustalenie |
|---|---|
| Klient | Pojedynczy specjaliści QA (opłaca uczestnik lub jego pracodawca) |
| Format | 2 tygodnie, 4 sesje live + praca async, jeden case ShopLite |
| Uznanie kompetencji | Brak certyfikatu. Portfolio artefaktów + informacja zwrotna wobec 12 LO. Micro-credentials to backlog (Faza 9). |
| Przekaz | „Don't Just Learn AI Tools. Learn to Think and Work Differently.” |

**Landing page (`index.html`) do dostosowania do planu** (zadanie 0.3):

| Sekcja strony (obecnie) | Zmiana |
|---|---|
| Hero: „Transform your QA team…”, CTA „Request a capability assessment” | Kohorta dla specjalistów QA: termin, format, „Reserve your seat” |
| 06 Approach: 5 kroków transformacji organizacji | Mini QA Journey: 6 etapów (Etap 0–5) i 4 sesje |
| 08 Recognition: EU micro-credentials | Portfolio artefaktów, bez certyfikatu. Micro-credentials najwyżej jako „planned”. |
| 09 Fit: „for your organization” | „Dla kogo”: tester manual/automation od juniora, wymagania wejściowe (B1) |
| 11 Engagement: zakres per organizacja, wycena indywidualna | Harmonogram kohorty, cena, liczba miejsc, co zawiera, dostęp po szkoleniu |
| Closing: „Don't add testers. Transform the QA team you have.” | Główny przekaz programu (todo.md, sekcja 8) |
| Nowe sekcje | Aplikacja ShopLite (co zbudujesz/przetestujesz), tematy AI, webinar, FAQ o wymaganiach sprzętowych i AI |

### B1. Uczestnik (ustalone)

**Persona:** tester **manualny lub automatyzujący, minimum junior** (ok. 6+ miesięcy doświadczenia komercyjnego), który używa AI okazjonalnie i bez systematycznego podejścia.

| | Ścieżka **M** – manual | Ścieżka **A** – automation |
|---|---|---|
| Wejście | zna przypadki testowe, raportowanie błędów, podstawowe techniki | jak M + podstawy JS/TS, Javy lub Pythona i dowolnego frameworka UI (Playwright/Selenium/Cypress) |
| Automatyzacja w S3 | test tworzony z AI, nacisk na review i zrozumienie kodu | jak M + test API, Page Object, test współbieżności |
| Progi LO | wspólne | wspólne + zadania *stretch* |

Ścieżkę uczestnik wybiera w formularzu zapisu i może ją zmienić w trakcie. Wyzwania są wspólne, a różnią się tylko zadania stretch.

**Wymagania wejściowe:**
- Ma konto w co najmniej jednym asystencie AI (ChatGPT, Claude, Gemini lub Copilot). **Darmowy plan wystarczy**, płatny jest zalecany.
- Ma laptop z uprawnieniami do instalacji: przeglądarka Chrome lub Edge, VS Code, Node.js LTS, Git (instrukcja w Setup Guide). Alternatywa: GitHub Codespaces.
- Zgoda pracodawcy na używanie AI. Na szkoleniu pracujemy **wyłącznie na danych fikcyjnych**.
- Otwartość na zmianę metod pracy i aktywny udział w ćwiczeniach.

**Wielkość grupy:** 8–16 osób na 1 trenera (powyżej 12 przydaje się asystent na czacie).

### B2. Efekty uczenia się (learning outcomes)

Pełna wersja z progami, zadaniami i narzędziami pomiaru: [`learning-outcomes.md`](learning-outcomes.md).

| LO | Etap | Uczestnik potrafi… | Próg „Biegły” (skrót) |
|---|---|---|---|
| LO1 | 0 | wykryć z AI niejasności w wymaganiach i odrzucić halucynacje | ≥ 7/12 niejasności, ≥ 2/3 halucynacji |
| LO2 | 0 | zbudować rejestr ryzyk z priorytetami | ≥ 4/5 ryzyk kluczowych w top-10 |
| LO3 | 1 | zaprojektować testy oparte na ryzyku | ≥ 3 techniki, ≥ 3/5 luk w próbce AI |
| LO4 | 1 | zweryfikować dane testowe i wartości oczekiwane z AI | ≥ 2/3 błędnych danych, 2/2 błędów rachunkowych |
| LO5 | 2 | prowadzić eksplorację UI z AI | ≥ 5/10 defektów, w tym ≥ 1 High/Critical |
| LO6 | 2 | pisać wysokiej jakości bug reporty | ≥ 8/10 pkt checklisty |
| LO7 | 2 | eksplorować API i weryfikować DB | ≥ 2/5 defektów API/DB |
| LO8 | 3 | zrecenzować test wygenerowany przez AI | ≥ 4/6 słabości |
| LO9 | 3 | zautomatyzować krytyczne ryzyka | testy wykrywają ≥ 2/3 włączonych defektów |
| LO10 | 4 | zdiagnozować awarie z dowodami | ≥ 3/4 poprawnych klasyfikacji |
| LO11 | 5 | przygotować raport i rekomendację go/no-go | ≥ 3 argumenty oparte na danych |
| LO12 | przekrojowy | stosować AI Verification Loop | ≥ 70% błędów w próbkach AI wykrytych |

### B3. Mini QA Journey – struktura programu

**Minimum QA Flow (6 etapów):**
0. **Analiza wymagań i ryzyk**
1. Projektowanie testów
2. Wykonywanie testów (UI + API + weryfikacja danych)
3. Automatyzacja testów
4. Analiza problemów (troubleshooting)
5. Raportowanie

AI wspiera uczestnika na każdym etapie, a tematy AI (B11) są wprowadzane just-in-time na etapie, w którym są potrzebne.

**Wątek przekrojowy: AI Verification Loop** (wprowadzony w S1, powtarzany w każdym wyzwaniu)
`Kontekst → Prompt → Wynik AI → Weryfikacja (fakty, kompletność, ryzyko) → Decyzja człowieka → Udokumentowanie`

| Etap | Sesja | Pytanie biznesowe | Efekt | Artefakt uczestnika |
|------|-------|-------------------|-------|---------------------|
| 0. Analiza wymagań i ryzyk | S1 | „Co może pójść źle w nowym checkoucie z promocjami?” | LO1, LO2 | Lista pytań do PO + rejestr ryzyk (CH-01, CH-02) |
| 1. Projektowanie testów | S1 + S2 | „Co testujemy najpierw i dlaczego?” | LO3, LO4 | Risk-based test suite + dane testowe (CH-03, CH-04) |
| 2. Wykonywanie testów | S2 | „Czy to działa dla klienta?” | LO5, LO6, LO7 | Notatki z eksploracji + 3 bug reporty (CH-05, CH-06) |
| 3. Automatyzacja testów | S3 | „Jak zabezpieczyć krytyczne ryzyka na stałe?” | LO8, LO9 | Review testu AI + 3 testy (≥ 1 API) (CH-07, CH-08) |
| 4. Analiza problemów | S4 | „Wersja v2 coś zepsuła, a jeden test jest flaky. Dlaczego?” | LO10 | RCA 4 awarii (CH-09) |
| 5. Raportowanie | S4 | „Czy wypuszczamy release?” | LO11 | Test summary report + go/no-go (CH-10) |
| przekrojowo | S1–S4 | „Czy mogę ufać temu wynikowi AI?” | LO12 | Dziennik AI |

Scenariusz fabularny (spina całość): *Sklep ShopLite wprowadza nowy checkout z kodami rabatowymi i darmową dostawą przed Black Friday. Jesteś jedynym QA w zespole, a release jest za 2 tygodnie.*

#### Szablon sesji live (3 h)

| Czas | Blok | Metoda |
|------|------|--------|
| 0:00–0:10 | Warm-up: 60-sekundowy recall z poprzedniej sesji (quiz/Mentimeter) | Active recall |
| 0:10–0:20 | Kontekst biznesowy wyzwania + Theory in Brief (maks. 10 min) | Just-in-time |
| 0:20–1:10 | **Wyzwanie A** (indywidualnie z AI) | Challenge-based |
| 1:10–1:30 | Porównanie w parach/trójkach: „czym różnią się nasze wyniki z AI?” | Peer learning |
| 1:30–1:40 | Przerwa | |
| 1:40–2:20 | **Wyzwanie B** | Challenge-based |
| 2:20–2:50 | Debrief grupowy: rozwiązanie referencyjne, błędy AI, wnioski | Refleksja |
| 2:50–3:00 | Exit ticket (3 pytania) + zadanie async | Retrieval practice |

#### Rozkład szczegółowy

**Dzień 0 (5–7 dni przed S1, async + opcjonalnie 30 min „setup clinic” live)**
- Welcome pack: scenariusz biznesowy, Setup Guide, link do repo, regulamin, zasady pracy z AI i danymi.
- Smoke test: uczestnik uruchamia ShopLite lokalnie i wysyła screenshot strony „Setup OK” (formularz lub kanał).
- Samoocena „przed” (12 stwierdzeń w skali 1–5) + mini-test scenariuszowy (wersja A).

**S1 – Mindset + Wymagania i ryzyka + Test Design** (AT-01…AT-07)
- Theory in Brief: SDLC → ADLC, rola QA jako „sędziego zaufania”, AI Verification Loop, anatomia promptu dla QA, halucynacje.
- CH-01 Przegląd PRD z AI (40 min) → CH-02 Rejestr ryzyk w parach (20 min) → CH-03 start projektu testów (40 min).
- Async: dokończenie CH-03 (zestaw testów + luki w próbce AI-02).

**S2 – Wykonywanie testów** (AT-08…AT-10, AT-14), preset `s2`
- Theory in Brief: problem wyroczni, dane testowe z AI, testy eksploracyjne i charters, bezpieczeństwo danych w promptach.
- CH-04 Dane testowe i wartości oczekiwane (25 min) → CH-05 Eksploracja UI (50 min).
- Async: druga sesja eksploracyjna + CH-06 API, DB i 3 bug reporty (debrief na początku S3).

**S3 – Automatyzacja** (AT-11, AT-12), preset `baseline`, potem `s3-check`
- Theory in Brief: co automatyzować (z rejestru ryzyk), Playwright w 10 minut, defekty kodu testów z AI, agenci AI w IDE.
- CH-07 Review testu AI w parach (30 min) → CH-08 Automatyzacja krytycznych ryzyk (60 min).
- Async: dokończenie CH-08 i przebieg na `s3-check`. Ścieżka A: test API współbieżności.

**S4 – Troubleshooting + Raportowanie + Podsumowanie** (AT-13, AT-15, AT-16), preset `s4`
- Theory in Brief: DevTools (console, network), `X-Request-Id`, flaky vs regresja vs defekt testu, RCA z AI.
- CH-09 Troubleshooting v2 na suite referencyjnym (50 min) → CH-10 Raport i go/no-go dla PO, odgrywanego przez trenera (40 min).
- Retrospektywa i plan 3 kroków (A4). Samoocena „po” + mini-test (wersja B) + ankieta końcowa.

**Po programie:** Workbook końcowy, portfolio artefaktów (repo uczestnika), ankieta po 30 dniach.

### B4. Katalog wyzwań (do rozpisania w Fazie 2)

Każde wyzwanie opisujemy według jednego szablonu (`specs/challenges/CH-XX.md`):

```
ID / Tytuł / Etap / Sesja / LO
Kontekst biznesowy (2–3 zdania)
Zadanie dla uczestnika
Wejście (pliki, strona aplikacji, wersja v1/v2)
Ograniczenia (czas, narzędzia)
Oczekiwany artefakt
Kryteria sukcesu (rubryka 3-poziomowa)
Rozwiązanie referencyjne + typowe błędy AI do omówienia
Pytania do debriefu (3–5)
Wskazówki dla trenera (hinty stopniowane, stretch goal)
Powiązane defekty (B-xx, RQ-xx, AI-xx z trainer/defect-catalog.md)
```

Zestaw: CH-01…CH-10 + A4, podsumowany w [`learning-outcomes.md`](learning-outcomes.md), sekcja 3.

### B5. Aplikacja szkoleniowa „ShopLite” (nazwa robocza)

#### B5.1 Wymagania techniczne
> **Zaktualizowane:** pełna architektura i specyfikacja jest w [`shoplite-tech-spec.md`](shoplite-tech-spec.md) (UI + API + SQLite) i w diagramie [`shoplite-architecture.drawio`](shoplite-architecture.drawio). Wcześniejsza koncepcja „bez backendu” została zastąpiona.

- Node.js + Express + SQLite (`better-sqlite3`), frontend w Vanilla JS bez builda. Wszystko na jednym porcie: `npm install && npm start`.
- Prawdziwe REST API ze Swaggerem (`/api/docs`), co daje dodatkowy materiał: testy API, kontrakt, kody błędów, autoryzacja.
- Wersje v1/v2, bug flagi, fault injection, `FAKE_NOW` i reset danych sterowane z panelu trenera (`/admin.html`) bez restartu.
- Stabilne `data-testid` z jednym celowym wyjątkiem do ćwiczeń z lokatorami.
- Plan B: GitHub Codespaces (`.devcontainer`). GitHub Pages nie wystarczy, bo aplikacja ma backend.

#### B5.2 Zakres funkcjonalny (bogaty w reguły biznesowe, mały w kodzie)
1. Logowanie (fikcyjni użytkownicy: standard, VIP, zablokowany).
2. Katalog produktów: wyszukiwanie, filtrowanie, sortowanie, stany magazynowe.
3. Szczegóły produktu: warianty (rozmiar), limit ilości.
4. Koszyk: zmiana ilości, usuwanie, sumy, VAT.
5. Kody rabatowe: procentowy, kwotowy, minimalna wartość koszyka, nie łączą się, data ważności.
6. Darmowa dostawa powyżej progu (po czy przed rabatem? **celowa niejasność w wymaganiach**).
7. Checkout: formularz adresu z walidacją (kod pocztowy, telefon), metody dostawy, mock płatności (karta testowa: sukces, odrzucenie, timeout).
8. Potwierdzenie zamówienia i historia zamówień.

#### B5.3 Dokumentacja produktu (wejście do S1)
Gotowy dokument: [`shoplite-requirements.md`](shoplite-requirements.md), typowy PRD e-commerce (kontekst biznesowy, cele i metryki, persony, zakres, glosariusz, 8 epików i 14 user stories z kryteriami akceptacji, reguły biznesowe, NFR, interfejsy, założenia, otwarte pytania). Zawiera **12 celowych niejasności i sprzeczności** (klucz RQ-01…12 w katalogu defektów). Po angielsku, wspólny dla kohort PL i EN.
Do przygotowania: release notes v2 (wydawane w S4, celowo niepełne) i suite referencyjny `tests/reference/`.

#### B5.4 Kontrolowane defekty (poufne – tylko dla trenera)
Gotowy katalog: [`trainer/defect-catalog.md`](trainer/defect-catalog.md):
- **B01–B25:** defekty produktu za bug flagami (logika cen/rabatów/dostawy, walidacja, bezpieczeństwo, magazyn i współbieżność, płatności, dostępność, regresje v2);
- **F01–F03:** usterki środowiska (opóźnienia, losowe 503, przesunięcie czasu);
- **T01–T02:** defekty testów w suite referencyjnym;
- **presety** `baseline` / `s2` / `s3-check` / `s4`;
- wyrocznia cenowa, klucz niejasności PRD i opis 8 próbek AI.

> ⚠️ Repo `CourseWebPage` jest na GitHubie. Folder `specs/trainer/` nie może trafić do publicznego repo: przenieś go do prywatnego repo albo dodaj do `.gitignore` przed commitem.

### B6. Narzędzia (wszystkie darmowe)

| Cel | Narzędzie |
|-----|-----------|
| Asystent AI | ChatGPT / Claude / Gemini (darmowe plany) lub GitHub Copilot Free w VS Code |
| Edytor | VS Code |
| Automatyzacja | Playwright (Node.js) + rozszerzenie Playwright dla VS Code |
| Repo i środowisko zapasowe | GitHub + GitHub Codespaces (darmowy limit) |
| Debugging | Chrome DevTools |
| Spotkania | Jitsi Meet (darmowy, bez limitu czasu) albo płatny Zoom/Meet/Teams. **Uwaga:** darmowe plany Zoom (40 min) i Google Meet (60 min dla grup) nie wystarczą na 3-godzinną sesję |
| Tablica i interakcje | Miro free / FigJam, Mentimeter/Slido free (quizy) |
| Społeczność | Discord lub Slack (free) |
| Ankiety | Google Forms / MS Forms |

Zasada: **tool-enabled, not tool-dependent**. Każde wyzwanie da się wykonać dowolnym asystentem AI, a trener testuje prompty referencyjne na co najmniej 2 modelach.

### B7. Materiały do przygotowania (deliverables)

| # | Materiał | Dla kogo | Format |
|---|----------|----------|--------|
| M1 | Welcome pack (scenariusz, harmonogram, zasady) | Uczestnik | PDF/Notion |
| M2 | Setup Guide + troubleshooting instalacji | Uczestnik | Markdown w repo |
| M3 | Aplikacja ShopLite + dokumentacja produktu | Uczestnik | Repo GitHub |
| M4 | Karty wyzwań (CH-01…) | Uczestnik | Markdown/PDF |
| M5 | Slajdy (4 sesje, maks. 10–15 slajdów teorii na sesję) | Trener | Slides |
| M6 | Bank promptów referencyjnych + checklisty weryfikacji AI | Uczestnik | Markdown |
| M7 | Checklisty: bug report, code review testu AI, raport z testów | Uczestnik | PDF |
| M8 | Quizy recall (5 pytań na sesję) + exit tickets | Uczestnik | Mentimeter/Forms |
| M9 | Workbook (po każdej sesji: podsumowanie, rozwiązania referencyjne, wskazówki) | Uczestnik | PDF |
| M10 | **Facilitator guide** (scenopis minutowy, hinty, katalog błędów, rozwiązania, plan B przy awariach) | Trener | Markdown |
| M11 | Rubryki oceny artefaktów + samoocena przed/po + ankiety | Trener | Forms/Sheet |
| M12 | Wersja EN wszystkich materiałów M1–M9 | Uczestnik | jw. |
| M13 | Webinar (60 min) + strona zapisów | Marketing | Slides + landing |

### B8. Organizacja i logistyka

- **Harmonogram:** tydzień 1 – wt S1, czw S2; tydzień 2 – wt S3, czw S4; godz. 17:00–20:00 lub 9:00–12:00 **[DECYZJA]**.
- **Języki [DECYZJA]:** osobne kohorty PL i EN, bez mieszania. Najpierw tworzysz **wszystko w jednym języku** (rekomendacja: PL dla pilota), a po pilotażu tłumaczysz na EN z pomocą AI i z redakcją. UI aplikacji od początku jest po angielsku.
- **Nagrania:** tak, za zgodą uczestników (klauzula RODO), dostęp 30 dni.
- **Komunikacja:** kanał Discord/Slack na czas kohorty + 30 dni.
- **Formalności:** regulamin, polityka prywatności (jest `privacy.html`), zgody na nagrania, faktury, polityka zwrotów.
- **Cena i zapisy:** do ustalenia (nie dotyczy budowy treści, ale blokuje sprzedaż).
- **Plan B:** ShopLite w GitHub Codespaces, gdy lokalna instalacja nie działa; nagrany walkthrough każdego wyzwania.

### B9. Ewaluacja skuteczności

| Poziom | Co mierzymy | Jak | Cel (pilot) |
|--------|-------------|-----|-------------|
| 1. Reakcja | Satysfakcja, przydatność | Ankieta po sesji (3 pytania) i końcowa (NPS) | NPS ≥ 40 |
| 2. Nauka | Przyrost kompetencji | Klucze odpowiedzi + rubryka artefaktów + samoocena i mini-test przed/po | ≥ 70% osób na poziomie „Biegły” w ≥ 9/12 LO |
| 3. Zachowanie | Transfer do pracy | Ankieta po 30 dniach | ≥ 50% wdrożyło co najmniej 1 praktykę |

### B10. Zakres prac (priorytety)

Kolejność zgodna z Częścią C: najpierw fundament dydaktyczny i wyzwania, potem aplikacja zbudowana pod wyzwania.

| Priorytet | Zadanie | Oczekiwany rezultat | Faza | Status |
|---|---|---|---|---|
| 1 | Plan szkolenia i Mini QA Journey | 6 etapów, 4 sesje, scenariusz fabularny | 1 | ✅ szkic (B3) |
| 2 | Efekty uczenia się | 12 mierzalnych LO z progami | 1 | ✅ szkic |
| 3 | Projekt wyzwań QA | **Analiza wymagań i ryzyk, Test Design, Testing (UI/API/DB), Automatyzacja, Troubleshooting, Reporting** (CH-01…10) | 2 | ✅ podsumowanie, karty do rozpisania |
| 4 | Dokument wymagań (PRD) | PRD z 12 celowymi niejasnościami | 2 | ✅ szkic |
| 5 | Katalog kontrolowanych defektów | B/F/T, presety, klucze, próbki AI | 2 | ✅ szkic |
| 6 | Aplikacja ShopLite | UI + API + SQLite według tech-spec, z bug flagami | 3 | ⏳ |
| 7 | **Automatyzacja: repo testów** | Playwright skonfigurowany, przykładowe testy, suite referencyjny z T01/T02, checklista review testu AI | 3–4 | ⏳ |
| 8 | Rozwiązania referencyjne i próbki AI | AI-01…08, rozwiązania i rubryki | 4 | ⏳ |
| 9 | Materiały i tematy AI | Slajdy Theory in Brief (AT-01…16), Setup Guide, karty, prompty, checklisty | 5 | ⏳ |
| 10 | Interakcje | Quizy recall, exit tickets, praca w parach, debriefy | 5 | ⏳ |
| 11 | Workbook | Po każdej sesji: podsumowanie, rozwiązania, dziennik AI | 5 | ⏳ |
| 12 | Harmonogram | 2 tygodnie, Dzień 0 + S1–S4 | 0/5 | ⏳ |
| 13 | Dostęp po szkoleniu | Repo i Workbook na stałe, nagrania i społeczność 30 dni | 0 | ⏳ |
| 14 | Landing page | Dostosowany do kohorty (B0) | 0 | ⏳ |
| 15 | Wersja EN | Tłumaczenie materiałów (PRD i UI już po angielsku) | 7 | ⏳ |

### B11. Tematy specyficzne dla AI

Pełna wersja: [`ai-topics.md`](ai-topics.md) (16 tematów AT-01…AT-16: halucynacje, przytakiwanie, niedeterminizm, iluzja pokrycia, problem wyroczni, defekty kodu testów z AI, agenci AI w IDE, RCA z AI, prompt injection i poufność, zmyślone metryki w raportach). Każdy temat ma typowe błędy AI, sposób weryfikacji i przypisanie do sesji i wyzwania. Ćwiczy się je na 8 próbkach AI z celowymi błędami (łącznie 26 błędów do wykrycia, próg LO12 ≥ 70%).

---

## Część C – Plan realizacji krok po kroku

Każdy krok ma **Definition of Done (DoD)**. Nie przechodź dalej, dopóki DoD nie jest spełnione. Szacunki są orientacyjne, dla jednej osoby pracującej z AI.

### Faza 0 – Decyzje (1–2 dni)
- [ ] **0.1** Rozstrzygnij pozostałe **[DECYZJA]**: harmonogram sesji, język pilota, model dostępu po szkoleniu (pozycjonowanie i persona są już ustalone).
- [x] **0.2** Persona i wymagania wejściowe (B1): manual + automation, minimum junior.
- [ ] **0.3** Dostosuj landing page do kohorty według tabeli zmian w B0.
- **DoD:** sekcja „Decyzje” w tym pliku uzupełniona, bez otwartych pytań blokujących.

### Faza 1 – Fundament dydaktyczny (2–3 dni)
- [ ] **1.1** Przejrzyj i zatwierdź learning outcomes (`learning-outcomes.md`, szkic gotowy).
- [ ] **1.2** Przejrzyj i zatwierdź Mini QA Journey (B3) i tematy AI (`ai-topics.md`), szkice gotowe.
- [ ] **1.3** Opisz AI Verification Loop jako 1-stronicową ściągę (wejdzie do M6).
- [ ] **1.4** Przygotuj macierz *LO × Sesja × Wyzwanie × Artefakt*, żeby każdy LO był ćwiczony co najmniej 2 razy.
- **DoD:** macierz bez pustych LO; mentor lub ekspert QA przejrzał Journey.

### Faza 2 – Projekt wyzwań (3–5 dni)
- [ ] **2.1** Rozpisz CH-01…CH-08 według szablonu B4 (na razie bez rozwiązań).
- [ ] **2.2** Dla każdego wyzwania wypisz, **jakich cech aplikacji i jakich błędów potrzebuje**. To jest specyfikacja dla Fazy 3.
- [ ] **2.3** Zaprojektuj zadania async i stretch.
- [ ] **2.4** Przejrzyj PRD (`shoplite-requirements.md`, szkic gotowy) i napisz release notes v2 (celowo niepełne, por. B21–B25).
- **DoD:** każde wyzwanie ma kontekst, zadanie, artefakt i kryteria sukcesu; lista wymagań do aplikacji jest gotowa.

### Faza 3 – Budowa aplikacji ShopLite (5–8 dni)
- [ ] **3.1–3.11** Wygeneruj aplikację z AI etapami 1–11 według [`shoplite-tech-spec.md`](shoplite-tech-spec.md), sekcje 10–11 (prompt i plan etapów). Po każdym etapie: przegląd i akceptacja.
- [ ] **3.12** Spisz `bug-catalog.md` (prywatny) i dodaj błędy za flagami (Etap 9 specyfikacji technicznej).
- [ ] **3.13** Sprawdź czystą instalację na Windows i macOS (albo poproś znajomego) i w Codespaces.
- **DoD:** każdy błąd z katalogu da się odtworzyć według opisu; `npm start` + `npx playwright test` działają na czystej maszynie w < 15 min razem z instalacją.

### Faza 4 – Rozwiązania i walidacja wyzwań (3–4 dni)
- [ ] **4.1** Przejdź każde wyzwanie samodzielnie jako uczestnik, z AI, mierząc czas.
- [ ] **4.2** Zapisz rozwiązania referencyjne i **typowe błędy AI** (testuj na co najmniej 2 modelach).
- [ ] **4.3** Skoryguj czas i trudność (jeśli zadanie trwa > 1,5× założonego czasu, tnij zakres).
- [ ] **4.4** Napisz rubryki oceny (M11) i hinty stopniowane.
- **DoD:** każde wyzwanie mieści się w czasie; jest rozwiązanie referencyjne i rubryka.

### Faza 5 – Materiały (5–7 dni)
- [ ] **5.1** Setup Guide + Welcome pack (M1, M2).
- [ ] **5.2** Karty wyzwań dla uczestników (M4).
- [ ] **5.3** Slajdy Theory in Brief (M5), maks. 10 min teorii na blok.
- [ ] **5.4** Bank promptów + checklisty (M6, M7).
- [ ] **5.5** Quizy recall i exit tickets (M8).
- [ ] **5.6** Workbook dla każdej sesji (M9).
- [ ] **5.7** Facilitator guide ze scenopisem minutowym i planem B (M10).
- [ ] **5.8** Ankiety i samoocena przed/po (M11).
- **DoD:** komplet M1–M11 w jednym języku; pełna próba jednej sesji „na sucho” mieści się w 3 h.

### Faza 6 – Pilotaż (2 tygodnie + 3 dni analizy)
- [ ] **6.1** Zbierz 4–8 osób pilotażowych (znajomi QA, cena symboliczna lub za darmo w zamian za feedback i testimonial).
- [ ] **6.2** Przeprowadź Dzień 0 + S1–S4 według harmonogramu.
- [ ] **6.3** Po każdej sesji: notatki trenera + ankieta, poprawki „na gorąco” w Workbooku.
- [ ] **6.4** Po pilotażu: analiza wyników (B9), lista zmian, poprawa materiałów i aplikacji.
- **DoD:** cele z B9 osiągnięte lub jest plan naprawczy; zebrane 2–3 testimoniale (do sekcji „Results” na landing page).

### Faza 7 – Wersja EN (4–6 dni)
- [ ] **7.1** Tłumaczenie M1–M9 + dokumentacji produktu (AI + redakcja).
- [ ] **7.2** Przetestowanie promptów referencyjnych po angielsku.
- [ ] **7.3** Próba prowadzenia sesji po angielsku (nagranie i przegląd).
- **DoD:** komplet materiałów EN; jedna sesja przećwiczona po angielsku.

### Faza 8 – Webinar i uruchomienie sprzedaży (3–5 dni)
- [ ] **8.1** Przygotuj webinar 60 min: problem, demo jednego mini-wyzwania na ShopLite, program, oferta.
- [ ] **8.2** Strona/sekcja zapisów na kohortę i na webinar; regulamin, RODO, płatności.
- [ ] **8.3** Ustal daty pierwszej kohorty płatnej (PL, potem EN).
- **DoD:** webinar zaplanowany, zapisy otwarte.

### Faza 9 – Po pierwszej edycji (backlog)
- Micro-credentials (EU-aligned) na bazie rubryk i portfolio.
- Format B2B (assessment + przykłady z domeny klienta).
- Dodatkowe moduły: testowanie aplikacji z AI (LLM evals), agentic test automation, API testing.

### Podsumowanie czasu
Fazy 0–5 to ok. **4–6 tygodni** pracy części etatu do gotowości na pilot. Pilot i poprawki zajmują **~3 tygodnie**, a EN i launch **~2 tygodnie**.

---

## Decyzje (uzupełnij w Fazie 0)

| Temat | Decyzja | Data |
|-------|---------|------|
| Pozycjonowanie (B0) | Otwarta kohorta zgodna z planem; landing page do dostosowania | 2026-10-22 |
| Persona i poziom (B1) | Manual + automation, minimum junior; ścieżki M/A | 2026-10-22 |
| Liczba i długość sesji, godziny | | |
| Język pilota | | |
| Rola webinaru | | |
| Dostęp po szkoleniu | | |
| Wielkość grupy | | |
| Platforma spotkań i społeczności | | |

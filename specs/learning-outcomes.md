# AI-Driven QA Engineering – mierzalne efekty uczenia się i zadania

> Dokument uzupełnia `training-spec.md` (B2, B4). Klucze odpowiedzi, czyli defekty, niejasności wymagań i błędy w próbkach AI, są w `trainer/defect-catalog.md` (tylko dla trenera).

## 1. Zasady pomiaru

1. **Mierzymy artefakty, nie obecność.** Każdy efekt sprawdzamy na produkcie pracy uczestnika (rejestr ryzyk, testy, bug report, raport).
2. **Mierzymy względem znanego klucza.** Aplikacja ma kontrolowane defekty, dokument wymagań ma celowe niejasności, a próbki AI mają celowo wprowadzone błędy. Dzięki temu wynik jest obiektywny mimo niedeterminizmu AI: wszyscy oceniają *tę samą* próbkę AI, a nie swoje losowe odpowiedzi.
3. **Trzy poziomy:** *Początkujący* (poniżej progu) · *Biegły* (próg = cel programu) · *Zaawansowany*.
4. **Bez ocen i certyfikatu.** Wynik to informacja zwrotna dla uczestnika (w Workbooku) i miara skuteczności programu (B9).
5. **Dwie ścieżki uczestników:** **M** (manual, junior+) i **A** (automation, junior+). Progi są wspólne, a ścieżka A dostaje zadania *stretch*.

## 2. Efekty uczenia się (LO) z progami

| LO | Etap QA Flow | Po programie uczestnik potrafi… | Wskaźnik i próg „Biegły” | „Zaawansowany” | Zadanie | Dowód |
|---|---|---|---|---|---|---|
| **LO1** | 0. Analiza wymagań | wykryć z pomocą AI niejasności, sprzeczności i luki w wymaganiach | ≥ **7 z 12** celowych niejasności (RQ-01…12) + ≥ **2 z 3** halucynacji w próbce AI-01 odrzucone | ≥ 10/12 i 3/3 | CH-01 | lista pytań do PO |
| **LO2** | 0. Analiza ryzyk | zbudować rejestr ryzyk produktowych i nadać priorytety | ≥ 10 ryzyk z oceną wpływ × prawdopodobieństwo; ≥ **4 z 5** ryzyk kluczowych trenera w top-10 | 5/5 + uzasadnienie biznesowe każdego | CH-02 | rejestr ryzyk |
| **LO3** | 1. Projektowanie | zaprojektować testy oparte na ryzyku z użyciem technik | ≥ 3 techniki (EP, BVA, tablica decyzyjna, przejścia stanów); 100% testów powiązanych z wymaganiem lub ryzykiem; ≥ **3 z 5** luk w pokryciu w próbce AI-02 | 5/5 luk + przejścia stanów zamówienia | CH-03 | zestaw testów |
| **LO4** | 1. Projektowanie | wygenerować z AI dane testowe i wartości oczekiwane i je zweryfikować | ≥ **2 z 3** błędnych danych w AI-04 i ≥ **2 z 2** błędów rachunkowych w AI-03 | + własny zestaw danych brzegowych dla 3 pól | CH-04 | tabela danych |
| **LO5** | 2. Wykonanie | prowadzić testy eksploracyjne UI z charterem wspieranym przez AI | ≥ **5 z 10** defektów zestawu eksploracyjnego w 2 × 45 min, w tym ≥ 1 High/Critical | ≥ 8/10 | CH-05 (+A2) | notatki z sesji |
| **LO6** | 2. Wykonanie | pisać raporty błędów wysokiej jakości z AI jako asystentem | ≥ 3 raporty, średnio ≥ **8/10** pkt checklisty; ≥ **2 z 3** problemów w próbce AI-05 | 10/10 + poprawna severity vs priority | CH-06 | bug reporty |
| **LO7** | 2. Wykonanie | eksplorować API i weryfikować dane w DB | ≥ **2 z 5** defektów API/DB (w tym ≥ 1 bezpieczeństwa) | ≥ 4/5 | CH-06 | raporty + zapytania SQL |
| **LO8** | 3. Automatyzacja | ocenić (code review) test wygenerowany przez AI | ≥ **4 z 6** słabości w próbce AI-06 | 6/6 + poprawiona wersja | CH-07 | lista uwag z review |
| **LO9** | 3. Automatyzacja | zautomatyzować krytyczne ryzyka z pomocą AI | 3 testy (≥ 1 API), zielone na baseline; wykrywają ≥ **2 z 3** defektów włączonych przez trenera; 0 sztywnych `waitForTimeout`; asercje na wartościach, nie tylko na widoczności | + test współbieżności API (ścieżka A) | CH-08 | kod w repo |
| **LO10** | 4. Analiza problemów | zdiagnozować przyczynę awarii z dowodami | poprawna klasyfikacja ≥ **3 z 4** awarii v2 (regresja / defekt testu / flaky / środowisko) z dowodem (log, `X-Request-Id`, network); odrzucenie błędnej diagnozy AI-07 | 4/4 + wykryty ukryty defekt współbieżności | CH-09 | RCA |
| **LO11** | 5. Raportowanie | przygotować raport z testów i rekomendację go/no-go | wszystkie sekcje szablonu; ≥ 3 argumenty oparte na danych i powiązane z ryzykami; ≥ **2 z 3** zmyślonych metryk w AI-08 | prezentacja ≤ 3 min dla PO | CH-10 | raport |
| **LO12** | przekrojowy | stosować AI Verification Loop i bezpieczną pracę z AI | łącznie ≥ **70%** celowych błędów w próbkach AI-01…08 wykrytych; ≥ 80% wpisów w dzienniku AI ma kontekst i ograniczenia; 0 danych poufnych w promptach | ≥ 85% | wszystkie | dziennik AI |

**Cel programu (B9):** ≥ 70% uczestników na poziomie *Biegły* w ≥ 9 z 12 LO.

## 3. Karty zadań (podsumowanie)

Pełne karty powstają w Fazie 2 według szablonu z `training-spec.md` B4. Konfiguracja aplikacji to presety z panelu `/admin.html` (opis w katalogu defektów, sekcja 5).

| ID | Sesja | Czas | Tryb | Wejście | Zadanie | Artefakt | LO | Stretch (ścieżka A) |
|---|---|---|---|---|---|---|---|---|
| **CH-01** Przegląd wymagań z AI | S1 | 40 min | indywidualnie, potem para | PRD ShopLite, próbka AI-01 | Poproś AI o analizę PRD, porównaj z próbką AI-01, odrzuć halucynacje, sformułuj pytania zamknięte do PO | lista pytań (min. 10) | LO1, LO12 | prompt wymuszający cytowanie fragmentu PRD dla każdej uwagi |
| **CH-02** Rejestr ryzyk | S1 | 20 min | para | PRD, odpowiedzi PO (trener) | AI proponuje ryzyka, para scala, ocenia i wybiera top-10 | rejestr ryzyk | LO2 | – |
| **CH-03** Projekt testów oparty na ryzyku | S1 + async | 40 + 60 min | indywidualnie | rejestr ryzyk, próbka AI-02 | Wygeneruj z AI zestaw testów, znajdź luki w AI-02, dodaj BVA (próg 200 zł, ilość 0/1/max/max+1), tablicę decyzyjną rabat × dostawa | 15–25 przypadków testowych | LO3 | przejścia stanów zamówienia |
| **CH-04** Dane testowe i wartości oczekiwane | S2 | 25 min | indywidualnie | tabela cen, próbki AI-03 i AI-04 | Wygeneruj z AI dane i oczekiwane ceny brutto, sprawdź rachunki i poprawność danych | tabela danych | LO4 | dane brzegowe z `FAKE_NOW` (ważność kodów) |
| **CH-05** Eksploracja UI | S2 + async | 50 + 45 min | indywidualnie (preset `s2`) | charter z AI, aplikacja v1 | Dwie sesje eksploracyjne (koszyk/promocje, checkout/płatność) z notatkami | notatki + lista defektów | LO5 | dostępność (klawiatura, etykiety) |
| **CH-06** API, DB i raporty błędów | async + S3 (debrief 15 min) | 60 min | indywidualnie | Swagger `/api/docs`, DB Browser, próbka AI-05 | Eksploruj API (autoryzacja, walidacja, stany), zweryfikuj dane w DB, napisz 3 raporty z AI i oceń je checklistą | 3 bug reporty | LO6, LO7 | – |
| **CH-07** Review testu AI | S3 | 30 min | para | próbka AI-06 (test Playwright) | Code review według checklisty, potem poprawienie testu | lista uwag + poprawiony test | LO8 | refaktoryzacja do Page Object |
| **CH-08** Automatyzacja krytycznych ryzyk | S3 + async | 60 + 60 min | indywidualnie (preset `baseline`, potem `s3-check`) | rejestr ryzyk, repo `tests/` | 3 testy (≥ 1 API) dla top ryzyk; zielone na `baseline`, czerwone na `s3-check` | kod testów | LO9 | test współbieżności zamówień (API) |
| **CH-09** Troubleshooting v2 | S4 | 50 min | indywidualnie, potem trójki | preset `s4`, suite `tests/reference`, release notes v2, próbka AI-07 | Uruchom suite referencyjny, sklasyfikuj 4 awarie z dowodami, oceń diagnozę AI | RCA (szablon) | LO10 | ukryty defekt współbieżności |
| **CH-10** Raport i go/no-go | S4 | 40 min | indywidualnie, 2–3 prezentacje | wyniki CH-05…09, próbka AI-08 | AI tworzy szkic raportu, uczestnik weryfikuje go względem danych i decyduje | raport + rekomendacja | LO11, LO12 | – |
| **A4** Plan wdrożenia | po S4 | 20 min | indywidualnie | Workbook | 3 kroki do wdrożenia w pracy w ciągu 30 dni | plan | (ewaluacja poz. 3) | – |

**Dziennik AI (przez cały program):** uczestnik prowadzi prosty dziennik (szablon w Workbooku): *cel → prompt → co AI zrobiło dobrze → co było błędne → jak zweryfikowałem → decyzja*. Minimum 1 wpis na wyzwanie. To dowód dla LO12.

## 4. Narzędzia pomiaru

| Narzędzie | Kiedy | Co mierzy |
|---|---|---|
| Samoocena (12 stwierdzeń = 12 LO, skala 1–5) | Dzień 0 i po S4 | postrzegany przyrost |
| Mini-test scenariuszowy (8 pytań, 2 równoważne wersje A/B) | Dzień 0 (A) i po S4 (B) | obiektywny przyrost (np. „który z 4 testów AI ma słabą asercję?”) |
| Klucze odpowiedzi (defekty, RQ, próbki AI) | po każdym wyzwaniu | progi LO1, LO3–LO10, LO12 |
| Rubryka artefaktów (3 poziomy) | po S1–S4 | LO2, LO3, LO6, LO9, LO11 |
| Checklista bug reportu (10 kryteriów) | CH-06 | LO6 |
| Ankieta po 30 dniach | +30 dni | transfer do pracy (Kirkpatrick poz. 3) |

**Checklista bug reportu (1 pkt za kryterium):** tytuł opisuje problem i miejsce · kroki odtwarzalne · dane testowe · oczekiwany wynik powiązany z wymaganiem · aktualny wynik · dowód (screenshot / response / `X-Request-Id`) · środowisko i wersja (v1/v2) · severity uzasadniona · brak informacji niezaobserwowanych (zmyślonych przez AI) · jeden problem na raport.

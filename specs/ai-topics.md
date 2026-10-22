# AI-Driven QA Engineering – tematy specyficzne dla AI i typowe błędy AI

> Dokument uzupełnia `training-spec.md` (B3) i `learning-outcomes.md`. Każdy temat jest wprowadzany **just-in-time** w Theory in Brief (2–5 min) tam, gdzie pojawia się w wyzwaniu, i ćwiczony na próbkach AI z celowymi błędami (`trainer/defect-catalog.md`, sekcja 7).

## 1. Model mentalny: AI Verification Loop

```
Kontekst → Prompt → Wynik AI → Weryfikacja → Decyzja człowieka → Udokumentowanie (dziennik AI)
                         ▲                         │
                         └──── iteracja / poprawa ◀┘
```

Trzy zasady powtarzane na każdej sesji:
1. **AI szkicuje, ty decydujesz.** Odpowiedzialność za jakość zostaje przy człowieku.
2. **Każde twierdzenie AI wymaga dowodu:** fragmentu wymagania, odpowiedzi API, logu, wyniku testu.
3. **Nie wklejaj tego, czego nie wkleiłbyś na publiczne forum.**

## 2. Mapa tematów

| ID | Temat | Sesja / wyzwanie | Próbka AI |
|---|---|---|---|
| AT-01 | Human-in-the-loop i odpowiedzialność | S1 (wstęp) | – |
| AT-02 | Prompting dla QA | S1, CH-01 | – |
| AT-03 | Kontekst: co i ile dać modelowi | S1, CH-01/02 | – |
| AT-04 | Halucynacje | S1, CH-01 | AI-01 |
| AT-05 | Nadmierna pewność i przytakiwanie (sycophancy) | S1, CH-02 | – |
| AT-06 | Niedeterminizm i porównywanie wyników | S1, praca w parach | – |
| AT-07 | Iluzja pokrycia w testach z AI | S1, CH-03 | AI-02 |
| AT-08 | Problem wyroczni i błędy rachunkowe | S2, CH-04 | AI-03 |
| AT-09 | Dane testowe z AI | S2, CH-04 | AI-04 |
| AT-10 | Bug reporty pisane przez AI | S2, CH-06 | AI-05 |
| AT-11 | Kod testów generowany przez AI | S3, CH-07/08 | AI-06 |
| AT-12 | Agenci AI w IDE (Copilot agent mode, Claude Code itp.) | S3, CH-08 | – |
| AT-13 | Diagnoza przyczyn z AI | S4, CH-09 | AI-07 |
| AT-14 | Bezpieczeństwo, poufność, prompt injection | S1 (zasady), S2 (demo B26) | – |
| AT-15 | Raportowanie i decyzje z AI | S4, CH-10 | AI-08 |
| AT-16 | Ocena wyników AI (rubryki, „mini-evals”) | S4, podsumowanie | wszystkie |

## 3. Tematy szczegółowo

### AT-01 Human-in-the-loop i odpowiedzialność
- **Kluczowa myśl:** AI przyspiesza pracę, ale nie przejmuje odpowiedzialności. Pytanie „czy to jest wystarczająco dobre do release?” zawsze zostaje po stronie człowieka.
- **Typowe błędy ludzi:** akceptacja wyniku bez czytania („wygląda profesjonalnie”), automation bias, przerzucanie winy na narzędzie.
- **Praktyka:** dziennik AI, w którym każdy wynik ma zapisaną decyzję człowieka.

### AT-02 Prompting dla QA
- **Struktura promptu:** rola · kontekst (PRD, reguły) · zadanie · format wyjścia (tabela, Gherkin, JSON) · ograniczenia („cytuj fragment PRD dla każdej uwagi”, „nie zgaduj, pytaj”) · kryteria jakości.
- **Techniki:** przykłady (few-shot), dzielenie zadania na kroki, prośba o samokrytykę („co pominąłeś?”), prośba o pytania zamiast założeń, iteracja.
- **Typowe błędy:** prompt bez kontekstu („napisz testy do koszyka”), prośba o „wszystkie testy”, brak formatu, który da się zweryfikować.
- **Artefakt:** biblioteka promptów QA (M6) z wersjami „słaby → dobry”.

### AT-03 Kontekst
- **Zagadnienia:** okno kontekstu, „zgubienie w środku” długiego dokumentu, nieaktualny kontekst (poprzednia wersja PRD w tej samej rozmowie), mieszanie kontekstów w jednym czacie.
- **Typowe błędy AI:** pomija reguły z końca długiego dokumentu, myli wersje v1/v2, miesza fakty z różnych rozmów.
- **Dobre praktyki:** nowy czat na nowe zadanie, podawanie tylko istotnych fragmentów, jawne oznaczenie wersji („PRD v1.3, release notes v2”).

### AT-04 Halucynacje
- **Czym są:** wiarygodnie brzmiące, ale nieprawdziwe treści.
- **Typowe halucynacje w QA:**
  - wymagania, których nie ma w PRD („logowanie przez Google”, „limit 10 szt.”);
  - nieistniejące endpointy, pola JSON lub kody błędów API;
  - nieistniejące metody Playwrighta lub opcje konfiguracji;
  - zmyślone definicje ISTQB i „standardy branżowe”;
  - zmyślone wyniki („test przeszedł”) bez uruchomienia.
- **Weryfikacja:** żądanie cytatu źródła, porównanie z `/api/docs`, uruchomienie kodu, sprawdzenie dokumentacji narzędzia.

### AT-05 Nadmierna pewność i przytakiwanie
- **Typowe błędy AI:** ten sam ton pewności dla faktów i domysłów; zgadzanie się z błędnym założeniem testera („tak, próg 200 zł jest przed rabatem”); zmiana zdania po samym „jesteś pewien?”.
- **Ćwiczenie:** zapytaj AI dwa razy z przeciwnymi założeniami i porównaj odpowiedzi.
- **Dobre praktyki:** neutralne pytania, prośba o poziom pewności i źródło, weryfikacja u PO, a nie u AI.

### AT-06 Niedeterminizm
- **Zagadnienia:** różne odpowiedzi przy tym samym promptcie, między modelami i w czasie (aktualizacje modeli).
- **Konsekwencje dla QA:** nie porównujemy z „jedyną poprawną odpowiedzią”, tylko oceniamy według kryteriów. Prompty w procesach zespołu trzeba wersjonować i testować.
- **Ćwiczenie:** w parach porównanie wyników z CH-01 („czym różnią się nasze listy i dlaczego?”).

### AT-07 Iluzja pokrycia
- **Typowe błędy AI w projektowaniu testów:**
  - dużo przypadków happy path, mało negatywnych;
  - duplikaty o różnych nazwach;
  - brak wartości brzegowych (200.00, ilość 0 / max+1);
  - brak kombinacji reguł (rabat × darmowa dostawa) i przejść stanów;
  - testy bez powiązania z ryzykiem i bez priorytetu.
- **Weryfikacja:** macierz śledzenia wymagania i ryzyka do testów, checklista technik, pytanie „który test wykryłby błąd X?”.

### AT-08 Problem wyroczni i błędy rachunkowe
- **Zagadnienia:** skąd wiemy, jaki jest oczekiwany wynik? Modele językowe mylą się w arytmetyce (zaokrąglenia VAT, kolejność rabat → dostawa).
- **Typowe błędy AI:** liczenie brutto od sumy linii zamiast od sztuki, zaokrąglanie w złą stronę, rabat od kwoty z dostawą, **przepisanie wartości oczekiwanej z aktualnego (błędnego) zachowania aplikacji**.
- **Dobre praktyki:** wartości oczekiwane z reguł, nie z aplikacji. Prośba, żeby AI wygenerowało kod liczący (skrypt lub arkusz) zamiast liczyć „w głowie”. Wyrocznia cenowa.

### AT-09 Dane testowe z AI
- **Typowe błędy AI:** dane „poprawne”, które są niepoprawne (kod pocztowy bez myślnika, zła suma Luhna), dane zbyt jednolite, realistyczne dane osobowe (ryzyko RODO), brak danych brzegowych i specjalnych (UTF-8, polskie znaki, bardzo długie ciągi).
- **Dobre praktyki:** prośba o dane z klasami równoważności i oczekiwanym wynikiem walidacji, weryfikacja regexem lub skryptem, wyłącznie dane fikcyjne.

### AT-10 Bug reporty pisane przez AI
- **Typowe błędy AI:** zmyślone kroki, przeglądarka lub wersja; przypuszczenia podane jako fakty („błąd w bazie danych”); zawyżona severity; rozwlekłość; kilka problemów w jednym zgłoszeniu.
- **Dobre praktyki:** AI dostaje *tylko* obserwacje (notatki, response, `X-Request-Id`) i ma zakaz dodawania czegokolwiek spoza nich. Na końcu ocena checklistą (`learning-outcomes.md`, sekcja 4).

### AT-11 Kod testów generowany przez AI
- **Typowe defekty kodu testów z AI:**
  - `waitForTimeout` lub `sleep` zamiast czekania na stan;
  - kruche lokatory (CSS `nth-child`, teksty zależne od języka) zamiast `getByRole` / `data-testid`;
  - słabe asercje (`toBeVisible`, `toBeTruthy`) zamiast sprawdzenia wartości;
  - wartość oczekiwana skopiowana z działającej (błędnej) aplikacji, więc test „utrwala” bug;
  - brak izolacji: zależność od kolejności testów i danych z poprzedniego testu, brak resetu;
  - sekrety i hasła na sztywno w kodzie;
  - przestarzałe lub nieistniejące API frameworka;
  - `try/catch` połykający błędy, czyli testy, które nigdy nie failują;
  - testy, które nic nie testują (brak asercji).
- **Weryfikacja:** checklista code review, uruchomienie na `baseline` (zielony) i na `s3-check` (czerwony). To pokazuje, że test faktycznie wykrywa błąd.

### AT-12 Agenci AI w IDE
- **Zagadnienia:** poziomy autonomii (podpowiedź → edycja → agent wykonujący komendy), przegląd diffów, ograniczanie uprawnień.
- **Typowe błędy agentów:** „naprawianie” czerwonego testu przez osłabienie asercji, dodanie `retries` lub zmianę wartości oczekiwanej; masowe zmiany poza zakresem zadania; usuwanie „niepotrzebnych” testów; zmyślony raport „wszystkie testy przechodzą”.
- **Dobre praktyki:** mały zakres zadania, przegląd każdego diffu, zasada *zielony test ≠ naprawiony produkt*, uruchomienie testów samodzielnie.

### AT-13 Diagnoza przyczyn (RCA) z AI
- **Typowe błędy AI:** wiarygodna, ale błędna przyczyna; przedwczesna rekomendacja naprawy („dodaj retry”, „zwiększ timeout”), która maskuje regresję; potwierdzanie hipotezy testera; brak rozróżnienia defekt produktu / defekt testu / środowisko / dane.
- **Dobre praktyki:** AI dostaje dowody (log z `X-Request-Id`, response, diff release notes, trace Playwrighta), a nie opis domysłów. Prośba o kilka hipotez z testem rozstrzygającym dla każdej. Metoda 5 Why.

### AT-14 Bezpieczeństwo, poufność, prompt injection
- **Zagadnienia:** polityka AI w firmie, dane poufne i osobowe, sekrety (tokeny, hasła, connection stringi), kod objęty tajemnicą, ustawienia trenowania na danych użytkownika.
- **Prompt injection:** treść strony, logu lub danych testowych może zawierać instrukcje dla AI (demo flagą B26). Każdą treść z zewnątrz traktujemy jako dane, nie polecenia.
- **Testowanie aplikacji z AI** (zapowiedź modułu na później): prompt injection, wyciek danych, halucynacje asystenta zakupowego.
- **Typowe błędy ludzi:** wklejanie produkcyjnych logów z danymi klientów, tokenów z nagłówków, całych repozytoriów firmowych do publicznych narzędzi.

### AT-15 Raportowanie i decyzje z AI
- **Typowe błędy AI:** zmyślone metryki (pokrycie %, liczba testów), optymistyczny ton, pominięcie ryzyk rezydualnych, rekomendacja GO bez danych.
- **Dobre praktyki:** AI tylko formatuje i streszcza dostarczone dane. Każda liczba ma źródło. Decyzja go/no-go i jej uzasadnienie należą do człowieka.

### AT-16 Ocena wyników AI
- **Zagadnienia:** rubryki i checklisty zamiast „podoba mi się”, porównanie modeli i promptów na tych samych danych, wersjonowanie promptów zespołu.
- **Most do przyszłego modułu:** AI evals, czyli systematyczne testowanie funkcji AI w produktach.

## 4. Ściąga: typowe błędy AI według etapu QA Flow

| Etap | Najczęstszy błąd AI | Szybka weryfikacja |
|---|---|---|
| 0. Wymagania i ryzyka | halucynowane wymagania, przeoczone sprzeczności | „Cytuj fragment PRD” |
| 1. Projektowanie testów | iluzja pokrycia, brak granic, błędne wartości oczekiwane | macierz śledzenia, wyrocznia |
| 2. Wykonanie | niepoprawne dane „poprawne”, zmyślone szczegóły w raportach | regex/skrypt, checklista raportu |
| 3. Automatyzacja | słabe asercje, `waitForTimeout`, test utrwalający bug, agent osłabia test | review + przebieg baseline vs `s3-check` |
| 4. Analiza problemów | „to flaky, dodaj retry” zamiast regresji | dowody: logi, request id, release notes |
| 5. Raportowanie | zmyślone metryki, optymistyczne GO | każda liczba ze źródłem |

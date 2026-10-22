# ShopLite – architektura i specyfikacja techniczna (UI + API + DB)

> **Cel:** pełna specyfikacja i prompt dla AI do wygenerowania lekkiej, darmowej i w pełni testowalnej aplikacji e-commerce na potrzeby szkolenia *AI-Driven QA Engineering* (zob. `training-spec.md`, B5).
> **Wersja:** 1.0 · **Status:** do akceptacji
> **Diagram:** [`shoplite-architecture.drawio`](shoplite-architecture.drawio) (otwórz w app.diagrams.net albo w VS Code z rozszerzeniem Draw.io Integration)

**Jak używać:** sekcje 1–9 to specyfikacja („źródło prawdy” dla zachowania aplikacji). Sekcja 10 to gotowy prompt dla AI, który każe generować aplikację etapami według sekcji 11. Sekcja 12 to kryteria odbioru.

---

## 0. Zmiany względem wersji roboczej (i dlaczego)

| Wersja robocza | Teraz | Powód |
|---|---|---|
| FastAPI **lub** Express | **Node.js + Express** (decyzja w ADR-01) | Uczestnik i tak potrzebuje Node.js do Playwrighta. Jeden runtime to mniej instalacji na firmowych laptopach. |
| Ceny jako `REAL` | **Kwoty w groszach (`INTEGER`)** | Liczby zmiennoprzecinkowe dają błędy zaokrągleń. Baseline musi liczyć dokładnie, a błędy zaokrągleń dodajemy celowo jako bug flagi. |
| Seed z `fakestoreapi.com` | **Lokalny `seed-data.json` + obrazki SVG w repo** | Brak zależności od internetu i od dostępności obcego serwisu. Dane są deterministyczne, więc testy są powtarzalne. |
| UI i API na różnych originach, CORS | **Jeden proces i port: UI pod `/`, API pod `/api`** | Brak problemów z CORS na starcie. CORS zostaje włączony konfiguracją dla Postmana i ćwiczeń. |
| Tailwind z CDN | **Tailwind vendorowany do `public/vendor/`** (przypięta wersja) | Działa offline i nie zmieni się w trakcie szkolenia. |
| 3 tabele, 4 endpointy | Pełny model: użytkownicy, rabaty, dostawa, płatność mock, statusy | Wyzwania szkoleniowe (rabaty, darmowa dostawa, regresja, flaky, autoryzacja) wymagają reguł biznesowych. |
| Brak sterowania błędami | **Bug flagi, wersje v1/v2, fault injection, reset, `FAKE_NOW`** | Trener musi kontrolować, co jest zepsute, a stan musi być powtarzalny. |
| `400` przy braku towaru | **`409 Conflict`** + jednolity format błędu | Rozróżnia błąd walidacji od konfliktu stanu, co jest ważne przy testach API. |
| Draw.io: `edgeStyle=orthoEdgeStyle` | `edgeStyle=orthogonalEdgeStyle` | Poprzednia nazwa stylu nie istnieje w Draw.io. |

---

## 1. Architektura

### 1.1 Zasady
1. **Local-first i zero kosztów.** `npm install && npm start` uruchamia całość. Po instalacji działa bez internetu.
2. **No build step.** Brak bundlera i transpilacji w aplikacji. Frontend to statyczne pliki.
3. **Jeden proces, jeden port (`3000`).** Express serwuje UI, API, dokumentację API i panel trenera.
4. **Backend jest jedynym źródłem prawdy.** Frontend nigdy nie wysyła cen ani sum, tylko `product_id`, `quantity`, kod rabatowy i metodę dostawy.
5. **Testowalność wbudowana.** Stabilne `data-testid`, deterministyczny seed, reset stanu, sterowanie czasem, nagłówek `X-Request-Id`, czytelne logi.
6. **Przejrzystość dla uczących się.** Raw SQL zamiast ORM, mało warstw i komentarze tylko tam, gdzie reguła biznesowa nie jest oczywista.
7. **Baseline bez błędów.** Kod generowany według tej specyfikacji jest poprawny. Błędy szkoleniowe dodaje się osobno, za flagami (sekcja 8).

### 1.2 Diagram (ASCII)

```
┌──────────────────────────── Laptop uczestnika (localhost) ─────────────────────────────┐
│                                                                                         │
│  ┌──────────────────┐   GET /, /js, /css   ┌──────────── Node.js :3000 ─────────────┐   │
│  │ Browser – SPA    │ ───────────────────▶ │ static (public/)    /api/docs (Swagger)│   │
│  │ HTML+Tailwind+JS │   fetch /api (JSON)  │ middleware: requestId, logger, CORS,   │   │
│  │ cart: localStorage│ ──────────────────▶ │   faults, auth, errors                 │   │
│  └────────▲─────────┘                      │ routes: auth products cart orders      │   │
│           │ drives                         │         payments admin health          │   │
│  ┌────────┴─────────┐   HTTP/JSON          │ services: pricing inventory orders     │   │
│  │ Playwright       │ ───────────────────▶ │           payments(mock) auth          │   │
│  │ UI + API tests   │                      │ config & flags: version, bugs, FAKE_NOW│   │
│  └──────────────────┘                      │ data access: better-sqlite3 (raw SQL)  │   │
│  ┌──────────────────┐   HTTP/JSON          └──────────────────┬─────────────────────┘   │
│  │ Swagger/Postman  │ ───────────────────▶                    │ SQL (transakcje)        │
│  └──────────────────┘                                ┌────────▼────────┐  ┌───────────┐ │
│  ┌──────────────────┐                                │ data/shoplite.db│◀─│ seed-data │ │
│  │ DB Browser SQLite│ ─────── SELECT ──────────────▶ │ (SQLite)        │  │ schema.sql│ │
│  └──────────────────┘                                └─────────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────────────────────────────────────┘
```

### 1.3 Decyzje architektoniczne (ADR)

| ID | Decyzja | Alternatywa | Uzasadnienie |
|---|---|---|---|
| ADR-01 | Node.js 22 LTS (lub nowszy LTS) + Express 4/5 | Python + FastAPI | Jeden runtime razem z Playwrightem. FastAPI ma lepsze automatyczne OpenAPI, ale wymaga instalacji Pythona. |
| ADR-02 | `better-sqlite3` (synchroniczne, prebuilt binaries dla Win/macOS/Linux) | wbudowany `node:sqlite` | Stabilne i proste transakcje. `node:sqlite` rozważyć, gdy będzie stabilny w LTS, bo usunie natywną zależność. |
| ADR-03 | Spec-first OpenAPI: ręcznie utrzymywany `openapi.yaml` + `swagger-ui-express` | adnotacje w kodzie | Kontrakt jest artefaktem do testowania („czy API zgadza się z dokumentacją?”). |
| ADR-04 | Vanilla JS (moduły ES) + hash router | Alpine.js | Brak dodatkowej abstrakcji, łatwiejsza praca z AI i przewidywalny DOM dla testów. |
| ADR-05 | Koszyk po stronie klienta (`localStorage`), serwer bezstanowy dla koszyka | koszyk w DB | Mniej endpointów. Wycena zawsze przez `POST /api/cart/quote`. |
| ADR-06 | Sesje: nieprzezroczysty token w tabeli `sessions`, nagłówek `Authorization: Bearer` | JWT | Prosty do zrozumienia, wylogowanie działa natychmiast, a token da się podejrzeć w DB. |
| ADR-07 | Kwoty w groszach (`INTEGER`), VAT w procentach (`INTEGER`) | `REAL` | Dokładność obliczeń. |
| ADR-08 | Checkout wymaga zalogowania (bez zakupów jako gość) | guest checkout | Upraszcza autoryzację zamówień i płatności, a daje materiał do testów 401/403. |

### 1.4 Środowiska uruchomieniowe
| Środowisko | Rola | Koszt |
|---|---|---|
| **Lokalnie** (Windows/macOS/Linux) | Podstawowe | 0 zł |
| **GitHub Codespaces** (`.devcontainer/devcontainer.json`) | Plan B, gdy laptop firmowy blokuje instalację | darmowy miesięczny limit konta GitHub (sprawdź aktualny) |
| Hosting demo (np. Render free) | Opcjonalnie: demo na webinar | darmowy plan usypia instancję i nie zachowuje pliku DB, co przy resecie na starcie nie przeszkadza |

---

## 2. Struktura repozytorium `shoplite`

```
shoplite/
├─ package.json            # scripts: start, dev, reset-db, test, test:api, test:ui, test:unit
├─ .env.example            # PORT, DB_PATH, APP_VERSION, BUGS, LATENCY_MS, ERROR_RATE, FAKE_NOW, CORS_ORIGINS, ADMIN_ENABLED
├─ openapi.yaml            # kontrakt API (źródło prawdy dla /api/docs)
├─ README.md               # start w 3 krokach, konta demo, troubleshooting instalacji
├─ .devcontainer/devcontainer.json
├─ src/
│  ├─ server.js            # start HTTP
│  ├─ app.js               # składanie Express (eksportowane dla testów)
│  ├─ config.js            # env + runtime config (app_config)
│  ├─ flags.js             # isBugOn('B07'), getVersion(), now()
│  ├─ db/ index.js · schema.sql · seed.js · seed-data.json
│  ├─ middleware/ requestId.js · logger.js · faults.js · auth.js · errors.js
│  ├─ routes/ health.js · auth.js · products.js · cart.js · orders.js · admin.js
│  ├─ services/ pricing.js · inventory.js · orders.js · payments.js · auth.js
│  └─ validation.js        # walidatory pól (email, kod pocztowy, telefon…)
├─ public/
│  ├─ index.html           # SPA
│  ├─ admin.html           # panel trenera
│  ├─ js/ app.js · api.js · router.js · store.js · format.js · views/*.js
│  ├─ css/app.css
│  ├─ img/*.svg            # lokalne obrazki produktów
│  └─ vendor/tailwind.js   # przypięta wersja
├─ tests/
│  ├─ unit/pricing.test.js # node:test – reguły cenowe
│  ├─ api/*.spec.ts        # Playwright request
│  └─ ui/*.spec.ts         # Playwright page
├─ playwright.config.ts    # webServer: npm start, baseURL http://localhost:3000
└─ data/                   # shoplite.db (w .gitignore)
```

**Skrypty:** `npm start` (inicjalizacja DB, jeśli nie istnieje, potem start), `npm run dev` (`node --watch`), `npm run reset-db`, `npm test` (unit + API + UI), `npm run test:unit` (`node --test`).

**Zależności runtime (minimum):** `express`, `better-sqlite3`, `swagger-ui-express`, `yaml`, `bcryptjs` (czysty JS, bez kompilacji). **Dev:** `@playwright/test`.

---

## 3. Model danych (SQLite)

Konwencje: kwoty w groszach (`*_cents`), daty w ISO 8601 UTC (`TEXT`), `PRAGMA foreign_keys = ON`, `PRAGMA journal_mode = WAL`.

### 3.1 `users`
| Kolumna | Typ | Ograniczenia / opis |
|---|---|---|
| id | INTEGER | PK AUTOINCREMENT |
| email | TEXT | UNIQUE NOT NULL, zapisywany lowercase |
| password_hash | TEXT | NOT NULL (bcrypt) |
| full_name | TEXT | NOT NULL |
| role | TEXT | NOT NULL DEFAULT 'CUSTOMER' CHECK IN ('CUSTOMER','VIP','ADMIN') |
| is_blocked | INTEGER | NOT NULL DEFAULT 0 |
| created_at | TEXT | NOT NULL |

### 3.2 `sessions`
| Kolumna | Typ | Ograniczenia / opis |
|---|---|---|
| token | TEXT | PK (losowe 32 bajty hex) |
| user_id | INTEGER | FK → users(id) ON DELETE CASCADE |
| expires_at | TEXT | NOT NULL (+8 h od logowania) |

### 3.3 `categories`
| id INTEGER PK | slug TEXT UNIQUE NOT NULL | name TEXT NOT NULL |
|---|---|---|

### 3.4 `products`
| Kolumna | Typ | Ograniczenia / opis |
|---|---|---|
| id | INTEGER | PK AUTOINCREMENT |
| sku | TEXT | UNIQUE NOT NULL (np. `SL-KB-001`) |
| name | TEXT | NOT NULL |
| slug | TEXT | UNIQUE NOT NULL |
| category_id | INTEGER | FK → categories(id) |
| description | TEXT | |
| price_net_cents | INTEGER | NOT NULL CHECK > 0 |
| vat_rate | INTEGER | NOT NULL DEFAULT 23 CHECK IN (0,5,8,23) |
| stock | INTEGER | NOT NULL DEFAULT 0 CHECK >= 0 |
| max_per_order | INTEGER | NOT NULL DEFAULT 5 |
| image_url | TEXT | ścieżka lokalna `/img/…svg` |
| is_active | INTEGER | NOT NULL DEFAULT 1 |
| created_at | TEXT | NOT NULL |

### 3.5 `discount_codes`
| Kolumna | Typ | Ograniczenia / opis |
|---|---|---|
| code | TEXT | PK, porównanie case-insensitive, zapis UPPERCASE |
| type | TEXT | CHECK IN ('PERCENT','FIXED') |
| value | INTEGER | PERCENT: 1–100; FIXED: grosze |
| min_subtotal_cents | INTEGER | NOT NULL DEFAULT 0 (liczone od sumy brutto przed rabatem) |
| valid_from / valid_to | TEXT | NULL = bez ograniczenia; `valid_to` włącznie do 23:59:59 UTC |
| usage_limit | INTEGER | NULL = bez limitu |
| used_count | INTEGER | NOT NULL DEFAULT 0 |
| is_active | INTEGER | NOT NULL DEFAULT 1 |

### 3.6 `orders`
| Kolumna | Typ | Ograniczenia / opis |
|---|---|---|
| id | INTEGER | PK AUTOINCREMENT |
| order_number | TEXT | UNIQUE NOT NULL, format `SL-YYYY-NNNNNN` |
| user_id | INTEGER | FK → users(id) NOT NULL |
| customer_email | TEXT | NOT NULL (kopia z konta) |
| ship_name, ship_street, ship_city, ship_postal_code, ship_phone | TEXT | NOT NULL |
| ship_country | TEXT | NOT NULL DEFAULT 'PL' |
| shipping_method | TEXT | CHECK IN ('COURIER','PARCEL_LOCKER','PICKUP') |
| subtotal_net_cents | INTEGER | NOT NULL |
| subtotal_gross_cents | INTEGER | NOT NULL |
| discount_code | TEXT | NULL |
| discount_cents | INTEGER | NOT NULL DEFAULT 0 |
| shipping_cents | INTEGER | NOT NULL |
| total_gross_cents | INTEGER | NOT NULL |
| status | TEXT | NOT NULL DEFAULT 'PENDING' CHECK IN ('PENDING','PAID','PAYMENT_FAILED','CANCELLED') |
| idempotency_key | TEXT | UNIQUE NULL |
| created_at / updated_at | TEXT | NOT NULL |

### 3.7 `order_items`
| Kolumna | Typ | Ograniczenia / opis |
|---|---|---|
| id | INTEGER | PK |
| order_id | INTEGER | FK → orders(id) ON DELETE CASCADE |
| product_id | INTEGER | FK → products(id) |
| product_name | TEXT | snapshot nazwy |
| quantity | INTEGER | NOT NULL CHECK > 0 |
| unit_price_net_cents | INTEGER | snapshot |
| vat_rate | INTEGER | snapshot |
| unit_price_gross_cents | INTEGER | snapshot |
| line_total_gross_cents | INTEGER | NOT NULL |

### 3.8 `payments`
| id INTEGER PK | order_id FK | card_last4 TEXT | result TEXT CHECK IN ('SUCCESS','DECLINED','TIMEOUT') | amount_cents INTEGER | created_at TEXT |
|---|---|---|---|---|---|

Pełny numer karty **nigdy** nie jest zapisywany ani logowany.

### 3.9 `app_config`
`key TEXT PK, value TEXT`. Klucze: `version` (`v1`/`v2`), `bugs` (CSV ID-ków, np. `B01,B07`), `latency_ms` (`0` lub `200-1500`), `error_rate` (`0`–`1`), `fake_now` (ISO lub pusty). Wartości z `.env` są domyślne, a `app_config` nadpisuje je w runtime.

### 3.10 Indeksy
`products(category_id)`, `products(is_active)`, `orders(user_id, created_at DESC)`, `order_items(order_id)`, `sessions(user_id)`.

---

## 4. Reguły biznesowe (źródło prawdy dla baseline)

> Uwaga dla szkolenia: **user stories dla uczestników mogą być celowo niejednoznaczne** (training-spec B5.3). Ta sekcja to jednoznaczna „prawda” implementacji, czyli klucz odpowiedzi dla trenera.

**R1 – Cena jednostkowa brutto:** `unit_gross = round_half_up(price_net_cents × (100 + vat_rate) / 100)`, zaokrąglenie do grosza **na sztuce**.
**R2 – Linia:** `line_total_gross = unit_gross × quantity`. `subtotal_gross = Σ line_total_gross`. `subtotal_net = Σ price_net × quantity`.
**R3 – Ilość:** liczba całkowita `1 ≤ quantity ≤ min(stock, max_per_order)`. Ten sam `product_id` podany dwa razy w żądaniu jest sumowany.
**R4 – Produkt nieaktywny lub nieistniejący:** pozycja odrzucona (issue `PRODUCT_UNAVAILABLE`).
**R5 – Kod rabatowy:** maksymalnie jeden na zamówienie. Ważny, gdy `is_active`, `now` mieści się w `[valid_from, valid_to]`, `used_count < usage_limit` i `subtotal_gross ≥ min_subtotal_cents`.
- PERCENT: `discount = round_half_up(subtotal_gross × value / 100)`
- FIXED: `discount = min(value, subtotal_gross)`
- `used_count` rośnie przy utworzeniu zamówienia i maleje przy anulowaniu.

**R6 – Dostawa:** `COURIER` 15,99 zł · `PARCEL_LOCKER` 9,99 zł · `PICKUP` 0 zł.
**R7 – Darmowa dostawa:** gdy `subtotal_gross − discount ≥ 200,00 zł` (**po rabacie**) **albo** gdy użytkownik ma rolę `VIP`.
**R8 – Suma:** `total_gross = subtotal_gross − discount + shipping`, nigdy < 0.
**R9 – Rezerwacja stanu:** przy `POST /api/orders` stan magazynowy jest pomniejszany w **jednej transakcji** (`BEGIN IMMEDIATE`) warunkowym `UPDATE products SET stock = stock - :q WHERE id = :id AND stock >= :q`. Jeśli `changes = 0` dla dowolnej pozycji, następuje `ROLLBACK` i odpowiedź `409 OUT_OF_STOCK`.
**R10 – Statusy zamówienia:**
```
PENDING ──pay(SUCCESS)──▶ PAID
PENDING ──pay(DECLINED/TIMEOUT)──▶ PAYMENT_FAILED ──pay(SUCCESS)──▶ PAID
PENDING | PAYMENT_FAILED | PAID ──cancel──▶ CANCELLED   (zwrot stanu i used_count kodu)
CANCELLED: stan końcowy; każda operacja → 409 INVALID_STATE
```
**R11 – Płatność (mock):** numery kart testowych (fikcyjne, publicznie znane):
- `4242 4242 4242 4242` → `SUCCESS`
- `4000 0000 0000 0002` → `DECLINED`
- `4000 0000 0000 9995` → `TIMEOUT` (odpowiedź po 5 s, `504 PAYMENT_TIMEOUT`)
- inny numer albo niepoprawny Luhn → `400 VALIDATION_ERROR`. Ważność `MM/YY` nie może być w przeszłości (względem `now`), CVC ma 3 cyfry.

**R12 – Walidacja adresu:** imię i nazwisko 2–80 znaków; ulica 3–120; miasto 2–60; kod pocztowy `^\d{2}-\d{3}$`; telefon `^\+?48?\s?\d{9}$` po usunięciu spacji; email RFC-lite `^[^\s@]+@[^\s@]+\.[^\s@]+$`.
**R13 – Konto:** rejestracja wymaga hasła z min. 8 znaków, 1 cyfrą i 1 literą; email unikalny (case-insensitive). Konto `is_blocked` → logowanie `403 ACCOUNT_BLOCKED`. Błędne dane logowania → zawsze `401 INVALID_CREDENTIALS` (bez ujawniania, czy email istnieje).
**R14 – Autoryzacja:** użytkownik widzi i modyfikuje tylko swoje zamówienia (cudze → `404`, żeby nie ujawniać istnienia). `ADMIN` widzi wszystkie.
**R15 – Idempotencja:** `POST /api/orders` z nagłówkiem `Idempotency-Key` powtórzonym w ciągu 24 h zwraca to samo zamówienie (`200`) zamiast tworzyć nowe.
**R16 – Czas:** cała logika używa `flags.now()`, które zwraca `fake_now` (jeśli ustawione) albo czas systemowy.

---

## 5. Specyfikacja API

Bazowy URL: `http://localhost:3000/api` · format: JSON UTF-8 · dokumentacja: `/api/docs` (Swagger UI) i `/api/openapi.yaml`.

### 5.1 Konwencje
- Kwoty w odpowiedziach: `*_cents` (integer) **i** sformatowane pola `*_display` w obiektach dla UI (np. `"246.00"`). Waluta jest stała: `PLN`.
- Każda odpowiedź ma nagłówek `X-Request-Id` (przyjmowany z żądania lub generowany) oraz `X-App-Version`.
- Autoryzacja: `Authorization: Bearer <token>`.
- Paginacja: `?page=1&page_size=12` (maks. 50), odpowiedź `{ "items": [...], "page", "page_size", "total" }`.
- **Jednolity format błędu:**
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Invalid request", "details": [ { "field": "ship_postal_code", "issue": "Expected format NN-NNN" } ], "request_id": "b1c2…" } }
```

| HTTP | `code` | Kiedy |
|---|---|---|
| 400 | `VALIDATION_ERROR` | niepoprawne dane wejściowe |
| 401 | `UNAUTHORIZED`, `INVALID_CREDENTIALS` | brak lub zły token, złe logowanie |
| 403 | `FORBIDDEN`, `ACCOUNT_BLOCKED` | brak uprawnień, konto zablokowane |
| 404 | `NOT_FOUND` | brak zasobu (lub cudze zamówienie) |
| 402 | `PAYMENT_DECLINED` | płatność odrzucona (mock) |
| 409 | `OUT_OF_STOCK`, `INVALID_STATE`, `EMAIL_TAKEN` | konflikt stanu |
| 422 | `DISCOUNT_INVALID` | kod rabatowy nie spełnia warunków (tylko w `POST /orders`) |
| 500 | `INTERNAL_ERROR` | nieoczekiwany błąd (bez stack trace w odpowiedzi) |
| 503/504 | `INJECTED_FAULT`, `PAYMENT_TIMEOUT` | fault injection, timeout płatności |

### 5.2 Endpointy

| Metoda | Ścieżka | Auth | Opis |
|---|---|---|---|
| GET | `/health` | – | `{ status: "ok", version, db: "ok", time }` |
| POST | `/auth/register` | – | `{email, password, full_name}` → 201 `{user}` |
| POST | `/auth/login` | – | `{email, password}` → 200 `{token, expires_at, user}` |
| POST | `/auth/logout` | user | 204 |
| GET | `/auth/me` | user | `{id, email, full_name, role}` |
| GET | `/categories` | – | lista kategorii |
| GET | `/products` | – | `?search=&category=&sort=name\|price_asc\|price_desc\|newest&in_stock=true&page=&page_size=` |
| GET | `/products/{id}` | – | szczegóły, 404 gdy brak lub nieaktywny |
| POST | `/cart/quote` | opcjonalnie | wycena koszyka (dla VIP z tokenem darmowa dostawa) |
| POST | `/orders` | user | utworzenie zamówienia (`Idempotency-Key` opcjonalny) |
| GET | `/orders` | user | moje zamówienia (paginacja, najnowsze pierwsze) |
| GET | `/orders/{id}` | user | szczegóły z pozycjami i płatnościami |
| POST | `/orders/{id}/pay` | user | `{card_number, expiry, cvc}` |
| POST | `/orders/{id}/cancel` | user | anulowanie (R10) |
| GET | `/admin/config` | admin | aktualna konfiguracja (version, bugs, latency, error_rate, fake_now) |
| PUT | `/admin/config` | admin | zmiana konfiguracji w runtime |
| POST | `/admin/reset` | admin | odtworzenie DB z seeda (≤ 1 s) |
| GET | `/admin/orders` | admin | wszystkie zamówienia |

> Endpointy `/admin/*` działają tylko przy `ADMIN_ENABLED=true` (domyślnie `true` lokalnie). Dodatkowo przyjmują nagłówek `X-Admin-Key` z `.env`, żeby trener mógł je wywołać skryptem bez logowania.

### 5.3 Kluczowe kontrakty

**`GET /products/{id}` → 200**
```json
{
  "id": 1, "sku": "SL-KB-001", "name": "Mechanical Keyboard", "slug": "mechanical-keyboard",
  "category": { "slug": "electronics", "name": "Electronics" },
  "description": "Hot-swappable 75% keyboard.",
  "price_net_cents": 20000, "vat_rate": 23,
  "price_gross_cents": 24600, "price_gross_display": "246.00",
  "stock": 10, "max_per_order": 5, "in_stock": true,
  "image_url": "/img/keyboard.svg"
}
```

**`POST /cart/quote`** – request:
```json
{ "items": [ { "product_id": 1, "quantity": 2 } ], "discount_code": "WELCOME10", "shipping_method": "COURIER" }
```
Response 200 (zawsze 200, gdy JSON jest poprawny; problemy są w `issues`):
```json
{
  "valid": true,
  "lines": [ { "product_id": 1, "name": "Mechanical Keyboard", "quantity": 2, "unit_price_gross_cents": 24600, "line_total_gross_cents": 49200 } ],
  "subtotal_net_cents": 40000, "subtotal_gross_cents": 49200,
  "discount": { "code": "WELCOME10", "applied": true, "amount_cents": 4920 },
  "shipping": { "method": "COURIER", "amount_cents": 0, "free_reason": "THRESHOLD" },
  "total_gross_cents": 44280,
  "issues": []
}
```
Typy `issues[]`: `{ "type": "INSUFFICIENT_STOCK", "product_id": 3, "requested": 4, "available": 2 }`, `PRODUCT_UNAVAILABLE`, `QUANTITY_LIMIT`, `DISCOUNT_EXPIRED`, `DISCOUNT_MIN_NOT_MET`, `DISCOUNT_UNKNOWN`, `DISCOUNT_EXHAUSTED`. `valid` jest `false`, jeśli występuje jakikolwiek issue dotyczący pozycji. Problemy z rabatem nie unieważniają koszyka (`applied: false`).

**`POST /orders`** – request:
```json
{
  "items": [ { "product_id": 1, "quantity": 2 } ],
  "discount_code": "WELCOME10",
  "shipping_method": "PARCEL_LOCKER",
  "shipping_address": { "name": "Anna Test", "street": "Testowa 1/2", "city": "Warszawa", "postal_code": "00-001", "phone": "+48 600 000 000" }
}
```
→ `201` `{ "id": 17, "order_number": "SL-2026-000017", "status": "PENDING", "total_gross_cents": 44280, "items": [...], ... }`
→ `409 OUT_OF_STOCK` (z `details` per produkt) · `422 DISCOUNT_INVALID` · `400 VALIDATION_ERROR`

**`POST /orders/{id}/pay`** → `200 { status: "PAID", payment: { result: "SUCCESS", card_last4: "4242" } }` · `402 PAYMENT_DECLINED` (status → `PAYMENT_FAILED`) · `504 PAYMENT_TIMEOUT` · `409 INVALID_STATE`

---

## 6. Frontend (SPA)

### 6.1 Widoki (hash router)
| Route | Widok | Najważniejsze elementy |
|---|---|---|
| `#/` | Katalog | wyszukiwarka, filtr kategorii, sortowanie, „tylko dostępne”, siatka kart, paginacja |
| `#/product/:id` | Szczegóły | wybór ilości, „Add to cart”, stan magazynowy (gdy stock < 5: „Only N left”), komunikat braku |
| `#/cart` | Koszyk | zmiana ilości, usuwanie, kod rabatowy, metoda dostawy, podsumowanie z `/cart/quote`, lista `issues` |
| `#/login`, `#/register` | Konto | walidacja inline, komunikaty błędów API |
| `#/checkout` | Checkout | formularz adresu, podsumowanie, „Place order” (blokada przycisku w trakcie wysyłki) |
| `#/orders/:id` | Zamówienie | status, pozycje, formularz płatności, „Cancel order” |
| `#/orders` | Historia | lista zamówień użytkownika |
| `/admin.html` | Panel trenera | wersja v1/v2, checkboxy bug flag, latency, error rate, fake now, „Reset data” |

Nagłówek: logo, link do koszyka z licznikiem (`cart-count`), zalogowany użytkownik i jego rola, wylogowanie, stopka z `version` i linkiem do `/api/docs`.

### 6.2 Zasady UI
- **UI po angielsku.** Kwoty w formacie `246.00 PLN`.
- Koszyk w `localStorage` (`shoplite.cart` = `[{product_id, quantity}]`), token w `localStorage` (`shoplite.token`). Świadomie: XSS-owa podatność tokena to temat do dyskusji o bezpieczeństwie.
- Każda zmiana koszyka wywołuje `/cart/quote` (debounce 300 ms). UI **nie liczy** sum samodzielnie.
- Stany ładowania (`loading-indicator`), puste stany („Your cart is empty”) i komunikaty błędów z `role="alert"`.
- Każde pole formularza ma `<label for>`. Nawigacja klawiaturą działa.
- `console.info` dla nawigacji i wywołań API (metoda, URL, status, `X-Request-Id`), `console.error` dla błędów.

### 6.3 Konwencja `data-testid` (kontrakt dla automatyzacji)
Format: `kebab-case`, z ID encji tam, gdzie elementów jest wiele.

| Obszar | testid |
|---|---|
| Nawigacja | `nav-home`, `nav-cart`, `cart-count`, `nav-login`, `nav-logout`, `nav-orders`, `user-name` |
| Katalog | `search-input`, `category-filter`, `sort-select`, `in-stock-toggle`, `product-card-{id}`, `product-name-{id}`, `product-price-{id}`, `add-to-cart-{id}`, `pagination-next`, `pagination-prev` |
| Produkt | `product-detail-name`, `product-detail-price`, `product-detail-stock`, `quantity-input`, `add-to-cart` |
| Koszyk | `cart-line-{productId}`, `cart-qty-{productId}`, `cart-remove-{productId}`, `discount-input`, `discount-apply`, `discount-message`, `shipping-method-{METHOD}`, `summary-subtotal`, `summary-discount`, `summary-shipping`, `summary-total`, `cart-issues`, `checkout-button` |
| Logowanie | `login-email`, `login-password`, `login-submit`, `register-*` (analogicznie) |
| Checkout | `ship-name`, `ship-street`, `ship-city`, `ship-postal-code`, `ship-phone`, `place-order`, `field-error-{field}` |
| Zamówienie | `order-number`, `order-status`, `card-number`, `card-expiry`, `card-cvc`, `pay-button`, `cancel-order`, `payment-message` |
| Globalne | `toast`, `error-banner`, `loading-indicator` |

**Celowy wyjątek szkoleniowy:** widok **historii zamówień** (`#/orders`) nie ma `data-testid` na wierszach. Służy do ćwiczenia lokatorów opartych na rolach i tekście (`getByRole`).

---

## 7. Dane początkowe (seed)

Plik `src/db/seed-data.json`, w pełni deterministyczny. Reset (`npm run reset-db` lub `POST /api/admin/reset`) odtwarza dokładnie ten stan.

**Kategorie:** `electronics`, `books`, `home`, `apparel`.

**Produkty (12):** zestaw celowo dobrany pod testy.
| SKU | Nazwa | Netto | VAT | Stock | Uwagi testowe |
|---|---|---|---|---|---|
| SL-KB-001 | Mechanical Keyboard | 200.00 | 23 | 10 | przykład z dokumentacji |
| SL-MS-002 | Wireless Mouse | 81.30 | 23 | 25 | brutto 99.999 → zaokrąglenie do 100.00 |
| SL-HP-003 | Noise-Cancelling Headphones | 650.00 | 23 | 3 | **wyścig o stan** (race condition) |
| SL-CB-004 | USB-C Cable | 12.19 | 23 | 100 | tani, do testów progu dostawy |
| SL-BK-005 | Clean Code (book) | 47.62 | 5 | 8 | VAT 5% |
| SL-BK-006 | Testing Handbook (book) | 76.19 | 5 | 1 | **ostatnia sztuka** |
| SL-HM-007 | Ceramic Mug | 32.52 | 23 | 0 | **brak w magazynie** |
| SL-HM-008 | Desk Lamp | 121.95 | 23 | 12 | |
| SL-HM-009 | Coffee Beans 1kg | 74.07 | 8 | 30 | VAT 8% |
| SL-AP-010 | QA Hoodie | 162.60 | 23 | 7 | `max_per_order = 2`; brutto dokładnie 200.00 (granica darmowej dostawy) |
| SL-AP-011 | Bug Hunter T-Shirt | 64.23 | 23 | 15 | |
| SL-AP-012 | Retired Cap | 40.00 | 23 | 5 | `is_active = 0` (nie może się pojawić) |

**Kody rabatowe:**
| Kod | Typ | Wartość | Min. koszyk | Ważność | Limit |
|---|---|---|---|---|---|
| WELCOME10 | PERCENT | 10 | 100.00 | bez limitu | – |
| MINUS50 | FIXED | 50.00 | 300.00 | bez limitu | – |
| BLACKFRIDAY25 | PERCENT | 25 | 0 | okno 4 dni wokół ostatniego piątku listopada bieżącego roku | 100 |
| EXPIRED20 | PERCENT | 20 | 0 | wygasł w zeszłym roku | – |
| ONCEONLY | FIXED | 20.00 | 0 | bez limitu | 1 |

**Konta demo:** 4 konta (`CUSTOMER`, `VIP`, zablokowany `CUSTOMER`, `ADMIN`) w domenie `@shoplite.test`. Hasło testowe jest wspólne dla wszystkich i zdefiniowane w `seed-data.json` oraz w README. To **wyłącznie fikcyjne dane szkoleniowe**.
**Zamówienia:** 3 historyczne zamówienia klienta `CUSTOMER` (PAID, CANCELLED, PAYMENT_FAILED) i 1 zamówienie VIP (dla testu R14: dostęp do cudzego zamówienia).

**Obrazki:** proste lokalne SVG (ikona + kolor kategorii), wygenerowane w repo. Brak zewnętrznych URL-i.

---

## 8. Sterowanie szkoleniowe (flags, wersje, fault injection)

### 8.1 Mechanizm
- `flags.isBugOn(id)` → `true`, jeśli ID jest na liście `bugs` **albo** należy do presetu wersji (`v2` = zestaw regresji).
- Bug flagi mają **nieprzezroczyste ID** (`B01`…`B26`), bez opisowych nazw w kodzie i konfiguracji. Implementacja to krótkie warunki w miejscu błędu:
  ```js
  // B07
  if (flags.isBugOn('B07')) { /* alternatywna (błędna) ścieżka */ }
  ```
- **Katalog błędów (co robi który ID) NIE trafia do repo uczestników.** Jest w prywatnym `specs/trainer/defect-catalog.md` (B01–B26, presety, klucze odpowiedzi).
- Ustawianie: `.env` (`APP_VERSION=v1`, `BUGS=B01,B03`) → nadpisanie przez `PUT /api/admin/config` lub `admin.html`. Zmiana działa bez restartu.
- **Presety** (klucz `preset` w `app_config`, przyciski w `admin.html`): `baseline`, `s2`, `s3-check`, `s4`. Preset ustawia naraz wersję, listę bugów i fault injection (definicje w katalogu trenera, w kodzie jako mapa ID → konfiguracja). Nazwy presetów nie zdradzają treści błędów.
- `B26` (opcjonalnie): ukryty tekst prompt injection w opisie jednego produktu, do demonstracji tematu AT-14.
- `GET /api/health` i stopka UI pokazują wersję (`v1`/`v2`), **ale nie listę włączonych bugów**.

> **Ryzyko:** repo jest publiczne, więc uczestnik może znaleźć warunki `isBugOn` w kodzie. Akceptujemy to: ćwiczenia są black-box, a zasada „nie zaglądamy do `src/`” jest w regulaminie. Opcjonalnie można trzymać implementacje błędów w osobnej prywatnej gałęzi `training` i udostępnić uczestnikom tylko zbudowane archiwum ZIP z zminifikowanym `src/bugs.js`.

### 8.2 Fault injection (middleware `faults.js`)
| Ustawienie | Efekt |
|---|---|
| `latency_ms=200-1500` | losowe opóźnienie każdego `/api/*` z zakresu (źródło flaky testów) |
| `error_rate=0.1` | 10% żądań `/api/*` (poza `/admin`, `/health`) kończy się `503 INJECTED_FAULT` |
| `fake_now=2026-11-27T10:00:00Z` | przesunięcie czasu (testy ważności kodów, wygaśnięcia sesji, ważności kart) |

### 8.3 Miejsca przygotowane pod błędy (hook points)
AI generujące baseline ma przygotować **kod łatwy do „zepsucia” w izolacji**: każda reguła z sekcji 4 w osobnej, małej funkcji w `services/`, np. `calcUnitGross`, `calcDiscount`, `calcShipping`, `reserveStock`, `canTransition`, `validatePostalCode`. Same błędy dodaje się w osobnym kroku (sekcja 11, Etap 9), według katalogu trenera.

---

## 9. Wymagania niefunkcjonalne

| Obszar | Wymaganie |
|---|---|
| Instalacja | `git clone` → `npm install` → `npm start` w < 5 min na czystej maszynie. Brak natywnych kompilacji poza prebuilt `better-sqlite3`. |
| Start | Serwer gotowy w < 3 s. Pierwsze uruchomienie tworzy DB i seed automatycznie. |
| Wydajność | `GET /products` < 100 ms lokalnie (bez fault injection). |
| Współbieżność | 10 równoległych `POST /orders` na produkt ze stanem 3 daje dokładnie 3 × `201` i 7 × `409`. Stan nigdy < 0. |
| Bezpieczeństwo | Hasła bcrypt. Prepared statements wszędzie (brak konkatenacji SQL). Brak stack trace w odpowiedziach. Pełny numer karty nie jest logowany. Nagłówki: `X-Content-Type-Options: nosniff`. Serwer nasłuchuje na `127.0.0.1` (w Codespaces na `0.0.0.0`). |
| Logi | Jedna linia na żądanie: `time method path status duration_ms request_id user_id`. Poziomy info/warn/error. |
| Dostępność | Etykiety pól, kontrast AA, focus widoczny, komunikaty błędów z `role="alert"`. |
| Przeglądarki | Ostatnie wersje Chrome/Edge/Firefox. Responsywność od 375 px. |
| Kod | ES modules, czytelne nazwy, brak zbędnych abstrakcji. Każdy plik < ~250 linii. |
| Licencja | MIT. Obrazki własne (SVG w repo). |

---

## 10. Prompt dla AI (do wklejenia)

```
Jesteś doświadczonym full-stack developerem. Zbuduj aplikację „ShopLite” zgodnie z załączoną
specyfikacją (shoplite-tech-spec.md). Specyfikacja jest źródłem prawdy – jeśli coś jest
niejednoznaczne, ZAPYTAJ zamiast zgadywać.

Zasady:
1. Stos: Node.js 22 LTS, Express, better-sqlite3, swagger-ui-express, bcryptjs, vanilla JS (ES modules)
   na froncie, Tailwind vendorowany lokalnie. Bez bundlera, bez TypeScriptu w aplikacji, bez ORM.
2. Pracuj ETAPAMI z sekcji 11. Po każdym etapie: pokaż drzewo zmienionych plików, uruchom testy
   etapu, wypisz jak ręcznie zweryfikować wynik, i ZATRZYMAJ SIĘ na moją akceptację.
3. Implementuj BASELINE BEZ BŁĘDÓW. Reguły biznesowe z sekcji 4 implementuj dokładnie, każdą w
   osobnej małej funkcji w src/services/. Nie dodawaj żadnych bug flag, dopóki nie poproszę (Etap 9).
4. Kwoty wyłącznie w groszach (integer). Zaokrąglanie half-up zgodnie z R1/R5.
5. Wszystkie data-testid dokładnie wg sekcji 6.3. Nie zmieniaj ich nazw.
6. openapi.yaml musi być zgodny z implementacją (te same ścieżki, pola, kody błędów).
7. Jednolity format błędów wg 5.1. Nigdy nie zwracaj stack trace.
8. Seed dokładnie wg sekcji 7, deterministyczny, bez zależności sieciowych.
9. Nie dodawaj funkcji spoza specyfikacji. Jeśli uważasz, że czegoś brakuje – zaproponuj, nie implementuj.
10. README: instalacja w 3 krokach (Windows/macOS/Linux), konta demo, karty testowe, reset danych,
    najczęstsze problemy instalacyjne.
```

---

## 11. Plan generowania (etapy dla AI)

| Etap | Zakres | Kryterium ukończenia |
|---|---|---|
| 1 | Szkielet repo, `package.json`, `config.js`, `app.js`/`server.js`, `/api/health`, logger, requestId, error handler | `npm start` → `GET /api/health` 200, nagłówek `X-Request-Id` |
| 2 | `schema.sql`, `db/index.js`, `seed.js`, `seed-data.json`, `npm run reset-db`, SVG | DB tworzy się sama, liczby rekordów zgodne z sekcją 7 |
| 3 | `services/pricing.js` + testy jednostkowe (`node:test`) dla R1–R8 | ≥ 20 przypadków testowych, wszystkie zielone (zaokrąglenia, progi, VIP, rabaty) |
| 4 | Auth (register/login/logout/me, sesje, blokada), middleware `auth` | testy API: 200/401/403/409 |
| 5 | Products + categories (filtrowanie, sortowanie, paginacja), `/cart/quote` | odpowiedzi zgodne z 5.3 |
| 6 | Orders (transakcja R9, idempotencja R15, autoryzacja R14), pay (R11), cancel (R10) | test współbieżności z sekcji 9 przechodzi |
| 7 | `openapi.yaml` + `/api/docs` | każdy endpoint z 5.2 opisany i wykonywalny z Swagger UI |
| 8 | Frontend: wszystkie widoki 6.1, `data-testid` 6.3, stany ładowania i błędów, `admin.html` | ręczny happy path: rejestracja → koszyk → rabat → zamówienie → płatność → historia |
| 9 | `flags.js`, `faults.js`, `/admin/*`, `fake_now`, wersje v1/v2. **Błędy z katalogu trenera dodawane w osobnej sesji** | przełączenie wersji i bugów bez restartu |
| 10 | Playwright: `playwright.config.ts` (webServer), 3 przykładowe testy (1 API, 2 UI), `.devcontainer` | `npx playwright test` zielony na baseline |
| 11 | README, `.env.example`, test „czystej instalacji” na Windows i macOS | sekcja 12 spełniona |

---

## 12. Kryteria odbioru (Definition of Done aplikacji)

- [ ] Czysta instalacja na Windows i macOS: `npm install && npm start` działa w < 5 min, bez dodatkowych narzędzi poza Node.js i Git.
- [ ] Aplikacja działa offline po instalacji (brak żądań do zewnętrznych domen, sprawdzone w DevTools → Network).
- [ ] Wszystkie reguły R1–R16 pokryte testami jednostkowymi lub API i zielone na baseline.
- [ ] Test współbieżności: stan magazynowy nigdy nie spada poniżej 0, dokładnie N sukcesów dla stanu N.
- [ ] `openapi.yaml` zgodny z implementacją (każdy endpoint i kod błędu z 5.1/5.2).
- [ ] Wszystkie `data-testid` z 6.3 obecne (z wyjątkiem celowego w historii zamówień).
- [ ] Reset danych przywraca stan identyczny z seedem (te same ID, stany, liczniki kodów).
- [ ] `v1`/`v2`, bug flagi, latency, error rate i `fake_now` przełączają się z `admin.html` bez restartu.
- [ ] Brak pełnych numerów kart i haseł w logach i w DB.
- [ ] README pozwala uczestnikowi uruchomić aplikację bez pomocy trenera (sprawdzone na 1 osobie spoza projektu).

---

## 13. Otwarte kwestie

| # | Pytanie | Rekomendacja |
|---|---|---|
| 1 | Czy uczestnicy dostają repo publiczne (kod widoczny), czy ZIP z zaciemnionymi błędami? | Pilot: publiczne repo + zasada black-box. Po pilocie ocenić, czy ktoś „oszukiwał”. |
| 2 | Czy dodać testy API do sesji S3 (automatyzacja)? | Tak: architektura z prawdziwym API pozwala na 1 test API + 2 UI, co pokazuje piramidę testów. |
| 3 | Czy w przyszłości dodać moduł testowania funkcji AI (np. chatbot asystenta zakupów)? | Backlog (training-spec, Faza 9): endpoint `/api/assistant` z mockiem LLM do ćwiczeń z „AI evals”. |

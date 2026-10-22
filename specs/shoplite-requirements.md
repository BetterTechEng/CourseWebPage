# ShopLite – Product Requirements Document (PRD)
## Release: "Checkout & Promotions" (Black Friday 2026)

| | |
|---|---|
| Document ID | SL-PRD-007 |
| Version | 1.3 |
| Status | Approved for development |
| Product Owner | Marta Kowalska (fictional) |
| Tech Lead | Piotr Zieliński (fictional) |
| QA | *you* |
| Last updated | 2026-10-12 |
| Related | API reference: `http://localhost:3000/api/docs` · Test accounts and test cards: `README.md` |

> Training material. All people, companies, accounts and payment data in this document are fictional.

---

## 1. Purpose

This document describes the functional and non-functional requirements of the ShopLite web store for the "Checkout & Promotions" release. The release introduces a new checkout, discount codes, shipping options and online payment before the Black Friday campaign.

## 2. Business context and goals

ShopLite is a small Polish online store selling electronics, books, home goods and apparel. Last year's Black Friday campaign caused two serious incidents: products were sold that were no longer in stock, and some customers were charged incorrect amounts after applying promo codes.

| Goal | Metric | Target |
|---|---|---|
| G1 – Increase conversion | orders / sessions with a non-empty cart | +5% vs last year |
| G2 – Reduce cart abandonment | carts abandoned at checkout | −10% |
| G3 – No overselling | orders that cannot be fulfilled due to stock | 0 |
| G4 – Correct pricing | customer complaints about amounts charged | 0 |

## 3. Users (personas)

| Persona | Description |
|---|---|
| **Visitor** | Browses the catalog without an account. |
| **Customer** | Registered user who places and pays for orders. |
| **VIP Customer** | Loyal customer flagged by the marketing team. |
| **Store Administrator** | Manages configuration. Not covered by the customer UI in this release. |

## 4. Scope

**In scope:** account registration and login, product catalog, cart, discount codes, shipping methods, checkout, card payment (payment provider sandbox), order history and cancellation.

**Out of scope:** real payment provider integration, e-mail and SMS notifications, returns and refunds, product reviews, multiple currencies, invoices, administration UI.

## 5. Glossary

| Term | Meaning |
|---|---|
| Net price | Price without VAT. |
| Gross price | Price including VAT. All prices shown to customers are gross prices. |
| VAT | Value-added tax: 23%, 8% or 5% depending on the product. |
| Order value | The value of the products in the order. |
| Discount code | A code that reduces the order value. |
| Order status | `PENDING`, `PAID`, `PAYMENT_FAILED`, `CANCELLED`. |

---

## 6. Functional requirements

Priority: **M** = Must, **S** = Should, **C** = Could.

### Epic E1 – Account

**US-01 Registration (M)**
*As a visitor I want to create an account so that I can place orders.*
- AC-01.1 The registration form contains: full name, e-mail and password.
- AC-01.2 The e-mail address must be unique.
- AC-01.3 The password must be secure.
- AC-01.4 After successful registration the customer is informed that the account was created and can log in.

**US-02 Login and logout (M)**
*As a customer I want to log in so that I can use my account.*
- AC-02.1 The customer logs in with e-mail and password.
- AC-02.2 After an unsuccessful login attempt a message is displayed.
- AC-02.3 Blocked accounts cannot log in.
- AC-02.4 The customer can log out. After logout, account pages are no longer accessible.

### Epic E2 – Catalog

**US-03 Browse products (M)**
*As a visitor I want to browse products so that I can find something to buy.*
- AC-03.1 The catalog shows product name, image, gross price and availability.
- AC-03.2 Products are displayed 12 per page.
- AC-03.3 Products withdrawn from sale are not shown.

**US-04 Search, filter and sort (S)**
- AC-04.1 The visitor can search products by name.
- AC-04.2 The visitor can filter by category and show only available products.
- AC-04.3 The visitor can sort by name, price (ascending/descending) and newest.

**US-05 Product details (M)**
- AC-05.1 The product page shows name, description, gross price, VAT rate and stock information.
- AC-05.2 When fewer than 5 items are in stock, the message "Only N left" is displayed.
- AC-05.3 When a product is out of stock, it cannot be added to the cart.

### Epic E3 – Cart

**US-06 Add to cart (M)**
*As a visitor I want to add products to the cart so that I can buy them later.*
- AC-06.1 The visitor selects a quantity and adds the product to the cart.
- AC-06.2 Products added to the cart are reserved for the customer.
- AC-06.3 The cart icon shows the number of items in the cart.
- AC-06.4 Some products have a maximum quantity per order. It is shown on the product page.

**US-07 Manage the cart (M)**
- AC-07.1 The customer can change the quantity of each item and remove items.
- AC-07.2 The cart summary is updated after every change.
- AC-07.3 The cart is preserved after the page is refreshed.
- AC-07.4 If the requested quantity is not available, the customer sees a clear message with the available quantity.

**US-08 Cart summary (M)**
- AC-08.1 The summary shows: products value, discount, shipping cost and total to pay.
- AC-08.2 All amounts are calculated by the system, not entered by the customer.

### Epic E4 – Promotions

**US-09 Apply a discount code (M)**
*As a customer I want to use a promo code so that I pay less.*
- AC-09.1 The customer enters the code in the cart and clicks "Apply".
- AC-09.2 Applied codes are listed below the cart summary together with the discount amount.
- AC-09.3 An invalid or expired code shows a message explaining why it cannot be used.
- AC-09.4 Codes are not case-sensitive.

### Epic E5 – Shipping

**US-10 Choose a shipping method (M)**
- AC-10.1 Available methods: Courier, Parcel locker, Store pickup (prices in BR-06).
- AC-10.2 Free shipping is applied automatically when the conditions in BR-07 are met.
- AC-10.3 VIP customers enjoy additional benefits on shipping.

### Epic E6 – Checkout

**US-11 Place an order (M)**
*As a customer I want to place an order so that the products are delivered to me.*
- AC-11.1 Only logged-in customers can place orders. A visitor is asked to log in, and the cart is kept.
- AC-11.2 The checkout form contains: full name, street, city, postal code and phone number.
- AC-11.3 The postal code must be in Polish format (e.g. 00-950).
- AC-11.4 The phone number must be valid.
- AC-11.5 Stock is decreased when the order is placed.
- AC-11.6 After placing the order the customer sees the order number and status `PENDING`.
- AC-11.7 A confirmation e-mail is sent to the customer.
- AC-11.8 Clicking "Place order" several times must not create duplicate orders.

### Epic E7 – Payment

**US-12 Pay by card (M)**
*As a customer I want to pay for my order by card so that it can be shipped.*
- AC-12.1 The customer enters card number, expiry date (MM/YY) and CVC.
- AC-12.2 After a successful payment the order status changes to `PAID`.
- AC-12.3 After a declined payment the status changes to `PAYMENT_FAILED` and the customer can try again.
- AC-12.4 The full card number is never stored.

### Epic E8 – Orders

**US-13 Order history (S)**
- AC-13.1 The customer sees a list of their orders with number, date, total and status, newest first.
- AC-13.2 The customer can open order details.
- AC-13.3 The customer can see only their own orders.

**US-14 Cancel an order (S)**
- AC-14.1 The customer can cancel an order before it is shipped.
- AC-14.2 A cancelled order has status `CANCELLED`.

---

## 7. Business rules

| ID | Rule |
|---|---|
| BR-01 | Prices are stored as net prices. The gross price is the net price plus VAT. |
| BR-02 | Quantity of a product in an order: from 1 to the available stock, no more than the product limit (default 5). |
| BR-03 | Only one discount code can be used per order. |
| BR-04 | Discount code **WELCOME10**: 10% off for orders from 100 PLN. |
| BR-05 | Discount code **MINUS50**: 50 PLN off orders above 300 PLN. Code **BLACKFRIDAY25**: 25% off during Black Friday weekend, first 100 uses. Code **ONCEONLY**: 20 PLN off, can be used once. |
| BR-06 | Shipping prices: Courier 15.99 PLN, Parcel locker 9.99 PLN, Store pickup free. |
| BR-07 | Free shipping for orders over 200 PLN. |
| BR-08 | Total to pay = products value − discount + shipping. The total can never be negative. |
| BR-09 | When an order is cancelled, the products return to stock and the discount code can be used again. |
| BR-10 | Customers must not see or change other customers' orders. |

## 8. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-01 | Checkout must be fast and user-friendly. |
| NFR-02 | The store works on the latest versions of Chrome, Edge and Firefox and on mobile screens from 375 px. |
| NFR-03 | Forms are accessible: every field has a label and error messages are announced to screen readers. |
| NFR-04 | Passwords are stored as hashes. Error messages do not reveal whether an account exists. |
| NFR-05 | Under Black Friday load, several customers may buy the last items at the same time. The system must never sell more than is in stock. |
| NFR-06 | Every API response contains a request identifier (`X-Request-Id`) to support troubleshooting. |

## 9. Interfaces

- REST API (JSON), documented in OpenAPI at `/api/docs`.
- The UI uses only the public API.
- Payment: provider sandbox with test card numbers (see `README.md`).

## 10. Assumptions and dependencies

- A1. Prices and stock are maintained by the administrator directly in the database for this release.
- A2. Black Friday 2026 is on 27 November 2026.
- A3. All times are UTC.

## 11. Open questions (from refinement)

| # | Question | Owner | Status |
|---|---|---|---|
| OQ-1 | Do we show prices with or without VAT for business customers? | PO | Postponed (no B2B in this release) |
| OQ-2 | Should parcel locker be the default shipping method? | UX | Open |

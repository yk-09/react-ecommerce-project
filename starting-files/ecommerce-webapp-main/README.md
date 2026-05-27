# Kamna Ecommerce

A fully dynamic multi-page ecommerce application built using **Vanilla JavaScript + TypeScript**, focused on real-world frontend engineering concepts like asynchronous API handling, cart synchronization, dynamic rendering, order workflows, and modular architecture.

This project was built to deeply understand how ecommerce systems work internally without relying on frontend frameworks.

---

# Live Features

## Homepage
- Dynamically fetches products from backend APIs
- Renders products using reusable rendering logic
- Responsive navigation menu
- Sticky header on scroll
- Add to Cart functionality
- Quantity selector for products
- Loading skeleton states
- Dynamic cart quantity updates
- Lazy-loaded product images

---

## Cart & Checkout System
- Fully dynamic cart rendering
- Update product quantities
- Delete cart items
- Delivery option selection
- Real-time payment summary updates
- Shipping calculations
- Tax calculations
- Empty cart handling
- Persistent cart state using localStorage
- Backend cart synchronization using REST APIs

---

## Order Management
- Dynamic order creation
- Orders persisted via backend API
- Order history page
- Reverse chronological order rendering
- Unique order IDs using `crypto.randomUUID()`
- Multi-product order support

---

## Tracking Page
- URL query parameter based routing
- Dynamic order/product lookup
- Estimated arrival date calculations
- Delivery tracking view

---

# Technical Highlights

## TypeScript Integration
This project uses TypeScript extensively for:
- Interfaces
- Type safety
- Typed DOM manipulation
- Typed async workflows
- Function contracts
- Safer state handling

Example interfaces:

```ts
export interface Product {
  readonly id: string,
  image: string,
  name: string,
  rating: Rating,
  pricePaisa: number
}
```

---

## Async Backend Architecture

The application communicates with MockAPI backend services using:
- `fetch`
- `async/await`
- `Promise.all`
- RESTful API operations

Implemented operations:
- GET
- POST
- PUT
- DELETE

Example:

```ts
const [freshCart, freshOptions] = await Promise.all([
  getCartBackend(),
  getDeliveryOptions(),
]);
```

This allows concurrent API fetching and faster UI synchronization.

---

## Modular Architecture

The project is separated into focused modules:

```bash
data/
  cart.ts
  delivery-options.ts
  orders-data.ts
  products.ts

checkout/
  order.ts
  payment.ts

utility/
  format-currency.ts
```

This improves:
- maintainability
- scalability
- readability
- separation of concerns

---

# Important Engineering Concepts Implemented

## Event Delegation

Used scalable event handling patterns instead of attaching listeners to every element individually.

```ts
productsRowEle.addEventListener('click', (e) => {
```

---

## State Synchronization

The UI refreshes dynamically after:
- cart updates
- quantity updates
- delivery updates
- item deletions
- order creation

This mimics real ecommerce application behavior.

---

## Data Normalization

Relationships between:
- products
- cart items
- delivery options
- orders

are dynamically resolved using normalization patterns.

Example:

```ts
const matchingProduct = products.find(
  product => product.id === productId
);
```

---

## Persistent Local State

The application uses localStorage for:
- cart persistence
- products cache
- delivery options cache
- orders cache

This improves:
- performance
- user experience
- state persistence across refreshes

---

## Dynamic Rendering System

Entire UI sections are dynamically generated using:
- `.map()`
- template literals
- reusable rendering functions

No static hardcoded ecommerce pages were used.

---

# Tech Stack

## Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- TypeScript

## Libraries
- Day.js

## Backend / APIs
- MockAPI

---

# Key Learning Outcomes

Through this project I learned:

- asynchronous JavaScript
- REST APIs
- TypeScript fundamentals
- modular frontend architecture
- state synchronization
- dynamic rendering
- ecommerce workflows
- CRUD operations
- DOM manipulation
- event delegation
- localStorage persistence
- URL query parameter handling

---

# Future Improvements

Planned upgrades:

- React migration
- Component architecture
- Authentication system
- Search & filtering
- Payment gateway integration
- Better state management
- Improved accessibility
- Unit testing
- Better error boundaries
- Backend migration to Node.js + Express

---

# Screenshots

_Add project screenshots here_

---

# Installation

```bash
git clone https://github.com/yk-09/ecommerce-webapp.git
cd kamna-ecommerce
npm install
npm run dev
```

---

# Project Philosophy

This project was intentionally built using Vanilla JavaScript + TypeScript before learning React in order to deeply understand:

- DOM rendering
- frontend architecture
- state updates
- async workflows
- browser APIs
- how frameworks work internally

---

# Author

Yash Kumar

Frontend Developer focused on building strong engineering fundamentals through project-based learning.
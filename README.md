# NOVA – Something new awaits.

**NOVA** is a responsive online shop built with Next.js, React, TypeScript and Tailwind CSS.

The project was developed as a Course Assignment for the JavaScript Frameworks course at Noroff.

NOVA allows users to explore products, search for items, view product details and reviews, and add products to a shopping cart. Users can adjust quantities, remove products and complete a simulated checkout process.

The design focuses on a clean, modern shopping experience that works across desktop, tablet and mobile devices.

### Live Demo

**[Visit NOVA](https://novashopca.netlify.app/)**


## Features

- **Product catalogue** – Browse products with images, prices, ratings, and discount labels.
- **Product details** – View product descriptions, tags, customer reviews, and pricing information.
- **Search** – Search for products from the homepage or the product catalogue.
- **Sorting** – Sort products using the available sorting options.
- **Shopping cart** – Add and remove products, adjust quantities, and view the total price.
- **Cart persistence** – Shopping cart contents are saved using `localStorage`.
- **Checkout** – Complete a simulated purchase and view an order confirmation.
- **Contact form** – Submit a form with client-side input validation and confirmation feedback.
- **Responsive design** – Layouts adapted for mobile, tablet, and desktop screens.
- **Vitest** – Automated shopping cart tests using Vitest


## Getting Started

Follow these steps to run NOVA locally.

### Prerequisites

Make sure you have the following installed:

- Node.js (version 20.9 or higher)
- npm

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Lilly-yy/javascript-frameworks-ca.git
```

**2. Navigate to the project folder**

```bash
cd javascript-frameworks-ca
```

**3. Install dependencies**

```bash
npm install
```

### Running

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:

```bash
npm run build
```

## Technologies

NOVA was built using:

- **Next.js 16** – React framework and App Router
- **React** – Component-based user interface
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling and responsive design
- **React Context API** – Shopping cart state management
- **localStorage** – Cart persistence
- **Vitest** – Automated testing
- **React Testing Library** – Testing React components and user interactions
- **ESLint** – Code quality checks
- **Netlify** – Deployment and hosting

## API

Product data is retrieved from the [Noroff Online Shop API](https://docs.noroff.dev/docs/v2/basic/online-shop).

**Base URL:**

```text
https://v2.api.noroff.dev/online-shop
```

The application uses the API to display products and their details, including prices, descriptions, images, ratings and reviews.

No API key is required.

## Project Structure

NOVA uses the Next.js App Router, with pages organized inside `src/app`.

```text
javascript-frameworks-ca/
├── public/                  # Static assets, logo and favicon
├── src/
│   ├── app/
│   │   ├── cart/            # Shopping cart page
│   │   ├── checkout/        # Checkout and success pages
│   │   ├── contact/         # Contact form
│   │   ├── products/        # Product listing and details
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Homepage
│   ├── components/          # Reusable React components
│   ├── context/
│   │   ├── CartContext.tsx
│   │   └── CartContext.test.tsx
│   ├── test/
│   │   └── setup.ts         # Test setup
│   └── types/
│       └── product.ts       # Product and review types
├── eslint.config.js
├── package.json
├── tsconfig.json
├── vitest.config.ts
└── README.md
```

## Testing

NOVA uses **Vitest** and **React Testing Library** to test shopping cart functionality.

Three automated tests have been implemented:

- Adding a product to the cart
- Increasing the quantity when the same product is added twice
- Removing a product from the cart

The tests simulate user interactions using `userEvent` and verify the results using Testing Library assertions.

The browser's localStorage is cleared before each test to ensure that tests run independently.

### Run Tests

```bash
npm test
```

### Code Quality and Build

Run ESLint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

All three automated tests passed, ESLint completed without errors, and the production build was successful during the final local checks.

## Deployment

NOVA is deployed on Netlify.

**Live website:** [https://novashopca.netlify.app/](https://novashopca.netlify.app/)

**Source code:** [GitHub Repository](https://github.com/Lilly-yy/javascript-frameworks-ca)


# FreshCart

A responsive grocery storefront built with React, JavaScript, Vite, Tailwind CSS, React Router, and DummyJSON. It demonstrates product discovery, shopping cart and wishlist persistence, a simulated checkout flow, and a flexible storefront layout.

<p align="center">
  <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=80" alt="FreshCart full grocery storefront screenshot" width="100%" />
</p>

## Run locally

```sh
npm install
npm run dev
```

Create a production bundle with `npm run build` and preview it with `npm run preview`.

## Product data

`src/services/api.js` centralizes product, category, search, and product detail requests to DummyJSON. `src/utils/productAdapter.js` maps API products into the app model and converts the source prices to the app's display values.

## Local state and demo limits

Cart, wishlist, account, addresses, and orders are stored in browser `localStorage` under `fc-*` keys. Sign in is a frontend simulation. Checkout creates a local order without collecting payment. Delivery and store timings are demo-only values.

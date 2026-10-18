# FreshCart

A responsive grocery storefront built with React, JavaScript, Vite, Tailwind CSS, React Router, and DummyJSON. It demonstrates product discovery, shopping cart and wishlist persistence, a simulated checkout, and local order history. No real payment or delivery service is connected.

## Run locally

```sh
npm install
npm run dev
```

Create a production bundle with `npm run build` and preview it with `npm run preview`.

## Product data

`src/services/api.js` centralizes product, category, search, and product detail requests to DummyJSON. `src/utils/productAdapter.js` maps API products into the app model and converts the source price to INR using a demo conversion rate. The API supplies general catalog content rather than a verified grocery inventory; product category labels and unit labels are illustrative.

## Local state and demo limits

Cart, wishlist, account, addresses, and orders are stored in browser `localStorage` under `fc-*` keys. Sign in is a frontend simulation. Checkout creates a local order without collecting payment. Delivery fees are free from ₹499 and otherwise ₹40. Prices and promotions are demonstration values.

# Amazon Refined

**Amazon Refined** is a modern, high-fidelity e-commerce application that reimagines the Amazon shopping experience. Built with **Next.js 16 (App Router)** and **Tailwind CSS**, it balances Amazon's signature "information density" with a cleaner, more contemporary user interface.

This is a portfolio project designed to demonstrate advanced frontend development skills, including complex state management, responsive high-density layouts, and pixel-perfect replication of e-commerce user flows.

![Amazon Refined Preview](./public/project-preview.png)

## 🚀 Features Implemented

### 1. **High-Fidelity Homepage**
* **Dual-Layer Header:** Functional search bar, "Deliver to" widget, and secondary navigation (Amazon Haul, Medical Care).
* **Hero Carousel:** Animated, responsive slider with gradient overlays.
* **Mosaic Layout:** Category cards that overlap the hero image (using negative margins) for that authentic Amazon feel.
* **Horizontal Scroll Rows:** "Browsing History" and "Best Sellers" sections with snap-scrolling.

### 2. **Data-Dense Product Details Page (PDP)**
* **Interactive Gallery:** Vertical thumbnail stack with hover-to-switch functionality.
* **Complex Buy Box:** Sticky sidebar featuring "Prime" delivery logic, quantity dropdowns, protection plans, and gift options.
* **Authentic Details:** "Amazon Renewed" guarantees, Rufus AI search pill simulation, and detailed spec bullets.
* **Cross-Selling:** "Frequently Bought Together" bundle logic and "Related Products" grid.

### 3. **Smart Shopping Cart**
* **Global State Management:** Cart persists across reloads (LocalStorage + React Context).
* **Real-time Updates:** Header badge updates instantly when items are added/removed.
* **Upsell & History:** Tabs for "Saved for Later" vs. "Buy it again," plus horizontal scrolling history rows within the cart view.
* **Free Shipping Logic:** Dynamic progress bar/checkmarks for orders over $35.

### 4. **One-Page Checkout**
* **Distraction-Free UI:** Simplified header/footer specific to checkout flows.
* **Delivery Logic:** "Fastest" vs. "Amazon Day" radio selection with dynamic date estimation.
* **Mock Payment:** Simulated credit card processing and order success validation.

---

## 🛠 Tech Stack

* **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Components)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Strict typing for Products/Cart)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Complex grids, sticky positioning, responsive design)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Animation:** [Framer Motion](https://www.framer.com/motion/) (Hero slider)
* **State Management:** React Context API (Cart Provider)

---

## 📦 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/zacdisman/Amazon-Refined.git
    cd amazon-refined
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Visit `http://localhost:3000` in your browser.

---

## 📸 Project Structure

```bash
src/
├── app/
│   ├── cart/           # Shopping Cart Page
│   ├── checkout/       # Checkout Flow
│   ├── product/[id]/   # Dynamic Product Details
│   ├── layout.tsx      # Global Root Layout (Providers)
│   └── page.tsx        # Homepage
├── components/
│   ├── layout/         # Header, Footer, Sidebar
│   ├── product/        # ProductDetails, Gallery, BuyBox
│   └── ui/             # Reusable UI (Buttons, Ratings, Cards)
├── context/
│   └── CartContext.tsx # Global Cart Logic (Add/Remove/Persist)
└── lib/
    └── utils.ts        # Currency formatters & helpers
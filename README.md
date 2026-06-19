# DineTab Bistro: Restaurant QR Dine-In & Kitchen Optimization Ecosystem

DineTab Bistro is a high-fidelity, interactive, frontend-only software ecosystem built to demonstrate the future of modern restaurant dining. It is designed to run synchronously across multiple screens to provide a seamless pitch experience for clients.

---

## 🌟 Core Value Propositions

### ⚡ Time-Saving & Customer Experience
Instead of waiting to flag down a server to ask questions, customers can instantly use the dietary options filter to safely find vegetarian, vegan, or gluten-free items. They can also easily tailor their meals (like requesting extra spice or omitting certain ingredients) directly from their phone.

### 🍳 Chef Experience
This completely removes the risk of miscommunication. The chef sees exact, clear modifications directly on their digital Kitchen Tab, eliminating the frustration of trying to read handwritten notes or making a dish twice because of an allergy mistake.

---

## 📱 Interactive Ecosystem Views

The platform consists of four distinct synchronized routes:

### 1. Customer Scan-to-Order View (`/customer`)
* **Mobile-First Interface**: Simulates the guest's mobile phone screen with large tap targets, reading modes (high contrast light/dark mode), and multi-language support (English, Hindi, Telugu).
* **Dietary & Preference Filters**: Horizontal scrollable filter pills for **All Dishes**, **Veg Only**, **Non-Veg Only**, **Spicy Only**, and **Gluten-Free**.
* **Visual Cart & One-Click Paytm Checkout**: Instantly places orders, generates table tokens, and displays a live 3-step cooking status progress bar.
* **Order Status Notification Alerts**: Instantly triggers live Toast updates when the chef accepts (`preparing`) or completes (`ready`) the order.

### 2. Kitchen Display System - KDS (`/kitchen`)
* **Tablet-First Dashboard**: Dark-themed, low-glare grid mimicking mounted wall tablets in hot kitchens.
* **Zero-Delay Order Feed**: Direct sync with the customer cart. Orders immediately populate as tickets.
* **Smart Cooking Pacing Timers**: Calculates preparation start delays to ensure different items on the same ticket finish cooking at the same time.
* **Action Controls**: Interactive tickets allow the chef to `Accept` (moves to Preparing status) and mark `Cooked` (moves to Ready status).

### 3. Dine-In TV Signage Display (`/tv-display`)
* **Split-Screen Signage**: Vertical column breakdown showing **Preparing** (subtle amber accents) and **Ready for Pickup** (vibrant green accents).
* **Pulsing Visual Alerts**: Rings a visual bell and triggers keyframe scale pulses when a new ticket is marked ready by the chef.
* **Recent History Queue**: Displays a history list of completed orders in a faded state at the bottom of the column.

### 4. Admin Management Console (`/admin`)
* **KPI Metrics Board**: Live monitoring of total revenue, active orders, table occupancy rates, and pending waiter requests.
* **Stock & Pricing Controller**: Instantly toggles items in/out of stock (like marking *Pootharekulu* sold out) and edits prices dynamically.

---

## 🛠️ Technology Stack & State Sync
* **Frontend Core**: React 19, Vite, Tailwind CSS v4, Lucide React.
* **Animations**: Framer Motion keyframes.
* **Real-time State Synchronization**: Managed globally via `AppContext` with `localStorage` bridging, allowing actions in one tab (e.g. clicking Accept in `/kitchen`) to instantly reflect in all others (e.g. updating the `/customer` progress bar and `/tv-display` board).

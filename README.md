# Product Listing App

This is a React + TypeScript + Vite project that displays a list of products with full filtering, sorting, search, and pagination functionality. The app uses a simulated API and is styled with Tailwind CSS.

🔗 **Live demo:** https://test-media-brown.vercel.app/

## Features

- Display products from a simulated API
- Full-text search (with debounce)
- Sorting by price (ascending / descending)
- Filtering by:
  - Brand 
  - Category
  - Price range (`Price from` / `Price to`)
- Pagination
- Responsive design
- Unit tests for:
  - Components
  - Hooks
  - Utility functions
- Deployed on Vercel

## Technologies Used

- **React** with **TypeScript**
- **Vite** as build tool
- **Tailwind CSS** for styling
- **Jest + React Testing Library** for testing
- **Vercel** for deployment

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```
 npm install
```

### 3. Start development server

```
 npm run dev

```

### 4. Run tests

```
npm run test

```

## Design Decisions

-Component decomposition: Each filter (brand, category, price, search, sort) is separated into its own component for better reusability and testability.

-State management: Used local state + custom hooks (useFilters, useDebounce) to manage filtering and performance.

-Memoization: Used useMemo to optimize filtering logic and avoid unnecessary re-renders.

-Debounced Search: Implemented a debounced full-text search to reduce filtering calls on every keystroke.

-Pagination: Implemented simple client-side pagination with configurable number of items per page.

-Testing: Covered core functionality with unit tests including components, hooks, and utilities.

-Responsiveness: The UI adapts well to different screen sizes using Tailwind's responsive utilities.

-Error handling: Added error and loading states to improve user experience.

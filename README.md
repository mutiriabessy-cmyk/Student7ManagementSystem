# Classroom — Student Management System

A responsive React application for managing sample student and teacher records through separate administrator and teacher workspaces. This course project demonstrates reusable React components, controlled forms, state and effects, React Router, search, filtering, pagination, dynamic record pages, and browser storage.

## Features

- Public home and about pages, registration, and simulated role-based login.
- Separate administrator and teacher dashboards.
- Student directory with create, view, edit, delete, search, grade filtering, and pagination.
- Administrator teacher directory with create, view, edit, delete, search, and pagination.
- Account settings and dashboard help pages.
- Sample data is fictional and is persisted in browser local storage. No server or real authentication is used.
- Responsive layouts styled with Bootstrap and application-specific CSS.

## Run locally

Requirements: Node.js and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. The production build and local preview can be run with:

```sh
npm run build
npm run preview
```

To try the administrator flow, choose **Use the admin demo details** on the login page, then submit the form. You can also sign in with any valid email address and a password of at least six characters, selecting either role. Authentication is intentionally simulated for this assignment.

## Deployment

The app is configured for Vercel's SPA routing with `vercel.json`. Import the GitHub repository into Vercel; use `npm run build` as the build command and `dist` as the output directory. After deployment, test the public pages, both dashboard roles, record management, and direct navigation to a record detail URL.

## Project structure

- `src/components/` — shared navigation, dashboard overview, and record management.
- `src/data/` — fictional starter student and teacher records.
- `src/hooks/` — shared school data and local storage persistence.
- `src/layouts/` — role-aware dashboard layout and navigation.
- `src/pages/` — public pages and dashboard route pages.

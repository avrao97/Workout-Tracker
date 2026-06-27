# Learnings

Notes on concepts and decisions made during the build.

## Step 1 — Client-side routing
- React Router v6 keeps the page alive and swaps components based on the URL
- `<NavLink>` changes the URL without triggering a browser page reload; a plain `<a>` does reload
- `<BrowserRouter>` wraps the whole app in `main.jsx` so every component can access the URL
- `end` prop on the Dashboard `<NavLink>` prevents `/` from matching as active on every route

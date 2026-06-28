# Learnings

Notes on concepts and decisions made during the build.

## Step 1 — Client-side routing
- React Router v6 keeps the page alive and swaps components based on the URL
- `<NavLink>` changes the URL without triggering a browser page reload; a plain `<a>` does reload
- `<BrowserRouter>` wraps the whole app in `main.jsx` so every component can access the URL
- `end` prop on the Dashboard `<NavLink>` prevents `/` from matching as active on every route

1. usind indexeddb instead of local storage because need real database where we can query a specific workout and exercises and not have to go through the entire data set every time we need to look for something
2. client side routing: when we switch tabs the whole page isn't re-rendered. React is able to route as to different tabs without reloading the page
3. we used multi-step forms here: start workout -> choose exercise -> choose reps and set -> next excercise or finish workout -> view summary